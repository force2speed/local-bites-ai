import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="absolute inset-0 h-12 w-12 border-2 border-primary/20 rounded-full animate-pulse" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-primary">Crafting Your Menu</h3>
        <p className="text-muted-foreground max-w-md">
          Our AI chef is analyzing seasonal ingredients and creating personalized dishes for your location...
        </p>
      </div>
    </div>
  );
}