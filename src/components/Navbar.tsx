"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  return (
    <nav className="w-full bg-black text-white px-6 py-5 flex justify-between items-center">

      <Link href="/" className="flex items-center gap-3">
        <img 
          src="/logo.png"
          alt="FitLog"
          className="w-10 h-10"
        />
        <span className="font-bold text-xl">
          FITLOG
        </span>
      </Link>


      <div className="flex gap-8">

        <Link
          href="/"
          className={
            pathname === "/"
              ? "text-[#ccff00]"
              : ""
          }
        >
          Workout
        </Link>


        <Link
          href="/my-plan"
          className={
            pathname === "/my-plan"
              ? "text-[#ccff00]"
              : ""
          }
        >
          My Plan
        </Link>

      </div>


      <div className="flex gap-3">

        <Link
          href="/my-plan"
          className="bg-[#ccff00] text-black px-4 py-2 rounded-full"
        >
          Plan {plan.length}
        </Link>

        <Link
          href="/my-plan"
          className="border border-white px-4 py-2 rounded-full"
        >
          Saved {saved.length}
        </Link>

      </div>

    </nav>
  );
}
