<template>
    <v-card flat outlined>
        <v-container>
            <v-row>
                <v-col>
                    <div class="d-flex align-center flex-grow-1 flex-wrap">
                        <div>
                            <img
                                v-if="isCredit"
                                class="mr-3"
                                src="@/assets/icons/up-green.png"
                                width="20px"
                            />
                            <img
                                v-else
                                class="mr-3"
                                src="@/assets/icons/down-red.png"
                                width="20px"
                            />
                        </div>
                        <div class="me-auto pe-2">
                            <h4 v-if="isCredit" class="font-weight-semibold">
                                Credit
                            </h4>
                            <h4 v-else class="font-weight-semibold">Debit</h4>
                            <span class="text-xs secondary--text"
                                >2010-12-24</span
                            >
                        </div>

                        <h4 class="font-weight-semibold secondary--text">
                            500 LKR
                        </h4>
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
    data() {
        return {
            isCredit: true,
        };
    },
};
</script>