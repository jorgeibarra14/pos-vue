<template>
  <q-page class="bg-grey-3 pagina">
    <div id="breadcrum" class="q-pa-sm bg-white">
      <div class="row">
        <div class="col-sm-8">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 18px">
              <q-breadcrumbs-el label="" icon="home" to="/home" />
              <q-breadcrumbs-el label="Ventas" />
            </q-breadcrumbs>
          </div>
        </div>
        <div class="col-sm-4 pull-right">
        </div>
      </div>
    </div>
    <div class="q-pa-md bg-grey-3">
      <div class="row q-pa-md div-padre bg-white">

        <div class="col-8 prods">
          <div class="col-12">
            <div class="flex flex-center q-pa-md col-12">
              <q-input type="text" style="width: 100%" v-model="sku" @change="searchAndAdd()" autofocus filled
                label="Buscar producto"></q-input>
            </div>
          </div>
          <div class="row productos">
            <div v-for="(item, index) in info" class="col-4" :key="item.id">
              <ItemVue :title="item.nombre" :src="index" :sku="item.sku" :precio="item.precio" />
            </div>
          </div>
        </div>

        <div class="col-4 lista">
          <q-table :hide-pagination="true" elevation="100" virtual-scroll style="width: 100%; height: 50vh" :rows="rows"
            :columns="columns" row-key="name">
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn dense round flat color="negative"  icon="delete" @click="deleteSelectedRow(props.row.index)">
                  <q-tooltip class="bg-red">Eliminar</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
          <div class="row cart">
          </div>
          <div class="row totales">
            <div class="row q-pa-xs" style="width: 100%">
              <div class="col-6" style="text-align:left; font-weight: bold;">RECIBIDO:</div>
              <div class="col-6" style="text-align: right; font-weight: bold;">$ 100</div>

              <div class="col-6" style="text-align:left; font-weight: bold;">CAMBIO:</div>
              <div class="col-6" style="text-align: right; font-weight: bold;">$ 0</div>

            </div>
          </div>
          <div class="row">
            <div class="col-12" style="text-align: right; font-weight: bold;" id="total">
              <button tabindex="0" type="button" role="button"
                class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-positive text-white q-btn--actionable q-focusable q-hoverable q-btn--wrap"
                style="width: 100%;"><span class="q-focus-helper"></span><span
                  class="q-btn__wrapper col row q-anchor--skip"><span
                    class="q-btn__content text-center col items-center q-anchor--skip justify-center column"><span
                      class="block">TOTAL:</span><strong>$72,000.00</strong></span></span></button>
            </div>
          </div>
          <div class="row">

          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
  import {
    defineComponent
  } from 'vue';

  import ItemVue from 'components/Item.vue'
  import axios from 'axios'
  export default defineComponent({
    components: {
      ItemVue
    },
    name: 'Pos',
    created() {
      this.printList();
    },
    data() {
      return {
        info: [],
        columns: [{
            name: 'nombre',
            align: 'left',
            label: 'Nombre',
            field: 'nombre',
            sortable: false
          },
          {
            name: 'cantidad',
            align: 'right',
            label: 'Cant.',
            field: 'cantidad',
            sortable: false
          },
          {
            name: 'precio',
            align: 'right',
            label: 'Precio',
            field: 'precio'
          },
          {
            name: 'actions',
            label: '',
            field: 'actions'
          }
        ],
        rows: [],
        sku: null,
      }
    },
    methods: {
      deleteSelectedRow(index) {
        this.rows.splice(index,1);
        localStorage.setItem('carrito', JSON.stringify(this.rows))
        this.printList();

      },
      axiosTest() {
        var config = {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        };
        // create a promise for the axios request
        const url = 'https://localhost:44308/api/Productos/' + this.sku;
        const promise = axios.get(url, null, config)

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then((response) => response.data)

        // return it
        return dataPromise
      },
      searchAndAdd() {
        this.axiosTest()
          .then(data => {
            this.info = data;
            this.addToCart(data[0])
          })
          .catch(err => console.log(err))
      },
      addToCart(e) {
        var productoJson = e;

        var carrito = localStorage.getItem('carrito');
        productoJson.cantidad = 1;

        var carritoTemporal = [];
        if (carrito == null || carrito == "" || carrito == undefined) {
          carritoTemporal.push(productoJson);

        } else {
          var badera = true;
          carritoTemporal = JSON.parse(carrito);
          carritoTemporal.forEach(item => {
            if (item.id == productoJson.id) {
              badera = false;
            }
          });
          if (badera) {
            carritoTemporal.push(productoJson);

          } else {

            var carr = carritoTemporal.filter(item => item.id == productoJson.id);
            console.log(carr);
            productoJson.cantidad = carr[0].cantidad + 1;

            carritoTemporal = carritoTemporal.filter(item => item.id != productoJson.id);
            carritoTemporal.push(productoJson);
            this.printList();
          }
        }

        localStorage.setItem('carrito', JSON.stringify(carritoTemporal));
        this.printList();
      },
      printList() {
        const data = JSON.parse(localStorage.getItem('carrito'));
        if (data != null) {
          this.rows = data;
        }else{
          this.rows = [];
        }
      }
    }
  })

</script>
<style scoped>
  .div-padre {
    height: 90vh;
  }

  .totales {
    margin-top: 5%;
  }

</style>
