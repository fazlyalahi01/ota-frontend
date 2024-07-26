import { cache } from "react";
import axios from "../../utils/axiosInstance";
import { api } from "api/api";

const getAllProductReviews = cache(async () => {
  const response = await axios.get("/api/vendor/product-reviews");
  return response.data;
});

const getAllRefundRequests = cache(async () => {
  const response = await axios.get("/api/vendor/refund-requests");
  return response.data;
});

const getAllPayoutRequests = cache(async () => {
  const response = await axios.get("/api/vendor/payout-requests");
  return response.data;
});

export const getPropertyDetails = async (propertyDetailsUuid) => {
  try {
    const response = await api.get(`/property/get-property?property_details_uuid=${propertyDetailsUuid}`);

    if (response.status === 200) {
      return response.data.data[0];
    } else {
      throw new Error(`Failed to fetch property details: Status ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error; // Re-throw the error for further handling (optional)
  }
};

export default {
  getAllProductReviews,
  getAllRefundRequests,
  getAllPayoutRequests,
};
