<template>
    <v-container>
        <h2>Your Address</h2>

        <vue-google-autocomplete
            ref="address"
            id="map"
            types="bus_station"
            classname="transit_station"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            country="lk"
        >
        </vue-google-autocomplete>

        <span>{{ address }}</span>
    </v-container>
</template>

<script>
/* eslint-disable no-unused-vars */
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    components: { VueGoogleAutocomplete },
    data: function () {
        return {
            address: '',
        };
    },

    mounted() {
        this.$refs.address.focus();
    },

    methods: {
        getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData;
        },
    },
};
/* eslint-enable no-unused-vars */
</script>