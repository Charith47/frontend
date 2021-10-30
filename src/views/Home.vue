<template>
    <v-container>
        <h1 class="font-weight-medium primary--text">Ready to ride?</h1>
        <p class="secondary--text">Enter your ride details 🚍</p>
        <v-text-field
            v-model="start"
            label="Start"
            dense
            placeholder="Enter your location"
            outlined
        >
        </v-text-field>
        <v-text-field
            v-model="destination"
            label="Destination"
            dense
            placeholder="Where to?"
            outlined
        >
        </v-text-field>

        <v-btn
            dark
            color="primary"
            block
            class="mb-4"
            :loading="isLoading"
            @click="searchRides"
        >
            Search
        </v-btn>
        <v-divider></v-divider>

        <h2 class="pt-2 font-weight-medium primary--text">Recommended rides</h2>
        <p class="secondary--text">Based on your recent activity</p>

        <!--on no recent tickets-->
        <v-alert
            v-if="recentTickets.length == 0 && !this.fetchError"
            border="left"
            color="blue"
            dense
            outlined
            type="info"
        >
            No recent activity
        </v-alert>

        <!--on ticket fetch error-->
        <v-alert
            v-if="fetchError"
            border="left"
            color="red"
            dense
            outlined
            type="error"
        >
            {{ fetchError }}
        </v-alert>

        <RecentRide
            v-for="ticket in recentTickets"
            :key="ticket.ticketId"
            :route="ticket.route"
            :start="ticket.start"
            :destination="ticket.destination"
            :price="ticket.price"
            :type="ticket.type"
        ></RecentRide>

        <!--Search result dialog-->
        <v-dialog
            v-model="dialog"
            fullscreen
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>{{ icons.mdiClose }}</v-icon>
                    </v-btn>
                    <v-toolbar-title>Search Results</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text>
                            {{ this.getWalletAmount }} LKR
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-card flat color="trnasparent" class="mx-2 my-4">
                    <!--on no recent tickets-->
                    <v-alert
                        v-if="searchResults.length == 0"
                        border="left"
                        color="blue"
                        dense
                        outlined
                        type="info"
                    >
                        No results for your query
                    </v-alert>

                    <RecentRide
                        v-for="ticket in searchResults"
                        :key="ticket.routeNumber"
                        :route="ticket.routeNumber"
                        :start="ticket.start"
                        :destination="ticket.destination"
                        :price="ticket.price"
                        :type="ticket.type"
                    ></RecentRide>
                </v-card>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style scoped></style>

<script>
import axios from 'axios';
import { mdiClose } from '@mdi/js';
import RecentRide from '../components/TicketsBefore.vue';

const API_ENDPOINT = process.env.VUE_APP_API;

export default {
    async mounted() {
        try {
            await this.$store.dispatch('getLatestTickets');
        } catch (error) {
            console.log(error);
            this.fetchError = 'Error fetching recent tickets';
        }
    },

    components: {
        RecentRide,
    },
    name: 'Home',
    data() {
        return {
            fetchError: '',
            isLoading: false,
            dialog: false,
            start: '',
            destination: '',
            searchResults: [],
            icons: {
                mdiClose,
            },
        };
    },

    computed: {
        getWalletAmount() {
            return this.$store.state.walletAmount;
        },
        recentTickets() {
            return this.$store.state.latestTickets;
        },
    },

    methods: {
        searchRides() {
            this.isLoading = true;
            axios
                .post(`${API_ENDPOINT}/tickets/search`, {
                    start: this.start.trim(),
                    destination: this.destination.trim(),
                })
                .then(response => {
                    this.isLoading = false;
                    this.dialog = true;
                    this.searchResults = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
};
</script>
