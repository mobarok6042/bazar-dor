

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { connection } from 'next/server';
import NavlinksPage from '../page';
import MarqueePage from '../Marquee/page';
import AccountMenu from './AccountMenu';

export const metadata = {
    title: 'শিরোনাম',
};

const CurrentDate = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle:"full"
        }
    )

    return (
        <p className="mt-1 inline-flex rounded-full bg-[#047F39] px-3 py-1 text-xs font-medium text-white sm:text-sm">
            {date}
        </p>
    );
};

const HeaderPage = () => {
    return (
        <header className="w-full border-b border-gray-200">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4 lg:px-8">
                <Link href="/" aria-label="বাজার দর হোমপেজ" className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#047F39]">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#047F39] p-1 sm:h-14 sm:w-14">
                        <Image
                            alt=""
                            src="/logo-icon.png"
                            width={50}
                            height={50}
                            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                        />
                    </span>
                    <div className="min-w-0">
                        <h1 className="text-xl font-bold leading-tight sm:text-2xl">বাজার দর</h1>
                        <Suspense fallback={<p className="h-5" aria-hidden="true" />}>
                            <CurrentDate />
                        </Suspense>
                    </div>
                </Link>
                <AccountMenu />
            </div>
            <NavlinksPage />
            <MarqueePage />
        </header>
    );
};

export default HeaderPage ;
