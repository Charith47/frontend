<template>

 <v-container>
     <v-card flat class="text-xs ma-3">
        <v-card-text>
        <div class="id">Subscription ID : {{id}}</div> 
        <div class="route">Route : {{start}} to {{end}}</div>
        <div class="issuedDate">Issued Date : {{issuedDate}}</div>
        <div class="expiryDate">Expiry Date : {{expiryDate}}</div>
            <div class="price">LKR {{price}}</div>
    </v-card-text>
    <v-card-actions>
        <v-btn flat color="light-grey">
            Select subcription
        </v-btn>
    </v-card-actions>
    </v-card>
 </v-container>
    
</template>

<script>

export default ({
    props:['id','start','end','issuedDate','expiryDate','price'],
    name:'SubscriptionCard'
   
})
</script>

<style scoped>
.subscriptionCard {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>