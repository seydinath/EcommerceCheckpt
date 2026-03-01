import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyRequests, cancelRequest } from "@/api/requests";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MyRequestsList from "@/components/MyRequestsList";
import { ShoppingBag, Inbox } from "lucide-react";
import type { ProductRequest } from "@/types/agromarket";

const MyRequests = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [requestToCancel, setRequestToCancel] = useState<string | null>(null);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-requests"],
    queryFn: getMyRequests,
  });

  const cancelMutation = useMutation({
    mutationFn: (requestId: string) => cancelRequest(requestId),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Request cancelled successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
      setRequestToCancel(null);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to cancel request",
      });
    },
  });

  const handleCancelRequest = (id: string) => {
    setRequestToCancel(id);
  };

  const confirmCancel = () => {
    if (requestToCancel) {
      cancelMutation.mutate(requestToCancel);
    }
  };

  // Filter requests by status
  const filteredRequests = statusFilter
    ? requests.filter((req: ProductRequest) => req.status === statusFilter)
    : requests;

  // Group requests by status for stats
  const stats = {
    pending: requests.filter((r: ProductRequest) => r.status === "pending").length,
    accepted: requests.filter((r: ProductRequest) => r.status === "accepted").length,
    rejected: requests.filter((r: ProductRequest) => r.status === "rejected").length,
    completed: requests.filter((r: ProductRequest) => r.status === "completed").length,
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Please log in to view your requests</p>
            <Button asChild>
              <a href="/auth">Go to Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">My Product Requests</h1>
          </div>
          <p className="text-muted-foreground">Track all your product requests and their status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                <p className="text-sm text-muted-foreground mt-1">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.accepted}</div>
                <p className="text-sm text-muted-foreground mt-1">Accepted</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
                <p className="text-sm text-muted-foreground mt-1">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
                <p className="text-sm text-muted-foreground mt-1">Rejected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex gap-4 items-end">
            <div>
              <label className="text-sm font-medium">Filter by Status</label>
              <Select value={statusFilter || "all"} onValueChange={(value) => 
                setStatusFilter(value === "all" ? null : value)
              }>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {filteredRequests.length} of {requests.length} requests
            </div>
          </div>
        </div>

        {/* Requests List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Loading your requests...</div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold mb-2">No requests found</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {statusFilter
                    ? `You don't have any ${statusFilter} requests.`
                    : "You haven't made any product requests yet."}
                </p>
                <Button asChild>
                  <a href="/products">Browse Products</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <MyRequestsList
            requests={filteredRequests}
            onCancel={handleCancelRequest}
            isLoading={cancelMutation.isPending}
          />
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!requestToCancel} onOpenChange={(open) => !open && setRequestToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Request?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this product request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Keep It</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancel}
              disabled={cancelMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              Cancel Request
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyRequests;
