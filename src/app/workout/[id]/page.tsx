"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutDetails() {

  const { id } = useParams();

  const { addToPlan, addToSaved } = useWorkout();

  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function getWorkout(){

      try{

        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        const data = await res.json();

        setWorkout(data);

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);

      }

    }


    if(id){
      getWorkout();
    }

  },[id]);



  if(loading){

    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        Loading workout...
      </div>
    );

  }



  if(!workout){

    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        Workout not found
      </div>
    );

  }



  return (

    <main className="bg-black min-h-screen text-white px-6 py-12">


      <div className="
      max-w-7xl
      mx-auto
      grid
      md:grid-cols-2
      gap-10
      ">


        {/* Image */}

        <div>

          <img
            src={workout.image}
            alt={workout.name}
            className="
            w-full
            rounded-2xl
            "
          />

        </div>



        {/* Details */}

        <div>


          <h1 className="
          text-5xl
          font-black
          uppercase
          ">
            {workout.name}
          </h1>


          <p className="
          text-gray-400
          mt-5
          ">
            {workout.description}
          </p>



          <div className="flex gap-3 mt-6">

            {(workout.category || []).map(
              (item:string)=>(
                <span
                key={item}
                className="
                bg-[#ccff00]
                text-black
                px-4
                py-2
                rounded-full
                "
                >
                  {item}
                </span>
              )
            )}

          </div>



          <div className="
          mt-8
          border
          border-gray-800
          rounded-xl
          p-5
          space-y-3
          ">


            <p>
              Equipment:
              <span className="text-gray-400 ml-2">
                {workout.equipment}
              </span>
            </p>


            <p>
              Duration:
              <span className="text-gray-400 ml-2">
                {workout.duration} min
              </span>
            </p>


            <p>
              Calories:
              <span className="text-gray-400 ml-2">
                {workout.calories} kcal
              </span>
            </p>


            <p>
              Rating:
              <span className="text-gray-400 ml-2">
                ⭐ {workout.rating}
              </span>
            </p>


          </div>




          <div className="flex gap-4 mt-8">


            <button
            onClick={()=>addToPlan(workout)}
            className="
            bg-[#ccff00]
            text-black
            px-6
            py-3
            rounded-full
            font-bold
            "
            >
              Add to today's plan
            </button>



            <button
            onClick={()=>addToSaved(workout)}
            className="
            border
            border-white
            px-6
            py-3
            rounded-full
            "
            >
              Save for later
            </button>


          </div>


        </div>


      </div>


    </main>

  );

}