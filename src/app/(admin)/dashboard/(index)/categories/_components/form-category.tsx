"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ActionResult } from '@/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { postCategory, updateCategory } from '../lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Category } from '@prisma/client';

const initialState: ActionResult = {
  error: ''
};

interface FormCategoryProps {
  type?: 'ADD' | 'EDIT';
  data?: Category | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' size='sm' disabled={pending}>
      {pending ? "Loading..." : "Save Category"}
    </Button>
  );
}

export default function FormCategory({ data = null, type = 'ADD' }: FormCategoryProps) {
  // Handle update category with ID if type is 'EDIT'
  const updateCategoryWithId = (_: unknown, formData: FormData) => updateCategory(_, formData, data?.id);

  // Use appropriate action for form (postCategory for ADD, updateCategoryWithId for EDIT)
  const [state, formAction] = useFormState(type === 'ADD' ? postCategory : updateCategoryWithId, initialState);

  const [initialData, setInitialData] = useState<Category | null>(data);

  const handleDiscard = (event: React.MouseEvent) => {
    event.preventDefault(); 

    if (initialData) {
      setInitialData(data);
    }

    window.history.back(); 
  };

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href='/dashboard/categories'>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Category Controller
            </h1>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0" className='w-[500px]'>
                <CardHeader>
                  <CardTitle>Category Details</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant='destructive' className='mb-4'>
                      <AlertCircle className='h-4 w-4' />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        name='name'
                        className="w-full"
                        defaultValue={data?.name}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex justify-start gap-2">
            {/* Menggunakan type="button" agar tidak submit form */}
            <Button variant="outline" size="sm" type="button" onClick={handleDiscard}>
              Discard
            </Button>
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  );
}
