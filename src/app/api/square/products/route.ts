import { NextResponse } from 'next/server';
import { getSquareProducts } from '@/lib/square';

function stringifyWithBigInt(obj: any) {
  return JSON.parse(JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
}

export async function GET() {
  try {
    const products = await getSquareProducts();
    const safeProducts = stringifyWithBigInt(products);
    return NextResponse.json({ products: safeProducts });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 