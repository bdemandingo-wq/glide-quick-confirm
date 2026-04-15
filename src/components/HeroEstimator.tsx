import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";

const sizeTiers = [
  { label: "Studio", sqft: 500, key: "studio" },
  { label: "1 BR", sqft: 750, key: "1br" },
  { label: "2 BR", sqft: 1250, key: "2br" },
  { label: "3 BR", sqft: 1800, key: "3br" },
  { label: "4 BR", sqft: 2400, key: "4br" },
  { label: "5+ BR", sqft: 3600, key: "5br" },
];

const serviceEstimates: Record<string, Record<string, string>> = {
  standard: { studio: "$108–$140", "1br": "$143–$178", "2br": "$178–$213", "3br": "$213–$283", "4br": "$283–$368", "5br": "$368–$533" },
  deep: { studio: "$208–$240", "1br": "$243–$278", "2br": "$278–$313", "3br": "$313–$383", "4br": "$383–$493", "5br": "$493–$658" },
  moveinout: { studio: "$283–$320", "1br": "$318–$353", "2br": "$353–$388", "3br": "$388–$458", "4br": "$458–$568", "5br": "$568–$733" },
  carpets: { studio: "Custom", "1br": "Custom", "2br": "Custom", "3br": "Custom", "4br": "Custom", "5br": "Custom" },
  upholstery: { studio: "Custom", "1br": "Custom", "2br": "Custom", "3br": "Custom", "4br": "Custom", "5br": "Custom" },
};

const HeroEstimator = () => {
  const [service, setService] = useState("standard");
  const [sizeIndex, setSizeIndex] = useState(2); // default 2 BR

  const currentTier = sizeTiers[sizeIndex];
  const estimate = useMemo(() => {
    return serviceEstimates[service]?.[currentTier.key] || "Custom";
  }, [service, sizeIndex]);

  const isCustom = estimate === "Custom";

  return (
    <Card className="shadow-elevated border-0 bg-card">
      <CardContent className="p-3 sm:p-6 space-y-2 sm:space-y-4">
        <div className="text-center mb-0 sm:mb-2">
          <h3 className="font-display text-base sm:text-lg font-bold text-foreground">Instant Price Estimator</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Get your estimate in seconds</p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div>
            <label className="text-xs sm:text-sm font-medium text-foreground mb-0.5 sm:mb-1 block">Service Type</label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="bg-background h-9 sm:h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Cleaning</SelectItem>
                <SelectItem value="deep">Deep Cleaning</SelectItem>
                <SelectItem value="moveinout">Move In/Out</SelectItem>
                <SelectItem value="carpets">Carpet Cleaning</SelectItem>
                <SelectItem value="upholstery">Upholstery Cleaning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2 block">
              Home Size: <span className="text-primary font-bold">{currentTier.label}</span>
              <span className="text-muted-foreground font-normal"> (~{currentTier.sqft.toLocaleString()} sq ft)</span>
            </label>
            <Slider
              value={[sizeIndex]}
              onValueChange={(val) => setSizeIndex(val[0])}
              min={0}
              max={sizeTiers.length - 1}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mt-0.5">
              <span>Studio</span>
              <span>5+ BR</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-2.5 sm:p-4 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-0.5">Estimated Price</p>
          <p className="text-xl sm:text-2xl font-bold text-primary">
            {isCustom ? "Request Quote" : `From ${estimate}`}
          </p>
        </div>

        <Button
          size="default"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold group text-sm sm:text-base h-9 sm:h-11"
          asChild
        >
          <a href="#booking" className="flex items-center justify-center gap-2">
            {isCustom ? "Get Custom Quote" : "See My Price"}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>

        <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
          No credit card. No commitment. Instant estimate.
        </p>
      </CardContent>
    </Card>
  );
};

export default HeroEstimator;
