<template>
    <v-card>
        <v-card-text>
            <v-form>
                <v-text-field
                    v-model="amount"
                    label="Amount"
                    placeholder="Amount to recharge in LKR"
                    outlined
                >
                </v-text-field>
                <v-text-field
                    v-model="cardNumber"
                    label="Card Number"
                    placeholder="#### #### #### ####"
                    outlined
                >
                </v-text-field>
                <v-text-field
                    v-model="cardHolder"
                    label="Card Holder"
                    placeholder="Name on card"
                    outlined
                >
                </v-text-field>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
    data() {
        return {
            amount: '',
            cardNumber: '',
            cardHolder: '',
        };
    },
};
</script>