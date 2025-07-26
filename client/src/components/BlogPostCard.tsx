import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import { PostWithAuthorAndCategory } from "@shared/schema";
import { Clock, Eye, Heart, Bookmark, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface BlogPostCardProps {
  post: PostWithAuthorAndCategory;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 cursor-pointer border-0 bg-white hover:scale-[1.02] relative">
      <Link href={`/post/${post.slug}`}>
        <div className="relative">
          {post.featuredImage && (
            <>
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            {post.category && (
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs border-0 hover:shadow-sm">
                {post.category.name}
              </Badge>
            )}
            <span className="text-xs text-secondary flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {format(new Date(post.publishedAt || post.createdAt!), "MMM d")}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-primary mb-3 font-merriweather leading-tight group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-secondary text-sm mb-4 leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-8 h-8 ring-2 ring-blue-100">
                <AvatarImage
                  src={post.author.profileImageUrl || ""}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                />
                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                  {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2 flex flex-col">
                <span className="text-sm text-secondary">
                  {post.author.firstName} {post.author.lastName}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {post.views && (
                <span className="text-xs text-secondary flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {post.views}
                </span>
              )}
              {post.readTime && (
                <span className="text-xs text-secondary">{post.readTime}m</span>
              )}
            </div>
          </div>
          
          {/* Interactive buttons */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`h-8 px-2 hover:bg-red-50 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
              >
                <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs">12</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={`h-8 px-2 hover:bg-blue-50 ${isSaved ? 'text-blue-500' : 'text-gray-400'}`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <div className="text-xs text-secondary">
              Read more →
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
