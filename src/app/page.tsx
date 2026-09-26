"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWorkouts() {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        const data = await res.json();

        // API response handle
        setWorkouts(
          Array.isArray(data)
            ? data
            : data.data || []
        );

      } catch (error) {
        console.log("API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getWorkouts();
  }, []);


  return (
    <main className="bg-black min-h-screen text-white">

      <Navbar />

      <Hero />


      <section
        id="library"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            THE LIBRARY
          </h2>

          <p className="text-gray-400 mt-3">
            Twelve lifts covering every major muscle group.
          </p>

        </div>


        {loading ? (

          <div className="text-center py-20 text-[#ccff00]">
            Loading workouts...
          </div>

        ) : workouts.length === 0 ? (

          <div className="text-center py-20 text-gray-400">
            No workouts found
          </div>

        ) : (

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            "
          >

            {workouts.map((workout:any) => (

              <WorkoutCard
                key={workout.id}
                workout={workout}
              />

            ))}

          </div>

        )}

      </section>


      <Footer />

    </main>
  );
}