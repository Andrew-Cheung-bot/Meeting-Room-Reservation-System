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
    ></v-text-field>
    <v-text-field
        label="password"
        placeholder="Enter your password"
        required
    ></v-text-field>
    <v-btn
          color="success"
          size="large"
          label="submit"
          block>
          Login In
        </v-btn>
  </v-card>

</template>

<script setup>

</script>