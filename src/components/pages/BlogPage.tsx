import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Image } from '@/components/ui/image';

interface BlogArticle {
  _id: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  featuredImage?: string;
  publishedDate?: Date | string;
  author?: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await BaseCrudService.getAll<BlogArticle>('blogarticles', [], { limit: 50 });
        setArticles(result.items || []);
      } catch (error) {
        console.error('Error fetching blog articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const categories = ['Kaufberatung', 'Finanzierung', 'Autopflege'];
  const filteredArticles = React.useMemo(() => (
    selectedCategory
      ? articles.filter(article => article.category === selectedCategory)
      : articles
  ), [articles, selectedCategory]);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-primary to-primary/90 py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Automobile Quick Blog
            </h1>
            <p className="font-paragraph text-lg text-white/90 max-w-2xl">
              Tipps, Ratgeber und aktuelle Informationen rund um den Gebrauchtwagenkauf, Finanzierung und Autopflege in Iserlohn.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="w-full bg-white border-b border-neutral-100 py-8">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-lg font-paragraph font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-primary hover:bg-neutral-200'
                }`}
              >
                Alle Artikel
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-paragraph font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 text-primary hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-neutral-100 rounded-lg h-96 animate-pulse" />
                ))}
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredArticles.map(article => (
                  <Link
                    key={article._id}
                    to={`/blog/${article.slug}`}
                    className="group bg-white rounded-lg overflow-hidden border border-neutral-100 hover:border-primary hover:shadow-lg transition-all duration-300"
                  >
                    {/* Featured Image */}
                    {article.featuredImage && (
                      <div className="relative h-48 overflow-hidden bg-neutral-100">
                        <Image
                          src={article.featuredImage}
                          alt={article.title || 'Blog article'}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Category Badge */}
                      {article.category && (
                        <div className="inline-block mb-3">
                          <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-paragraph font-medium">
                            {article.category}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-heading text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="font-paragraph text-neutral-600 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs font-paragraph text-neutral-500">
                        <span>{formatDate(article.publishedDate)}</span>
                        {article.author && <span>{article.author}</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-paragraph text-lg text-neutral-600">
                  Keine Artikel in dieser Kategorie gefunden.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      
    </div>
  );
}
