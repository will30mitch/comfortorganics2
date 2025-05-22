import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // This endpoint is deprecated if using Square for orders
    return NextResponse.json(
      { message: 'This endpoint is no longer supported. Please use Square order endpoints.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching orders' },
      { status: 500 }
    );
  }
} 