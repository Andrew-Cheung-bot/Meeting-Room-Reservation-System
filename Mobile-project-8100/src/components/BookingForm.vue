<template>
    <ion-list>
        <ion-item>
            <ion-label>
                <h1>Booking Form</h1>
                <p style="color: red;">* means required</p>
            </ion-label>
        </ion-item>

        <ion-item>
            <ion-select label-placement="floating">
                <div slot="label">Select Room <ion-text color="danger">*</ion-text></div>
                <ion-select-option value="roomA">Room A</ion-select-option>
                <ion-select-option value="roomB">Room B</ion-select-option>
                <ion-select-option value="roomC">Room C</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-input type="email" placeholder="email@domain.com" :clear-input="true">
                <div slot="label">Email <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="Register Name" placeholder="Enter your name" :clear-input="true"></ion-input>
        </ion-item>


        <ion-item>
            <ion-label>Date <ion-text color="danger">*</ion-text></ion-label>
            <ion-datetime-button datetime="datetime">
            </ion-datetime-button>
        </ion-item>
        <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime" presentation="date">
            </ion-datetime>
        </ion-modal>

        <ion-item>
            <ion-input type="number" placeholder="8 (opening hours)" :clear-input="true">
                <div slot="label">Start Time <ion-text color="danger">*</ion-text></div>
            </ion-input>
        </ion-item>

        <ion-item>
            <ion-range label-placement="start" :ticks="true" :snaps="true" :min="1" :max="5" :value="3" :pin="true">
                <div slot="label">Duration <ion-text color="danger">*</ion-text></div>

            </ion-range>
        </ion-item>

    </ion-list>
</template>

<script setup>
import { IonItem, IonList, IonSelect, IonSelectOption, IonLabel, IonText, IonDatetime, IonModal, IonDatetimeButton } from '@ionic/vue';
defineProps({
    name: String,
});
</script>

<style scoped></style>
