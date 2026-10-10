import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-7xl font-bold text-[#047F39]">৪০৪</p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">পৃষ্ঠা খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 max-w-md text-base-content/70">
        দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি এখানে নেই।
      </p>
      <Link
        href="/"
        className="btn mt-6 bg-[#047F39] px-6 font-semibold text-white hover:bg-[#035f2b]"
      >
        হোম এ ফিরে যান
      </Link>
    </main>
  );
}
