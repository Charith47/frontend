<template>
    <v-container class="d-flex flex-column">
        <span>
            <h1 class="pt-2 font-weight-medium primary--text">
                Scan QR code
            </h1></span
        >
        <p class="secondary--text mb-0">
            Scan the QR code on the bus to start your ride.
        </p>

        <v-row>
            <v-col>
                <v-alert
                    v-if="error"
                    border="top"
                    color="red"
                    dismissible
                    dense
                    type="error"
                    >{{ error }}</v-alert
                >
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-alert
                    v-if="loading"
                    border="left"
                    color="blue"
                    dense
                    outlined
                    type="info"
                >
                    Camera loading...
                </v-alert>

                <qrcode-stream @decode="onDecode" @init="onInit" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-alert
                    v-if="result"
                    border="top"
                    color="green"
                    dismissible
                    type="success"
                    >{{ result }}</v-alert
                >
            </v-col>
        </v-row>

        <!-- invalid QR code -->
        <v-dialog v-model="errorDialog" persistent>
            <v-card>
                <v-card-title class="text-h6"> Invalid QR code! </v-card-title>
                <v-card-text>
                    This is not a valid QR code from a bus.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error darken-1"
                        text
                        @click="errorDialog = false"
                    >
                        Okay
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Success dialog -->
        <v-dialog v-model="successDialog" persistent>
            <v-card>
                <v-card-title class="text-h6">
                    Verification successful!
                </v-card-title>
                <v-card-text>
                    Your ticket has been verified. Enjoy the ride!
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="success darken-1"
                        text
                        @click="successDialog = false"
                    >
                        Okay
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
    name: 'Scan',
    components: { QrcodeStream },

    data() {
        return {
            errorDialog: false,
            successDialog: false,
            validRoutes: ['138-2', '255', '69-122', '01'],
            loading: false,
            result: '',
            error: '',
        };
    },

    methods: {
        onDecode(result) {
            if (!this.validRoutes.includes(result)) {
                this.errorDialog = true;
            } else {
                axios
                    .post('http://localhost:5000/qr/verify', {
                        ticketId: this.selectedTicket[0],
                        qrRoute: result,
                    })
                    .then(() => {
                        this.successDialog = true;
                        this.result = `${result} | ${this.selectedTicket[1]}`;
                        this.$store.commit('selectTicket', []);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },

        async onInit(promise) {
            this.loading = true;
            try {
                await promise;
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error =
                        'ERROR: you need to grant camera access permission';
                } else if (error.name === 'NotFoundError') {
                    this.error = 'ERROR: no camera on this device';
                } else if (error.name === 'NotSupportedError') {
                    this.error =
                        'ERROR: secure context required (HTTPS, localhost)';
                } else if (error.name === 'NotReadableError') {
                    this.error = 'ERROR: is the camera already in use?';
                } else if (error.name === 'OverconstrainedError') {
                    this.error = 'ERROR: installed cameras are not suitable';
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error =
                        'ERROR: Stream API is not supported in this browser';
                } else if (error.name === 'InsecureContextError') {
                    this.error =
                        'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
                } else {
                    this.error = `ERROR: Camera error (${error.name})`;
                }
            } finally {
                this.loading = false;
            }
        },
    },
    computed: {
        selectedTicket() {
            return this.$store.state.selectedTicket;
        },
    },
};
</script>
