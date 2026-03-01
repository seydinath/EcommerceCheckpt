import React from "react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoleSelectorProps {
  selectedRole: "buyer" | "seller" | "farmer";
  onSelectRole: (role: "buyer" | "seller" | "farmer") => void;
}

const roles = [
  {
    id: "buyer",
    title: "🛒 Acheteur",
    titleEn: "🛒 Buyer",
    description: "Achetez des produits agricoles de qualité",
    descriptionEn: "Purchase quality agricultural products",
    icon: "🛒",
    color: "bg-agro-green-100 text-agro-green-700 border-agro-green-300",
  },
  {
    id: "seller",
    title: "🏪 Vendeur",
    titleEn: "🏪 Seller",
    description: "Vendez vos produits agricoles sur la plateforme",
    descriptionEn: "Sell your agricultural products on the platform",
    icon: "🏪",
    color: "bg-agro-earth-100 text-agro-earth-700 border-agro-earth-300",
  },
  {
    id: "farmer",
    title: "👨‍🌾 Agriculteur",
    titleEn: "👨‍🌾 Farmer",
    description: "Vendez vos produits fermiers directement",
    descriptionEn: "Sell your farm products directly",
    icon: "👨‍🌾",
    color: "bg-green-100 text-green-700 border-green-300",
  },
];

export function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelectRole(role.id as "buyer" | "seller" | "farmer")}
          className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
            selectedRole === role.id
              ? `${role.color} border-current ring-2 ring-offset-2 ring-agro-green-500`
              : `${role.color} border-transparent hover:border-agro-green-200`
          }`}
        >
          <div className="text-4xl mb-3">{role.icon}</div>
          <h3 className="font-bold text-lg mb-2">{role.title}</h3>
          <p className="text-sm">{role.description}</p>
          {selectedRole === role.id && (
            <div className="mt-3">
              <Badge className="bg-agro-green-600 text-white">Sélectionné</Badge>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
