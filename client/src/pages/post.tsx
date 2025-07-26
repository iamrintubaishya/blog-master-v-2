import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Clock, Eye, Share2, Bookmark, Heart, MessageCircle, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { PostWithAuthorAndCategory } from "@shared/schema";
import { useState } from "react";

export default function Post() {
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: post, isLoading, error } = useQuery<PostWithAuthorAndCategory>({
    queryKey: ["/api/posts", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="h-64 bg-muted rounded" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/6" />
            </div>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Post Not Found</h1>
            <p className="text-secondary mb-8">The post you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const handleShare = async (platform?: 'twitter' | 'facebook' | 'linkedin') => {
    const url = window.location.href;
    const title = post?.title || 'Check out this article';
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else {
      // Copy to clipboard
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PublicHeader />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-blue-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Post header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            {post.category && (
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                {post.category.name}
              </Badge>
            )}
            <time dateTime={post.publishedAt || post.createdAt!} className="text-sm text-secondary">
              {format(new Date(post.publishedAt || post.createdAt!), "MMMM d, yyyy")}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-merriweather leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-secondary leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Featured image */}
          {post.featuredImage && (
            <div className="mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          )}

          {/* Author info */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-8">
            <div className="flex items-center">
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage
                  src={post.author.profileImageUrl || ""}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                />
                <AvatarFallback>
                  {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-primary">
                  {post.author.firstName} {post.author.lastName}
                </p>
                <p className="text-sm text-secondary">{post.author.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-secondary">
              {post.readTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min read
                </div>
              )}
              {post.views !== undefined && (
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views} views
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Post content */}
        <div 
          className="prose prose-lg max-w-none mb-12 font-merriweather leading-relaxed prose-headings:font-merriweather prose-headings:text-primary prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-primary prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Engagement actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant={isLiked ? "default" : "outline"}
                onClick={() => setIsLiked(!isLiked)}
                className={`group ${isLiked ? 'bg-red-500 hover:bg-red-600 text-white' : 'hover:bg-red-50 hover:text-red-500 hover:border-red-200'} transition-all duration-200`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''} group-hover:scale-110 transition-transform`} />
                {isLiked ? 'Liked' : 'Like'}
                <span className="ml-1 text-sm opacity-75">24</span>
              </Button>

              <Button
                variant={isBookmarked ? "default" : "outline"}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`group ${isBookmarked ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200'} transition-all duration-200`}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''} group-hover:scale-110 transition-transform`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="group hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all duration-200"
              >
                <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Share
              </Button>
            </div>

            <Button variant="outline" className="group hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all duration-200">
              <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Comment
              <span className="ml-1 text-sm opacity-75">8</span>
            </Button>
          </div>

          {/* Share options */}
          {showShareOptions && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-4">Share this article</p>
              <div className="flex gap-3 flex-wrap">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleShare('twitter')}
                  className="flex items-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleShare('facebook')}
                  className="flex items-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleShare()}
                  className="flex items-center hover:bg-gray-50 hover:text-gray-600 hover:border-gray-200 transition-all duration-200"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </article>

      <PublicFooter />
    </div>
  );
}
