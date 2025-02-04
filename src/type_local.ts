export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  mobile: null;
  refresh_token: string;
  verify_email: boolean;
  last_loginDate: null;
  status: string;
  gender: string;
  birthday: null;
  address_details: unknown[];
  shoppingCart: unknown[];
  oderHistoy: unknown[];
  forgotPasswordOtp: null;
  forgotPasswordExpires: null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type ProductDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type Product = {
  _id: string;
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
  quantity?: number;
};

export type ProductsListType = {
  products: Product[];
};

export type CartItem = {
  _id: string;
  quantity: number;
  productId: Product;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type District = {
  name: string;
  upazilas: string[];
};

export type DivisionListType = {
  name: string;
  district: District[];
};

export type VoucherItem = {
  id: string;
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  minPurchase: number;
  maxDiscount: number | null;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
};
