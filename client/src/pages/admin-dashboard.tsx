import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import AdminSidebar from "@/components/AdminSidebar";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import PostEditor from "@/components/PostEditor";
import { PostWithAuthorAndCategory } from "@shared/schema";

export default function AdminDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<PostWithAuthorAndCategory | null>(null);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "Please log in to access admin panel",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: posts = [], isLoading: postsLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/admin/posts"],
    enabled: isAuthenticated,
  });

  const { data: stats } = useQuery<{
    totalPosts: number;
    totalViews: number;
    publishedPosts: number;
    draftPosts: number;
  }>({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowPostEditor(true);
  };

  const handleEditPost = (post: PostWithAuthorAndCategory) => {
    setEditingPost(post);
    setShowPostEditor(true);
  };

  const handleCloseEditor = () => {
    setShowPostEditor(false);
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-subtle">
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
              <p className="text-secondary mt-1">Manage your blog content and settings</p>
            </div>
            <Button onClick={handleCreatePost} className="bg-accent hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Edit className="text-accent text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-secondary">Total Posts</p>
                      <p className="text-2xl font-bold text-primary">{stats.totalPosts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Eye className="text-green-500 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-secondary">Total Views</p>
                      <p className="text-2xl font-bold text-primary">{stats.totalViews}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Edit className="text-green-500 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-secondary">Published</p>
                      <p className="text-2xl font-bold text-primary">{stats.publishedPosts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <Edit className="text-orange-500 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-secondary">Drafts</p>
                      <p className="text-2xl font-bold text-primary">{stats.draftPosts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Posts */}
          <Card>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-primary">Recent Posts</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-subtle">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {postsLoading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
                        </td>
                      </tr>
                    ))
                  ) : posts.length > 0 ? (
                    posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-primary">{post.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.category && (
                            <Badge variant="secondary" className="bg-accent/10 text-accent">
                              {post.category.name}
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={post.status === "published" ? "default" : "secondary"}
                            className={
                              post.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {post.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                          {format(new Date(post.createdAt!), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPost(post)}
                            className="mr-2"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-secondary">
                        No posts yet. Create your first post to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>

      {/* Post Editor Modal */}
      {showPostEditor && (
        <PostEditor
          post={editingPost}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
}
