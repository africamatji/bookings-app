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
      <v-row>
        <v-col cols="4">
          <v-btn
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
import { login, register } from "../plugin/api";
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
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
        try {
          const { data } = await login({
            email: this.email,
            password: this.password
          })
          await localStorage.setItem('access_token', data.access_token);
          this.setAuthentication(true);
          await this.$router.push('/');
        } catch (error) {
          console.error(error)
          this.error = 'Login failed'
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
      await this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
