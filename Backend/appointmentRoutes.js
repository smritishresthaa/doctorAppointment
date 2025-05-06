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

router.get('/user', verifyToken, (req, res) => {
  const user_id = req.user.id;

  const sql = `
    SELECT * FROM appointments
    WHERE user_id = ? 
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('❌ Fetch error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({
      success: true,
      appointments: results
    });
  });
});

// Get a specific appointment by ID
router.get('/:id', verifyToken, (req, res) => {
  const appointmentId = req.params.id;
  const userId = req.user.id;

  const sql = `
    SELECT * FROM appointments 
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [appointmentId, userId], (err, results) => {
    if (err) {
      console.error('❌ Fetch error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      appointment: results[0]
    });
  });
});

// Cancel appointment
router.delete('/:id', verifyToken, (req, res) => {
  const appointmentId = req.params.id;
  const userId = req.user.id;

  // First check if the appointment exists and belongs to the user
  const checkSql = `
    SELECT * FROM appointments 
    WHERE id = ? AND user_id = ?
  `;

  db.query(checkSql, [appointmentId, userId], (err, results) => {
    if (err) {
      console.error('❌ Check error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found or you are not authorized to cancel it'
      });
    }

    const appointment = results[0];

    // Check if appointment is in the past
    if (new Date(appointment.appointment_date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel past appointments'
      });
    }

    // Delete the appointment
    const deleteSql = `
      DELETE FROM appointments 
      WHERE id = ?
    `;

    db.query(deleteSql, [appointmentId], (deleteErr) => {
      if (deleteErr) {
        console.error('❌ Delete error:', deleteErr);
        return res.status(500).json({ success: false, message: 'Failed to cancel appointment' });
      }

      res.json({
        success: true,
        message: 'Appointment cancelled successfully'
      });
    });
  });
});

// Reschedule appointment
router.put('/:id', verifyToken, (req, res) => {
  const appointmentId = req.params.id;
  const userId = req.user.id;
  const { appointment_date, appointment_time } = req.body;

  // Validate input
  if (!appointment_date || !appointment_time) {
    return res.status(400).json({
      success: false,
      message: 'Appointment date and time are required'
    });
  }

  // Check if the new date is valid
  const newDate = new Date(appointment_date);
  if (isNaN(newDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid date format'
    });
  }

  // Check if the new date is in the future
  if (newDate < new Date()) {
    return res.status(400).json({
      success: false,
      message: 'Cannot reschedule to a past date'
    });
  }

  // First check if the appointment exists and belongs to the user
  const checkSql = `
    SELECT * FROM appointments 
    WHERE id = ? AND user_id = ?
  `;

  db.query(checkSql, [appointmentId, userId], (err, results) => {
    if (err) {
      console.error('❌ Check error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found or you are not authorized to reschedule it'
      });
    }

    const appointment = results[0];

    // Check if appointment is in the past
    if (new Date(appointment.appointment_date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot reschedule past appointments'
      });
    }

    // Update the appointment
    const updateSql = `
      UPDATE appointments 
      SET appointment_date = ?, appointment_time = ?, status = 'Rescheduled'
      WHERE id = ?
    `;

    db.query(updateSql, [appointment_date, appointment_time, appointmentId], (updateErr) => {
      if (updateErr) {
        console.error('❌ Update error:', updateErr);
        return res.status(500).json({ success: false, message: 'Failed to reschedule appointment' });
      }

      // Get the updated appointment
      const getUpdatedSql = `
        SELECT * FROM appointments 
        WHERE id = ?
      `;

      db.query(getUpdatedSql, [appointmentId], (getErr, updatedResults) => {
        if (getErr) {
          console.error('❌ Get updated error:', getErr);
          return res.status(500).json({
            success: true,
            message: 'Appointment rescheduled successfully, but failed to retrieve updated details'
          });
        }

        res.json({
          success: true,
          message: 'Appointment rescheduled successfully',
          appointment: updatedResults[0]
        });
      });
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