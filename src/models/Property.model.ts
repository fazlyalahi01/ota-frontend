interface ImageAlbum {
  album_name: string[];
}

interface Amenity {
  name: string[];
}

interface Kitchen {
  label: string[];
}

interface FoodAndDinning {
  kitchen_name: Kitchen;
}

interface PropertyPolicy {
  name: string[];
}

type PropertyType = 'Hotel' | 'Resort' | 'Apartment';
type Status = 'ACTIVE' | 'INACTIVE';

export interface IProperty {
  property_details_uuid: string;
  property_details_name: string;
  property_type: PropertyType;
  property_images: ImageAlbum[];
  about_property: string;
  property_address_line_1: string;
  property_address_line_2?: string;
  property_city: string;
  property_state: string;
  property_pincode: string;
  property_country: string;
  longitude: number;
  latitude: number;
  amenities: Amenity[];
  checkin_time: string;
  checkout_time: string;
  food_and_dinning: FoodAndDinning[];
  property_policies: PropertyPolicy[];
  rule_allowed: string[];
  rule_not_allowed: string[];
  status: Status;

  // read only 
  create_ts?: string;
  insert_ts?: string;
}


export const defaultProperty: IProperty = {
  property_details_uuid: '',
  property_details_name: '',
  property_type: 'Hotel',
  property_images: [],
  about_property: '',
  property_address_line_1: '',
  property_address_line_2: '',
  property_city: '',
  property_state: '',
  property_pincode: '',
  property_country: '',
  longitude: 0,
  latitude: 0,
  amenities: [],
  checkin_time: '',
  checkout_time: '',
  food_and_dinning: [],
  property_policies: [],
  rule_allowed: [],
  rule_not_allowed: [],
  status: 'ACTIVE',
}