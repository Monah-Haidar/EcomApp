import {z} from 'zod';

// Define Zod schema for product validation
export const ProductSchema = z.object({
  title: z.string().min(3, {message: 'Product name must be at least 3 characters'}),
  description: z.string().min(10, {message: 'Description must be at least 10 characters'}),
  price: z
    .string()
    .min(1, {message: 'Price is required'})
    .refine(val => !isNaN(Number(val)), {message: 'Price must be a number'})
    .refine(val => Number(val) > 0, {message: 'Price must be greater than zero'}),
  location: z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }).optional(), // Make location optional for now, or add a custom message
});

export type ProductFormData = z.infer<typeof ProductSchema>;

// // Extended schema that includes images (for complete validation)
// export const CompleteProductSchema = ProductSchema.extend({
//   images: z.array(z.object({
//     uri: z.string()
//   })).min(1, {message: 'At least one product image is required'}),
// });

// export type CompleteProductData = z.infer<typeof CompleteProductSchema>;
