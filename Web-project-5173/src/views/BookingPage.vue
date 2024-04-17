<template>
    <v-card class="mx-auto" width="100%" hover>
        <v-card-item>
            <v-card-title>
                Booking Form
            </v-card-title>
            <v-card-subtitle>
                <Strong style="color: red;">All information required</Strong>
            </v-card-subtitle>
        </v-card-item>

        <v-card-item>
            <v-select :items="rooms" item-title="room_name" item-value="value" density="comfortable" label="Select Room"
                clearable :rules="[rules.required]" v-model="form.room_id" hide-details="auto">
            </v-select>
        </v-card-item>

        <v-card-item>
            <v-text-field label="Email address" v-model="form.u_email" placeholder="johndoe@gmail.com" type="email"
                :rules="[rules.required]" hide-details="auto" clearable></v-text-field>
        </v-card-item>

        <v-card-item>
            <v-text-field label="Enter your name" v-model="form.u_name" :rules="[rules.required]" ensity="comfortable"
                hide-details="auto" clearable></v-text-field>
        </v-card-item>

        <v-card-item>
            <v-date-picker elevation="24" color="indigo-lighten-1" width="100%" class="date-color"
                v-model="raw_date"></v-date-picker>
        </v-card-item>
        
            <v-card-item>
                <v-container fluid>
                    <v-row dense>
                        <v-col>
                            <v-text-field style="margin-right: 5px;" label="Enter start time (8-23)"
                                v-model="form.start_time" :rules="[rules.required]" density="comfortable"
                                hide-details="auto" clearable type="number" />
                        </v-col>
                        <v-col>
                            <v-text-field label="Enter End time (9-24)" :rules="[rules.required]" density="comfortable"
                                v-model="form.end_time" hide-details="auto" clearable type="number" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-item>

            <template v-slot:actions width="100%">
                <v-btn class="mt-4" size="x-large" color="success" @click="submitForm" width="50%">
                    Submit
                </v-btn>
                <v-btn class="mt-4" size="x-large" color="error" @click="goBack" width="50%">
                    Back
                </v-btn>
            </template>

    </v-card>
</template>

<script setup>
import { ref ,computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const rules = ref({
    required: (value) => !!value || 'Field is required',
});
const rooms = ref([{ room_name: 'Room A', value: 'A' }, { room_name: 'Room B', value: 'B' }, { room_name: 'Room C', value: 'C' }]);

const raw_date = ref();
const formattedDate = computed(() => {
    if (!raw_date.value) return '';
      return raw_date.value.toLocaleDateString('en-CA');
})


const form = ref({
    room_id: route.query.room_id,
    u_email: '',
    u_name: '',
    date: formattedDate,
    start_time: route.query.start_time,
    end_time: ''
});
const date = ref(new Date(form.value.date));


async function submitForm() {
    // alert(JSON.stringify(form.value));
    const url = '/room/booking';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(form.value)
    });
    const res = await response.json();
    console.log(res)
    router.push("/home")
}

function goBack() {
    router.back();
}


</script>

<style>
.date-color{ 
    border: 1px solid #5c6bc0;
}
</style>
