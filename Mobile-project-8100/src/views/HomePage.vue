<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="!login">
        <RegisterForm />
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
                  <h3>Username</h3>
                  <p>email</p>
                  <p>gender</p>
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
          
          <div class="button-group">
            <ion-button color="secondary" fill="clear" @click="update()">Update Info</ion-button>
            <ion-button color="danger" fill="clear" @click="logout">Logout</ion-button>
          </div>
        </ion-card>
      </div>

      <div v-if="showUpdateForm">
        <ion-card>
          <UpdateForm />
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
import { ref } from 'vue';
import RegisterForm from '../components/RegisterForm.vue';
import UpdateForm from '../components/UpdateForm.vue';

const login = ref(true);
const showUpdateForm = ref(false);

const loaded = ref(false);
function setLoaded(event) {
  loaded.value = event;
}

function update() {
  showUpdateForm.value = !showUpdateForm.value;
}

function logout(event) {
  alert('logout');
}

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
