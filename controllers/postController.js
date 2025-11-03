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

async function show(req, res){

}

async function store(req, res){

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