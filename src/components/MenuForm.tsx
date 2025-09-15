import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface MenuRequest {
  location: string;
  season: string;
  place_type: string;
  dietary_restrictions: string[];
  cuisine_preferences: string[];
}

interface MenuFormProps {
  onSubmit: (request: MenuRequest) => void;
  loading: boolean;
}

export function MenuForm({ onSubmit, loading }: MenuFormProps) {
  const [formData, setFormData] = useState<MenuRequest>({
    location: "",
    season: "",
    place_type: "",
    dietary_restrictions: [],
    cuisine_preferences: [],
  });

  const [newRestriction, setNewRestriction] = useState("");
  const [newPreference, setNewPreference] = useState("");

  const seasons = ["Spring", "Summer", "Fall", "Winter"];
  const placeTypes = ["Restaurant", "Cafe", "Hotel", "Catering", "Home Kitchen", "Food Truck"];

  const addRestriction = () => {
    if (newRestriction.trim()) {
      setFormData(prev => ({
        ...prev,
        dietary_restrictions: [...prev.dietary_restrictions, newRestriction.trim()]
      }));
      setNewRestriction("");
    }
  };

  const removeRestriction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      dietary_restrictions: prev.dietary_restrictions.filter((_, i) => i !== index)
    }));
  };

  const addPreference = () => {
    if (newPreference.trim()) {
      setFormData(prev => ({
        ...prev,
        cuisine_preferences: [...prev.cuisine_preferences, newPreference.trim()]
      }));
      setNewPreference("");
    }
  };

  const removePreference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cuisine_preferences: prev.cuisine_preferences.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.location && formData.season && formData.place_type) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.location && formData.season && formData.place_type;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="text-center bg-gradient-hero text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Generate Your Seasonal Menu</CardTitle>
        <CardDescription className="text-white/90">
          Create a personalized 7-day menu based on seasonal produce
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., California, New York, France..."
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="transition-all duration-300 focus:shadow-elegant"
            />
          </div>

          {/* Season */}
          <div className="space-y-2">
            <Label htmlFor="season">Season</Label>
            <Select value={formData.season} onValueChange={(value) => setFormData(prev => ({ ...prev, season: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((season) => (
                  <SelectItem key={season} value={season}>
                    {season}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Place Type */}
          <div className="space-y-2">
            <Label htmlFor="place_type">Establishment Type</Label>
            <Select value={formData.place_type} onValueChange={(value) => setFormData(prev => ({ ...prev, place_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select establishment type" />
              </SelectTrigger>
              <SelectContent>
                {placeTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-3">
            <Label>Dietary Restrictions (Optional)</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add dietary restriction..."
                value={newRestriction}
                onChange={(e) => setNewRestriction(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRestriction())}
              />
              <Button type="button" onClick={addRestriction} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.dietary_restrictions.map((restriction, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {restriction}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeRestriction(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Cuisine Preferences */}
          <div className="space-y-3">
            <Label>Cuisine Preferences (Optional)</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add cuisine preference..."
                value={newPreference}
                onChange={(e) => setNewPreference(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPreference())}
              />
              <Button type="button" onClick={addPreference} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.cuisine_preferences.map((preference, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {preference}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removePreference(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-hero hover:opacity-90 transition-all duration-300 shadow-elegant"
            disabled={!isFormValid || loading}
          >
            {loading ? "Generating Menu..." : "Generate Menu"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}