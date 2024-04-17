<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="!login">
        <ion-card>
          <LoginForm @haveLogin="haveLogin" />
        </ion-card>
      </div>

      <div v-if="login">
        <ion-card>
          <ion-card-header>
            <ion-list v-if="loaded">
              <ion-list-header>Basic User Information</ion-list-header>
              <ion-item>
                <ion-thumbnail slot="start">
                  <ion-icon style="width: 100%; height: 100%" :icon="personOutline"></ion-icon>
                </ion-thumbnail>
                <ion-label>
                  <h3>{{ user_info.u_name }}</h3>
                  <p>{{ user_info.u_email }}</p>
                  <p>{{ user_info.u_gender }}</p>
                </ion-label>
              </ion-item>
            </ion-list>

            <ion-list v-if="!loaded">
              <ion-list-header>
                <ion-skeleton-text :animated="true" style="width: 80px"></ion-skeleton-text>
              </ion-list-header>
              <ion-item>
                <ion-thumbnail slot="start">
                  <ion-skeleton-text :animated="true"></ion-skeleton-text>
                </ion-thumbnail>
                <ion-label>
                  <h3>
                    <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
                  </h3>
                  <p>
                    <ion-skeleton-text :animated="true" style="width: 60%;"></ion-skeleton-text>
                  </p>
                  <p>
                    <ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card-header>


          <div class="ion-activatable ripple-parent rounded-rectangle" @click="setLoaded(!loaded)">
            Show information
            <ion-ripple-effect></ion-ripple-effect>
          </div>

          <div class="ion-activatable ripple-parent rounded-rectangle" @click="updateBookInfo">
            Show Booking info
            <ion-ripple-effect></ion-ripple-effect>
          </div>

          <div class="button-group">
            <ion-button color="secondary" fill="clear" @click="update">Update Info</ion-button>
            <ion-button color="danger" fill="clear" @click="logout">Logout</ion-button>
          </div>
        </ion-card>
      </div>

      <div v-if="showUpdateForm">
        <ion-card>
          <UpdateForm :Userinfo="user_info" @Close="close" />
        </ion-card>
      </div>

      <div v-if="showBookingInfo">
        <ion-card>
          <BookingInfo :res="res"/>
        </ion-card>
      </div>

    </ion-content>
  </ion-page>

</template>

<script setup>
import { personOutline } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonThumbnail, IonRippleEffect
} from '@ionic/vue';
import { ref, onMounted, watch } from 'vue';
import UpdateForm from '../components/UpdateForm.vue';
import LoginForm from '../components/LoginForm.vue';
import BookingInfo from '../components/BookingInfo.vue';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const login = ref(false);
const showUpdateForm = ref(false);
const showBookingInfo = ref(false);
const res = ref();

const loaded = ref(false);
function setLoaded(event) {
  loaded.value = event;
}

const user_info = ref({
  u_name: 'Username',
  u_email: 'Email',
  u_gender: 'Gender',
  u_career: '',
  u_age:''
})

function close(state) {
  showUpdateForm.value = state;
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

function update() {
  showUpdateForm.value = !showUpdateForm.value;
}

async function updateBookInfo() {
  showBookingInfo.value = !showBookingInfo.value;

  const url = '/users/show-bookings';
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('token')
    }
  });
  const result = await response.json();
  res.value = result;
  console.log(res.value);
}

function logout(event) {
  localStorage.removeItem('token');
  login.value = false;
  showUpdateForm.value = false;
}

function haveLogin(state) {
  login.value = state;
}

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token == null) {
    login.value = false;
  } else {
    login.value = true;
  }
})
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;

  align-items: center;
  justify-content: space-between;
  text-align: center;

  height: 170px;
  width: 400px;

  margin: 0 auto;
}

b {
  width: 100%;
}

.ripple-parent {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;

  border: 1px solid #ddd;

  user-select: none;
}

.rounded-rectangle {
  width: 100%;
  height: 50px;
  border-radius: 1px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}
</style>../components/RegisterForm.vue
