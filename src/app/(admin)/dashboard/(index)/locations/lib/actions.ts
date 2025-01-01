"use server";

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { schemaLocation } from "@/lib/schema";

export async function postLocation(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    const validate = schemaLocation.safeParse({
        name: formData.get('name')
    });

    if (!validate.success) {
        return {
            error: validate.error.errors[0].message
        };
    }

    try {
        await prisma.location.create({
            data: {
                name: validate.data.name
            }
        });
    } catch (error) {
        (error);
        return { error: "Failed to create location" };
    }

    return redirect('/dashboard/locations');
}

export async function updateLocation(
    _: unknown,
    formData: FormData,
    id: number | undefined
): Promise<ActionResult> {
    if (!id) {
        return { error: "Location ID is required" };
    }

    const validate = schemaLocation.safeParse({
        name: formData.get('name')
    });

    if (!validate.success) {
        return { error: validate.error.errors[0].message };
    }

    try {
        await prisma.location.update({
            where: { id },
            data: { name: validate.data.name }
        });
    } catch (error) {
        (error);
        return { error: "Failed to update the location" };
    }

    return redirect('/dashboard/locations');
}

export async function deleteLocation(
    _: unknown,
    formData: FormData,
    id: number
): Promise<ActionResult> {

    try {
        await prisma.location.delete({
            where: {
                id
            }
        })
    } catch (error) {
        (error);
        return {
            error: 'Failed to delete data'
        }
    }

    return redirect('/dashboard/locations');
}
