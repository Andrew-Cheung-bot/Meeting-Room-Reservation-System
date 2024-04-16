var express = require('express');
var router = express.Router();

const { connectToDB, ObjectId } = require('../utils/db');

const { generateToken, decodeToken } = require('../utils/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Bookings */
router.post('/booking', async function (req, res, next) {
  
  const db = await connectToDB();
  try {
    // Extract JWT from Authorization header
    const token = req.headers.authorization;
    
    // Verify the JWT
    const decoded = decodeToken(token);

    // Get user ID from the decoded JWT
    const u_email = decoded.u_email;
    const u_name = decoded.u_name;

    const { room_id, start_time, end_time, date } = req.body;

    const userStartTime = parseInt(start_time);
    const userEndTime = parseInt(end_time);
    if(userStartTime < 8 || userStartTime > 23 || userEndTime < 9 || userEndTime > 24){
      res.status(400).json({ status: 400, message: 'Incorrect range of input time' });
      return;
    }

    // Find existing bookings for the specified date and room
    const existingBookings = await db.collection("room_info").find({ date: date, room_id: room_id }).toArray();

    // Check for overlapping time slots with the user's requested time slot
    const overlappingBooking = existingBookings.find(booking => {
      const bookingStartTime = parseInt(booking.start_time);
      const bookingEndTime = parseInt(booking.end_time);
      return (userStartTime < bookingEndTime && userEndTime > bookingStartTime);
    });

    if (overlappingBooking) {
      res.status(400).json({ status: 400, message: 'Time slot overlaps with existing booking. Please choose a different time slot.' });
    } else {
      // Create a new booking object
      const newBooking = {
        room_id,
        u_email,
        u_name,
        start_time,
        end_time,
        date,
        created_at: new Date(),
        modified_at: new Date()
      };

      // Insert the new booking into the database
      const result = await db.collection("room_info").insertOne(newBooking);

      res.status(201).json({ status: 201, message: 'Booking successful!', _id: result.insertedId });
    }
    
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    await db.client.close();
  }
});


/* Find room bookings based on date */
router.get('/view-bookings', async function (req, res, next) {
  const db = await connectToDB();
  try {
    // Get the date
    const date = req.body.date;

    // Find room bookings for the specified date
    const roomBookings = await db.collection("room_info").find({ date: date }).toArray();

    // Prepare the response data for all time slots
    const timeSlots = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    const timemap = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    let data = timemap.map(time => ({
      time: time,
      roomA: 'Empty',
      roomB: 'Empty',
      roomC: 'Empty'
    }));

    // Update the response data based on room bookings
    roomBookings.forEach(booking => {
      const startTime = booking.start_time;
      const endTime = booking.end_time;
      const roomID = booking.room_id;
      
      const startIndex = timeSlots.indexOf(startTime);
      let endIndex;
      if(endTime == '24:00'){
        endIndex = timeSlots.indexOf('23:00') + 1;
      }else{
        endIndex = timeSlots.indexOf(endTime);
      }
      
      data = data.map(slot => {
        if (timemap.indexOf(slot.time) >= startIndex && timemap.indexOf(slot.time) < endIndex) {
          if (roomID.includes('A')) {
            slot.roomA = 'Reserved';
          }
          if (roomID.includes('B')) {
            slot.roomB = 'Reserved';
          }
          if (roomID.includes('C')) {
            slot.roomC = 'Reserved';
          }
        }
        return slot;
      });
    });

    const response = {
      date: date,
      data: data
    };

    res.status(200).json({ status: 200, message: 'Successfully retrieved the room bookings', bookings: response });

  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    await db.client.close();
  }
});


module.exports = router;
