import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production,
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { message: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const { result } = await squareClient.ordersApi.searchOrders({
      locationIds: [process.env.SQUARE_LOCATION_ID!],
      query: {
        filter: {
          customerFilter: {
            customerIds: [customerId]
          }
        }
      }
    });

    const orders = result.orders?.map(order => ({
      id: order.id,
      date: order.createdAt,
      total: Number(order.totalMoney?.amount || 0) / 100,
      status: order.state || 'PENDING',
      items: order.lineItems?.map(item => ({
        name: item.name,
        quantity: Number(item.quantity),
        price: Number(item.basePriceMoney?.amount || 0) / 100,
        variationName: item.variationName
      })) || []
    })) || [];

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { message: 'Error fetching orders' },
      { status: 500 }
    );
  }
} 