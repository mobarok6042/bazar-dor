"use client"

import React from 'react';
import Image from 'next/image';

const HeaderPage = () => {
    const date = new Date().toLocaleDateString("bn-bd",
        {
            dateStyle:"full"
        }
    )
    return (
        <header className="w-full border-b border-gray-200">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4 lg:px-8">
                <div className="flex min-w-0 items-center gap-3">
                    <Image
                        alt="বাজার দর"
                        src="/logo-icon.png"
                        width={50}
                        height={50}
                        className="h-11 w-11 shrink-0 sm:h-12.5 sm:w-12.5"
                    />
                    <div className="min-w-0">
                        <h1 className="text-xl font-bold leading-tight sm:text-2xl">বাজার দর</h1>
                        <p className="text-sm text-gray-600">{date}</p>
                    </div>
                </div>
                <nav aria-label="Account" className="flex items-center justify-end gap-2 sm:gap-3">
                    <a
                        href="/sign-in"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        সাইন ইন
                    </a>
                    <a
                        href="/sign-up"
                        className="rounded-md bg-[#047F39] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 "
                    >
                        সাইন আপ
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default HeaderPage ;
