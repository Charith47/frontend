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
                            <v-icon>{{ icons.mdiClose }}</v-icon>
                        </v-btn>
                        <v-toolbar-title>Map </v-toolbar-title>
                    </v-toolbar>

                    <iframe title="bus route map" :src="mapSrc" width="414" height="673"> </iframe>
                </v-card>
            </v-dialog>
        </v-container>
    </v-card>
</template>

<style scoped></style>

<script>
import { mdiClose } from '@mdi/js';

export default {
    props: ['ticketId', 'start', 'destination', 'route', 'price', 'type'],
    name: 'TicketAfter',
    data() {
        return {
            mapSrc: '',
            mapDialog: false,
            options: {
                hour: 'numeric',
                minute: 'numeric',
            },
            icons: {
                mdiClose,
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
    beforeMount() {
        const urlMap = new Map();

        urlMap.set(
            '138-2',
            'https://www.google.com/maps/d/embed?mid=1CX5ygbufqLr1KLmssK5aN5BoPGfUWjtP'
        );
        urlMap.set(
            '255',
            'https://www.google.com/maps/d/embed?mid=1-i243QRnijLFbG_WTJHXvQUC6TLwjGer'
        );
        urlMap.set(
            '69-122',
            'https://www.google.com/maps/d/embed?mid=1yXHTZpT3m1nS5zBS3jN9h72uEwn1sJVs'
        );
        urlMap.set(
            '01',
            'https://www.google.com/maps/d/embed?mid=1Tbgw9KkyXb0Pmad5LyNyY76CXgTxA2O5'
        );

        this.mapSrc = urlMap.get(this.route);
    },
};
</script>
