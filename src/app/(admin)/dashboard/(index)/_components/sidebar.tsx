'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Archive, Building, Home, MapPin, Package, Package2, ShoppingCart, Users2 } from 'lucide-react';
import FormLogout from './form-logout';
import clsx from 'clsx';

const useActiveLink = (path: string): string => {
    const pathname = usePathname();
    const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const normalizedLink = path.endsWith('/') ? path.slice(0, -1) : path;

    return normalizedPath === normalizedLink
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground';
};

const Sidebar: React.FC = () => {
    // Menu items definition for DRY principle and better maintainability
    const menuItems = [
        { href: '/dashboard/', icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
        { href: '/dashboard/categories', icon: <Archive className="h-5 w-5" />, label: 'Categories' },
        { href: '/dashboard/locations', icon: <MapPin className="h-5 w-5" />, label: 'Locations' },
        { href: '/dashboard/brands', icon: <Building className="h-5 w-5" />, label: 'Brands' },
        { href: '/dashboard/products', icon: <Package className="h-5 w-5" />, label: 'Products' },
        { href: '/dashboard/orders', icon: <ShoppingCart className="h-5 w-5" />, label: 'Orders' },
        { href: '/dashboard/customers', icon: <Users2 className="h-5 w-5" />, label: 'Customers' },
    ];

    return (
        <TooltipProvider>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        href="#"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>

                    {menuItems.map(({ href, icon, label }) => (
                        <Tooltip key={href}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={href}
                                    className={clsx(
                                        'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
                                        useActiveLink(href) 
                                    )}
                                >
                                    {icon}
                                    <span className="sr-only">{label}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">{label}</TooltipContent>
                        </Tooltip>
                    ))}
                </nav>

                <FormLogout />
            </aside>
        </TooltipProvider>
    );
};

export default Sidebar;
