<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="mt-4">
      <h2>Login</h2>
      <v-form ref="loginForm">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
        ></v-text-field>
      </v-form>
      <v-alert dense outlined type="error" v-if="loginError">
        Please confirm login details and retry
      </v-alert>
      <v-row>
        <v-col cols="4">
          <v-btn
            :loading="loginLoading"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Login
          </v-btn>
        </v-col>
        <v-col class="mt-2">
          <nuxt-link to="/register">Register >></nuxt-link>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
//import { login } from "../plugin/api";
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      loginError: false,
      loginLoading: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    async submit() {
      if(this.$refs.loginForm.validate())
      {
        this.loginLoading = true
        try {
          const response = await this.$axios.$post('/login', {
            email: this.email,
            password: this.password
          })
          if(response.status === 200)
          {
            const { data } = response
            await localStorage.setItem('access_token', data.access_token)
            this.setAuthentication(true)
            await this.$router.push('/')
          } else {
            this.loginError = true
          }
          this.loginLoading = false
        } catch (error) {
          console.error(error)
          this.loginError = true
        }
      }
    },
    ...mapMutations({
      setAuthentication: 'setAuthentication',
    })
  },
  async mounted() {
    if(this.isAuthenticated)
    {
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
