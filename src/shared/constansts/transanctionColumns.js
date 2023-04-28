export const TRANSACTION_COLUMNS = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  {
    name: 'comercio',
    label: 'Comercio',
    field: (row) => row.comercio.name,
    align: 'left'
  },
  { name: 'total', label: 'Total', field: (row) => row.total, align: 'left' },
  {
    name: 'total_descuento',
    label: 'Descuento total',
    field: (row) => row.total_descuento,
    align: 'left'
  }
]
