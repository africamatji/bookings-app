<template>
  <v-row v-if="!isLoading" justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline" v-if="bookings.length > 0">
          <v-btn-toggle rounded v-model="alignment">
            <v-btn>
              All bookings
            </v-btn>
            <v-btn>
              Past bookings
            </v-btn>
            <v-btn>
              Future bookings
            </v-btn>
          </v-btn-toggle>
        </v-card-title>
        <v-card-text>
          <p v-if="bookings.length === 0">
            (0) bookings
          </p>
          <template v-else>
            <v-list v-for="(booking, i) in bookings">
              <v-list-item :key="`item-${i}`">
                <v-list-item-content>
                  <v-list-item-title class="pb-2">
                    {{ booking.reason }}
                  </v-list-item-title>
                  <v-divider></v-divider>
                </v-list-item-content>
                <v-list-item-action>
                  <v-chip color="orange">
                    {{ booking.date }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </template>

        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            @click="addBooking"
          >
            Add Booking
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { list } from "../plugin/api";
import { mapGetters } from "vuex";

export default {
  name: 'IndexPage',
  data() {
    return {
      bookings: null,
      isLoading: true,
      alignment: 0
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    addBooking() {
      console.log('addBooking')
    }
  },
  async mounted() {
    if(!this.isAuthenticated)
    {
      await this.$router.push('/login');
    }

    try {
      const { data } = await list()
      console.log('response', data.bookings)
      this.isLoading = false
      this.bookings = data.bookings
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
