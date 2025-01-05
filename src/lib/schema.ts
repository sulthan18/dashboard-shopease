import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"]

export const schemaSignIn = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Email is not valid" }),
    password: z.string({ required_error: "Password is required" }).min(5, { message: "Password must be at least 5 characters long" })
})

export const schemaCategory = z.object({
    name: z.string({ required_error: "Name is required" }).min(4, { message: "Name must be at least 4 characters long" }),
})

export const schemaLocation = z.object({
    name: z.string({ required_error: "Location is required" }).min(4, { message: "Location must be at least 4 characters long" }),
})

export const schemaBrand = schemaCategory.extend({
    image: z.any().refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), { message: "Invalid file type" }).refine((file: File) => file?.name, { message: "Image is required" })
})

export const schemaProduct = z.object({
    name: z.string({ required_error: "Name is required" }).min(4, { message: "Name must be at least 4 characters long" }),
    description: z.string({ required_error: "Description is required" }).min(10, { message: "Description must be at least 10 characters long" }),
    price: z.string({ required_error: "Price is required" }),
    stock: z.string({ required_error: "Stock is required" }),
    brand_id: z.string({ required_error: "Brand is required" }),
    category_id: z.string({ required_error: "Category is required" }),
    location_id: z.string({ required_error: "Location is required" }),
    images: z.any().refine((files: File[]) => Array.isArray(files) && files.length === 3, { message: "Please upload 3 image product", }).refine((files: File[]) => {
        let validate = false

        if (Array.isArray(files)) {
            validate = files.some((file) => ALLOW_MIME_TYPES.includes(file.type));
        }

        return validate;
    },
        {
            message: "Uploaded file should be an image"
        })
}
)

export const schemaProductEdit = schemaProduct.extend({
    id: z.number({ required_error: "Product Id is required" })
}).omit({ images: true })