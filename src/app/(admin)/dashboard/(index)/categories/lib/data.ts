import prisma from "../../../../../../../lib/prisma";

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({})

        return categories
    } catch (error) {
        (error);
        return []

    }
}

export async function getCategory(id: string) {
    try {
        const category = await prisma.category.findFirst({
            where: {
                id: Number.parseInt(id)
            }
        })

        return category
    } catch (error) {
        (error);

        return null
    }
}