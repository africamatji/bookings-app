<template>
  <v-row justify="center" align="center">
    <div class="text-center">
      <add-dialog ref="addDialogRef" @appendBookingList="appendBookingList"/>
    </div>
    <v-col cols="12" md="8" sm="10">
      <v-card>
        <v-card-title class="headline">
          <v-row>
            <v-col class="d-flex justify-end">
              <v-btn
                color="primary"
                nuxt
                @click="addBooking"
                rounded
              >
                Add Booking
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn-toggle rounded v-model="alignment">
                <v-btn @click="allBookings">
                  All bookings
                </v-btn>
                <v-btn @click="filterBookings('past')">
                  Past bookings
                </v-btn>
                <v-btn @click="filterBookings('future')">
                  Future bookings
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <loaders v-if="isLoading"/>
          <template v-else>
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
          </template>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { filterBookings, listBookings } from "../plugin/api";
import { mapGetters } from "vuex";
import Loaders from "@/components/Loaders.vue";
import AddDialog from "@/components/AddDialog.vue";

export default {
  name: 'IndexPage',
  components: { Loaders, AddDialog },
  data() {
    return {
      bookings: null,
      isLoading: true,
      alignment: 0,
      dialog: true,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    addBooking() {
      this.$refs.addDialogRef.toggleDialog(true)
    },
    async filterBookings(type) {
      this.isLoading = true
      try {
        const { data } = await filterBookings(type)
        this.isLoading = false
        this.bookings = data.bookings
      } catch (error) {
        console.error(error)
      }
    },
    async allBookings() {
      try {
        const { data } = await listBookings()
        this.isLoading = false
        this.bookings = data.bookings
      } catch (error) {
        console.error(error)
      }
    },
    appendBookingList(data) {
      this.bookings.push(data)
    },
  },
  async mounted() {
    if(!this.isAuthenticated)
    {
      //await this.$router.push('/login');
    }
    await this.allBookings()
  }
}
</script>
