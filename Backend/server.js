const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const appointmentRoutes = require('./appointmentRoutes');
const authRoutes = require('./authRoutes');
const doctorRoutes = require('./doctorRoutes');
const adminRoutes = require('./adminRoutes'); // ✅ Added admin routes

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Define API routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/admin', adminRoutes); // ✅ Register admin routes

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
