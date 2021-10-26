<template>
    <v-container>
        <h1 class="font-weight-medium primary--text">Tickets</h1>
        <p class="secondary--text">
            Select one of your tickets to start your ride
        </p>

        <v-alert
            v-if="allTickets.length == 0 && !this.fetchError"
            border="left"
            color="blue"
            dense
            outlined
            type="info"
        >
            No tickets to show
        </v-alert>

        <TicketAfter
            v-else
            v-for="ticket in allTickets"
            :key="ticket.ticketId"
            :ticketId="ticket.ticketId"
            :start="ticket.start"
            :destination="ticket.destination"
            :route="ticket.route"
            :price="ticket.price"
            :type="ticket.type"
        >
        </TicketAfter>

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
    </v-container>
</template>

<script>
import TicketAfter from '../components/TicketsAfter.vue';

export default {
    async mounted() {
        try {
            await this.$store.dispatch('getAllTickets');
        } catch (error) {
            console.log(error);
            this.fetchError = 'Error fetching tickets';
        }
    },
    components: {
        TicketAfter,
    },
    data() {
        return {
            fetchError: false,
        };
    },
    computed: {
        allTickets() {
            return this.$store.state.allTickets;
        },
    },
    name: 'Tickets',
};
</script>
