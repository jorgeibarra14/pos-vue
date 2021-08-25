<template>
<q-layout>
  <q-page class="bg-light-green window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Iniciar Sesión</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" label="Correo" />
              <q-input square filled clearable v-model="password" type="password" label="Contraseña" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" @click="login()" size="lg" class="full-width" label="Iniciar Sesión" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <!-- <p class="text-grey-6">Not reigistered? Created an Account</p> -->
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  </q-layout>
</template>

<script>
import axios from 'axios'
import { Cookies } from 'quasar'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
      login() {
          let params = {
              email: this.email,
              password: this.password
          }
          axios.post('https://localhost:44308/api/account/login', params).then(r=> {
              let data = JSON.stringify(r.data);
                    Cookies.set('.quasarCookie', data, {
                        secure: true
                        })
                    this.$router.push({ path: 'home' })          
                })
      }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>