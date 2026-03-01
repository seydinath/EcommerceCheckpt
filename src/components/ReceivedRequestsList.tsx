import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Request {
  _id: string;
  product: {
    _id: string;
    title: string;
    price: number;
  };
  buyer: {
    fullName: string;
    businessName: string;
    email: string;
    location?: string;
  };
  quantity: number;
  unit: string;
  status: "pending" | "accepted" | "rejected" | "completed" | "canceled";
  message: string;
  proposedPrice?: number;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
}

interface ReceivedRequestsListProps {
  requests: Request[];
  onAccept?: (requestId: string, proposedPrice: number, deliveryDate: string, notes: string) => Promise<void>;
  onReject?: (requestId: string, reason: string) => Promise<void>;
  onComplete?: (requestId: string) => Promise<void>;
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

export function ReceivedRequestsList({
  requests,
  onAccept,
  onReject,
  onComplete,
  isLoading = false,
}: ReceivedRequestsListProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [acceptData, setAcceptData] = React.useState<Record<string, { price: string; date: string; notes: string }>>({});
  const [rejectReason, setRejectReason] = React.useState<Record<string, string>>({});

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 text-agro-green-600">
        <p className="text-lg">Aucune demande reçue pour l'instant</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card
          key={request._id}
          className="border-agro-earth-200 hover:border-agro-earth-400 transition cursor-pointer"
          onClick={() => setExpandedId(expandedId === request._id ? null : request._id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg text-agro-earth-800">
                  {request.product.title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Acheteur: <span className="font-semibold">{request.buyer.businessName || request.buyer.fullName}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Demande: <span className="font-semibold">{request.quantity} {request.unit}</span>
                </p>
              </div>
              <Badge className={statusColors[request.status]}>
                {statusLabels[request.status]}
              </Badge>
            </div>
          </CardHeader>

          {expandedId === request._id && (
            <CardContent className="space-y-4 border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Prix du produit</p>
                  <p className="font-semibold">{request.product.price} F CFA</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact acheteur</p>
                  <p className="text-sm font-semibold">{request.buyer.email}</p>
                </div>
              </div>

              {request.buyer.location && (
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-sm">{request.buyer.location}</p>
                </div>
              )}

              {request.message && (
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-sm text-gray-500">Message de l'acheteur</p>
                  <p className="text-sm text-gray-700">{request.message}</p>
                </div>
              )}

              {/* Actions pour demande en attente */}
              {request.status === "pending" && (
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <h4 className="font-semibold text-agro-earth-800 mb-3">Accepter la demande</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`price-${request._id}`}>Prix proposé (F CFA)</Label>
                        <Input
                          id={`price-${request._id}`}
                          type="number"
                          placeholder={String(request.product.price)}
                          value={acceptData[request._id]?.price || ""}
                          onChange={(e) =>
                            setAcceptData({
                              ...acceptData,
                              [request._id]: { ...acceptData[request._id], price: e.target.value },
                            })
                          }
                          className="border-agro-earth-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`date-${request._id}`}>Date de livraison</Label>
                        <Input
                          id={`date-${request._id}`}
                          type="date"
                          value={acceptData[request._id]?.date || ""}
                          onChange={(e) =>
                            setAcceptData({
                              ...acceptData,
                              [request._id]: { ...acceptData[request._id], date: e.target.value },
                            })
                          }
                          className="border-agro-earth-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`notes-${request._id}`}>Notes</Label>
                        <Textarea
                          id={`notes-${request._id}`}
                          placeholder="Notes additionnelles..."
                          value={acceptData[request._id]?.notes || ""}
                          onChange={(e) =>
                            setAcceptData({
                              ...acceptData,
                              [request._id]: { ...acceptData[request._id], notes: e.target.value },
                            })
                          }
                          className="border-agro-earth-300"
                          rows={2}
                        />
                      </div>
                      <Button
                        onClick={() => onAccept?.(request._id, Number(acceptData[request._id]?.price || request.product.price), acceptData[request._id]?.date || "", acceptData[request._id]?.notes || "")}
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Accepter
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-red-800 mb-3">Rejeter la demande</h4>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Raison du rejet..."
                        value={rejectReason[request._id] || ""}
                        onChange={(e) =>
                          setRejectReason({ ...rejectReason, [request._id]: e.target.value })
                        }
                        rows={2}
                        maxLength={300}
                        className="border-red-300"
                      />
                      <Button
                        onClick={() => onReject?.(request._id, rejectReason[request._id] || "")}
                        disabled={isLoading}
                        variant="destructive"
                        className="w-full"
                      >
                        Rejeter
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Afficher les détails acceptés */}
              {request.status === "accepted" && (
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-sm text-green-600">
                      Prix: <span className="font-bold">{request.proposedPrice || request.product.price} F CFA</span>
                    </p>
                    {request.deliveryDate && (
                      <p className="text-sm text-green-600">
                        Livraison: {new Date(request.deliveryDate).toLocaleDateString("fr-FR")}
                      </p>
                    )}
                    {request.notes && (
                      <p className="text-sm text-green-600">Notes: {request.notes}</p>
                    )}
                  </div>
                  {request.status !== "completed" && onComplete && (
                    <Button
                      onClick={() => onComplete?.(request._id)}
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Marquer comme complétée
                    </Button>
                  )}
                </div>
              )}

              <p className="text-xs text-gray-500 text-right mt-4">
                Reçue le {new Date(request.createdAt).toLocaleDateString("fr-FR")} à {new Date(request.createdAt).toLocaleTimeString("fr-FR")}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
