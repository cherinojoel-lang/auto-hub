/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: vehicles
 * Interface for Vehicles
 */
export interface Vehicles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
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
