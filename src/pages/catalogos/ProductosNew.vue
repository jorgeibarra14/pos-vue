<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-sm panel-header bg-white">
      <div class="row">
        <div class="col-sm-9">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 18px">
              <q-breadcrumbs-el label="" icon="home" to="/home" />
              <q-breadcrumbs-el label="Productos" to="/productos" />
              <q-breadcrumbs-el label="Nuevo Producto" />
            </q-breadcrumbs>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md bg-grey-3">
      <div class="row bg-white border-panel">
        <div class="col q-pa-md">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="row q-col-gutter-xs">
              <div class="col-xs-12 col-lg-6 col-md-6 col-sm-6">
                <q-input color="white" bg-color="light-blue-6" filled dark v-model="producto.fields.nombre"
                  label="Nombre" lazy-rules
                  :rules="[ val => val && val.length > 0 || 'El nombre es requerido']">
                  <template v-slot:prepend>
                    <q-icon name="fas fa-signature" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-lg-3 col-md-3 col-sm-6">
                <q-input type="number" color="white" bg-color="light-blue-6" filled dark v-model="producto.fields.precio"
                  label="Precio" lazy-rules
                  :rules="[ val => val && val > 0 || 'El precio es requerido y mayor que 0']">
                  <template v-slot:prepend>
                    <q-icon icon="add" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-lg-3 col-md-3 col-sm-6">
                <q-input color="white" bg-color="light-blue-6" filled dark v-model="producto.fields.sku" label="SKU"
                  lazy-rules
                  :rules="skuRules">
                  <template v-slot:prepend>
                    <q-icon name="fas fa-signature" />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row q-mb-sm q-mt-sm">
              <div class="col-xs-12 col-sm-12 pull-right">
                <q-btn class="float-right" color="positive" icon="save" type="button" label="Guardar" @click="createProduct()" />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar }  from 'quasar'
import { ref } from 'vue'
import { SERVER_API } from '../../../environment/environment.js'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
  // const $q = useQuasar()
  export default {
    setup() {
      const nombre = ref(null)
      const precio = ref(null)
      const sku = ref(null)
      return {
      onSubmit () {
        console.log(this.producto.fields.nombre)
      },

      onReset () {
        nombre.value = null
        precio.value = null
        sku.value = null
      }
      }
    },
    name: 'NewProducto',
    validations: {
      producto: {
        fields: {
          nombre: {},
          precio: {},
          sku: {},
        }
      }
    },
    data() {
      return {
        producto: {
          fields: {
            id: 0,
            nombre: null,
            precio: null,
            sku: null
          }
        }
      }
    },
    computed: {
      nombreRules(val) {
        return [
          val => (this.producto.fields.nombre.required) || 'Nombre es requerido.',
          val => (this.producto.fields.nombre.maxLength) || 'Nombre no debe exceder los 50 dígitos.'
        ]
      },
      precioRules(val) {
        return [
          val => this.producto.fields.precio.required || 'Precio es requerido.',
        ]
      },
      skuRules(val) {
        return [
          val => val && val.length > 0|| 'SKU es requerido.'
        ]
      }
    },
    beforeCreate() {},
    created() {
      this.fetchFromServer()
    },
    mounted() {},
    methods: {
      fetchFromServer() {
        // this.$q.loading.show()
        // api.get('/productos/options').then(({ data }) => {
        //   this.productosOptions = data.options
        //   this.$q.loading.hide()
        // })
      },
      createProduct() {
        console.log(this.producto)
        axios.post(SERVER_API + 'productos', this.producto.fields).then((r) => {
          this.producto.fields.nombre = null
          this.producto.fields.sku = null
          this.producto.fields.precio = null
          this.showNotif()
        })
      }, 
       showNotif () {
        this.$q.notify({
          message: 'Éxito, se ha agregado el producto correctamente',
          color: 'green'
        })
      }
    }
  }

</script>

<style>
</style>


