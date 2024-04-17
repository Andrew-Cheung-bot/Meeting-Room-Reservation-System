<template>
    <div v-if="props == undefined">
        <ion-item>
            <ion-label>Loading</ion-label>
            <ion-button slot="end" @click="deleteBooking(item)"> End </ion-button>
        </ion-item>
    </div>
    <div v-if="props.res != undefined">
        <ion-item v-for="item in props.res.bookings">
            <ion-label>Room: {{ item.room_id }} | start time: {{ item.start_time }} | End time: {{ item.end_time
                }}</ion-label>
            <ion-button slot="end" @click="deleteBooking(item)"> End </ion-button>
        </ion-item>
    </div>
</template>

<script setup>
import { IonButton, IonItem, IonLabel, alertController } from '@ionic/vue';
import { ref, watch, onMounted, defineProps } from 'vue';
const props = defineProps(['res']);


async function deleteBooking(item) {
    // console.log(item);
    const form = ref({ "_id": item._id, "u_email": item.u_email });
    // console.log(form.value);
    const url = '/room/delete-booking';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(form.value)
    });
    const res = await response.json();

    const alert = await alertController.create({
        header: 'Message',
        message: res.message,
        buttons: ['Confirm'],
    });
    await alert.present();
    console.log(res);
}
</script>

<style scoped></style>

