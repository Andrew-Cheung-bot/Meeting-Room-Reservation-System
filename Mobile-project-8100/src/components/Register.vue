<template>
    <ion-list>
        <ion-item>
            <ion-label>
                <h1>Register Form</h1>
                <p style="color: red;">* means required</p>
            </ion-label>
        </ion-item>

        <ion-item>
            <ion-input type="email" placeholder="email@domain.com" :clear-input="true" :value="form.u_email">
                <div slot="label">Email <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="UserName" placeholder="Enter your name" :clear-input="true"
                :value="form.u_name"></ion-input>
        </ion-item>


        <ion-item>
            <ion-select label-placement="floating" v-model="form.room_id">
                <div slot="label">Gender <ion-text color="danger">*</ion-text></div>
                <ion-select-option value="Male">Male</ion-select-option>
                <ion-select-option value="Female">Female</ion-select-option>
                <ion-select-option value="Secret">Secret</ion-select-option>
            </ion-select>
        </ion-item>


        <ion-item>
            <ion-input type="number" placeholder="Enter your age" :clear-input="true" :value="form.start_time">
                <div slot="label">Age <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input type="password" :value="form.start_time">
                <div slot="label">Password <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="Career" placeholder="Enter your career" :clear-input="true"
                :value="form.u_name"></ion-input>
        </ion-item>

        <ion-button color="success" shape="round" expand="block" @click="submitForm">Sign up<ion-icon slot="end"
                :icon="checkmarkDoneOutline"></ion-icon></ion-button>
    </ion-list>
</template>

<script setup>
import { IonItem, IonButton, IonList, IonSelect, IonSelectOption, IonLabel, IonText } from '@ionic/vue';
import { ref, watch } from 'vue';
import { checkmarkDoneOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
// defineProps({
//     name: String,
// });

const form = ref({
    room_id: '',
    u_email: '',
    u_name: '',
    date: '',
    start_time: '',
    end_time: ''
});

function submitForm(event) {
    console.log(route.query)
}

</script>

<style scoped></style>
