// http://localhost:3001/api/admin/login
// http://localhost:3001/api/admin/add-doctor
// http://localhost:3001/api/admin/all-doctors
// http://localhost:3001/api/admin/update-availability/1



// ✅ adminRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // Same as used in other routes

console.log('✅ adminRoutes.js loaded');

// ✅ Admin Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM admins WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('❌ Admin login error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const admin = results[0];
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email, role: 'admin' }, SECRET_KEY, { expiresIn: '365d' });

    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: {
        id: admin.id,
        email: admin.email
      }
    });
  });
});

// ✅ ADD DOCTOR (by Admin)
router.post('/add-doctor', async (req, res) => {
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
          console.error('❌ Admin doctor add error:', err);
          return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ success: true, message: 'Doctor added successfully by admin' });
      }
    );
  } catch (error) {
    console.error("❌ Hashing error:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// ✅ View All Doctors (Admin only)
router.get('/all-doctors', (req, res) => {
  const sql = 'SELECT id, name, image, speciality, experience, about, fees, address, email FROM doctors';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching doctors:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, doctors: results });
  });
});

//✅Update-Available Doctor
router.put('/update-availability/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  const { available } = req.body;

  const sql = 'UPDATE doctors SET available = ? WHERE id = ?';
  db.query(sql, [available, doctorId], (err, result) => {
    if (err) {
      console.error('❌ Error updating availability:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, message: 'Doctor availability updated' });
  });
});

// ✅ Admin View All Appointments
router.get('/appointments', (req, res) => {
  const sql = `
    SELECT 
      appointments.id, 
      users.full_name AS patient_name, 
      doctors.name AS doctor_name,
      appointments.appointment_date,
      appointments.appointment_time,
      appointments.status
    FROM appointments
    JOIN users ON appointments.user_id = users.id
    JOIN doctors ON appointments.doctor_id = doctors.id
    ORDER BY appointments.appointment_date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Admin appointment fetch error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, appointments: results });
  });
});




module.exports = router;
