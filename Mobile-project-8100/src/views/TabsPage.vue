<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/library/main">
          <ion-icon aria-hidden="true" :icon="barChartOutline" />
          <ion-label>Library</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/library/booking">
          <ion-icon aria-hidden="true" :icon="bookOutline" />
          <ion-label>Room Booking</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/library/home">
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
</script>
