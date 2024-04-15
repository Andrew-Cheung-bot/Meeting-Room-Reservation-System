<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Room Booking</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="login">
        <BookingForm @callBack="Back" />
      </div>
      <div v-if="!login">
        <ion-card @click="bookRoom('A')">
          <img alt="A" src="/room_a.png" style="width: 100%; height: 400px;" />
          <ion-card-header>
            <ion-card-title>Room A</ion-card-title>
            <ion-card-subtitle>4 seats provided</ion-card-subtitle>
          </ion-card-header>
        </ion-card>

        <ion-card @click="bookRoom('B')">
          <img alt="B" src="/room_b.jpg" style="width: 100%; height: 400px;" />
          <ion-card-header>
            <ion-card-title>Room B</ion-card-title>
            <ion-card-subtitle>6 seats provided</ion-card-subtitle>
          </ion-card-header>
        </ion-card>

        <ion-card @click="bookRoom('C')">
          <img alt="C" src="/room_c.jpg" style="width: 100%; height: 400px;" />
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
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import BookingForm from '../components/BookingForm.vue';

const router = useRouter()
const route = useRoute()

const login = ref(false)

function bookRoom(room_number) {
  login.value = true;
  router.push({ path: '/library/booking', query: { room_id: room_number} });
}

function Back(back) {
  // login.value = back;
  login.value = false;
  router.back();
}

watch(() => route.query, (newValue, oldValue) => {
  if (newValue.fromstatus == '1') {
    login.value = true;
    console.log(login.value);
  }
}, { immediate: true })
</script>

<style scoped>
ion-card-title {
  --color: #2a73a1;
}

ion-card {
  --background: #e3e3e3;
}
</style>
