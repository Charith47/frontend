<template>
	<v-container>
		<v-card flat class="text-xs ma-3">
			<v-card-text>
				<div class="id">{{ id }}</div>
				<div class="route">{{ start }} to {{ end }}</div>
				<div class="price">{{ price }} LKR</div>
			</v-card-text>
			<v-card-actions>
				<v-btn color="light-grey" @click="isSelected = !isSelected" :style="isSelected ? 'border: 1px solid red;' : null">
					Select Route
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
export default {
	props: ['id', 'start', 'end', 'price'],
	data() {
		return {
			isSelected: false,
		};
	},
	name: 'TicketCard',
};
</script>
