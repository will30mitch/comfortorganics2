export interface Order {
  id: string;
  date: string;
  items: any[];
  total: number;
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('orderHistory', JSON.stringify(orders));
}

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('orderHistory');
  return stored ? JSON.parse(stored) : [];
} 