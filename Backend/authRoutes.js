//For User Resister and Login 

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const router = express.Router();
const verifyToken = require('./authMiddleware');


const SECRET_KEY = 'your-secret-key'; // Replace with secure key in production

// ✅ REGISTER ROUTE
router.post('/register', async (req, res) => {
  const {
    full_name,
    email,
    password,
    phone,
    gender = 'Not Selected',
    dob = 'Not Selected',
    address_line = '',
    //profile_image = null // optional, can be set later via upload
  } = req.body;

  // Validate required fields
  if (!full_name || !email || !password || !phone) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (full_name, email, password, phone, gender, dob, address_line)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // db.query(sql, [full_name, email, hashedPassword, phone, gender, dob, address_line, profile_image], (err) => {
    db.query(sql, [full_name, email, hashedPassword, phone, gender, dob, address_line], (err) => {
      if (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      res.json({ success: true, message: 'User registered successfully' });
    });
  } catch (err) {
    console.error('Hashing error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ LOGIN ROUTE
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Optional: return user info along with token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        // profile_image: user.profile_image,
        gender: user.gender,
        dob: user.dob,
        address_line: user.address_line
      }
    });
  });
});


// ✅ GET USER PROFILE (Protected)
router.get('/profile', verifyToken, (req, res) => {
  const userId = req.user.id;

  // const sql = `SELECT id, full_name, email, phone, gender, dob, address_line, profile_image FROM users WHERE id = ?`;
  const sql = `SELECT id, full_name, email, phone, gender, dob, address_line FROM users WHERE id = ?`;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Profile fetch error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: results[0]
    });
  });
});


// // ✅ UPDATE USER PROFILE (Protected)
// router.put('/profile', verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const {
//     full_name,
//     phone,
//     gender,
//     dob,
//     address_line,
//     profile_image
//   } = req.body;

//   const sql = `
//     UPDATE users 
//     // SET full_name = ?, phone = ?, gender = ?, dob = ?, address_line = ?, profile_image = ?
//     SET full_name = ?, phone = ?, gender = ?, dob = ?, address_line = ?
//     WHERE id = ?
//   `;

//   db.query(
//     sql,
//     // [full_name, phone, gender, dob, address_line, profile_image, userId],
//     [full_name, phone, gender, dob, address_line, userId],
//     (err, result) => {
//       if (err) {
//         console.error('Update error:', err);
//         return res.status(500).json({ success: false, message: 'Database error' });
//       }

//       res.json({ success: true, message: 'Profile updated successfully' });
//     }
//   );
// });


module.exports = router;
