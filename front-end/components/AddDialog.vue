<template>
  <v-dialog v-model="dialog" width="500" @>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Add booking
      </v-card-title>

      <v-card-text>
        <v-form ref="addForm">
          <v-textarea v-model="reason" :rules="requiredRules" label="Enter reason" rows="2" />
          <v-date-picker v-model="date" :rules="requiredRules" :landscape="true" />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="primary"
          @click="addBooking"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { addBooking } from "../plugin/api";

export default {
  name: "AddDialog",
  data() {
    return {
      dialog: false,
      date: null,
      reason: null,
      requiredRules: [
        v => !!v || 'Reason is required',
      ],
    }
  },
  methods: {
    toggleDialog(value) {
      this.dialog = value
    },
    async addBooking() {
      if(this.$refs.addForm.validate())
      {
        const data = {
          'reason': this.reason,
          'date': this.date,
        };
        try {
          const response = await addBooking(data)
          console.log('response', response)
          this.dialog = false;
        } catch (e) {
          console.error(e)
        }
      }
    }
  },
}
</script>

<style scoped>

</style>
