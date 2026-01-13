import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Tractor,
  Map,
  Scan,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Cloud,
  Plus,
  ArrowRight,
  Leaf,
  Activity,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const DashboardHome = () => {
  const { user } = useAuth();

  // Fetch user's farms
  const { data: farms, isLoading: farmsLoading } = useQuery({
    queryKey: ["farms", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("farms")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch fields count
  const { data: fields } = useQuery({
    queryKey: ["fields-count", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("fields").select("id, health_status");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch recent disease detections
  const { data: recentDetections } = useQuery({
    queryKey: ["recent-detections", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("disease_detections")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch low inventory items
  const { data: lowInventory } = useQuery({
    queryKey: ["low-inventory", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory_items")
        .select("*")
        .filter("quantity", "lte", "reorder_level");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const totalHectares = farms?.reduce((acc, farm) => acc + (Number(farm.total_hectares) || 0), 0) || 0;
  const healthyFields = fields?.filter((f) => f.health_status === "healthy").length || 0;
  const warningFields = fields?.filter((f) => f.health_status === "warning").length || 0;
  const criticalFields = fields?.filter((f) => f.health_status === "critical").length || 0;

  const stats = [
    {
      title: "Total Farms",
      value: farms?.length || 0,
      icon: Tractor,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Hectares",
      value: totalHectares.toLocaleString(),
      icon: Map,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Active Fields",
      value: fields?.length || 0,
      icon: Leaf,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Disease Scans",
      value: recentDetections?.length || 0,
      icon: Scan,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const quickActions = [
    {
      title: "Add Farm",
      description: "Register a new farm",
      icon: Tractor,
      href: "/dashboard/farms",
    },
    {
      title: "Scan for Disease",
      description: "AI-powered detection",
      icon: Scan,
      href: "/dashboard/disease-detection",
    },
    {
      title: "Check Weather",
      description: "Microclimate insights",
      icon: Cloud,
      href: "/dashboard/weather",
    },
    {
      title: "View Inventory",
      description: "Stock management",
      icon: Package,
      href: "/dashboard/inventory",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {getGreeting()}, {user?.email?.split("@")[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your farms today.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/farms">
            <Plus className="mr-2 h-4 w-4" />
            Add New Farm
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Field Health Overview */}
      {(fields?.length || 0) > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Field Health Overview
            </CardTitle>
            <CardDescription>Current status of your fields</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">{healthyFields} Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">{warningFields} Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-medium">{criticalFields} Critical</span>
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              {(fields?.length || 0) > 0 && (
                <div className="flex h-full">
                  <div
                    className="bg-green-500 transition-all"
                    style={{ width: `${(healthyFields / fields!.length) * 100}%` }}
                  />
                  <div
                    className="bg-yellow-500 transition-all"
                    style={{ width: `${(warningFields / fields!.length) * 100}%` }}
                  />
                  <div
                    className="bg-red-500 transition-all"
                    style={{ width: `${(criticalFields / fields!.length) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Card className="cursor-pointer transition-shadow hover:shadow-md h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Disease Detections */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Recent Disease Scans
              </CardTitle>
              <CardDescription>AI-powered detection results</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/disease-detection">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentDetections && recentDetections.length > 0 ? (
              <div className="space-y-3">
                {recentDetections.slice(0, 3).map((detection) => (
                  <div
                    key={detection.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          detection.disease_type === "Healthy"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{detection.disease_type}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(detection.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {(Number(detection.confidence_score) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Scan className="mb-2 h-10 w-10 text-muted-foreground/50" />
                <p className="text-muted-foreground">No disease scans yet</p>
                <Button variant="link" asChild className="mt-2">
                  <Link to="/dashboard/disease-detection">Start Scanning</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Inventory Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory Alerts
              </CardTitle>
              <CardDescription>Items below reorder level</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/inventory">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {lowInventory && lowInventory.length > 0 ? (
              <div className="space-y-3">
                {lowInventory.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-destructive">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="mb-2 h-10 w-10 text-green-500/50" />
                <p className="text-muted-foreground">All inventory levels are healthy</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Empty State for New Users */}
      {(!farms || farms.length === 0) && !farmsLoading && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Tractor className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Welcome to Agri-Guardian!</h3>
            <p className="mb-6 max-w-md text-muted-foreground">
              Get started by adding your first farm. You'll be able to track fields, monitor
              soil health, detect diseases, and much more.
            </p>
            <Button asChild size="lg">
              <Link to="/dashboard/farms">
                <Plus className="mr-2 h-5 w-5" />
                Add Your First Farm
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardHome;
