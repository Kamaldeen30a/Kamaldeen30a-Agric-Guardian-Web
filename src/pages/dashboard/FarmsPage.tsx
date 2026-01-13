import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Tractor, MapPin, MoreVertical, Pencil, Trash2, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Farm {
  id: string;
  name: string;
  total_hectares: number | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}

const FarmsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [deletingFarm, setDeletingFarm] = useState<Farm | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    total_hectares: "",
    location: "",
  });

  // Fetch farms
  const { data: farms, isLoading } = useQuery({
    queryKey: ["farms", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("farms")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Farm[];
    },
    enabled: !!user,
  });

  // Create farm mutation
  const createFarmMutation = useMutation({
    mutationFn: async (data: { name: string; total_hectares: number; location: string }) => {
      const { error } = await supabase.from("farms").insert({
        user_id: user!.id,
        name: data.name,
        total_hectares: data.total_hectares,
        location: data.location,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      toast({ title: "Farm created successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({ title: "Error creating farm", description: error.message, variant: "destructive" });
    },
  });

  // Update farm mutation
  const updateFarmMutation = useMutation({
    mutationFn: async (data: { id: string; name: string; total_hectares: number; location: string }) => {
      const { error } = await supabase
        .from("farms")
        .update({
          name: data.name,
          total_hectares: data.total_hectares,
          location: data.location,
        })
        .eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      toast({ title: "Farm updated successfully" });
      resetForm();
      setEditingFarm(null);
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({ title: "Error updating farm", description: error.message, variant: "destructive" });
    },
  });

  // Delete farm mutation
  const deleteFarmMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("farms").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      toast({ title: "Farm deleted successfully" });
      setDeletingFarm(null);
    },
    onError: (error) => {
      toast({ title: "Error deleting farm", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", total_hectares: "", location: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      total_hectares: parseFloat(formData.total_hectares) || 0,
      location: formData.location,
    };

    if (editingFarm) {
      updateFarmMutation.mutate({ id: editingFarm.id, ...data });
    } else {
      createFarmMutation.mutate(data);
    }
  };

  const handleEdit = (farm: Farm) => {
    setEditingFarm(farm);
    setFormData({
      name: farm.name,
      total_hectares: farm.total_hectares?.toString() || "",
      location: farm.location || "",
    });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingFarm(null);
    resetForm();
  };

  const isSubmitting = createFarmMutation.isPending || updateFarmMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Farms</h1>
          <p className="text-muted-foreground">Manage your agricultural operations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => open ? setIsDialogOpen(true) : handleDialogClose()}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Farm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingFarm ? "Edit Farm" : "Add New Farm"}</DialogTitle>
                <DialogDescription>
                  {editingFarm
                    ? "Update your farm details below."
                    : "Enter the details of your new farm."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Farm Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Green Valley Farm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hectares">Total Hectares</Label>
                  <Input
                    id="hectares"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g., 150"
                    value={formData.total_hectares}
                    onChange={(e) => setFormData({ ...formData, total_hectares: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Textarea
                    id="location"
                    placeholder="e.g., Nairobi, Kenya"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingFarm ? "Save Changes" : "Add Farm"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Farms Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : farms && farms.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {farms.map((farm) => (
            <Card key={farm.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Tractor className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{farm.name}</CardTitle>
                      {farm.location && (
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {farm.location}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(farm)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeletingFarm(farm)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Area</span>
                    <span className="font-medium">{farm.total_hectares || 0} ha</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span className="font-medium">
                      {new Date(farm.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link to={`/dashboard/fields?farm=${farm.id}`}>View Fields</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Tractor className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">No farms yet</h3>
            <p className="mb-6 max-w-md text-muted-foreground">
              Add your first farm to start tracking your agricultural operations.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Farm
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingFarm} onOpenChange={() => setDeletingFarm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingFarm?.name}" and all its associated data
              including fields, soil records, and reports. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingFarm && deleteFarmMutation.mutate(deletingFarm.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteFarmMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete Farm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FarmsPage;
