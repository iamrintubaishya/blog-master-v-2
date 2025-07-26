import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, BookOpen, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useSearch } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import FeaturedPost from "@/components/FeaturedPost";
import BlogPostCard from "@/components/BlogPostCard";
import { PostWithAuthorAndCategory } from "@shared/schema";

export default function Landing() {
  const { user } = useAuth();
  const searchParams = useSearch();
  const urlSearchQuery = new URLSearchParams(searchParams).get('search') || '';
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Filter posts for suggestions
  const suggestions = searchQuery.trim().length > 0 
    ? posts.filter(post => {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.category?.name.toLowerCase().includes(query)
        );
      }).slice(0, 5) // Limit to 5 suggestions
    : [];

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

  const handleSuggestionClick = (post: PostWithAuthorAndCategory) => {
    window.location.href = `/post/${post.slug}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState(null, '', `/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=800&fit=crop&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Featured Stories</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-merriweather leading-tight">
              Discover Stories That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Inspire
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Dive into a world of knowledge with expertly crafted articles on technology, design, and innovation from industry leaders.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(searchQuery.trim().length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                  {suggestions.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handleSuggestionClick(post)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-1">
                        {post.excerpt}
                      </div>
                      {post.category && (
                        <div className="text-xs text-blue-600 font-medium mt-1">
                          {post.category.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </form>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-2 text-white/90">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">{posts.length}+ Articles</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Users className="w-5 h-5" />
                <span className="font-medium">Expert Authors</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Weekly Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !featuredLoading && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* Recent Posts */}
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