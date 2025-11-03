const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /posts
// // Recupera tutti i post con eventuali filtri
router.get('/posts', postController.index);

// GET /posts/:slug
// Recupera un singolo post tramite slug
router.get('/posts/:slug', postController.show);

// POST /posts
// Crea un nuovo post
router.post('/posts', postController.store);

// PUT /posts/:slug
// Aggiorna un post tramite slug
router.put('/posts/:slug', postController.update);

// DELETE /posts/:slug
// Elimina un post tramite slug
router.delete('/posts/:slug', postController.destroy);

module.exports = router;