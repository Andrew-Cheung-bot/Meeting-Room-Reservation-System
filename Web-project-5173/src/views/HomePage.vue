<template>
    <v-card :disabled="loading" :loading="loading" class="mx-auto" width="100%">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>
        <!-- avatar -->
        <v-col cols="12">
            <v-card append-avatar="https://cdn.vuetifyjs.com/images/john.jpg" class="bg-surface-light pt-4" width="100%"
                prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" subtitle="ID: " title="Andrew">
                <v-card-text>This is your profile.</v-card-text>
            </v-card>
        </v-col>


        <template v-slot:actions width="100%">
            <v-btn class="mt-4" size="x-large" color="success" @click="update = !update" width="50%">
                Update
            </v-btn>
            <v-btn class="mt-4" size="x-large" color="error" @click="logout" width="50%">
                Logout
            </v-btn>
        </template>

        <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#036358" contained>
            <v-btn variant="flat">See more info</v-btn>
        </v-overlay>
    </v-card>
    
    <div v-if="update">
     <UpdateForm :update="update"/>
    </div>
    
</template>
<script setup>
import { ref } from 'vue';
import UpdateForm from '@/components/UpdateForm.vue';

const loading = ref(false);
const update = ref(false);

function onClick () {
        update.value = false;
}



</script>
