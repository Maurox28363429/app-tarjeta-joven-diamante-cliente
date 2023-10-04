const OFFERS_TABLE = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
  },
  { name: 'active', align: 'center', label: 'ACTIVO', field: 'active' },
  { name: 'nombre', align: 'center', label: 'NOMBRE', field: 'nombre' },
  { name: 'comercio', align: 'center', label: 'COMERCIO', field: 'comercio' },
  {
    name: 'img_array_url',
    align: 'center',
    label: 'IMG',
    field: 'img_array_url',
  },
  { name: 'description', label: 'DESCRIPCION', field: 'description' },
  { name: 'descuento', label: 'DESCUENTO', field: 'descuento' },
  { name: 'price_total', label: 'PRECIO TOTAL', field: 'price_total' },

  { name: 'stock', label: 'STOCK', field: 'stock', sortable: true },
  { name: 'prioridad', label: 'PRIORIDAD', field: 'prioridad' },
  { name: 'link_map', label: 'LINK MAP', field: 'link_map' },
  { name: 'created_at', label: 'FECHA', field: 'created_at' },
  {
    name: 'fecha_tope_descuento',
    label: 'FECHA TOPE',
    field: 'fecha_tope_descuento',
  },
  { name: 'action', label: 'ACTION', field: 'action' },
];

export default OFFERS_TABLE;
