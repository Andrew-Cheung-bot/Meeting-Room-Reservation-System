<template>
  <!-- {{ update }} -->

  
<v-card
    class="mx-auto"
    max-width="90%"
    hover
  >
    <v-card-item>
      <v-card-title>
        Your Profile
      </v-card-title>

      <v-card-subtitle>
       Please edit your information there !
      </v-card-subtitle>
    </v-card-item>

    <v-text-field
        label="email"
        placeholder="AndrewLe@gmail.com"
        type="email"
    ></v-text-field>
    <v-text-field
        label="username"
        placeholder="AndrewLe"
        required
    ></v-text-field>
    <v-text-field
        label="password"
        placeholder="Enter your password"
        required
    ></v-text-field>
    <v-text-field
        label="sex"
        placeholder="Male/FeMale/Secret"
        required
    ></v-text-field>
    <v-text-field
        label="age"
        placeholder="20"
        required
    ></v-text-field>
    <v-text-field
        label="career"
        placeholder="terrorist"
        required
    ></v-text-field>
  </v-card>
</template>

<script setup>
const props = defineProps(['update']);
const update = props.update;

</script>