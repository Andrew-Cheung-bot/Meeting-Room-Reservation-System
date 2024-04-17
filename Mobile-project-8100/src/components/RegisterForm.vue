<template>
    <ion-list>
        <ion-item>
            <ion-label>
                <h1>Register Form</h1>
                <p style="color: red;">* means required</p>
            </ion-label>
        </ion-item>

        <ion-item>
            <ion-input type="email" placeholder="email@domain.com" :clear-input="true" v-model="form.u_email">
                <div slot="label">Email <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="UserName" placeholder="Enter your name" :clear-input="true"
                v-model="form.u_name"></ion-input>
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
            <ion-input type="password" v-model="form.u_pwd">
                <div slot="label">Password <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="Career" placeholder="Enter your career" :clear-input="true"
                v-model="form.u_career"></ion-input>
        </ion-item>

        <div style="display: flex; justify-content: space-around;">
            <ion-button id="signup" fill="clear" color="success" shape="round" expand="block" @click="Register">Sign
                up<ion-icon slot="end" :icon="checkmarkDoneOutline"></ion-icon>
            </ion-button>

            <ion-button fill="clear" color="medium" shape="round" expand="block" @click="goLogin">I
                have account
                <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
            </ion-button>
        </div>
    </ion-list>
</template>

<script setup>
import { IonItem, IonButton, IonList, IonSelect, IonSelectOption, IonLabel, IonText, IonInput, alertController } from '@ionic/vue';
import { ref, defineProps, defineEmits } from 'vue';
import { checkmarkDoneOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();
const route = useRoute();
const props = defineProps(['isRegister']);
const message = ref();
const alertButtons = ['Confirm'];
const emit = defineEmits(['goBackToLogin']);

const form = ref({
    u_email: '',
    u_name: '',
    u_pwd: '',
    u_gender: '',
    u_age: '',
    u_career: ''
});

async function Register(event) {
    console.log(JSON.stringify(form.value))
    const url = '/users/register';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value)
    });
    const res = await response.json();
    console.log(res)
    const alert = await alertController.create({
        header: 'Message',
        message: res.message,
        buttons: ['Confirm'],
    });
    await alert.present();
    if (res.status == 201) {
        emit("goBackToLogin", !props.isRegister);
    }
    console.log(res);
}


function goLogin(event) {
    emit("goBackToLogin", !props.isRegister);
}
</script>

<style scoped></style>
