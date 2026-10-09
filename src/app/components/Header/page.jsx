

import { Suspense } from 'react';
import Image from 'next/image';
import { connection } from 'next/server';
import NavlinksPage from '../page';
import MarqueePage from '../Marquee/page';

const CurrentDate = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle:"full"
        }
    )

    return <p className="text-sm text-gray-600">{date}</p>;
};

const HeaderPage = () => {
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
                        <Suspense fallback={<p className="h-5" aria-hidden="true" />}>
                            <CurrentDate />
                        </Suspense>
                    </div>
                </div>
                <nav aria-label="Account" className="flex items-center justify-end gap-2 sm:gap-3">
                    <a href="/sign-in" className="btn btn-outline">
                        Sign In
                    </a>
                    <a href="/sign-up" className="btn bg-[#047F39]">
                        Sign Up
                    </a>
                </nav>
            </div>
            <NavlinksPage />
            <MarqueePage />
        </header>
    );
};

export default HeaderPage ;
