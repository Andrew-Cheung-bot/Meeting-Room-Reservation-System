<template>
    <v-navigation-drawer v-model="drawer" :rail="rail"  permanent @click="rail = false">

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="Home" to="/home"></v-list-item>
            <v-list-item prepend-icon="mdi-list-status" title="Status" value="Status" to="/status"></v-list-item>
            <v-list-item prepend-icon="mdi-book-open-outline" @click="test" title="Booking" value="Booking"></v-list-item>
            <v-list-item prepend-icon="mdi-login"  title="Login" value="Login" to="/login"></v-list-item>
            <v-list-item prepend-icon="mdi-draw" title="Register" value="Register" to="/register"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    

</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()

const drawer = ref(true);
const rail = ref(true);
function test(){
    const token = localStorage.getItem('token');
    console.log(token);
    if(token == null){
        router.push('/login');
    }
    else{
        router.push("/booking");
    }

}

</script>
