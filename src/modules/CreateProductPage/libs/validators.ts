import { validationMessages } from '@/libs/validation.utility';
import { z } from 'zod';

// Product variant schema
export const productVariantSchema = z.object({
  sku: z.string().optional(),
  price: z.string().refine((val) => !isNaN(+val) && +val > 0, {
    message: 'Giá phải là số dương',
  }),
  salePrice: z.number().optional(),
  quantity: z.string().refine((val) => !isNaN(+val) && +val > 0, {
    message: 'Số lượng phải là số dương',
  }),
  soldCount: z.number().int().min(0).optional(),
  attributes: z.record(z.string()),
});

export type ProductVariantSchema = z.infer<typeof productVariantSchema>;

// Product schema
export const productSchema = z.object({
  name: z.string().min(1, { message: validationMessages.required() }),
  description: z.string().min(1, { message: validationMessages.required() }),
  images: z.array(z.string()).min(1, { message: 'Vui lòng tải lên ít nhất một hình ảnh.' }),
  categories: z.array(z.string()).optional(),
  primaryCategoryId: z.string().nullable(),
  brandId: z.string().nullable(),
  originalPrice: z.string().refine((val) => !isNaN(+val) && +val > 0, {
    message: 'Giá phải là số dương',
  }),
  variants: z.array(productVariantSchema).min(1, { message: 'Vui lòng thêm ít nhất một phiên bản.' }),
  tags: z.array(z.string()).optional(),
  specifications: z.record(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isOnSale: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const attributeSchema = z.object({
  name: z.string().min(1, { message: validationMessages.required() }),
  values: z.array(z.string()).min(1, { message: 'Vui lòng thêm ít nhất một giá trị.' }),
});

export type AttributeSchema = z.infer<typeof attributeSchema>;

export const variantSchema = z.object({
  attributes: z.array(attributeSchema),
  variants: z.array(productVariantSchema),
  results: z.array(z.any()).optional(),
});

export type VariantSchema = z.infer<typeof variantSchema>;
