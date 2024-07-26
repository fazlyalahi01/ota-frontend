import { api } from "utils/api";

// get list view
export const getAllRoomDetailsList = async() => {
  try {
    const response = await api.get("/room/get-room-details");
    const data = response.data.data;
    return data;
  } catch (error) {
    throw error;
  }

};

// get single data
export const getRoomDetails = async (uuid: string) => {
  try {
    const response = await api.get(`/room/get-room-details?room_types_uuid=${uuid}`);

    if (response.status === 200) {
      return response.data.data[0];
    } else {
      throw new Error(`Failed to fetch data: Status ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};