import { api } from "utils/api";

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