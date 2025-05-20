import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment:Environment.Production,
});

export async function getSquareProducts() {
  const catalogApi = squareClient.catalogApi;
  const response = await catalogApi.listCatalog(undefined, 'ITEM');
  console.log('Square API response:', response.result.objects);
  return response.result.objects || [];
} 