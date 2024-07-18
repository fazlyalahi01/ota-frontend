import { IProperty } from "./Property.model";
import User from "./User.model";

interface Review {
  id: string;
  rating: number;
  customer: User;
  comment: string;
  product: IProperty;
  published?: boolean;
}

export default Review;
