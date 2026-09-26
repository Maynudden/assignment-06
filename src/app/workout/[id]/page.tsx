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


      <div
      className="
      max-w-7xl
      mx-auto
      grid
      md:grid-cols-2
      gap-10
      items-start
      ">


        {/* Image */}

        <div className="flex items-start">

          <img
          src={workout.image}
          alt={workout.name}
          className="
          w-full
          rounded-2xl
          object-cover
          "
          />

        </div>




        {/* Details */}

        <div>


          <h1
          className="
          text-5xl
          font-black
          uppercase
          ">

            {workout.name}

          </h1>



          <p
          className="
          text-gray-400
          mt-5
          ">

            {workout.description ||
            "A compound movement that builds strength and improves overall fitness."}

          </p>





          {/* Category Tags */}

          <div className="flex gap-3 mt-6">

            {(workout.category ||
            workout.categories ||
            ["Chest","Arms"]).map(

              (item:string)=>(

                <span
                key={item}
                className="
                bg-[#ccff00]
                text-black
                px-4
                py-2
                rounded-full
                font-bold
                "
                >

                  {item}

                </span>

              )

            )}

          </div>







          {/* Specs */}

          <div
          className="
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
                {workout.equipment || "Barbell, Bench"}
              </span>
            </p>



            <p>
              Difficulty:
              <span className="text-gray-400 ml-2">
                {workout.difficulty || "Intermediate"}
              </span>
            </p>



            <p>
              Sets:
              <span className="text-gray-400 ml-2">
                {workout.sets || "4"}
              </span>
            </p>



            <p>
              Reps:
              <span className="text-gray-400 ml-2">
                {workout.reps || "6-8"}
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
                {workout.calories || 180} kcal
              </span>
            </p>



            <p>
              Rating:
              <span className="text-gray-400 ml-2">
                ⭐ {workout.rating}
              </span>
            </p>


          </div>







          {/* Instructions */}

          <div
          className="
          mt-8
          border
          border-gray-800
          rounded-xl
          p-5
          ">


            <h2
            className="
            text-2xl
            font-bold
            mb-4
            ">

              INSTRUCTIONS

            </h2>



            <ol
            className="
            list-decimal
            ml-5
            text-gray-300
            space-y-2
            ">


              <li>
                Set up your position correctly before starting the exercise.
              </li>


              <li>
                Maintain proper form and controlled movement.
              </li>


              <li>
                Complete each repetition with full range of motion.
              </li>


              <li>
                Finish the set safely and rest before the next round.
              </li>


            </ol>


          </div>







          {/* Buttons */}

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
            ">

              ➕ Add to today's plan

            </button>




            <button
            onClick={()=>addToSaved(workout)}
            className="
            border
            border-white
            px-6
            py-3
            rounded-full
            ">

              🔖 Save for later

            </button>


          </div>



        </div>



      </div>


    </main>

  );

}
