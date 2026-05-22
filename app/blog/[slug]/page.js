import { getBlogBySlug } from "@/lib/getData";
import { notFound } from "next/navigation";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPostPage({ params }) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-primary-black">
      <article className="max-w-4xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-text-gray hover:text-cyan-glow font-space text-sm font-bold uppercase tracking-widest mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Research
        </Link>

        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-premium-blue/10 border border-premium-blue/30 text-premium-blue font-mono text-xs rounded-full uppercase tracking-widest">
              {post.category || "ARTICLE"}
            </span>
            <div className="flex items-center gap-4 text-text-gray font-mono text-xs uppercase">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-glow" />
                {new Date(post.publishedAt || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-glow" />
                {post.readTime || 5} Min Read
              </span>
            </div>
          </div>

          <h1 className="font-space text-4xl md:text-5xl lg:text-6xl font-black text-text-white leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-text-gray/10">
            <div className="w-12 h-12 rounded-full bg-secondary-dark border border-cyan-glow/20 flex items-center justify-center overflow-hidden relative">
              {post.author?.image ? (
                <Image src={post.author.image} alt={post.author.name} fill className="object-cover" />
              ) : (
                <User className="w-6 h-6 text-text-gray" />
              )}
            </div>
            <div>
              <p className="font-space font-bold text-text-white text-lg">{post.author?.name || "The Darknet Team"}</p>
              <p className="font-inter text-sm text-text-gray">Security Researcher</p>
            </div>
          </div>
        </header>

        {post.mainImage && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-cyan-glow/10">
            <Image src={post.mainImage} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none font-inter text-text-gray 
          prose-headings:font-space prose-headings:font-bold prose-headings:text-text-white
          prose-a:text-premium-blue hover:prose-a:text-cyan-glow prose-a:transition-colors
          prose-strong:text-text-white prose-code:text-cyan-glow prose-code:bg-secondary-dark prose-code:px-1 prose-code:rounded">
          {post.body ? (
            <div dangerouslySetInnerHTML={{ __html: typeof post.body === 'string' ? post.body : "<p>Content formatting not supported in this view.</p>" }} />
          ) : (
            <div className="space-y-6">
              <p className="text-xl text-text-white font-medium leading-relaxed">
                {post.excerpt || "This intelligence report breaks down the technical mechanisms and impact of the vulnerability."}
              </p>
              <p>
                The security landscape is constantly evolving, and understanding the nuances of these threats is critical for maintaining robust defenses. This deep-dive analysis covers the tactics, techniques, and procedures (TTPs) associated with this vector.
              </p>
              <h2 className="text-2xl mt-8 mb-4">Technical Analysis</h2>
              <p>
                Our threat intelligence team has identified several key indicators of compromise (IoCs) and behavioral patterns that security operations centers should monitor. By examining the payload structure and execution flow, we can better anticipate future iterations of this threat.
              </p>
              <div className="glass-panel p-6 border-l-4 border-cyan-glow my-8 bg-secondary-dark/50">
                <p className="m-0 font-mono text-sm text-cyan-glow">
                  // Recommendation: Implement zero-trust architecture principles and ensure all endpoint detection systems are updated with the latest signatures.
                </p>
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
