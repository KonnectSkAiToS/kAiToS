import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/content';
import { BlogPost } from '../types';
import { ArrowRight, X, Clock, BookOpen } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'AI & Systems', 'Cloud Architecture', 'Company Updates'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <section className="py-16 lg:py-24 bg-[#090D16] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-cyan-400 mb-2">
              DISPATCHES & SYSTEM INSIGHTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              Technical essays, kernel dispatches, and architecture blueprints.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Written directly by kÅiTøS architects and systems engineers. We document production benchmarks, hard-won debugging stories, and the evolution of autonomous IT.
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus:outline-none ${
                  selectedCategory === cat
                    ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-mono">
                  <span className="text-cyan-400">{post.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{post.publishedDate}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Author attribution */}
                <div className="text-xs text-slate-400 mb-6">
                  By <strong className="text-slate-200">{post.author.name}</strong> · {post.author.role}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(post)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 focus:outline-none"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Full Article</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  {post.tags.slice(0, 2).map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-mono">
                <span className="text-cyan-400 font-bold">{activeArticle.category}</span>
                <span>·</span>
                <span>{activeArticle.publishedDate}</span>
                <span>·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                {activeArticle.title}
              </h2>
              <div className="text-xs text-slate-400">
                Authored by <strong className="text-slate-200">{activeArticle.author.name}</strong> ({activeArticle.author.role})
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              {activeArticle.content.map((paragraph, pIdx) => (
                <p key={pIdx}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tag List */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-2">
              {activeArticle.tags.map(tag => (
                <span key={tag} className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
