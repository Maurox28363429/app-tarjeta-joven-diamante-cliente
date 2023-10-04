const PROMOTIONS_TABLE = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
  },
  { name: 'img_url', align: 'center', label: 'IMG', field: 'img_url' },
  { name: 'titulo', label: 'TITULO', field: 'titulo' },
  {
    name: 'descripcion',
    label: 'DESCRIPCION',
    field: 'descripcion',
    sortable: true,
  },
  { name: 'prioridad', label: 'PRIORIDAD', field: 'prioridad' },
  { name: 'categoria', label: 'CATEGORIA', field: 'categoria' },
  { name: 'created_at', label: 'FECHA', field: 'created_at' },
  { name: 'action', label: 'ACTION', field: 'action' },
];

export default PROMOTIONS_TABLE;
