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

        <v-btn dark color="primary" block class="mb-4" @click="searchRides"> Search </v-btn>
        <v-divider></v-divider>

        <h2 class="pt-2 font-weight-medium primary--text">Recommended rides</h2>
        <p class="secondary--text">Based on your recent activity</p>
        <RecentRide></RecentRide>

        <!--Search result dialog-->
        <v-dialog
            v-model="dialog"
            fullscreen
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
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
                    <RecentRide></RecentRide>
                </v-card>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style scoped></style>

<script>
import RecentRide from '../components/TicketsBefore.vue';
export default {
    components: {
        RecentRide,
    },
    name: 'Home',
    data() {
        return {
            dialog: false,
            start: '',
            destination: '',
            list: ['Mattegoda', 'Kottawa'],
        };
    },
    computed: {
        getWalletAmount() {
            return this.$store.state.walletAmount;
        },
    },
    methods: {
        searchRides(){
            
        }
    },
    mounted() {},
};
</script>
