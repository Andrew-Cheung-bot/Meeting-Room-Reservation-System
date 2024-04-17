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
          <ion-col v-else class="empty-col" @click="booking(item.time, 'A')">
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonModal, IonDatetimeButton, alertController } from '@ionic/vue';
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const m_month = month < 10 ? '0' + month : month;
const date = new Date().getDate();

const now_date = ref(year + '-' + m_month + '-' + date);

const res = ref({
  date: now_date.value,
  data:[]
});

async function booking(start_time, room_number) {
  const temp = res.value.date;
  const year = new Date(temp).getFullYear();
  const month = new Date(temp).getMonth() + 1;
  const m_month = month < 10 ? '0' + month : month;
  const date = new Date(temp).getDate();
  const now_date = ref(year + '-' + m_month + '-' + date);
  
  const token = localStorage.getItem('token');
  if (token == null) {
    const alert = await alertController.create({
      header: 'Message',
      message: 'You need to login before your booking.',
      buttons: ['Confirm'],
    });
    await alert.present();
    router.push('/library/home');
  } else {
    const timeParts = start_time.split(':');
    router.push({ path: '/library/booking', query: { room_id: room_number, start_time: timeParts[0], date: now_date.value, fromstatus: '1' } });
  }
}

async function changeDate(event) {
  const body1 = { "date": res.value.date }
  // console.log(body1);
  const url = '/room/view-bookings';
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body1)
  });
  const result = await response.json();
  // console.log(res.value.date)
  // console.log(res.value.data)
  // console.log('-------------------')
  res.value.date = JSON.stringify(result.bookings.date);
  res.value.data = result.bookings.data
  // console.log(JSON.stringify(result.bookings))
  // console.log(res.value.date)
  // console.log(res.value.data)
}

onMounted(async () => {
  console.log('on mounted');
  const body1 = { "date": res.value.date }
  // console.log(now_date.value);
  // console.log(body1);
  const url = '/room/view-bookings';
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body1)
  });
  const result = await response.json();
  console.log(res.value.date)
  console.log(res.value.data)
  console.log('-------------------')
  res.value.date = JSON.stringify(result.bookings.date);
  res.value.data = result.bookings.data
  // console.log(JSON.stringify(result.bookings))
  console.log(res.value.date)
  console.log(res.value.data)
})

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