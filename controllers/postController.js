const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Recupera tutti i post (con filtri opzionali)
async function index(req, res) {
  const { published, search } = req.query;
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
    const posts = await prisma.post.findMany({ where });
    res.json(posts);
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

async function update(req, res){

}

async function destroy(req, res){

}

module.exports = {
    index,
    show,
    store, 
    update,
    destroy
}