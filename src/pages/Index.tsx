import { useState } from "react";
import { MenuForm } from "@/components/MenuForm";
import { MenuDisplay } from "@/components/MenuDisplay";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-culinary.jpg";

interface MenuRequest {
  location: string;
  season: string;
  place_type: string;
  dietary_restrictions: string[];
  cuisine_preferences: string[];
}

interface MenuItem {
  name: string;
  description: string;
  seasonal_ingredients: string[];
}

interface DailyMenu {
  breakfast: MenuItem;
  lunch: MenuItem;
  dinner: MenuItem;
}

const Index = () => {
  const [menuData, setMenuData] = useState<Record<string, DailyMenu> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<MenuRequest | null>(null);
  const { toast } = useToast();

  const generateMenu = async (request: MenuRequest) => {
    setLoading(true);
    setError(null);
    setLastRequest(request);

    try {
      // Replace with your actual backend URL
      const response = await fetch('/generate-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMenuData(data);
      toast({
        title: "Menu Generated Successfully!",
        description: "Your personalized seasonal menu is ready.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastRequest) {
      generateMenu(lastRequest);
    }
  };

  const resetToForm = () => {
    setMenuData(null);
    setError(null);
    setLastRequest(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/80" />
        <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Seasonal Menu Generator
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
              AI-powered culinary creativity using fresh, seasonal ingredients from your location
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {!menuData && !loading && !error && (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Create Your Perfect Menu</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI chef analyzes seasonal produce data to craft personalized menus 
                that celebrate local flavors and seasonal availability.
              </p>
            </div>
            <MenuForm onSubmit={generateMenu} loading={loading} />
          </div>
        )}

        {loading && <LoadingSpinner />}

        {error && (
          <div className="space-y-6">
            <ErrorDisplay message={error} onRetry={handleRetry} />
            <div className="text-center">
              <button 
                onClick={resetToForm}
                className="text-primary hover:underline"
              >
                ← Back to Menu Generator
              </button>
            </div>
          </div>
        )}

        {menuData && lastRequest && (
          <div className="space-y-8">
            <MenuDisplay 
              menuData={menuData}
              location={lastRequest.location}
              season={lastRequest.season}
              placeType={lastRequest.place_type}
            />
            <div className="text-center">
              <button 
                onClick={resetToForm}
                className="text-primary hover:underline font-medium"
              >
                ← Generate Another Menu
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-culinary-earth-brown text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-90">
            Powered by AI and seasonal produce data • Built for culinary excellence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
