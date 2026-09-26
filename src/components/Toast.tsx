"use client";

import { useWorkout } from "@/context/WorkoutContext";


export default function Toast() {

  const { toast } = useWorkout();


  if (!toast) {
    return null;
  }


  return (

    <div
      className="
      fixed
      bottom-20
      right-8
      z-[999]
      bg-[#ccff00]
      text-black
      px-6
      py-3
      rounded-full
      font-bold
      shadow-xl
      animate-bounce
      "
    >

      {toast}

    </div>

  );

}