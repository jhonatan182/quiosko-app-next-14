export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-Es', {
    style: 'currency',
    currency: 'HNL',
  }).format(amount);
}
