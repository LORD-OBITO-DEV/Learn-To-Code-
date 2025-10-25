const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ton modèle Mongoose
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Config nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === 'true', // true pour 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({ error: 'Email déjà utilisé.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Envoyer le mail de bienvenue
    const mailOptions = {
      from: `"LearnToCode" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Bienvenue sur LearnToCode ! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; color:#1e293b; line-height:1.5;">
          <h2>Salut ${username} !</h2>
          <p>Bienvenue sur <strong>LearnToCode</strong> ! 🚀</p>
          <p>Commence dès maintenant à apprendre et à gagner des points sur notre plateforme.</p>
          <p><a href="${process.env.FRONTEND_URL}/login.html" style="background:#1e40af;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">Se connecter</a></p>
          <hr>
          <p style="font-size:0.8em;color:#475569;">© LORD OBITO TECH - ALL RIGHTS RESERVED</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if(err) console.error('Erreur envoi mail:', err);
      else console.log('Mail envoyé:', info.response);
    });

    res.status(201).json({ message: 'Utilisateur créé et mail envoyé !' });

  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
