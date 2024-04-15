<template>
    <ion-list>
        <ion-item>
            <ion-label>
                <h1>Booking Form</h1>
                <p style="color: red;">* means required</p>
            </ion-label>
        </ion-item>

        <ion-item>
            <ion-select label-placement="floating" v-model="form.room_id">
                <div slot="label">Select Room <ion-text color="danger">*</ion-text></div>
                <ion-select-option value="A">Room A</ion-select-option>
                <ion-select-option value="B">Room B</ion-select-option>
                <ion-select-option value="C">Room C</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-input type="email" placeholder="email@domain.com" :clear-input="true" :value="form.u_email">
                <div slot="label">Email <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="Register Name" placeholder="Enter your name" :clear-input="true"
                :value="form.u_name"></ion-input>
        </ion-item>


        <ion-item>
            <ion-label>Date <ion-text color="danger">*</ion-text></ion-label>
            <ion-datetime-button datetime="datetime">
            </ion-datetime-button>
        </ion-item>
        <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime" presentation="date" v-model="form.date">
            </ion-datetime>
        </ion-modal>

        <ion-item>
            <ion-input type="number" placeholder="8 (opening hours)" :clear-input="true" :value="form.start_time">
                <div slot="label">Start Time <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-range label-placement="start" :ticks="true" :snaps="true" :min="1" :max="5" :value="form.end_time"
                :pin="true">
                <div slot="label">Duration <ion-text color="danger">*</ion-text> (hours)</div>

            </ion-range>
        </ion-item>

        <ion-button shape="round" expand="block" @click="submitForm">Submit<ion-icon slot="end"
                :icon="checkmarkDoneOutline"></ion-icon></ion-button>
        <ion-button shape="round" expand="block" @click="goBack">Back<ion-icon slot="end"
                :icon="returnDownBackOutline"></ion-icon></ion-button>
    </ion-list>
</template>

<script setup>
import { IonItem, IonButton, IonList, IonSelect, IonSelectOption, IonLabel, IonText, IonDatetime, IonModal, IonDatetimeButton } from '@ionic/vue';
import { ref, watch } from 'vue';
import { checkmarkDoneOutline, returnDownBackOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
// defineProps({
//     name: String,
// });
const emit = defineEmits(['callBack']);

const form = ref({
    room_id: route.query.room_id,
    u_email: '',
    u_name: '',
    date: route.query.date,
    start_time: route.query.start_time,
    end_time: ''
});

function submitForm(event) {
    console.log(route.query)
}

function goBack(event) {
    const goBack = ref(false)
    emit('callBack', goBack.value)
}

watch(() => route.query, (newValue, oldValue) => {
    form.value.room_id = newValue.room_id
    form.value.date = newValue.date
    form.value.start_time = newValue.start_time
}, { immediate: true })

</script>

<style scoped></style>
