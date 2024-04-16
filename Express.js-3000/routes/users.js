var express = require('express');
var router = express.Router();

const { connectToDB, ObjectId } = require('../utils/db');

const { generateToken, decodeToken } = require('../utils/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Login by u_email and u_pwd */
router.post('/login', async function (req, res, next) {
  const db = await connectToDB();
  try {
    // Check if the user is already logged in
    if (req.headers.authorization) {
      return res.status(200).json({ status: 200, message: 'User is already logged in' });
    }

    // check if the user exists
    var user = await db.collection("user_info").findOne({ u_email: req.body.u_email });
    if (!user) {
      res.status(401).json({ status: 401, message: 'User not found' });
      return;
    }

    // Check if the password matches
    if (user.u_pwd !== req.body.u_pwd) {
      res.status(401).json({ status: 401, message: 'Incorrect password' });
      return;
    }

    // res.json(user);

    delete user.u_pwd;
    delete user.ip_address;

    // generate a JWT token
    const token = generateToken(user);

    // return the token
    res.status(200).json({ status: 200, message: 'Successful login!', token: token });

  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    await db.client.close();
  }
});

// POST请求，Token通过JSON传入(解码token)
router.post('/decodeToken', (req, res) => {
  const { token } = req.body;
  try {
    const decoded = decodeToken(token);
    res.json(decoded);
  } catch (error) {
    res.status(400).json({ status: 400, error: 'Invalid token' });
  }
});

/* Register new user */
router.post('/register', async function (req, res, next) {
  const db = await connectToDB();
  try {
    // Check if the user already exists
    const existingUser = await db.collection("user_info").findOne({ u_email: req.body.u_email });
    if (existingUser) {
      res.status(400).json({ status: 400, message: 'User already exists' });
      return;
    }

    // Create a new user object
    const newUser = {
      u_email: req.body.u_email,
      u_name: req.body.u_name,
      u_pwd: req.body.u_pwd, // Note: Encryption may be required here
      u_gender: req.body.u_gender,
      u_age: req.body.u_age,
      u_career: req.body.u_career,
      created_at: new Date(),
      modified_at: new Date()
    };

    // Insert the new user into the database
    const result = await db.collection("user_info").insertOne(newUser);

    res.status(201).json({ status: 201, message: 'New user created successfully', _id: result.insertedId });
    
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    await db.client.close();
  }
});

/* show user information */
router.get('/show-user', async function (req, res, next) {
  const db = await connectToDB();
  try {
    // Extract JWT from Authorization header
    const token = req.headers.authorization.split(' ')[1];
    
    // Decode the JWT
    const decoded = decodeToken(token);

    // Get user email from the decoded JWT
    const _id = decoded._id;

    const user = await db.collection("user_info").findOne({ _id: _id });

    res.status(200).json({ status: 200, message: 'Successfully find user information', user: user });
    
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    await db.client.close();
  }
});

/* Update user information *///待测
router.post('/update-user', async function (req, res, next) {
  const db = await connectToDB();
  try {
    // Extract JWT from Authorization header
    const token = req.headers.authorization.split(' ')[1];
    
    // Verify the JWT
    const decoded = decodeToken(token);

    // Get user ID from the decoded JWT
    const userId = decoded._id;

    // Check if the user exists
    const user = await db.collection("user_info").findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    // Update user information
    const updateData = {
      $set: {
        u_name: req.body.u_name || user.u_name,
        u_gender: req.body.u_gender || user.u_gender,
        u_age: req.body.u_age || user.u_age,
        u_career: req.body.u_career || user.u_career,
        modified_at: new Date()  // Update modified_at time
      }
    };

    await db.collection("user_info").updateOne({ _id: ObjectId(userId) }, updateData);

    res.status(200).json({ status: 200, message: 'User information updated successfully' });
    
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    await db.client.close();
  }
});

/* Delete user based on user ID *///待测
router.delete('/delete-user', async function (req, res, next) {
  const db = await connectToDB();
  try {
    // Extract JWT from Authorization header
    const token = req.headers.authorization.split(' ')[1];
    
    // Verify the JWT
    const decoded = decodeToken(token);

    // Get user ID from the decoded JWT
    const userId = decoded._id;

    // Check if the user exists
    const user = await db.collection("user_info").findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    // Delete the user
    await db.collection("user_info").deleteOne({ _id: ObjectId(userId) });

    res.status(200).json({ status: 200, message: 'User deleted successfully' });
    
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    await db.client.close();
  }
});

/* Find bookings based on user id *///待测
router.get('/show-bookings', async function (req, res, next) {
  const db = await connectToDB();
  try {
    // Extract JWT from Authorization header
    const token = req.headers.authorization.split(' ')[1];
    
    // Decode the JWT
    const decoded = decodeToken(token);

    // Get user email from the decoded JWT
    const _id = decoded._id;

    // Find room bookings for the user
    const bookings = await db.collection("room_info").find({ _id: _id }).toArray();

    if (bookings.length === 0) {
      return res.status(404).json({ status: 404, message: 'No bookings found for this user' });
    }

    res.status(200).json({ status: 200, message: 'Successfully find the bookings', bookings: bookings });
    
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    await db.client.close();
  }
});

module.exports = router;
