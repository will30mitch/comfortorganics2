import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production,
});

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if customer already exists
    const { result: searchResult } = await squareClient.customersApi.searchCustomers({
      query: {
        filter: {
          emailAddress: {
            exact: email
          }
        }
      }
    });

    if (searchResult.customers && searchResult.customers.length > 0) {
      return NextResponse.json(
        { message: 'Customer already exists' },
        { status: 400 }
      );
    }

    // Split name into given name and family name
    const nameParts = name.split(' ');
    const givenName = nameParts[0];
    const familyName = nameParts.slice(1).join(' ');

    // Create customer
    const { result } = await squareClient.customersApi.createCustomer({
      givenName,
      familyName,
      emailAddress: email,
      // In a real implementation, you would store the password securely
      // For now, we'll just create the customer without password
      // TODO: Implement proper password storage with Square's customer authentication
    });

    if (!result.customer || !result.customer.id) {
      return NextResponse.json(
        { message: 'Error creating customer' },
        { status: 500 }
      );
    }

    // Generate a customer token (in a real implementation, this would be handled by Square's authentication)
    const customerToken = Buffer.from(result.customer.id).toString('base64');

    return NextResponse.json({
      message: 'Customer created successfully',
      customerToken,
      customer: {
        id: result.customer.id,
        givenName: result.customer.givenName,
        familyName: result.customer.familyName,
        emailAddress: result.customer.emailAddress,
        phoneNumber: result.customer.phoneNumber
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error creating customer' },
      { status: 500 }
    );
  }
} 