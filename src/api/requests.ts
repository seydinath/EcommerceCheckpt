import { api } from "./index";

export interface CreateRequestPayload {
  productId: string;
  quantity: number;
  unit: string;
  message?: string;
}

export interface AcceptRequestPayload {
  proposedPrice?: number;
  deliveryDate?: string;
  notes?: string;
}

export interface RejectRequestPayload {
  rejectionReason?: string;
}

// Get my requests (for buyers)
export const getMyRequests = async () => {
  const response = await api.get("/requests/my-requests");
  return response.data;
};

// Get received requests (for sellers/farmers)
export const getReceivedRequests = async () => {
  const response = await api.get("/requests/received");
  return response.data;
};

// Get single request by ID
export const getRequest = async (id: string) => {
  const response = await api.get(`/requests/${id}`);
  return response.data;
};

// Create a new request (buyer)
export const createRequest = async (payload: CreateRequestPayload) => {
  const response = await api.post("/requests", payload);
  return response.data;
};

// Accept a request (seller/farmer)
export const acceptRequest = async (id: string, payload: AcceptRequestPayload) => {
  const response = await api.patch(`/requests/${id}/accept`, payload);
  return response.data;
};

// Reject a request (seller/farmer)
export const rejectRequest = async (id: string, payload: RejectRequestPayload) => {
  const response = await api.patch(`/requests/${id}/reject`, payload);
  return response.data;
};

// Complete a request (seller/farmer)
export const completeRequest = async (id: string) => {
  const response = await api.patch(`/requests/${id}/complete`);
  return response.data;
};

// Cancel a request (buyer)
export const cancelRequest = async (id: string) => {
  const response = await api.patch(`/requests/${id}/cancel`);
  return response.data;
};
