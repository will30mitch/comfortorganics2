import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production,
});

export async function POST(req: Request) {
  try {
    const { cart } = await req.json();
    const lineItems = cart.map((item: any) => ({
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: Math.round(item.price * 100), // price in cents
        currency: 'USD',
      },
    }));

    const { result } = await squareClient.checkoutApi.createCheckout(process.env.SQUARE_LOCATION_ID!, {
      idempotencyKey: Math.random().toString(36).substring(2),
      order: {
        order: {
          locationId: process.env.SQUARE_LOCATION_ID!,
          lineItems,
        },
      },
      askForShippingAddress: true,
      redirectUrl: process.env.NEXT_PUBLIC_CHECKOUT_REDIRECT_URL || 'http://localhost:3000/cart',
    });

    return NextResponse.json({ checkoutUrl: result.checkout?.checkoutPageUrl });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
} 