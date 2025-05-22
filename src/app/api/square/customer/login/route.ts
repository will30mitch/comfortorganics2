import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production,
});

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Search for customer by email
    const { result } = await squareClient.customersApi.searchCustomers({
      query: {
        filter: {
          emailAddress: {
            exact: email
          }
        }
      }
    });

    const customer = result.customers?.[0];

    if (!customer || !customer.id) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In a real implementation, you would verify the password against Square's customer data
    // For now, we'll just check if the customer exists
    // TODO: Implement proper password verification with Square's customer authentication

    // Generate a customer token (in a real implementation, this would be handled by Square's authentication)
    const customerToken = Buffer.from(customer.id).toString('base64');

    return NextResponse.json({
      message: 'Logged in successfully',
      customerToken,
      customer: {
        id: customer.id,
        givenName: customer.givenName,
        familyName: customer.familyName,
        emailAddress: customer.emailAddress,
        phoneNumber: customer.phoneNumber
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Error logging in' },
      { status: 500 }
    );
  }
} 