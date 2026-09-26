"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";


export default function Home() {


  const [workouts,setWorkouts] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");



  useEffect(()=>{


    async function getWorkouts(){


      try{

        
        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );



        if(!res.ok){

          throw new Error(
            "Failed to fetch workouts"
          );

        }



        const data = await res.json();



        setWorkouts(data);



      }catch(err){


        console.log(err);


        setError(
          "Unable to load workouts. Please try again."
        );


      }finally{


        setLoading(false);


      }


    }



    getWorkouts();



  },[]);






  return (


    <main className="
    bg-black
    min-h-screen
    text-white
    ">


      <Navbar />


      <Hero />





      <section
      id="library"
      className="
      max-w-7xl
      mx-auto
      px-6
      py-20
      "
      >



        <div className="mb-10">


          <h2 className="
          text-4xl
          font-bold
          ">

            THE LIBRARY

          </h2>



          <p className="
          text-gray-400
          mt-3
          ">

            Twelve lifts covering every major muscle group.

          </p>



        </div>






        {
          loading && (

            <div className="
            text-center
            py-20
            text-gray-400
            ">

              Loading workouts...

            </div>

          )
        }







        {
          error && (

            <div className="
            bg-[#111]
            border
            border-red-500
            rounded-xl
            p-6
            text-red-400
            ">

              {error}

            </div>

          )
        }








        {
          !loading &&
          !error &&
          workouts.length === 0 && (

            <div className="
            text-gray-400
            py-10
            ">

              No workouts found.

            </div>

          )
        }








        {
          !loading &&
          !error &&
          workouts.length > 0 && (


          <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          ">


            {
              workouts.map((workout)=>(


                <WorkoutCard

                key={workout.id}

                workout={workout}

                />


              ))
            }


          </div>


          )

        }




      </section>





      <Footer />



    </main>


  );


}