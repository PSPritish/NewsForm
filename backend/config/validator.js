const { z } = require("zod");

// ✅ Define News Schema
const newsSchema = z.object({
    timeStamp: z.string().min(1, "Timestamp is required"),
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(50, "Description must be at least 50 characters"),
    city: z.string().min(1, "City is required"),
    category: z.string().min(1, "Category is required"),
    publisher: z.string().min(1, "Publisher is required"),
    phone: z.string().length(10, "Phone number must be 10 digits"),
    image_url: z.string().url("Invalid image URL"),
});

// ✅ Validation Function
function validateNewsEntry(newsEntry) {
    const validationResult = newsSchema.safeParse(newsEntry);

    if (!validationResult.success) {
        console.error("Validation failed:", validationResult.error.errors);
        return { success: false, errors: validationResult.error.errors };
    }

    return { success: true };
}

module.exports = validateNewsEntry;
