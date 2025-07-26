import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PostWithAuthorAndCategory } from "@shared/schema";

export default function PublicHeader() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: posts = [] } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts"],
  });

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (post: PostWithAuthorAndCategory) => {
    setLocation(`/post/${post.slug}`);
    setShowSearch(false);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim().length > 0);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-xl font-bold text-primary font-inter cursor-pointer hover:text-blue-600 transition-colors duration-200">
                <span className="text-gradient">Blog</span>Master
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-secondary hover:text-primary transition-colors duration-200">
                Home
              </Link>
              <a href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                Categories
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                About
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              {showSearch ? (
                <div className="relative">
                  <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={() => setShowSuggestions(searchQuery.trim().length > 0)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="w-64 h-9"
                        autoFocus
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
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
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery("");
                        setShowSuggestions(false);
                      }}
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button type="submit" hidden />
                  </form>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSearch(true)}
                  className="hidden md:flex"
                >
                  <Search className="w-4 h-4" />
                </Button>
              )}
            </div>
            {isAuthenticated && (
              <Link href="/admin">
                <Button className="bg-accent hover:bg-accent/90">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}