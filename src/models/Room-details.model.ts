import { IFileUpload } from "utils/_helpers_/file-upload";

export interface IRoomDetails {
    room_details_uuid: string | null;
    room_types_uuid: string | null;
    room_types_name: string | null;
    property_details_uuid: string | null;
    property_details_name: string | null;
    room_images: IFileUpload[] | null;
    room_area: string | null;
    bed_type: string | null;
    view_type: string | null;
    max_no_of_guests: 0;
    about_room: string | null;
    amenities: string[];
    status: "ACTIVE" | "INACTIVE"

    // read only 
    create_ts?: string;
    insert_ts?: string;
}


export const defaultRoomDetails: IRoomDetails = {
    room_details_uuid: null,
    room_types_uuid: null,
    room_types_name: null,
    property_details_uuid: null,
    property_details_name: null,
    room_images: [],
    room_area: null,
    bed_type: null,
    view_type: null,
    max_no_of_guests: 0,
    about_room: null,
    amenities: [],
    status: 'ACTIVE',
}