<template>
  <v-row>
    <v-col>
      <p>Login</p>
      <v-form ref="loginForm">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :counter="10"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>
      </v-form>
        <v-btn
          color="success"
          class="mr-4"
          @click="submit"
        >
          Login
        </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { login, register } from "../plugin/api";
import { mapMutations } from 'vuex';

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
  },
  methods: {
    async submit() {
      //this.$store.commit('setAuthentication', true)
      if(this.$refs.loginForm.validate())
      {
        try {
          const response = await login({
            email: this.email,
            password: this.password
          })
          await localStorage.setItem('access_token', response.data.access_token);
          this.setAuthentication(true);
          this.$router.push('/');
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
}
</script>

<style scoped>

</style>
