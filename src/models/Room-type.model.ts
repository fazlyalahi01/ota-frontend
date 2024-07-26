
export interface IRoomType {
    room_types_uuid: string | null;
    property_details_uuid: string | null;
    property_details_name: string | null;
    types_name: string | null;
    types_details: string | null;
    total_room: string | null;
    status: "ACTIVE" | "INACTIVE"

    // read only 
    create_ts?: string;
    insert_ts?: string;
}


export const defaultRoomType: IRoomType = {
    room_types_uuid: null,
    property_details_uuid: null,
    property_details_name: null,
    types_name: null,
    types_details: null,
    total_room: null,
    status: 'ACTIVE',
}