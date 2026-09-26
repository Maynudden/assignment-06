"use client";

import Link from "next/link";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";


export default function MyPlan() {


  const {
    plan,
    saved,
    completed,
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
  (sum,item)=>
    sum +
    Number(
      item.calories ||
      (item as any).calorie ||
      (item as any).caloriesBurned ||
      0
    ),
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
        md:grid-cols-4
        gap-5
        mt-10
        ">


          <div className="bg-[#111] rounded-xl p-6">

            <p className="text-gray-400">
              Exercises
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {plan.length}
            </h2>

          </div>




          <div className="bg-[#111] rounded-xl p-6">

            <p className="text-gray-400">
              Minutes
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalMinutes}
            </h2>

          </div>





          <div className="bg-[#111] rounded-xl p-6">

            <p className="text-gray-400">
              Calories
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalCalories}
            </h2>

          </div>





          <div className="bg-[#111] rounded-xl p-6">

            <p className="text-gray-400">
              Completed
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {completed.length}
            </h2>

          </div>


        </div>







        <div className="flex gap-4 mt-10">


          <button
          onClick={()=>setActiveTab("plan")}
          className={
            activeTab==="plan"
            ?
            "bg-[#ccff00] text-black px-5 py-2 rounded-full font-bold"
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
            "bg-[#ccff00] text-black px-5 py-2 rounded-full font-bold"
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

              <h3 className="font-bold text-xl">
                NOTHING HERE YET
              </h3>


              <p className="text-gray-400 mt-2">
                Browse the library and add a lift to get today moving.
              </p>



              <Link
              href="/"
              className="
              inline-block
              mt-4
              bg-[#ccff00]
              text-black
              px-5
              py-2
              rounded-full
              "
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
              rounded-xl
              p-5
              border
              border-gray-800
              "

              >



                <img

                src={item.image || "/banner.png"}

                alt={item.name}

                className="
                w-full
                h-44
                object-cover
                rounded-lg
                "

                />






                <h2

                className="
                text-xl
                font-bold
                mt-4
                "

                >

                  {item.name}

                </h2>





                {
                  completed.includes(item.id) && (

                    <span

                    className="
                    inline-block
                    mt-2
                    bg-[#ccff00]
                    text-black
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-bold
                    "

                    >

                      COMPLETED

                    </span>

                  )
                }







                <p className="text-gray-400 mt-2">

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








                <div className="
                flex
                flex-wrap
                gap-3
                mt-5
                ">




                  <Link

                  href={`/workout/${item.id}`}

                  className="text-[#ccff00]"

                  >

                    View Details

                  </Link>







                  {
                    activeTab==="plan" && (

                      completed.includes(item.id)

                      ?

                      <button

                      disabled

                      className="
                      bg-[#ccff00]
                      text-black
                      px-4
                      py-1
                      rounded-full
                      font-bold
                      "

                      >

                        ✓ Completed

                      </button>


                      :

                      <button

                      onClick={()=>markDone(item)}

                      className="
                      border
                      px-4
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
                  px-4
                  py-1
                  rounded-full
                  "

                  >

                    ✕ Remove

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
