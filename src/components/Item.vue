<template>
  <div class="q-card">
    <img src="https://picsum.photos/200" />
    <!-- <div class="q-img" style="background-image: url('https://picsum.photos/200')"> -->
    <!-- </div> -->
    <div class="q-card-section">
      <div class="row no-wrap item-center">
        <div class="col text-primary">
          <div class="titulo">
            {{title}}
          </div>
        </div>
      </div>
    </div>
    <div class="q-pt-none q-card__section q-card__section--vert" align="center"><strong>Precio: ${{precio}} / Pza.</strong>
      <hr role="separator" aria-orientation="horizontal" class="q-separator q-separator q-separator--horizontal">
      <div class="row">
      <div class="text-subtitle1 col-6">
        Disponibles: {{stock}}
      </div>
      <div class="text-subtitle1 col-3">
        SKU: {{sku}}
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    defineComponent
  } from 'vue'

  export default defineComponent({
    name: 'ItemVue',
    props: {
      title: {
        type: String,
        required: true
      },

      img: {
        type: String,
        default: ''
      },

      stock: {
        type: String,
        default: '0'
      },

      precio: {
        type: String,
        default: '$ 0.0'
      }
    }
  })

</script>
<style scoped>
  .titulo {
    font-size: 16px;
    line-height: 22px;
    height: 80px;
  }

</style>
