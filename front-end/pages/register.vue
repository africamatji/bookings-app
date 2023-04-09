<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="mt-4">
      <h2>Register</h2>
      <v-form ref="registerForm">
        <v-text-field
          v-model="name"
          :rules="requiredRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="requiredRules"
          label="Password"
          type="password"
          required
        ></v-text-field>

        <v-text-field
          v-model="c_password"
          :rules="passwordConfirmRule"
          label="Confirm Password"
          type="password"
          required
        ></v-text-field>
      </v-form>
      <v-btn
        color="success"
        class="mr-4"
        :loading="registerLoading"
        @click="submit"
      >
        Register
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { register, login } from "../plugin/api";
import { mapMutations } from "vuex";

export default {
  name: "register",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      c_password: null,
      registerLoading: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      requiredRules: [
        v => !!v || 'Field is required',
      ],
      passwordConfirmRule: [
        v => !!v || 'Field is required',
        v => v === this.password || 'Password mismatch',
      ],
    }
  },
  methods: {
    async submit() {
      if(this.$refs.registerForm.validate())
      {
        this.registerLoading = true
        const { name, email, password } = this
        try{
          const payload = {
            name,
            email,
            password,
          };
          const response = await register(payload)
          if(response.status === 200) {
            const loginPayload = {
              email,
              password
            }
            const { data } = await login(loginPayload)
            await localStorage.setItem('access_token', data.access_token)
            this.setAuthentication(true)
            await this.$router.push('/')
          }
        }catch (e) {
          console.error(e)
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
