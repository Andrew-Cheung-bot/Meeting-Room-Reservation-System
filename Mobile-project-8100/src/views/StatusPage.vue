<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Library Status</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <div style="margin-top:8px;margin-bottom:2px;">
        <ion-datetime-button datetime="datetime">
        </ion-datetime-button>

        <ion-modal :keep-contents-mounted="true">
          <ion-datetime id="datetime" presentation="date" v-model="res.date" @ion-change="changeDate">
          </ion-datetime>
        </ion-modal>
      </div>

      <ion-grid :fixed="true">
        <ion-row>
          <ion-col class="time-col head-col">Time line</ion-col>
          <ion-col class="head-col">roomA<br>(4-seats)</ion-col>
          <ion-col class="head-col">roomB<br>(6-seats)</ion-col>
          <ion-col class="head-col">roomC<br>(10-seats)</ion-col>
        </ion-row>
        <ion-row v-for="item in res.data" :key="item.time">
          <ion-col class="time-col">
            {{ item.time }}
          </ion-col>

          <ion-col v-if="(item.roomA) == 'Reserved'" class="reserved-col">
            <ion-icon aria-hidden="true" :icon="closeCircleOutline" /><br>
            Reserved
          </ion-col>
          <ion-col v-else class="empty-col" @click="booking(item.time,'A')">
            <ion-icon aria-hidden="true" :icon="checkmarkCircleOutline" /><br>
            Apply Now
          </ion-col>

          <ion-col v-if="(item.roomB) == 'Reserved'" class="reserved-col">
            <ion-icon aria-hidden="true" :icon="closeCircleOutline" /><br>
            Reserved
          </ion-col>
          <ion-col v-else class="empty-col" @click="booking(item.time, 'B')">
            <ion-icon aria-hidden=" true" :icon="checkmarkCircleOutline" /><br>
          Apply Now
          </ion-col>

          <ion-col v-if="(item.roomC) == 'Reserved'" class="reserved-col">
            <ion-icon aria-hidden="true" :icon="closeCircleOutline" /><br>
            Reserved
          </ion-col>
          <ion-col v-else class="empty-col" @click="booking(item.time, 'C')">
            <ion-icon aria-hidden=" true" :icon="checkmarkCircleOutline" /><br>
          Apply Now
          </ion-col>
        </ion-row>

      </ion-grid>

    </ion-content>

  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonModal, IonDatetimeButton } from '@ionic/vue';
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const res = ref({
  date: '2024-04-12',
  data:
    [{ time: '8:00', roomA: 'Reserved', roomB: 'Empty', roomC: 'Reserved' },
    { time: '9:00', roomA: 'Empty', roomB: 'Reserved', roomC: 'Reserved' },
    { time: '10:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
    { time: '11:00', roomA: 'Empty', roomB: 'Reserved', roomC: 'Reserved' },
    { time: '12:00', roomA: 'Empty', roomB: 'Empty', roomC: 'Reserved' },
    { time: '13:00', roomA: 'Reserved', roomB: 'Empty', roomC: 'Reserved' },
    { time: '14:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
    { time: '15:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Empty' },
    { time: '16:00', roomA: 'Reserved', roomB: 'Empty', roomC: 'Reserved' },
    { time: '17:00', roomA: 'Empty', roomB: 'Reserved', roomC: 'Reserved' },
    { time: '18:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
    { time: '19:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
    { time: '20:00', roomA: 'Reserved', roomB: 'Empty', roomC: 'Reserved' },
    { time: '21:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
    { time: '22:00', roomA: 'Empty', roomB: 'Empty', roomC: 'Reserved' },
    { time: '23:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' }]
});

function booking(start_time, room_number) {
  const timeParts = start_time.split(':');
  router.push({ path: '/library/booking', query: { room_id: room_number, start_time: timeParts[0] } });
}

function changeDate(event) {
  alert(res.value.date);
  //axios to update res_data
}

</script>

<style scoped>
ion-col {
  background-color: #ffffff;
  border: solid 1px #60606096;
  color: #000000;
  text-align: center;
}

.head-col {
  background-color: #f4f4f4;
}

.time-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-col {
  background-color: #35a326;
  color: #dfdfdf;
}

.reserved-col {
  background-color: #671111;
  color: #989292;
}
</style>