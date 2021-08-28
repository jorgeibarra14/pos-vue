<template>
  <div class="q-pa-md">
    <q-table title="Productos" :rows="rows" :columns="columns" row-key="name" binary-state-sort>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
            <q-popup-edit v-model="props.row.nombre">
              <q-input v-model="props.row.nombre" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="precio" :props="props">
            {{ props.row.precio }}
            <q-popup-edit v-model="props.row.precio" title="Actualizar precio" buttons>
              <q-input type="number" v-model="props.row.precio" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="sku" :props="props">
            <div class="text-pre-wrap">{{ props.row.sku }}</div>
            <q-popup-edit v-model="props.row.sku" title="Actualizar sku">
              <q-input type="textarea" v-model="props.row.sku" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
  import {
    defineComponent
  } from 'vue'

  const columns = [{
      name: 'nombre',
      required: true,
      label: 'Nombre',
      align: 'left',
      field: row => row.nombre,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'precio',
      align: 'center',
      label: 'Precio',
      field: 'precio',
      sortable: true
    },
    {
      name: 'sku',
      label: 'SKU',
      field: 'sku',
      sortable: true
    }
  ]

  const rows = [{
      nombre: 'Frozen Yogurt',
      precio: 159,
      sku: 6.0
    },
    {
      nombre: 'Ice cream sandwich',
      precio: 237,
      sku: 9.0
    },
    {
      nombre: 'Eclair',
      precio: 262,
      sku: 16.0
    },
    {
      nombre: 'Cupcake',
      precio: 305,
      sku: 3.7
    }
  ]

  export default defineComponent({
    setup() {
      return {
        columns,
        rows
      }
    },
    data() {
      return {

      }
    }
  })

</script>
