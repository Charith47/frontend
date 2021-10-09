<template>
<div class="container">
    <h1>Tickets</h1>
    <p>
      Select one of your tickets to start your ride
    </p>
     <v-container>
          <v-row class="d-flex flex-column">
            <TicketCard 
            v-for="ticket in tickets" 
              :key="ticket.id"
              :id="ticket.id"
              :start="ticket.start"
              :end="ticket.end"
              :price="ticket.price"          
            >
            </TicketCard>
            <h1>Subscriptions</h1>
    <p>
      Select one of your subcriptions
    </p>

            <SubscriptionCard
            v-for="subscription in subscriptions"
            :key="subscription.id"
            :id="subscription.id"
            :start="subscription.start"
            :end="subscription.end"
            :issuedDate="subscription.issuedDate"
            :expiryDate="subscription.expiryDate"
            :price="subscription.price"
            >
            </SubscriptionCard>
           

        </v-row>
    </v-container> 
     
</div>
 
</template>

<script>
 
 import TicketCard from '../components/TicketCard.vue'
 import SubscriptionCard from '../components/SubscriptionCard.vue'

  export default {
    components:
    {
      TicketCard,
      SubscriptionCard
    },  
   data()
    {
        return {
            tickets : [
               { id: 1 ,start : 'Ratmalana', end : 'Colombo', price : 100},
               { id: 2 ,start : 'Galle', end : 'Colombo', price : 200}, 
               { id: 3 ,start : 'Nugegoda', end : 'Dehiwala', price : 300}, 
               { id: 4 ,start : 'Matara', end : 'Galle', price : 400},  
            ]
            ,

             subscriptions : [
               { id: 2 ,start : 'Ratmalana', end : 'Colombo',issuedDate : '02-03-2020', expiryDate :'02-04-2020' , price : 200}, 
               { id: 1 ,start : 'Galle', end : 'Colombo',issuedDate : '01-03-2020', expiryDate : '01-04-2020' , price: 100},
               { id: 3 ,start : 'Nugegoda', end : 'Dehiwala',issuedDate : '04-03-2020', expiryDate : '03-04-2020' , price: 300}, 
               { id: 4 ,start : 'Matara', end : 'Galle',issuedDate : '06-03-2020', expiryDate : '06-04-2020', price : 400},  
            ]
        }
    },
      
    name: 'Tickets',
  }
</script>
