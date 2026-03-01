// AgroMarket TypeScript Types
// Frontend Type Definitions for API responses

export type UserRole = "buyer" | "seller" | "farmer";
export type ProductCategory =
  | "vegetables"
  | "fruits"
  | "grains"
  | "dairy"
  | "meat"
  | "herbs"
  | "seeds"
  | "equipment"
  | "other";
export type ProductUnit = "kg" | "ton" | "liter" | "piece" | "bundle";
export type RequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "completed"
  | "canceled";

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  businessName?: string;
  phone?: string;
  location?: string;
  description?: string;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  businessName?: string;
  location?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  unit: ProductUnit;
  category: ProductCategory;
  seller: {
    _id: string;
    fullName: string;
    businessName?: string;
    location?: string;
    email?: string;
  };
  isOrganic?: boolean;
  harvestDate?: string;
  origin?: string;
  rating?: number;
  reviews?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  title: string;
  description?: string;
  price: number;
  stock: number;
  unit?: ProductUnit;
  category: ProductCategory;
  isOrganic?: boolean;
  harvestDate?: string;
  origin?: string;
  images: File[];
}

export interface UpdateProductPayload {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  unit?: ProductUnit;
  category?: ProductCategory;
  isOrganic?: boolean;
  harvestDate?: string;
  origin?: string;
  images?: File[];
}

// ============================================
// REQUEST TYPES
// ============================================

export interface ProductRequest {
  _id: string;
  buyer: {
    _id: string;
    fullName: string;
    businessName?: string;
    email: string;
    location?: string;
  };
  product: {
    _id: string;
    title: string;
    price: number;
    images?: string[];
  };
  seller: {
    _id: string;
    fullName: string;
    businessName?: string;
    email: string;
    location?: string;
  };
  quantity: number;
  unit: ProductUnit;
  status: RequestStatus;
  message?: string;
  proposedPrice?: number;
  deliveryDate?: string;
  notes?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRequestPayload {
  productId: string;
  quantity: number;
  unit: ProductUnit;
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

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiErrorResponse {
  error?: string;
  message?: string;
  details?: string;
}

export interface ApiSuccessResponse<T> {
  data: T;
  success?: boolean;
}

// ============================================
// CONTEXT TYPES
// ============================================

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isRole: (role: UserRole | UserRole[]) => boolean;
}

// ============================================
// QUERY/FILTER TYPES
// ============================================

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  isOrganic?: boolean;
  search?: string;
}

export interface RequestFilters {
  status?: RequestStatus;
  dateFrom?: string;
  dateTo?: string;
  sellerId?: string;
  buyerId?: string;
}

// ============================================
// UI COMPONENT PROPS
// ============================================

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (productId: string) => void;
}

export interface ProductRequestFormProps {
  productId: string;
  productTitle: string;
  productAvailableStock: number;
  onSubmit: (data: CreateRequestPayload) => Promise<void>;
  isLoading?: boolean;
}

export interface RoleSelectorProps {
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export interface MyRequestsListProps {
  requests: ProductRequest[];
  onCancel?: (requestId: string) => Promise<void>;
  isLoading?: boolean;
}

export interface ReceivedRequestsListProps {
  requests: ProductRequest[];
  onAccept?: (
    requestId: string,
    proposedPrice?: number,
    deliveryDate?: string,
    notes?: string
  ) => Promise<void>;
  onReject?: (requestId: string, reason?: string) => Promise<void>;
  onComplete?: (requestId: string) => Promise<void>;
  isLoading?: boolean;
}

// ============================================
// UTILITY TYPES
// ============================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// ============================================
// CONSTANTS
// ============================================

export const USER_ROLES: UserRole[] = ["buyer", "seller", "farmer"];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "vegetables",
  "fruits",
  "grains",
  "dairy",
  "meat",
  "herbs",
  "seeds",
  "equipment",
  "other",
];

export const PRODUCT_UNITS: ProductUnit[] = [
  "kg",
  "ton",
  "liter",
  "piece",
  "bundle",
];

export const REQUEST_STATUSES: RequestStatus[] = [
  "pending",
  "accepted",
  "rejected",
  "completed",
  "canceled",
];

export const ENTITY_VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  MESSAGE_MAX_LENGTH: 500,
  PRICE_MIN: 0,
  PRICE_MAX: 1000000,
  STOCK_MIN: 0,
  STOCK_MAX: 1000000,
  QUANTITY_MIN: 1,
  RATING_MIN: 0,
  RATING_MAX: 5,
};
