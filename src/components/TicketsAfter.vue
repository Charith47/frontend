<template>
    <v-card flat outlined class="mb-2">
        <v-container>
            <v-row>
                <v-col>
                    <div class="d-flex align-center flex-grow-1 flex-wrap">
                        <div class="me-auto pe-2">
                            <h4 class="font-weight-semibold">
                                {{ start }} - {{ destination }}
                            </h4>

                            <v-chip dark color="green" class="mr-2" x-small>{{
                                route
                            }}</v-chip>
                            <v-chip dark color="green" class="" x-small>{{
                                type
                            }}</v-chip>
                            <h1></h1>
                            <span class="text-xs secondary--text">
                                {{ price }} LKR
                            </span>
                        </div>
                        <v-card-actions class="px-0">
                            <v-btn small @click="viewMap"> View Map </v-btn>
                            <v-btn small color="primary" @click="useTicket">
                                Use Ticket
                            </v-btn>
                        </v-card-actions>
                    </div>
                </v-col>
            </v-row>

            <!-- map dialog -->
            <v-dialog
                v-model="mapDialog"
                fullscreen
                transition="dialog-bottom-transition"
            >
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="mapDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Map </v-toolbar-title>
                    </v-toolbar>

                    <iframe
                        src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyD2J3UsrMSkJPfIea40su-EWjeCRUgGsKA&origin=Mattegoda+Bus+Station,+Polgasowita&destination=Pettah+Private+Bus+Stand,+Colombo&avoid=tolls|highways&mode=transit"
                        width="414"
                        height="673"
                    >
                    </iframe>
                </v-card>
            </v-dialog>
        </v-container>
    </v-card>
</template>

<style scoped>
</style>

<script>
export default {
    props: ['ticketId', 'start', 'destination', 'route', 'price', 'type'],
    name: 'TicketAfter',
    data() {
        return {
            mapDialog: false,
            options: {
                hour: 'numeric',
                minute: 'numeric',
            },
            date: new Date(),
        };
    },
    methods: {
        useTicket() {
            this.$store.commit('selectTicket', [
                this.ticketId,
                `${this.start} - ${this.destination}`,
            ]);
        },
        viewMap() {
            this.mapDialog = true;
            console.log('view map');
        },
    },
    computed: {},
};
</script>