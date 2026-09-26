"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


type Workout = {
  id: number;
  name?: string;
  title?: string;
  image?: string;
  equipment?: string;
  duration?: number;
  calories?: number;
  rating?: number;
  category?: string[];
};



type WorkoutContextType = {

  plan: Workout[];

  saved: Workout[];

  toast: string | null;


  addToPlan: (workout: Workout) => void;

  addToSaved: (workout: Workout) => void;

  removeFromPlan: (id:number) => void;

  removeFromSaved: (id:number) => void;

  markDone: (workout:Workout) => void;

};



const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);



export function WorkoutProvider({
  children
}:{
  children:ReactNode
}) {


  const [plan,setPlan] = useState<Workout[]>([]);

  const [saved,setSaved] = useState<Workout[]>([]);

  const [toast,setToast] = useState<string | null>(null);



  useEffect(()=>{

    const savedPlan = localStorage.getItem("plan");

    const savedWorkout = localStorage.getItem("saved");


    if(savedPlan){

      setPlan(JSON.parse(savedPlan));

    }


    if(savedWorkout){

      setSaved(JSON.parse(savedWorkout));

    }


  },[]);



  useEffect(()=>{

    localStorage.setItem(
      "plan",
      JSON.stringify(plan)
    );

  },[plan]);



  useEffect(()=>{

    localStorage.setItem(
      "saved",
      JSON.stringify(saved)
    );

  },[saved]);





const showToast = (message:string)=>{

  setToast(message);


  window.setTimeout(()=>{

    setToast(null);

  },2000);

};


  const addToPlan = (workout:Workout)=>{


    if(plan.length >= 5){

      showToast("Maximum 5 workouts allowed");

      return;

    }



    const exists = plan.find(
      item=>item.id === workout.id
    );



    if(!exists){

      setPlan([
        ...plan,
        workout
      ]);


      showToast(
        "Added to today's plan"
      );

    }


  };






  const addToSaved = (workout:Workout)=>{


    const exists = saved.find(
      item=>item.id === workout.id
    );


    if(!exists){

      setSaved([
        ...saved,
        workout
      ]);


      showToast(
        "Saved for later"
      );

    }


  };







  const removeFromPlan = (id:number)=>{


    setPlan(
      plan.filter(
        item=>item.id !== id
      )
    );


    showToast(
      "Removed from plan"
    );


  };







  const removeFromSaved = (id:number)=>{


    setSaved(
      saved.filter(
        item=>item.id !== id
      )
    );


    showToast(
      "Removed from saved"
    );


  };







  const markDone = (workout:Workout)=>{


    showToast(
      `${workout.name} completed`
    );


  };








  return (

    <WorkoutContext.Provider

      value={{

        plan,

        saved,

        toast,


        addToPlan,

        addToSaved,

        removeFromPlan,

        removeFromSaved,

        markDone,

      }}

    >

      {children}

    </WorkoutContext.Provider>

  );


}





export function useWorkout(){

  const context = useContext(
    WorkoutContext
  );


  if(!context){

    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );

  }


  return context;

}
