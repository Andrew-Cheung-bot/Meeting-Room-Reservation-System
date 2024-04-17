<template>
    <v-card :disabled="loading" :loading="loading" class="mx-auto" width="100%">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>
        <!-- avatar -->
        <!-- <v-col cols="12"> -->
            <!-- <v-card append-avatar="https://cdn.vuetifyjs.com/images/john.jpg" class="bg-surface-light pt-4" width="100%"
                prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" :subtitle="user_info.u_email" :title="user_info.u_name">
                <v-card-text>{{user_info.u_gender}}</v-card-text>
                <v-card-text>{{user_info.u_age}}</v-card-text>

            </v-card> -->
            
        <v-card class="mx-auto" :loading="loading" loading-text="Loading...">
          <v-card-title class="justify-center pb-0">
    
          </v-card-title>

          <v-card-subtitle class="text-h5 text-center mt-2">
            {{ user_info.u_name }}
          </v-card-subtitle>

          <v-card-text class="text-center grey--text mb-4">
            Sex:{{user_info.u_gender}} 
            Age:{{user_info.u_age}}
          </v-card-text>

          <v-card-text class="text-center grey--text mb-4">
            {{ user_info.u_email}}<br>
          </v-card-text>
    
        </v-card>
    


        <template v-slot:actions width="100%">
            <v-btn class="mt-4" size="x-large" color="primary" @click="update = !update" width="33%">
                Update
            </v-btn>
            <v-btn class="mt-4" size="x-large" color="success" @click="listBookingInfo" width="33%">
                Show Booking Info
            </v-btn>
            <v-btn class="mt-4" size="x-large" color="error" @click="logout" width="33%">
                Logout
            </v-btn>
        </template>

        <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#036358" contained>
            <v-btn variant="flat">See more info</v-btn>
        </v-overlay>
    </v-card>
    
    <div v-if="update">
     <UpdateForm :update="update" :Userinfo="user_info"/>
    </div>
   
    <!-- <v-card :disabled="loading" :loading="loading" class="mt-3" width="100%" v-if="show">
        <v-list v-for="(item, index) in items" :key="index">
        Room: {{ item.room_id }} | Start time: {{ item.start_time }} | End time: {{ item.end_time }}
        <v-btn color="error" @click="deleteBooking(item)">Delete</v-btn>
        </v-list>
    </v-card> -->

    <v-card :disabled="loading" :loading="loading" class="mt-3" width="100%" v-if="show">
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-content class="d-flex justify-space-between align-center">
                  <span>Room: {{ item.room_id }} | Start time: {{ item.start_time }} | End time: {{ item.end_time }}</span>
                  <v-btn color="error" @click="deleteBooking(item)">Delete</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
    
    
</template>
<script setup>
import { ref,watch ,onMounted} from 'vue';
import UpdateForm from '@/components/UpdateForm.vue';
//pop up update form
const loading = ref(false);
const update = ref(false);

const show = ref(false);
const items = ref();

function onClick () {
        update.value = false;
}
//logout
function logout(event) {
  localStorage.removeItem('token');
  alert('Logout already!')
}

//login
const login = ref(false);
const user_info = ref({
  u_name: 'Username',
  u_email: 'Email',
  u_gender: 'Gender',
  u_career: '',
  u_age:''
})

async function listBookingInfo(){
    const url = '/users/show-bookings';
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    });
    const res = await response.json();
    items.value = res.bookings;
    show.value = !show.value;
    // console.log(res.bookings);
}


async function deleteBooking(item){
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

}

watch(login, async (newValue) => {
  if (newValue == true) {
    const url = '/users/show-user';
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    });
    const res = await response.json();
    user_info.value.u_name = res.user.u_name;
    user_info.value.u_email = res.user.u_email;
    user_info.value.u_gender = res.user.u_gender;
    user_info.value.u_career = res.user.u_career;
    user_info.value.u_age = res.user.u_age;
  }
})


onMounted(() => {
  const token = localStorage.getItem('token');
  if (token == null) {
    login.value = false;
  } else {
    login.value = true;
  }
})


</script>
