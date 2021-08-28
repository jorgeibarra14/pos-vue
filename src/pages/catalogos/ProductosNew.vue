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
          <div class="row q-col-gutter-xs">
            <div class="col-xs-12 col-lg-6 col-md-6 col-sm-6">
              <q-input
                color="white"
                bg-color="light-blue-6"
                filled
                dark
                v-model="producto.fields.nombre"
                label="Nombre"
                :rules="nombreRules"
                @input="v => { producto.fields.nombre = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-signature" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-lg-3 col-md-3 col-sm-6">
              <q-input
                color="white"
                bg-color="light-blue-6"
                filled
                dark
                v-model="producto.fields.precio"
                label="Precio"
                :rules="precioRules"
                @input="v => { producto.fields.precio = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon icon="add" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-lg-3 col-md-3 col-sm-6">
              <q-input
                color="white"
                bg-color="light-blue-6"
                filled
                dark
                v-model="producto.fields.sku"
                label="SKU"
                :rules="skuRules"
                @input="v => { producto.fields.sku = v.toUpperCase() }"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-signature" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-mb-sm q-mt-sm">
            <div class="col-xs-12 col-sm-12 pull-right">
              <q-btn class="float-right" color="positive" icon="save" label="Guardar" @click="createArea()" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
//import api from '../../commons/api.js'
import { QSpinnerGears } from 'quasar'
//const { required, minLength } = require('vuelidate/lib/validators')

export default {
  name: 'NewProducto',
  validations: {
    producto: {
      fields: {
        nombre: {  },
        precio: {  },
        sku: {  },
      }
    }
  },
  data () {
    return {
      producto: {
        fields: {
          nombre: null,
          precio: null,
          sku: null
        }
      }
    }
  },
  computed: {
    nombreRules (val) {
      return [
        val => (this.$v.producto.fields.nombre.required) || 'Nombre es requerido.',
        val => (this.$v.producto.fields.nombre.maxLength) || 'Nombre no debe exceder los 50 dígitos.'
      ]
    },
    precioRules (val) {
      return [
        val => this.$v.producto.fields.precio.required || 'Precio es requerido.',
      ]
    },
    skuRules (val) {
      return [
        val => this.$v.producto.fields.sku.required || 'SKU es requerido.'
      ]
    }
  },
  beforeCreate () {
  },
  created () {
    this.fetchFromServer()
  },
  mounted () {},
  methods: {
    fetchFromServer () {
      // this.$q.loading.show()
      // api.get('/productos/options').then(({ data }) => {
      //   this.productosOptions = data.options
      //   this.$q.loading.hide()
      // })
    },
    createArea () {
      this.$v.producto.fields.$reset()
      this.$v.producto.fields.$touch()
      if (this.$v.producto.fields.$error) {
        this.$q.dialog({
          title: 'Error',
          message: 'Por favor, verifique las validaciones.',
          persistent: true
        })
        return false
      }
      this.$q.loading.show()
      const params = []
      params.nombre = { ...this.producto.fields }.nombre
      params.precio = { ...this.producto.fields }.precio
      params.sku = { ...this.producto.fields }.sku
      api.post('/productos', params).then(({ data }) => {
        this.$q.notify({
          spinner: QSpinnerGears,
          message: data.message.content,
          position: 'top',
          color: (data.result ? 'positive' : 'warning'),
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          timeout: 3000
        })
        if (data.result) {
          this.$q.loading.hide()
          this.$router.push('/areas')
        } else {
          this.$q.loading.hide()
        }
      })
    }
  }
}
</script>

<style>
</style>
