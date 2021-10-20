<template>
  <v-container>
    <span>
      <h1 class="pt-2 font-weight-medium primary--text">
        Hi, {{ name }}!
      </h1></span
    >
    <p class="secondary--text">Let's check out your wallet</p>

    <v-card flat outlined class="my-4 px-4 py-4">
      <h4 class="font-weight-regular secondary--text">Balance</h4>
      <span
        ><h1 class="font-weight-medium secondary--text">223.l4 LKR</h1></span
      >
      <v-btn outlined block color="primary">RECHARGE</v-btn>
    </v-card>

    <v-divider></v-divider>
    <h2 class="pt-4 font-weight-medium primary--text">History</h2>
    <p class="secondary--text">Here is the latest transactions you performed</p>

    <TransactionCard
      v-for="transaction in transactions"
      :isCredit="transaction.isCredit"
      :key="transaction.num"
      :num="transaction.num"
      :type="transaction.type"
      :date="transaction.date"
      :amount="transaction.amount"
    >
    </TransactionCard>
  </v-container>
</template>

<script>
import TransactionCard from "../components/TransactionCard.vue";
export default {
  components: {
    TransactionCard,
  },
  data() {
    return {
      name: "Charith",
      transactions: [
        {
          num: 1,
          type: "credit()",
          date: "04.08.2020",
          amount: 100,
          isCredit: true,
        },
        {
          num: 2,
          type: "debit()",
          date: "01.02.2020",
          amount: 200,
          isCredit: false,
        },
        {
          num: 3,
          type: "credit()",
          date: "05.09.2020",
          amount: 350,
          isCredit: true,
        },
      ],
    };
  },
  name: "Wallet",
};
</script>
