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

    const { result } = await squareClient.customersApi.retrieveCustomer(customerId);

    if (!result.customer) {
      return NextResponse.json(
        { message: 'Customer not found' },
        { status: 404 }
      );
    }

    // Convert BigInt values to strings
    const customerSafe = JSON.parse(
      JSON.stringify(result.customer, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    );

    return NextResponse.json({ customer: customerSafe });
  } catch (error) {
    console.error('Customer fetch error:', error);
    return NextResponse.json(
      { message: 'Error fetching customer data' },
      { status: 500 }
    );
  }
} 