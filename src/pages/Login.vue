<template>
<q-layout>
  <q-page-container style="background: white;">
    <q-page>
      <div class="row justify-center" style="padding-top: 5%;">
          <img src="https://v0-17.quasar-framework.org/images/quasar-logo-big.png" alt="Iniciar Sesión" width="300">
        </div>
        <div class="row justify-center">
          <div class="col-sm-4 q-pa-md">
            <div class="row q-col-gutter-xs ">
              <div class="col-xs-12 col-sm-12 loginstyle">
                <q-input v-model="email" filled label="Correo electrónico" type="email" v-on:keyup.enter="login()" />
              </div>
              <div class="col-xs-12 col-sm-12 loginstyle">
                <q-input v-model="password" filled label="Contraseña" :type="isPwd ? 'password' : 'text'" v-on:keyup.enter="login()">
                </q-input>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 q-mt-sm pull-right">
                <q-btn color="primary" label="Iniciar sesión" :loading="loading" @click="login()" />
              </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
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
          // axios.post('https://localhost:44308/api/account/login', params).then(r=> {
          //     let data = JSON.stringify(r.data);
          //           Cookies.set('.quasarCookie', data, {
          //               secure: true
          //               })
          //       })
                    this.$router.push({ path: 'home' })

      }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
