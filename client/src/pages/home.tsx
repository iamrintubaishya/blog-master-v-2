import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useSearch } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import FeaturedPost from "@/components/FeaturedPost";
import BlogPostCard from "@/components/BlogPostCard";
import { PostWithAuthorAndCategory } from "@shared/schema";
import { useState, useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const searchParams = useSearch();
  const urlSearchQuery = new URLSearchParams(searchParams).get('search') || '';
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  
  const { data: posts = [], isLoading: postsLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts"],
  });

  const { data: featuredPost, isLoading: featuredLoading } = useQuery<PostWithAuthorAndCategory>({
    queryKey: ["/api/posts/featured"],
  });

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.category?.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-subtle py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-merriweather">
            Welcome back, {(user as any)?.firstName || "Writer"}!
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
            Discover insightful articles, thoughtful perspectives, and engaging stories from our community of writers.
          </p>
          <Link href="/admin">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !featuredLoading && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-primary font-merriweather">
            {searchQuery.trim() ? `Search Results for "${searchQuery}"` : 'Latest Articles'}
          </h2>
          {searchQuery.trim() && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                window.history.pushState(null, '', '/');
              }}
              className="text-sm"
            >
              Clear Search
            </Button>
          )}
        </div>
        
        {postsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full h-48 bg-muted animate-pulse" />
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(0, searchQuery.trim() ? filteredPosts.length : 6).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : searchQuery.trim() ? (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No articles found matching "{searchQuery}".</p>
            <p className="text-secondary text-sm mt-2">Try searching with different keywords.</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No articles published yet.</p>
          </div>
        )}
      </section>

      <PublicFooter />
    </div>
  );
}
