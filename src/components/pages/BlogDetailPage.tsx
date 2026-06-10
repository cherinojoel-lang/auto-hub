import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface BlogArticle {
  _id: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  featuredImage?: string;
  content?: string;
  publishedDate?: Date | string;
  author?: string;
  metaDescription?: string;
}


const parseTable = (paragraph: string) => {
  const lines = paragraph.split('\n');
  const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
  const rows = lines.slice(2).map(line =>
    line.split('|').map(cell => cell.trim()).filter(Boolean)
  );
  return { headers, rows };
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!slug) {
          setError('Article not found');
          setIsLoading(false);
          return;
        }

        const result = await BaseCrudService.getAll<BlogArticle>('blogarticles', [], { limit: 1, filters: { slug } });

        if (result.items && result.items.length > 0) {
          setArticle(result.items[0]);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Error loading article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderContent = (content: string | undefined) => {
    if (!content) return null;

    return (
      <div className="prose prose-lg max-w-none font-paragraph text-neutral-700 leading-relaxed">
        {content.split('\n\n').map((paragraph, index) => {
          // Handle headings
          if (paragraph.startsWith('# ')) {
            return (
              <h1 key={index} className="font-heading text-4xl font-bold text-primary mt-8 mb-4">
                {paragraph.replace('# ', '')}
              </h1>
            );
          }
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="font-heading text-2xl font-bold text-primary mt-6 mb-3">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="font-heading text-xl font-bold text-primary mt-4 mb-2">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          // Handle lists
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter(line => line.startsWith('- '));
            return (
              <ul key={index} className="list-disc list-inside space-y-2 my-4">
                {items.map((item, i) => (
                  <li key={i} className="text-neutral-700">
                    {item.replace('- ', '')}
                  </li>
                ))}
              </ul>
            );
          }
          // Handle tables
          if (paragraph.includes('|')) {
            const { headers, rows } = parseTable(paragraph);
            return (
              <div key={index} className="overflow-x-auto my-6">
                <table className="w-full border-collapse border border-neutral-300">
                  <thead>
                    <tr className="bg-neutral-100">
                      {headers.map((header, i) => (
                        <th key={i} className="border border-neutral-300 px-4 py-2 text-left font-bold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="hover:bg-neutral-50">
                        {row.map((cell, j) => (
                          <td key={j} className="border border-neutral-300 px-4 py-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          // Handle CTA blocks
          if (paragraph.includes('[CTA]')) {
            const ctaMatch = paragraph.match(/\[CTA\](.*?)\[\/CTA\]/);
            if (ctaMatch) {
              const ctaText = ctaMatch[1];
              const linkMatch = ctaText.match(/\[(.*?)\]\((.*?)\)/);
              if (linkMatch) {
                return (
                  <div key={index} className="bg-secondary/10 border-l-4 border-secondary p-6 my-6 rounded">
                    <Link
                      to={linkMatch[2]}
                      className="inline-block px-6 py-3 bg-secondary text-white rounded-lg font-heading font-bold hover:bg-secondary/90 transition-colors"
                    >
                      {linkMatch[1]}
                    </Link>
                  </div>
                );
              }
            }
          }
          // Regular paragraph
          if (paragraph.trim()) {
            return (
              <p key={index} className="my-4 text-neutral-700 leading-relaxed">
                {paragraph}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </main>
        
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-primary mb-4">Artikel nicht gefunden</h1>
            <Link to="/blog" className="text-secondary hover:underline font-paragraph font-medium">
              Zurück zum Blog
            </Link>
          </div>
        </main>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 w-full">
        {/* Featured Image */}
        {article.featuredImage && (
          <div className="w-full h-96 overflow-hidden bg-neutral-100">
            <Image
              src={article.featuredImage}
              alt={article.title || 'Blog article'}
              width={1200}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="w-full py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-neutral-200">
              {article.category && (
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-paragraph font-medium">
                  {article.category}
                </span>
              )}
              <span className="font-paragraph text-sm text-neutral-600">
                {formatDate(article.publishedDate)}
              </span>
              {article.author && (
                <span className="font-paragraph text-sm text-neutral-600">
                  Von {article.author}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
              {article.title}
            </h1>

            {/* Content */}
            {renderContent(article.content)}

            {/* Back Link */}
            <div className="mt-12 pt-6 border-t border-neutral-200">
              <Link
                to="/blog"
                className="inline-flex items-center text-secondary hover:text-secondary/80 font-paragraph font-medium transition-colors"
              >
                ← Zurück zum Blog
              </Link>
            </div>
          </div>
        </article>
      </main>

      
    </div>
  );
}
