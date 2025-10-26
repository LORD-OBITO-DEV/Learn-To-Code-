/backend
 ├── server.js              # Point d'entrée Express
 ├── config.js              # Config (DB, Twilio, JWT secret…)
 ├── db.js                  # Connexion PostgreSQL
 ├── routes/
 │    ├── auth.js           # login/signup/logout
 │    ├── numbers.js        # recherche/achat numéros
 │    ├── orders.js         # gestion commandes
 │    └── webhooks.js       # réception SMS Twilio
 ├── models/
 │    ├── User.js
 │    ├── Number.js
 │    └── Order.js
 ├── middlewares/
 │    └── authMiddleware.js # vérif JWT
 ├── package.json
 └── .env