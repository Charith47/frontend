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

        <v-btn dark color="primary" block class="mb-4"> Search </v-btn>
        <v-divider></v-divider>

        <h2 class="pt-2 font-weight-medium primary--text">Recommended rides</h2>
        <p class="secondary--text">Based on your recent activity</p>
        <RecentRide></RecentRide>
    </v-container>
</template>

<style scoped></style>

<script>
import RecentRide from '../components/RecentRide.vue';
export default {
    components:{
        RecentRide
    },
    name: 'Home',
    data() {
        return {
            start: '',
            destination: '',
        };
    },
    methods: {},
    mounted() {},
};
</script>
