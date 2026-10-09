import Image from 'next/image';
import Link from 'next/link';

const BannerPage = () => {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="grid items-center gap-8 rounded-2xl bg-base-200 px-5 py-8 sm:gap-10 sm:px-8 sm:py-10 md:grid-cols-2 md:px-10 lg:gap-16 lg:px-14">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-base-content/75 sm:text-base sm:leading-8">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <Link href="#all-products" className="btn mt-6 bg-[#047F39] text-white hover:bg-[#036b30]">
                        সব পণ্য দেখুন
                    </Link>
                </div>
                <div className="relative mx-auto aspect-4/3 w-full max-w-sm sm:max-w-md md:max-w-none">
                    <Image
                        alt="তাজা সবজির ঝুড়ি"
                        src="/bazar-hero.png"
                        fill
                        priority
                        sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 560px"
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default BannerPage;