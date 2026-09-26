"use client";

import Link from "next/link";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";


export default function MyPlan(){

  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markDone
  } = useWorkout();


  const [activeTab,setActiveTab] = useState("plan");


  const workouts =
    activeTab === "plan"
    ? plan
    : saved;



  const totalMinutes = plan.reduce(
    (sum,item)=>sum + Number(item.duration || 0),
    0
  );


  const totalCalories = plan.reduce(
    (sum,item)=>sum + Number(item.calories || 0),
    0
  );



  return (

    <main className="
    min-h-screen
    bg-black
    text-white
    px-6
    py-12
    ">


      <div className="
      max-w-7xl
      mx-auto
      ">


        <h1 className="
        text-5xl
        font-black
        ">
          MY PLAN
        </h1>


        <p className="text-gray-400 mt-3">
          Cap of five lifts for today. Finish them, then load more.
        </p>



        <div className="
        grid
        md:grid-cols-3
        gap-5
        mt-10
        ">


          <div className="bg-[#111] p-6 rounded-xl">
            <h3>Exercises</h3>
            <p className="text-3xl font-bold mt-2">
              {plan.length}
            </p>
          </div>


          <div className="bg-[#111] p-6 rounded-xl">
            <h3>Minutes</h3>
            <p className="text-3xl font-bold mt-2">
              {totalMinutes}
            </p>
          </div>


          <div className="bg-[#111] p-6 rounded-xl">
            <h3>Calories</h3>
            <p className="text-3xl font-bold mt-2">
              {totalCalories}
            </p>
          </div>


        </div>




        <div className="flex gap-5 mt-10">


          <button
          onClick={()=>setActiveTab("plan")}
          className={
            activeTab==="plan"
            ?
            "bg-[#ccff00] text-black px-5 py-2 rounded-full"
            :
            "border px-5 py-2 rounded-full"
          }
          >
            Today's Plan
          </button>



          <button
          onClick={()=>setActiveTab("saved")}
          className={
            activeTab==="saved"
            ?
            "bg-[#ccff00] text-black px-5 py-2 rounded-full"
            :
            "border px-5 py-2 rounded-full"
          }
          >
            Saved
          </button>


        </div>





        <div className="
        grid
        md:grid-cols-2
        gap-6
        mt-10
        ">



        {
          workouts.length === 0 ? (

            <div>

              <h3 className="font-bold">
                NOTHING HERE YET
              </h3>


              <p className="text-gray-400 mt-2">
                Browse the library and add a lift to get today moving.
              </p>


              <Link
              href="/"
              className="text-[#ccff00] mt-3 inline-block"
              >
                Go to workouts
              </Link>


            </div>


          ) : (


            workouts.map((item:any)=>(


              <div
              key={item.id}
              className="
              bg-[#111]
              p-5
              rounded-xl
              "
              >


                <img
                src={item.image || "/banner.png"}
                alt={item.name}
                className="
                w-full
                h-40
                object-cover
                rounded-lg
                "
                />



                <h2 className="
                text-xl
                font-bold
                mt-4
                ">
                  {item.name}
                </h2>



                <p className="text-gray-400">
                  {item.equipment}
                </p>




                <div className="
                flex
                gap-4
                text-sm
                mt-4
                ">

                  <span>
                    ⏱ {item.duration} min
                  </span>

                  <span>
                    🔥 {item.calories} kcal
                  </span>

                  <span>
                    ⭐ {item.rating}
                  </span>

                </div>




                <div className="flex gap-3 mt-5 flex-wrap">


                  <Link
                  href={`/workout/${item.id}`}
                  className="text-[#ccff00]"
                  >
                    View Details
                  </Link>



                  {
                    activeTab==="plan" && (

                    <button
                    onClick={()=>markDone(item)}
                    className="
                    border
                    px-3
                    py-1
                    rounded-full
                    "
                    >
                      ✓ Mark as Done
                    </button>

                    )
                  }




                  <button
                  onClick={()=> 
                    activeTab==="plan"
                    ?
                    removeFromPlan(item.id)
                    :
                    removeFromSaved(item.id)
                  }
                  className="
                  border
                  px-3
                  py-1
                  rounded-full
                  "
                  >
                    ✕
                  </button>


                </div>


              </div>


            ))


          )
        }



        </div>


      </div>


    </main>

  );

}