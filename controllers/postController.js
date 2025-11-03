const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Recupera tutti i post (con filtri opzionali)
async function index(req, res) {
  const { published, search, page = 1, limit = 10 } = req.query;

    // Calcola quanti record saltare
    const skip = (page - 1) * limit;

    // Costruisci il filtro where per Prisma
  let where = {};

  if (published !== undefined) {
    where.published = published === 'true';
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } }
    ];
  }

  try {
    const posts = await prisma.post.findMany({ 
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: {
            createdAt: 'desc', 
        },
    });

    // Conta il totale dei post che rispettano il filtro
    const totalCount = await prisma.post.count({ where });

    res.json({
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        data: posts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei post' });
  }
}

// Recupera un post tramite slug
async function show(req, res) {
  const { slug } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return res.status(404).json({ error: 'Post non trovato' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del post' });
  }
}

// Crea un nuovo post
async function store(req, res) {
  const newData = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        title: newData.title,
        slug: newData.slug,
        image: newData.image,
        content: newData.content,
        published: newData.published,
      }
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Aggiorna un post tramite slug
async function update(req, res) {
  const { slug } = req.params;
  const incomingData = req.body;

  try {
    // Controlla se il post esiste
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post non trovato' });
    }

    // Aggiorna il post con i nuovi dati
    const updatedPost = await prisma.post.update({
      data: incomingData,
      where: { slug },
    });

    return res.json(updatedPost);
  } catch (error) {
    // Gestisci eventuali errori server o di validazione
    res.status(500).json({ error: error.message });
  }
}

// Elimina un post tramite slug
async function destroy(req, res) {
  const { slug } = req.params;

  try {
    // Controlla se il post esiste
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post non trovato' });
    }

    // Elimina il post
    await prisma.post.delete({
      where: { slug },
    });

    // Risposta con status 204 (No Content) dopo eliminazione
    res.status(204).send();
  } catch (error) {
    // Gestisci eventuali errori server
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    index,
    show,
    store, 
    update,
    destroy
}