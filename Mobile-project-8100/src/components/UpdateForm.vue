<template>
    <ion-list>
        <ion-item>
            <ion-label>
                <h1>Update Form</h1>
                <p style="color: red;">* means required</p>
            </ion-label>
        </ion-item>

        <ion-item>
            <ion-input type="email" placeholder="email@domain.com" :disabled="true" :clear-input="true"
                v-model="form.u_email">
                <div slot="label">Email <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="UserName" placeholder="Enter your name" :clear-input="true" v-model="form.u_name">
            </ion-input>
        </ion-item>


        <ion-item>
            <ion-select label-placement="floating" v-model="form.u_gender">
                <div slot="label">Gender <ion-text color="danger">*</ion-text></div>
                <ion-select-option value="Male">Male</ion-select-option>
                <ion-select-option value="Female">Female</ion-select-option>
                <ion-select-option value="Secret">Secret</ion-select-option>
            </ion-select>
        </ion-item>


        <ion-item>
            <ion-input type="number" placeholder="Enter your age" :clear-input="true" v-model="form.u_age">
                <div slot="label">Age <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="Career" placeholder="Enter your career" :clear-input="true" v-model="form.u_career">
            </ion-input>
        </ion-item>

        <ion-button color="success" shape="round" expand="block" @click="submitForm">Update<ion-icon slot="end"
                :icon="checkmarkDoneOutline"></ion-icon>
        </ion-button>
    </ion-list>
</template>

<script setup>
import { IonItem, IonButton, IonList, IonSelect, IonSelectOption, IonLabel, IonText, IonInput, alertController } from '@ionic/vue';
import { ref, defineProps, watch } from 'vue';
import { checkmarkDoneOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router'

const props = defineProps(['Userinfo'])
const emit = defineEmits(['Close'])
const router = useRouter()
const route = useRoute()

const form = ref({
    u_email: props.Userinfo.u_email,
    u_name: props.Userinfo.u_name,
    u_gender: props.Userinfo.u_gender,
    u_age: props.Userinfo.u_age,
    u_career: props.Userinfo.u_career
});

async function submitForm(event) {
    const url = '/users/update-user';
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
    if (res.status = 200) {
        emit('Close', false);
    }
}

</script>

<style scoped></style>
