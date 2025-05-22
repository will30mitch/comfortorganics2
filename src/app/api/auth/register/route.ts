import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // This endpoint is deprecated if using Square for registration
    return NextResponse.json(
      { message: 'This endpoint is no longer supported. Please use Square registration.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
} 