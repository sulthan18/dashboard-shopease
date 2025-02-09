import prisma from "../../../../../../../lib/prisma";

export async function getLocations() {
    try {
        const categories = await prisma.location.findMany({})

        return categories
    } catch (error) {
        (error);
        return []

    }
}

export async function getLocation(id: string) {
    try {
        const location = await prisma.location.findFirst({
            where: {
                id: Number.parseInt(id)
            }
        })

        return location
    } catch (error) {
        (error);

        return null
    }
}