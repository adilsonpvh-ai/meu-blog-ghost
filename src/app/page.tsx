import { getPosts } from "@/lib/ghost";


export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950 -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-20 text-center space-y-6">
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
            Ghost CMS + Next.js
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500">
            Meu Blog Premium
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Uma arquitetura ultrarrápida combinando a potência visual do Next.js com a facilidade de publicação do Ghost CMS hospedado no seu Coolify.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center p-12 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-xl">
            <h3 className="text-xl font-medium mb-2">Nenhum post encontrado</h3>
            <p className="text-neutral-400">
              Parece que seu Ghost está vazio ou as credenciais no .env.local não foram configuradas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article 
                key={post.id} 
                className="group relative flex flex-col items-start justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-indigo-500/50 hover:-translate-y-1"
              >
                <div className="flex items-center gap-x-4 text-xs mb-4">
                  <time dateTime={post.published_at} className="text-neutral-400">
                    {new Date(post.published_at).toLocaleDateString('pt-BR')}
                  </time>
                  {post.tags?.[0] && (
                    <span className="relative z-10 rounded-full bg-indigo-500/10 px-3 py-1.5 font-medium text-indigo-300">
                      {post.tags[0].name}
                    </span>
                  )}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-xl font-semibold leading-6 text-white group-hover:text-indigo-300 transition-colors">
                    <a href={`/post/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-neutral-400">
                    {post.excerpt || "Sem descrição disponível para este artigo."}
                  </p>
                </div>
                {post.authors?.[0] && (
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-white">
                        <span className="absolute inset-0" />
                        {post.authors[0].name}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
