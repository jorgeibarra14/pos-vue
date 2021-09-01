<template>
  <q-page class="bg-grey-3">
    <div id="breadcrum" class="q-pa-sm bg-white">
      <div class="row">
        <div class="col-sm-8">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 18px">
              <q-breadcrumbs-el label="" icon="home" to="/home" />
              <q-breadcrumbs-el label="Producto" />
            </q-breadcrumbs>
          </div>
        </div>
        <div class="col-sm-4 pull-right">
        </div>
      </div>
    </div>
    <div class="q-pa-md bg-grey-3">
      <div class="row bg-white border-panel">
        <div class="col q-pa-md">
          <div class="q-mb-sm">
            <div class="row col-xs-12 col-md-12">
              <q-btn color="light-blue-6" icon="add" label="Nuevo" @click="$router.push('/productos/new')" />
            </div>
          </div>
          <q-table flat bordered :rows="rows" :columns="columns" row-key="name" :pagination="pagination"
            binary-state-sort>
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
      </div>
    </div>
  </q-page>
</template>
<style>
  .q-table th {
    background: #1976d2;
    font-size: 0.95em;
    color: white
  }

</style>
<script>
  import {
    defineComponent
  } from 'vue'


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
  import axios from 'axios'
  import {
    SERVER_API
  } from '../../../environment/environment.js'
  export default defineComponent({
    created() {
      this.getProducts()
    },
    mounted() {
      // console.log(SERVER_API)
    },
    setup() {
      return {}
    },
    data() {
      return {
        pagination: {
          sortBy: 'code',
          descending: false,
          rowsPerPage: 25
        },
        productos: [],
        rows: [],
        columns: [{
            name: 'nombre',
            required: true,
            label: 'NOMBRE',
            align: 'CENTER',
            field: row => row.nombre,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'precio',
            align: 'center',
            label: 'PRECIO',
            field: 'precio',
            sortable: true
          },
          {
            name: 'sku',
            label: 'SKU',
            align: 'CENTER',
            field: 'sku',
            sortable: true
          }
        ],
      }
    },
    methods: {
      getProducts() {
        axios.get(SERVER_API + 'productos').then((products) => {
          this.rows = products.data
        })
      }
    }
  })

</script>
