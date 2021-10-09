<template>

 <v-container>
     <v-card flat class="text-xs ma-3">
        <v-card-text>
        <div class="id">Ticket ID : {{id}}</div>
        <div class="route">Route : {{start}} to {{end}}</div>
            <div class="price">Tciket price : LKR {{price}}</div>
    </v-card-text>
    <v-card-actions>
        <v-btn flat color="light-grey">
            Select Route
        </v-btn>
    </v-card-actions>
    </v-card>
 </v-container>
    
</template>

<script>

export default ({
    props:['id','start','end','price'],
    name:'TicketCard'
   
})
</script>

<style scoped>
.ticketCard {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>