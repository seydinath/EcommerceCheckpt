import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductRequestFormProps {
  productId: string;
  productTitle: string;
  productAvailableStock: number;
  onSubmit: (data: {
    quantity: number;
    unit: string;
    message: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

const units = ["kg", "ton", "liter", "piece", "bundle"];

export function ProductRequestForm({
  productId,
  productTitle,
  productAvailableStock,
  onSubmit,
  isLoading = false,
}: ProductRequestFormProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState<string>("kg");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quantity || quantity <= 0) {
      alert("Veuillez entrer une quantité valide");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ quantity, unit, message });
      // Reset form
      setQuantity(1);
      setUnit("kg");
      setMessage("");
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-agro-green-50">
      <h3 className="text-lg font-bold text-agro-green-800">
        Demander "{ productTitle }"
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantité</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            max={productAvailableStock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantité"
            className="border-agro-green-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unité</Label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="border-agro-green-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (optionnel)</Label>
        <Textarea
          id="message"
          placeholder="Ajoutez un message à votre demande (ex: délai, conditions spéciales...)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          className="border-agro-green-300"
          rows={3}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full bg-agro-green-600 hover:bg-agro-green-700 text-white"
      >
        {isSubmitting ? "Envoi en cours..." : "Soumettre la demande"}
      </Button>
    </form>
  );
}
