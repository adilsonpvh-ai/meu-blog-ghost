import GhostContentAPI from "@tryghost/content-api";

// Crie as variáveis GHOST_URL e GHOST_KEY no seu arquivo .env.local
const api = new GhostContentAPI({
  url: process.env.GHOST_URL || "",
  key: process.env.GHOST_KEY || "",
  version: "v5.0"
});

export async function getPosts() {
  if (!process.env.GHOST_URL || !process.env.GHOST_KEY) {
    console.warn("Ghost CMS não configurado. Verifique o .env.local");
    return [];
  }

  try {
    return await api.posts.browse({
      limit: 'all',
      include: ['tags', 'authors']
    });
  } catch (err) {
    console.error("Erro ao buscar posts no Ghost:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  if (!process.env.GHOST_URL || !process.env.GHOST_KEY) {
    return null;
  }

  try {
    return await api.posts.read({
      slug
    }, {
      include: ['tags', 'authors']
    });
  } catch (err) {
    console.error(`Erro ao buscar o post ${slug}:`, err);
    return null;
  }
}
