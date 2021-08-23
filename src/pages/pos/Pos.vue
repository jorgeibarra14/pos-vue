<template>
  <q-page class="bg-grey-3 pagina">
    <div class="q-pa-md bg-grey-3">
      <div class="row q-pa-md div-padre bg-white">
        <div class="col-9 prods">
          <div class="col-12">
            <div class="flex flex-center q-pa-md col-12">
              <q-input type="text" style="width: 100%" v-model="sku" @change="searchAndAdd()" autofocus filled label="buscar"></q-input>
            </div>
          </div>
          <div class="row productos">

          </div>
        </div>
        <div class="col-3 lista">
          <q-table style="width: 100%; height: 50vh" :rows="rows" :columns="columns" row-key="name" />
          <div class="row cart">
          </div>
          <div class="row totales">
            <div class="row">
              <div class="col-6" style="text-align:left; font-weight: bold;">Productos:</div>
              <div class="col-6" style="text-align: right; font-weight: bold;" id="total_productos"></div>
            </div>
            <div class="row">
              <div class="col-6" style="text-align:left; font-weight: bold;">Total:</div>
              <div class="col-6" style="text-align: right; font-weight: bold;" id="total"></div>
            </div>
            <div class="row">

            </div>
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

import axios from 'axios'
  export default defineComponent({
    name: 'Pos',
    created() {
        this.printList();
    },
    data() {
      return {
          info: [],
        columns: [{
            name: 'nombre',
            align: 'center',
            label: 'Nombre',
            field: 'nombre',
            sortable: false
          },
          {
            name: 'cantidad',
            label: 'Cant.',
            field: 'cantidad',
            sortable: false
          },
          {
            name: 'precio',
            label: 'Precio',
            field: 'precio'
          },
          {
            name: 'eliminar',
            label: '',
            field: 'protein'
          }
        ],
        rows: [],
        sku: null,
      }
    },
    methods: {
        searchAndAdd() {
            // api.get('/areas').then(({ data }) => {
            //     this.data = data.areas
            //     this.$q.loading.hide()
            // })
            // console.log(__dirname + 'public');
            // axios.get('@/assets/dummy.json').then((response) => {
            //     console.log(response.data)
            // }).catch(e => {
            //     console.log(response.data)
            // })
            // axios
            // .get()
            // .then(response => { console.log(response)});
            const info =  [
                            {
                                "id": "1",
                                "nombre": "Sprite",
                                "img": "http://pngimg.com/uploads/sprite/sprite_PNG8920.png",
                                "sku": "1",
                                "precio": "20"
                            },
                            {
                                "id": "2",
                                "nombre": "Coca",
                                "img": "http://pngimg.com/uploads/sprite/sprite_PNG8920.png",
                                "sku": "2",
                                "precio": "20"
                            },
                            {
                                "id": "3",
                                "nombre": "Sabritas",
                                "img": "http://pngimg.com/uploads/sprite/sprite_PNG8920.png",
                                "sku": "3",
                                "precio": "12"
                            },
                            {
                                "id": "4",
                                "nombre": "Pan bimbo",
                                "img": "http://pngimg.com/uploads/sprite/sprite_PNG8920.png",
                                "sku": "4",
                                "precio": "60"
                            }
                        ]
                        const data = info.filter(i => i.id == this.sku);
                        this.addToCart(data)
        },
        addToCart(e) {

            var productoJson = e[0];

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
            this.rows = data;            
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
