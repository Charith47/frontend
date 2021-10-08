<template>
	<div class="container">
		<h1>Tickets</h1>
		<p>
			Select one of your tickets to start your ride
		</p>
		<v-container>
			<v-row class="d-flex flex-column">
				<TicketCard
					v-for="ticket in tickets"
					:key="ticket.id"
					:id="ticket.id"
					:start="ticket.start"
					:end="ticket.end"
					:price="ticket.price"
				></TicketCard>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import TicketCard from '../components/TicketCard.vue';

export default {
	components: {
		TicketCard,
	},

	data() {
		return {
			selected:[],
			tickets: [
				{ id: 1, start: 'Ratmalana', end: 'Colombo', price: 100 },
				{ id: 2, start: 'Galle', end: 'Colombo', price: 200 },
				{ id: 3, start: 'Nugegoda', end: 'Dehiwala', price: 300 },
				{ id: 4, start: 'Matara', end: 'Galle', price: 400 },
			],
		};
	},
	name: 'Tickets',
};
</script>
