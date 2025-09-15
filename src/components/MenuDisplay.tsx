import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Utensils } from "lucide-react";

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

interface MenuDisplayProps {
  menuData: Record<string, DailyMenu>;
  location: string;
  season: string;
  placeType: string;
}

const mealIcons = {
  breakfast: "🌅",
  lunch: "☀️", 
  dinner: "🌙"
};

const mealTimes = {
  breakfast: "7:00 - 10:00 AM",
  lunch: "12:00 - 3:00 PM",
  dinner: "6:00 - 10:00 PM"
};

export function MenuDisplay({ menuData, location, season, placeType }: MenuDisplayProps) {
  const days = Object.keys(menuData);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Your Seasonal Menu
        </h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge variant="outline" className="px-3 py-1">
            📍 {location}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            🍂 {season}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            🏪 {placeType}
          </Badge>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid gap-6">
        {days.map((day) => (
          <Card key={day} className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="bg-gradient-card">
              <CardTitle className="text-xl flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                {day}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {(['breakfast', 'lunch', 'dinner'] as const).map((mealType) => {
                  const meal = menuData[day][mealType];
                  return (
                    <div key={mealType} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          <span className="text-xl">{mealIcons[mealType]}</span>
                          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {mealTimes[mealType]}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-card p-4 rounded-lg space-y-3">
                        <h5 className="font-medium text-primary">{meal.name}</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {meal.description}
                        </p>
                        
                        {meal.seasonal_ingredients.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-culinary-fresh-green">
                              Seasonal Ingredients:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {meal.seasonal_ingredients.map((ingredient, index) => (
                                <Badge 
                                  key={index} 
                                  variant="secondary" 
                                  className="text-xs bg-secondary/50 hover:bg-secondary"
                                >
                                  {ingredient}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Stats */}
      <Card className="bg-gradient-accent text-white">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Utensils className="h-5 w-5" />
                <span className="font-semibold">Total Meals</span>
              </div>
              <p className="text-2xl font-bold">{days.length * 3}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">Menu Days</span>
              </div>
              <p className="text-2xl font-bold">{days.length}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">🌱</span>
                <span className="font-semibold">Seasonal Focus</span>
              </div>
              <p className="text-lg font-medium">{season} Produce</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}