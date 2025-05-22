import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    // This endpoint is deprecated if using Square for authentication
    return NextResponse.json(
      { message: 'This endpoint is no longer supported. Please use Square authentication.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error logging in' },
      { status: 500 }
    );
  }
} 