<template>
  <div class="about">
    <h2>{{ title }}</h2>
    <table class="schedule-table">
      <thead class="thead-light">
        <tr>
          <th v-for="(value, room) in items[0]" v-if="room !== 'time'" :key="room">
            {{ room.toUpperCase().replace('ROOM', 'Group Study Room') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.time">
          <th scope="row">{{ item.time }}</th>
          <td>{{ item.time }}</td>
          <td v-for="(status, room) in item" v-if="room !== 'time'" :key="room">
            <span v-if="status === 'Reserved'" class="reserved">✖ Reserved</span>
            <button v-else @click="reserve(room, item.time)">Reserve</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ReservationSchedule',
  data() {
    return {
      items:
      [{ time: '8:00', room1: 'Reserved', room2: 'Empty', room3: 'Reserved' }, 
      { time: '9:00', room1: 'Empty', room2: 'Reserved', room3: 'Reserved' }, 
      { time: '10:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved'},
      { time: '11:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' }, 
       { time: '12:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' },
        { time: '13:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' },
         { time: '14:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' }, 
         { time: '15:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' }, 
         { time: '16:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' }, 
         { time: '17:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' }, 
         { time: '18:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' }, 
         { time: '19:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' },
          { time: '20:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' },
           { time: '21:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' }, 
           { time: '22:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' }, 
           { time: '23:00', room1: 'Reserved', room2: 'Reserved', room3: 'Reserved' }],
    };
  },
  methods: {
    reserve(room, time) {
      // Here you would implement the logic to handle the reservation
      console.log(`Reserving ${room} at ${time}`);
      // This could involve setting the status to 'Reserved' and making an API call
    }
  }
};
</script>

<style>
.reservation-schedule {
  padding-top: 100px; /* Add top padding to push the content below the fixed header */
  padding-bottom: 1rem; /* Add bottom padding for spacing */
  padding-left: 1rem; /* Add left padding for spacing */
  padding-right: 1rem; /* Add right padding for spacing */
}

.title {
  text-align: center;
  margin-bottom: 1rem; /* Add some space below the title */
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Enable fixed table layout to improve cell consistency */
}

.schedule-table th, .schedule-table td {
  border: 1px solid #ddd; /* Add border to cells */
  padding: 8px;
  text-align: center;
  vertical-align: middle; /* Center content vertically */
}

.schedule-table th {
  background-color: #f4f4f4; /* Give a background color to the header cells */
  text-transform: capitalize; /* Capitalize the headers */
}

.reserved {
  color: red;
  font-weight: bold; /* Make reserved status more prominent */
}

button {
  background-color: #008CBA; /* Button color */
  color: white;
  padding: 10px 20px;
  margin: 4px 2px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #007B9A; /* Darker shade for hover effect */
}

</style>