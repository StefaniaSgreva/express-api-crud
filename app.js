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

app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
});