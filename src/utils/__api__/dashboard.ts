import { cache } from "react";
import axios from "../../utils/axiosInstance";
import Brand from "models/Brand.model";
import Order from "models/Order.model";
import Review from "models/Review.model";
import Category from "models/Category.model";
import { api } from "utils/api";
import { IProperty } from "models/Property.model";

// dashboard
const getAllCard = cache(async () => {
  const response = await axios.get("/api/admin/dashboard-cards");
  return response.data;
});

const recentPurchase = cache(async () => {
  const response = await axios.get("/api/admin/recent-purchase");
  return response.data.data;
});

const stockOutProducts = cache(async () => {
  const response = await axios.get("/api/admin/stock-out-products");
  return response.data;
});

// products
const products = cache(async (): Promise<IProperty[]> => {
  const response = await api.get("/property/get-property");
  return response.data.data;
});

const category = cache(async (): Promise<Category[]> => {
  const response = await axios.get("/api/admin/category");
  return response.data;
});

const brands = cache(async (): Promise<Brand[]> => {
  const response = await axios.get("/api/admin/brands");
  return response.data;
});

const reviews = cache(async (): Promise<Review[]> => {
  const response = await axios.get("/api/admin/reviews");
  return response.data;
});

// orders
const orders = cache(async (): Promise<Order[]> => {
  const response = await axios.get("/api/admin/orders");
  return response.data;
});

const getOrder = cache(async (id: string): Promise<Order> => {
  const response = await axios.get("/api/admin/orders/1", { params: { id } });
  return response.data;
});

// customers
const customers = cache(async () => {
  const response = await axios.get("/api/admin/customers");
  return response.data;
});

// refund request
const refundRequests = cache(async () => {
  const response = await axios.get("/api/admin/refund-requests");
  return response.data;
});

// sellers
const sellers = cache(async () => {
  const response = await axios.get("/api/admin/sellers");
  return response.data;
});

const packagePayments = cache(async () => {
  const response = await axios.get("/api/admin/package-payments");
  return response.data;
});

const earningHistory = cache(async () => {
  const response = await axios.get("/api/admin/earning-history");
  return response.data;
});

const payouts = cache(async () => {
  const response = await axios.get("/api/admin/payouts");
  return response.data;
});

const payoutRequests = cache(async () => {
  const response = await axios.get("/api/admin/payout-requests");
  return response.data;
});

export default {
  brands,
  orders,
  reviews,
  sellers,
  payouts,
  products,
  category,
  getOrder,
  customers,
  getAllCard,
  payoutRequests,
  recentPurchase,
  refundRequests,
  earningHistory,
  packagePayments,
  stockOutProducts,
};
