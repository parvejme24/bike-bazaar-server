export interface UserType {
  _id?: string;
  fullName?: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  phone?: string;
  role?: 'user' | 'admin';
  isActive?: boolean;
  profilePicture?: string;
  gender?: 'male' | 'female' | 'other';
  createdAt?: Date;
  updatedAt?: Date;
}
