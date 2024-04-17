<template>    
<v-card
    class="mx-auto"
    max-width="80%"
    hover
  >
    <v-card-item>
      <v-card-title>
      Login
      </v-card-title>

      <v-card-subtitle>
       Please enter your email and password below
      </v-card-subtitle>
    </v-card-item>

    <v-text-field
        label="email"
        placeholder="AndrewLe@gmail.com"
        type="email"
        v-model="form.u_email"
    ></v-text-field>
    <v-text-field
        label="password"
        placeholder="Enter your password"
        v-model="form.u_pwd"
        required
    ></v-text-field>
    <v-btn
          color="success"
          size="large"
          label="submit"
          @click="login"
          block>
          Login In
        </v-btn>
  </v-card>

</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const form = ref({
    u_email: '',
    u_pwd: ''
});

async function login(event) {
    console.log(JSON.stringify(form.value))
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
    console.log(res);
    router.push("/home")
}

</script>