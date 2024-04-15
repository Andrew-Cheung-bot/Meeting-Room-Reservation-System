<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="main" href="/library/main" @click="redirectToMain">
          <ion-icon aria-hidden="true" :icon="barChartOutline" />
          <ion-label>Library</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="booking" href="/library/booking" @click="redirectToBooking">
          <ion-icon aria-hidden="true" :icon="bookOutline" />
          <ion-label>Room Booking</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="home" href="/library/home" @click="redirectToHome">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { bookOutline, homeOutline, barChartOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

function redirectToBooking() {
  router.push({ path: '/library/booking' });
}
function redirectToMain() {
  router.push({ path: '/library/main' });
}
function redirectToHome() {
  router.push({ path: '/library/home' });
}
</script>
