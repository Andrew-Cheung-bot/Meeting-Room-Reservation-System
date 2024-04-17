<template>
  <v-card class="mx-auto" max-width="90%" hover>
    <v-card-title>Your Profile</v-card-title>
    <v-card-subtitle>Please edit your information there!</v-card-subtitle>

    <v-card-text v-if="form != undefined">
      <v-text-field
        label="Email *"
        placeholder="email@domain.com"
        type="email"
        v-model="form.u_email"
        disabled
        :clearable="true"
      ></v-text-field>

      <v-text-field
        label="Username *"
        placeholder="Enter your name"
        v-model="form.u_name"
        :clearable="true"
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
        v-model="form.u_age"
        :clearable="true"
      ></v-text-field>

      <v-text-field
        label="Career *"
        placeholder="Enter your career"
        v-model="form.u_career"
        :clearable="true"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn color="success" @click="submitForm">Update</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {ref} from 'vue';
const props = defineProps(['update','Userinfo']);
const update = props.update;
const user_info = props.Userinfo;

const form = ref({
    u_email: user_info.u_email,
    u_name: user_info.u_name,
    u_gender: user_info.u_gender,
    u_age: user_info.u_age,
    u_career: user_info.u_career
});

async function submitForm(event) {
    const url = '/users/update-user';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(form.value)
    });
    const res = await response.json();
    console.log(res);
    alert('Update already!')
}

</script>