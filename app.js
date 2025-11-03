const express = require("express");
const dotenv = require("dotenv");
const postRoutes = require('./routes/postRoutes');
const app = express();
const port = 3000;

dotenv.config();

// Accetta payload JSON
app.use(express.json());


// Monta le rotte dei post
app.use('/', postRoutes);

// Middleware per gestire rotte non trovate (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Errore 404 - Pagina non trovata' });
});


app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
});