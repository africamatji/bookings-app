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
        @click="submit"
      >
        Register
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { register } from "../plugin/api";

export default {
  name: "register",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      c_password: null,
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
        const { name, email, password } = this
        try{
          const payload = {
            name,
            email,
            password,
          };
          const { data } = await register(payload)
        }catch (e) {
          console.error(e)
        }
      }
    }
  },
}
</script>

<style scoped>

</style>
