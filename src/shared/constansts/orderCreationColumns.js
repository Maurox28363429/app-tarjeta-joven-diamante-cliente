export const ORDER_CREATION_COLUMNS = [
  {
    name: 'cantidad',
    align: 'center',
    label: 'Cantidad',
    field: 'cantidad',
    sortable: true
  },
  {
    name: 'nombre',
    align: 'center',
    label: 'Producto',
    field: 'nombre',
    sortable: true
  },
  {
    name: 'priceWidthDiscount',
    align: 'center',
    label: 'precio con descuento',
    field: 'priceWidthDiscount',
    sortable: true
  },
  {
    name: 'savings',
    align: 'center',
    label: 'Ahorrado',
    field: 'savings',
    sortable: true
  },
  {
    name: 'price_total',
    label: 'Precio',
    field: 'price_total',
    sortable: true,
    format: (val) => `$${val}`
  },
  {
    name: 'descuento',
    label: 'Descuento',
    field: 'descuento',
    sortable: true,
    format: (val) => `${val}%`
  },
  {
    name: 'priceTotal',
    label: 'Precio total',
    field: 'priceTotal',
    sortable: true,
    format: (val) => `$${val}`
  }
]
