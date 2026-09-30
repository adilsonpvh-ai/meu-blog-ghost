import { getPostBySlug } from "@/lib/ghost";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-neutral-950 to-neutral-950 -z-10" />
      
      <article className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-14 text-center">
          <div className="flex justify-center items-center gap-x-4 text-sm mb-6 text-neutral-400">
            <time dateTime={post.published_at || undefined}>
              {post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR') : ''}
            </time>
            {post.tags && post.tags.length > 0 && (
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 font-medium text-indigo-300">
                {post.tags[0].name}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400 mb-8">
            {post.title}
          </h1>

          {post.authors && post.authors.length > 0 && (
            <div className="flex justify-center items-center gap-3">
              <div className="text-sm">
                <p className="font-medium text-white">{post.authors[0].name}</p>
              </div>
            </div>
          )}
        </header>

        {/* Feature Image se houver */}
        {post.feature_image && (
          <div className="mb-16 rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={post.feature_image} 
              alt={post.title} 
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        )}

        {/* Conteúdo HTML vindo do Ghost */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-indigo prose-img:rounded-2xl prose-a:text-indigo-400 hover:prose-a:text-indigo-300"
          dangerouslySetInnerHTML={{ __html: post.html || '' }}
        />
        
        <div className="mt-20 border-t border-white/10 pt-10 text-center">
          <a href="/" className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            <span className="mr-2">←</span> Voltar para a Home
          </a>
        </div>
      </article>
    </main>
  );
}
