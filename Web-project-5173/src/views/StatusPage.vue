<template>
    <v-container class="mb-6">
        <v-row justify="center" v-show="datepicker">
            <v-date-picker width="100%" class="custom-col" color="indigo-lighten-1"
                v-model="date"></v-date-picker>
        </v-row>

        <v-row class="mb-3">
            <v-btn color="indigo-lighten-1" block size="large" density="comfortable"
                @click="datepicker = !datepicker">Select Date</v-btn>
        </v-row>

        <v-row>
            <v-col class="head-col time-col custom-col">
                Time line
            </v-col>
            <v-col class="head-col custom-col">
                Room A<br>(4-seats)
            </v-col>
            <v-col class="head-col custom-col">
                Room B<br>(6-seats)
            </v-col>
            <v-col class="head-col custom-col">
                Room C<br>(10-seats)
            </v-col>
        </v-row>
        <v-row v-for="item in res.data" :key="item.time">
            <v-col class="custom-col time-col">{{ item.time }}</v-col>

            <v-col v-if="(item.roomA) == 'Reserved'" class="reserved-col custom-col">
                <v-icon icon="mdi-close-circle-outline" size="large"></v-icon><br>
                Reserved
            </v-col>
            <v-col v-else class="empty-col custom-col" @click="booking(item.time, 'A')">
                <v-icon icon="mdi-check-circle-outline" size="large"></v-icon><br>
                Apply Now
            </v-col>

            <v-col v-if="(item.roomB) == 'Reserved'" class="reserved-col custom-col">
                <v-icon icon="mdi-close-circle-outline" size="large"></v-icon><br>
                Reserved
            </v-col>
            <v-col v-else class="empty-col custom-col" @click="booking(item.time, 'A')">
                <v-icon icon="mdi-check-circle-outline" size="large"></v-icon><br>
                Apply Now
            </v-col>

            <v-col v-if="(item.roomC) == 'Reserved'" class="reserved-col custom-col">
                <v-icon icon="mdi-close-circle-outline" size="large"></v-icon><br>
                Reserved
            </v-col>
            <v-col v-else class="empty-col custom-col" @click="booking(item.time, 'A')">
                <v-icon icon="mdi-check-circle-outline" size="large"></v-icon><br>
                Apply Now
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const router = useRouter();
const route = useRoute();


const datepicker = ref(false);
const date = computed(() => {
    return new Date(res.value.date);
})

const res = ref({
    date: '2024-04-12',
    data:
        [{ time: '8:00', roomA: 'Reserved', roomB: 'Empty', roomC: 'Reserved' },
        { time: '9:00', roomA: 'Empty', roomB: 'Reserved', roomC: 'Reserved' },
        { time: '10:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
        { time: '11:00', roomA: 'Empty', roomB: 'Reserved', roomC: 'Reserved' },
        { time: '12:00', roomA: 'Empty', roomB: 'Empty', roomC: 'Reserved' },
        { time: '13:00', roomA: 'Reserved', roomB: 'Empty', roomC: 'Reserved' },
        { time: '14:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
        { time: '15:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Empty' },
        { time: '16:00', roomA: 'Reserved', roomB: 'Empty', roomC: 'Reserved' },
        { time: '17:00', roomA: 'Empty', roomB: 'Reserved', roomC: 'Reserved' },
        { time: '18:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
        { time: '19:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
        { time: '20:00', roomA: 'Reserved', roomB: 'Empty', roomC: 'Reserved' },
        { time: '21:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' },
        { time: '22:00', roomA: 'Empty', roomB: 'Empty', roomC: 'Reserved' },
        { time: '23:00', roomA: 'Reserved', roomB: 'Reserved', roomC: 'Reserved' }]
});

function booking(start_time, room_number) {
    const timeParts = start_time.split(':');
    alert(timeParts[0] + room_number)
    // 如果登录了就可以直接跳
    // router.push({ path: '/library/booking', query: { room_id: room_number, start_time: timeParts[0], date: res.value.date, fromstatus: '1' } });
    // 否则跳到注册页面
}

</script>

<style scoped>
.head-col {
    background-color: #f4f4f4;
}

.time-col {
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-col {
    background-color: #ffffff;
    border: solid 1px #60606096;
    color: #000000;
    text-align: center;
}

.empty-col {
    background-color: #35a326;
    color: #dfdfdf;
}

.reserved-col {
    background-color: #671111;
    color: #989292;
}
</style>