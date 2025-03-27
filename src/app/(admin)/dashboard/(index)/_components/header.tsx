'use client';

import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment !== '');

    // Jika path dimulai dengan "dashboard", kita bisa menghilangkan segmen "dashboard" pertama
    const filteredSegments = pathSegments[0] === 'dashboard' ? pathSegments.slice(1) : pathSegments;

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {filteredSegments.map((segment, index) => {
                        const href = `/dashboard/${filteredSegments.slice(0, index + 1).join('/')}`;
                        const isLast = index === filteredSegments.length - 1;

                        return (
                            <React.Fragment key={href}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{segment}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link href={href}>{segment}</Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
        </header>
    );
}