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
            console.log('view map');
        },
    },
    computed: {},
};
</script>