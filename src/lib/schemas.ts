import { z } from 'zod';

export const nameSchemaCheck = z
  .string()
  .min(3, 'Name should have at least 3 characters');
export const descriptionSchemaCheck = z
  .string()
  .min(10, 'Description should have at least 10 characters');
export const priceSchemaCheck = z
  .number()
  .min(1, 'Price must be bigger than 0');
export const weightSchemaCheck = z.number().min(0, 'Weight must be positive');
export const supplierSchemaCheck = z
  .string()
  .min(1, 'Supplier should have at least 1 character');
export const imageSchemaCheck = z
  .string()
  .min(3, 'Image URL should have at least 3 characters');
export const categorySchemaCheck = z
  .string()
  .min(1, 'Category should not be empty');
export const usernameSchemaCheck = z
  .string()
  .min(3, 'Username must be at least 3 characters');
export const passwordSchemaCheck = z
  .string()
  .min(3, 'Password must be at least 3 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    'Password must contain at least one uppercase letter, one lowercase letter and one number',
  );
