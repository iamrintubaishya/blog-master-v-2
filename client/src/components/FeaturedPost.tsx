import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import { PostWithAuthorAndCategory } from "@shared/schema";

interface FeaturedPostProps {
  post: PostWithAuthorAndCategory;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/post/${post.slug}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
        <div className="md:flex">
          {post.featuredImage && (
            <div className="md:w-1/2">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          )}
          <div className="md:w-1/2 p-8">
            <div className="flex items-center mb-4">
              <Badge className="bg-accent text-white">Featured</Badge>
              {post.category && (
                <span className="ml-3 text-sm text-secondary">{post.category.name}</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4 font-merriweather">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-secondary mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={post.author.profileImageUrl || ""}
                    alt={`${post.author.firstName} ${post.author.lastName}`}
                  />
                  <AvatarFallback>
                    {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-primary">
                    {post.author.firstName} {post.author.lastName}
                  </p>
                  <p className="text-sm text-secondary">
                    {format(new Date(post.publishedAt || post.createdAt!), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
              {post.readTime && (
                <span className="text-sm text-secondary">{post.readTime} min read</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
