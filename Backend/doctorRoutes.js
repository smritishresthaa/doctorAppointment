// http://localhost:3001/api/doctors/register
// http://localhost:3001/api/doctors/login


const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./authMiddleware');

const SECRET_KEY = 'your-secret-key'; // Replace with .env variable in production

console.log("✅ doctorRoutes.js loaded");

// ✅ REGISTER DOCTOR
router.post('/register', async (req, res) => {
  const {
    name,
    image,
    speciality,
    experience,
    about,
    fees,
    address,
    email,
    password
  } = req.body;

  // Validate required fields
  if (!name || !email || !password || !speciality) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO doctors (name, image, speciality, experience, about, fees, address, email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, image, speciality, experience, about, fees, address, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('❌ Doctor registration error:', err);
          return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ success: true, message: 'Doctor registered successfully' });
      }
    );
  } catch (error) {
    console.error("❌ Hashing error:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ✅ LOGIN DOCTOR
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM doctors WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('❌ Doctor login error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const doctor = results[0];
    const match = await bcrypt.compare(password, doctor.password);

    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: doctor.id, email: doctor.email, role: 'doctor' },
      SECRET_KEY,
      { expiresIn: '365d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        image: doctor.image,
        speciality: doctor.speciality,
        experience: doctor.experience,
        about: doctor.about,
        fees: doctor.fees,
        address: doctor.address
      }
    });
  });
});


// // ✅ GET DOCTOR PROFILE (Protected Route)
// router.get('/profile', verifyToken, (req, res) => {
//   const doctorId = req.user.id;

//   const sql = `
//     SELECT id, name, email, image, speciality, experience, about, fees, address
//     FROM doctors
//     WHERE id = ?
//   `;

//   db.query(sql, [doctorId], (err, results) => {
//     if (err) {
//       console.error('❌ Doctor profile fetch error:', err);
//       return res.status(500).json({ success: false, message: 'Database error' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ success: false, message: 'Doctor not found' });
//     }

//     res.json({ success: true, doctor: results[0] });
//   });
// });


// ✅ Public Route: Get all available doctors (for users)
router.get('/available', (req, res) => {
    const sql = 'SELECT id, name, image, speciality, experience, about, fees, address, email FROM doctors WHERE available = 1';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('❌ Error fetching available doctors:', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }
  
      res.json({ success: true, doctors: results });
    });
  });
  
module.exports = router;
