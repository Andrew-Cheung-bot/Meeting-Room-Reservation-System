<template>
  <v-card
      class="mx-auto"
      max-width="90%"
      hover
  >
      <v-card-title>
          Register Form
      </v-card-title>
      <v-card-subtitle style="color: red;">
          * means required
      </v-card-subtitle>
      
      <v-text-field
          label="Email *"
          placeholder="email@domain.com"
          type="email"
          clearable
          v-model="form.u_email"
      ></v-text-field>
      
      <v-text-field
          label="UserName"
          placeholder="Enter your name"
          clearable
          v-model="form.u_name"
      ></v-text-field>
      
      <v-select
          label="Gender *"
          :items="['Male', 'Female', 'Secret']"
          v-model="form.u_gender"
      ></v-select>
      
      <v-text-field
          label="Age *"
          placeholder="Enter your age"
          type="number"
          clearable
          v-model="form.u_age"
      ></v-text-field>
      
      <v-text-field
          label="Password *"
          placeholder="Enter your password"
          type="password"
          clearable
          v-model="form.u_pwd"
      ></v-text-field>
      
      <v-text-field
          label="Career"
          placeholder="Enter your career"
          clearable
          v-model="form.u_career"
      ></v-text-field>

      <v-row class="mx-0">
          <v-btn
              color="success"
              class="ma-2"
              block
              @click="Register"
          >
              Sign Up
          </v-btn>

          <v-btn
              color="gray"
              class="ma-2"
              block
              @click="goLogin"
          >
              I have account
          </v-btn>
      </v-row>
      
  </v-card>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter();
const route = useRoute();
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
    console.log(res);
}

function goLogin(){
    router.push("/login")
}
</script>