import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Home from "./pages/home";
import Landing from "./pages/landing";
import Post from "./pages/post";
import AdminDashboard from "./pages/admin-dashboard";
import Login from "./pages/login";
import NotFound from "./pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/post/:slug" component={Post} />
          <Route path="/admin-login" component={() => {
            window.location.href = "/api/login";
            return null;
          }} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/post/:slug" component={Post} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/*" component={AdminDashboard} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;