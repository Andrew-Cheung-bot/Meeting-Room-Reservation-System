<template>
    <v-navigation-drawer v-model="drawer" :rail="rail"  permanent @click="rail = false">
        <v-list-item prepend-avatar="/src/assets/User.png" title="UserName" nav>
            <template v-slot:append>
                <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="Home" to="/home"></v-list-item>
            <v-list-item prepend-icon="mdi-list-status" title="Status" value="Status" to="/status"></v-list-item>
            <v-list-item prepend-icon="mdi-book-open-outline" title="Booking" value="Booking" to="/booking"></v-list-item>
            <v-list-item prepend-icon="mdi-login" title="Login" value="Login" to="/login"></v-list-item>
            <v-list-item prepend-icon="mdi-draw" title="Signup" value="Signup" to="/signup"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    

</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(true);
const rail = ref(true);
</script>
