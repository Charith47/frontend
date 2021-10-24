<template>
    <v-card flat outlined class="mb-2"  @click="ebuwa">
        <v-container>
            <v-row>
                <v-col>
                    <div class="d-flex align-center flex-grow-1 flex-wrap">
                        <div>
                            <v-icon large class="pr-2">mdi-bus</v-icon>
                        </div>
                        <div class="me-auto pe-2">
                            <h4 class="font-weight-semibold">
                                Kottawa - Mattegoda
                            </h4>

                            <v-chip dark color="green" class="mr-2" x-small>{{
                                route
                            }}</v-chip>
                            <v-chip dark color="green" class="" x-small>{{
                                type
                            }}</v-chip>
                            <h1></h1>
                            <span class="text-xs secondary--text">{{
                                new Date(date).toLocaleDateString(
                                    'en-GB',
                                    this.options
                                )
                            }}</span>
                        </div>

                        <h2 class="font-weight-semibold secondary--text">
                            {{ price }} LKR
                        </h2>
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
    name: 'RecentRide',
    data() {
        return {
            start: 'Kottawa',
            destination: 'Pitakotuwa',
            route: '138-2',
            type: 'Intercity',
            price: '54',
            date: new Date(),
        };
    },
    methods:{
        ebuwa(){
            // create req to buy ticket ?
            console.log('ebuwa')
        }
    },
    computed: {},
};
</script>