/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactinquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userName?: string;
  /** @wixFieldType text */
  userEmail?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
  /** @wixFieldType boolean */
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
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType number */
  desiredAmount?: number;
  /** @wixFieldType number */
  loanTerm?: number;
  /** @wixFieldType text */
  carMakeModel?: string;
  /** @wixFieldType datetime */
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
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  preferredContactMethod?: string;
  /** @wixFieldType text */
  vehicleMake?: string;
  /** @wixFieldType text */
  vehicleModel?: string;
  /** @wixFieldType number */
  vehicleYear?: number;
  /** @wixFieldType number */
  vehicleMileage?: number;
  /** @wixFieldType text */
  vehicleVIN?: string;
  /** @wixFieldType text */
  vehicleCondition?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  vehiclePhotos?: string;
  /** @wixFieldType text */
  desiredNewVehicle?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: vehicles
 * @catalog This collection is an eCommerce catalog
 * Interface for Vehicles
 */
export interface Vehicles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  gearbox?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  gallery?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType number */
  financingMonthly?: number;
  /** @wixFieldType text */
  manufacturer?: string;
  /** @wixFieldType text */
  model?: string;
  /** @wixFieldType number */
  firstRegistrationYear?: number;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType number */
  mileage?: number;
  /** @wixFieldType number */
  power?: number;
  /** @wixFieldType text */
  driveType?: string;
  /** @wixFieldType number */
  electricalRange?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType text */
  description?: string;
}
