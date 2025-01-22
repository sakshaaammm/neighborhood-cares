import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Gift, ShoppingBag, DollarSign, Receipt } from "lucide-react";

interface Voucher {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: JSX.Element;
}

const VOUCHERS: Voucher[] = [
  {
    id: "1",
    name: "Hospital Discount",
    description: "20% off on your next hospital visit",
    points: 100,
    icon: <Gift className="w-6 h-6" />,
  },
  {
    id: "2",
    name: "Shopping Gift Card",
    description: "$50 shopping gift card",
    points: 150,
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  {
    id: "3",
    name: "Utility Bill Discount",
    description: "15% off on your next utility bill",
    points: 75,
    icon: <DollarSign className="w-6 h-6" />,
  },
];

export function Rewards({ points }: { points: number }) {
  const { toast } = useToast();
  const [purchaseHistory, setPurchaseHistory] = useState<Voucher[]>([]);

  const handleRedeem = (voucher: Voucher) => {
    if (points < voucher.points) {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough points to redeem this voucher.",
        variant: "destructive",
      });
      return;
    }

    setPurchaseHistory((prev) => [...prev, voucher]);
    toast({
      title: "Voucher Redeemed!",
      description: `You have successfully redeemed ${voucher.name}`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-card p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Available Rewards</h2>
          <span className="text-lg font-medium">Your Points: {points}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VOUCHERS.map((voucher) => (
            <Card key={voucher.id} className="p-4 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center gap-3 mb-2">
                {voucher.icon}
                <h3 className="font-medium">{voucher.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{voucher.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{voucher.points} points</span>
                <Button
                  variant="secondary"
                  onClick={() => handleRedeem(voucher)}
                  disabled={points < voucher.points}
                >
                  Redeem
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {purchaseHistory.length > 0 && (
        <div className="glass-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
          <div className="space-y-3">
            {purchaseHistory.map((voucher, index) => (
              <div
                key={`${voucher.id}-${index}`}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{voucher.name}</h4>
                    <p className="text-sm text-muted-foreground">{voucher.points} points</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}