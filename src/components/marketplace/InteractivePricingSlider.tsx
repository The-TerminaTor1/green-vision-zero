import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ShoppingCart, TrendingDown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface InteractivePricingSliderProps {
  projectTitle: string;
  pricePerCredit: number;
  maxCredits: number;
  onPurchase?: (credits: number, total: number) => void;
}

const InteractivePricingSlider = ({
  projectTitle,
  pricePerCredit,
  maxCredits,
  onPurchase
}: InteractivePricingSliderProps) => {
  const [credits, setCredits] = useState([100]);
  const [discount, setDiscount] = useState(0);
  
  const creditsValue = credits[0];
  const subtotal = creditsValue * pricePerCredit;
  
  useEffect(() => {
    // Calculate bulk discount
    if (creditsValue >= 5000) setDiscount(15);
    else if (creditsValue >= 2000) setDiscount(10);
    else if (creditsValue >= 1000) setDiscount(5);
    else setDiscount(0);
  }, [creditsValue]);
  
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;
  const co2Offset = (creditsValue * 0.05).toFixed(1);

  const getBadgeColor = () => {
    if (discount >= 15) return "bg-success text-success-foreground";
    if (discount >= 10) return "bg-earth text-earth-foreground";
    if (discount >= 5) return "bg-primary text-primary-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background via-primary/5 to-background border-2 border-primary/20">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">Calculate Your Purchase</h3>
          <p className="text-sm text-muted-foreground">{projectTitle}</p>
        </div>

        {/* Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-foreground font-medium">Credits Amount</Label>
            <Badge className="bg-primary text-primary-foreground text-base px-3 py-1">
              {creditsValue.toLocaleString()} credits
            </Badge>
          </div>
          <Slider
            min={10}
            max={Math.min(maxCredits, 10000)}
            step={10}
            value={credits}
            onValueChange={setCredits}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10</span>
            <span>{Math.min(maxCredits, 10000).toLocaleString()}</span>
          </div>
        </div>

        {/* Bulk Discount Badge */}
        {discount > 0 && (
          <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/30 animate-fade-in">
            <Sparkles className="h-5 w-5 text-success" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-success">
                Bulk Discount Applied: {discount}% OFF
              </p>
              <p className="text-xs text-muted-foreground">
                You're saving ${discountAmount.toFixed(2)}!
              </p>
            </div>
          </div>
        )}

        {/* Discount Tiers */}
        <div className="grid grid-cols-3 gap-2">
          <div className={`p-2 rounded-lg text-center border transition-all ${creditsValue >= 1000 ? 'bg-primary/10 border-primary' : 'bg-muted/30 border-border'}`}>
            <p className="text-xs text-muted-foreground">1000+ credits</p>
            <p className="text-sm font-bold text-foreground">5% OFF</p>
          </div>
          <div className={`p-2 rounded-lg text-center border transition-all ${creditsValue >= 2000 ? 'bg-earth/10 border-earth' : 'bg-muted/30 border-border'}`}>
            <p className="text-xs text-muted-foreground">2000+ credits</p>
            <p className="text-sm font-bold text-foreground">10% OFF</p>
          </div>
          <div className={`p-2 rounded-lg text-center border transition-all ${creditsValue >= 5000 ? 'bg-success/10 border-success' : 'bg-muted/30 border-border'}`}>
            <p className="text-xs text-muted-foreground">5000+ credits</p>
            <p className="text-sm font-bold text-foreground">15% OFF</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 p-4 bg-secondary/30 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Credits</span>
            <span className="font-medium text-foreground">
              {creditsValue.toLocaleString()} × ${pricePerCredit}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-success flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                Discount ({discount}%)
              </span>
              <span className="font-medium text-success">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-2 border-t border-border flex justify-between">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Impact Preview */}
        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
          <p className="text-sm text-muted-foreground text-center">
            Your purchase will offset approximately{" "}
            <span className="font-bold text-success">{co2Offset} tons of CO₂</span>
          </p>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => onPurchase?.(creditsValue, total)}
          className="w-full h-12 text-base"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Purchase {creditsValue.toLocaleString()} Credits
        </Button>
      </div>
    </Card>
  );
};

export default InteractivePricingSlider;
