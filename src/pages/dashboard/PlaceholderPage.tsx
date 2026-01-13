import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Construction className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Coming Soon</h2>
          <p className="mb-6 max-w-md text-muted-foreground">
            This feature is under development. Check back soon for updates!
          </p>
          <Button asChild>
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
