const express = require('express');
const router = express.Router();
const db = require('./db');
const verifyToken = require('./authMiddleware');

// ✅ Book Appointment (React frontend compatible)
router.post('/book', verifyToken, (req, res) => {
  const { doctor_id, appointment_date, appointment_time } = req.body;
  const user_id = req.user.id;

  if (!doctor_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO appointments (user_id, doctor_id, appointment_date, appointment_time, status)
    VALUES (?, ?, ?, ?, 'Scheduled')
  `;

  db.query(sql, [user_id, doctor_id, appointment_date, appointment_time], (err, result) => {
    if (err) {
      console.error('❌ Booking error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({
      success: true,
      message: 'Appointment booked successfully',
      appointment_id: result.insertId
    });
  });
});

// ✅ Check Slot Availability
router.post('/check-slot', verifyToken, (req, res) => {
  const { doctor_id, appointment_date, appointment_time } = req.body;

  if (!doctor_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const sql = `
    SELECT * FROM appointments
    WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND status = 'Scheduled'
  `;

  db.query(sql, [doctor_id, appointment_date, appointment_time], (err, results) => {
    if (err) {
      console.error('❌ Slot check error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      return res.json({ success: false, message: 'Slot not available' });
    }

    res.json({ success: true, message: 'Slot is available' });
  });
});

module.exports = router;