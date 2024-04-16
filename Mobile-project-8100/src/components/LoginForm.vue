<template>
    <ion-list v-if="!isRegister">
        <ion-item>
            <ion-label>
                <h1 style="text-align: center;">Login</h1>
            </ion-label>
        </ion-item>

        <ion-item>
            <ion-input type="email" placeholder="email@domain.com" :clear-input="true" v-model="form.u_email">
                <div slot="label">Email <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input type="password" v-model="form.u_pwd">
                <div slot="label">Password <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>


        <div style="display: flex; justify-content: space-around;">
            <ion-button fill="clear" color="success" shape="round" expand="block" @click="Login">Confirm<ion-icon
                    slot="end" :icon="checkmarkDoneOutline"></ion-icon>
            </ion-button>

            <ion-button fill="clear" color="medium" shape="round" expand="block" @click="isRegister = !isRegister">I
                haven't regist
                yet...<ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
            </ion-button>
        </div>
    </ion-list>

    <div v-if="isRegister">
        <RegisterForm :isRegister="isRegister" @goBackToLogin="goBackToLogin" />
    </div>


</template>

<script setup>
import { IonItem, IonButton, IonList, IonLabel, IonText, IonInput, alertController } from '@ionic/vue';
import { ref } from 'vue';
import { arrowForwardOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router'
import RegisterForm from '../components/RegisterForm.vue';


const emit = defineEmits(['haveLogin'])

const router = useRouter()
const route = useRoute()

const form = ref({
    u_email: '',
    u_pwd: ''
});
const isRegister = ref(false);

async function Login(event) {
    const url = '/users/login';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value)
    });
    const res = await response.json();
    localStorage.setItem('token', res.token);
    // console.log(res);
    if (res.status == 200) {
        emit('haveLogin', true);
    } else {
        const alert = await alertController.create({
            header: 'Message',
            message: res.message,
            buttons: ['Confirm'],
        });
        await alert.present();
    }
}

function goBackToLogin(value) {
    isRegister.value = value;
}
</script>

<style scoped></style>
