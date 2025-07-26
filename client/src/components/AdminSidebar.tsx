import { Link, useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  LayoutDashboard, 
  FileText, 
  Tags, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";

export default function AdminSidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: FileText, label: "Posts", href: "/admin/posts" },
    { icon: Tags, label: "Categories", href: "/admin/categories" },
    { icon: Users, label: "Authors", href: "/admin/authors" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-sm text-secondary mt-1">Content Management</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href || 
              (item.href === "/admin" && location === "/admin");
            
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-secondary hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={(user as any)?.profileImageUrl || ""}
                alt={`${(user as any)?.firstName} ${(user as any)?.lastName}`}
              />
              <AvatarFallback>
                {(user as any)?.firstName?.[0]}{(user as any)?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-primary">
                {(user as any)?.firstName} {(user as any)?.lastName}
              </p>
              <p className="text-xs text-secondary">Administrator</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = "/api/logout"}
            className="w-full justify-start text-secondary hover:text-primary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
