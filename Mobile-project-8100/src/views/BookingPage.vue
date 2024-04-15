<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Room Booking</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="!show">
        <BookingForm />
      </div>
      <div v-if="show">
        <ion-card>
          <img alt="A" src="/room_a.jpg" style="width: 100%; height: 400px;" />
          <ion-card-header>
            <ion-card-title>Room A</ion-card-title>
            <ion-card-subtitle>4 seats provided</ion-card-subtitle>
          </ion-card-header>
        </ion-card>

        <ion-card>
          <img alt="B" src="/room_b.jpg" style="width: 100%; height: 400px;" />
          <ion-card-header>
            <ion-card-title>Room B</ion-card-title>
            <ion-card-subtitle>6 seats provided</ion-card-subtitle>
          </ion-card-header>
        </ion-card>

        <ion-card>
          <img alt="C" src="/room_c.png" style="width: 100%; height: 400px;" />
          <ion-card-header>
            <ion-card-title>Room C</ion-card-title>
            <ion-card-subtitle>10 seats provided</ion-card-subtitle>
          </ion-card-header>
        </ion-card>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { ref } from 'vue'
import BookingForm from '../components/BookingForm.vue';

const show = ref(false)
</script>

<style scoped>
ion-card-title {
  --color: #2a73a1;
}
ion-card {
  --background: #e3e3e3;
}
</style>
