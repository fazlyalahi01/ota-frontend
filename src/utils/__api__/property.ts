import { api } from "utils/api";

// get all property
export const getAllProperty = async() => {
  try {
    const response = await api.get("/property/get-property");
    const data = response.data.data;
    return data;
  } catch (error) {
    throw error;
  }

};

// get property based on id
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
    throw error;
  }
};