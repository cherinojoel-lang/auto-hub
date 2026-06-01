/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: blogarticles
 * Interface for Blogartikel
 */
export interface Blogartikel {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  title?: string;
  metaDescription?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  featuredImage?: string;
  content?: string;
  author?: string;
  publishedDate?: Date | string;
}


/**
 * Collection ID: contactinquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  userName?: string;
  userEmail?: string;
  subject?: string;
  messageContent?: string;
  submissionDate?: Date | string;
  isRead?: boolean;
}


/**
 * Collection ID: financinginquiries
 * Interface for FinancingInquiries
 */
export interface FinancingInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  desiredAmount?: number;
  loanTerm?: number;
  carMakeModel?: string;
  submissionDate?: Date | string;
}


/**
 * Collection ID: tradeinquiries
 * Interface for TradeInquiries
 */
export interface TradeInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  preferredContactMethod?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  vehicleMileage?: number;
  vehicleVIN?: string;
  vehicleCondition?: string;
  vehiclePhotos?: string;
  desiredNewVehicle?: string;
  submissionDate?: Date | string;
}


/**
 * Collection ID: vehicles
 * Interface for Vehicles
 */
export interface Vehicles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  gearbox?: string;
  gallery?: string;
  slug?: string;
  title?: string;
  status?: string;
  financingMonthly?: number;
  manufacturer?: string;
  model?: string;
  firstRegistrationYear?: number;
  price?: number;
  mileage?: number;
  power?: number;
  driveType?: string;
  electricalRange?: number;
  mainImage?: string;
  description?: string;
}
