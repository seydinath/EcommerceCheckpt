import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Request {
  _id: string;
  product: {
    _id: string;
    title: string;
    price: number;
  };
  seller: {
    fullName: string;
    businessName: string;
    email: string;
  };
  quantity: number;
  unit: string;
  status: "pending" | "accepted" | "rejected" | "completed" | "canceled";
  message: string;
  proposedPrice?: number;
  deliveryDate?: string;
  notes?: string;
  rejectionReason?: string;
  createdAt: string;
}

interface MyRequestsListProps {
  requests: Request[];
  onCancel?: (requestId: string) => Promise<void>;
  isLoading?: boolean;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  canceled: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  accepted: "Acceptée",
  rejected: "Rejetée",
  completed: "Complétée",
  canceled: "Annulée",
};

export function MyRequestsList({
  requests,
  onCancel,
  isLoading = false,
}: MyRequestsListProps) {
  if (requests.length === 0) {
    return (
      <div className="text-center py-12 text-agro-green-600">
        <p className="text-lg">Aucune demande pour l'instant</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request._id} className="border-agro-green-200 hover:border-agro-green-400 transition">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg text-agro-green-800">
                  {request.product.title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Vendeur: <span className="font-semibold">{request.seller.businessName || request.seller.fullName}</span>
                </p>
              </div>
              <Badge className={statusColors[request.status]}>
                {statusLabels[request.status]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Quantité demandée</p>
                <p className="font-semibold">{request.quantity} {request.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Prix du produit</p>
                <p className="font-semibold">{request.product.price} F CFA</p>
              </div>
            </div>

            {request.message && (
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-500">Votre message</p>
                <p className="text-sm text-gray-700">{request.message}</p>
              </div>
            )}

            {request.status === "accepted" && (
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <p className="text-sm font-semibold text-green-800">Demande acceptée!</p>
                {request.proposedPrice && (
                  <p className="text-sm text-green-700">
                    Prix proposé: <span className="font-bold">{request.proposedPrice} F CFA</span>
                  </p>
                )}
                {request.deliveryDate && (
                  <p className="text-sm text-green-700">
                    Date de livraison: {new Date(request.deliveryDate).toLocaleDateString("fr-FR")}
                  </p>
                )}
                {request.notes && (
                  <p className="text-sm text-green-700 mt-2">Notes: {request.notes}</p>
                )}
              </div>
            )}

            {request.status === "rejected" && (
              <div className="bg-red-50 p-3 rounded border border-red-200">
                <p className="text-sm font-semibold text-red-800">Demande rejetée</p>
                {request.rejectionReason && (
                  <p className="text-sm text-red-700">Raison: {request.rejectionReason}</p>
                )}
              </div>
            )}

            {request.status === "pending" && onCancel && (
              <Button
                onClick={() => onCancel(request._id)}
                variant="destructive"
                size="sm"
                className="w-full"
                disabled={isLoading}
              >
                Annuler la demande
              </Button>
            )}

            <p className="text-xs text-gray-500">
              Créée le {new Date(request.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
