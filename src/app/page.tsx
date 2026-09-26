"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";


export default function Home(){


const [workouts,setWorkouts]=useState<any[]>([]);

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");

const [sortBy,setSortBy]=useState("duration");




useEffect(()=>{


async function getWorkouts(){


try{


const res = await fetch(
"https://api.api-store.workers.dev/api/fitlog"
);



if(!res.ok){

throw new Error("API Error");

}



const data = await res.json();



setWorkouts(data);



}catch(error){


console.log(error);


setError(
"Unable to load workouts. Please try again."
);



}finally{


setLoading(false);


}


}



getWorkouts();



},[]);







const sortedWorkouts=[...workouts].sort((a,b)=>{


if(sortBy==="duration"){

return Number(a.duration || 0)
-
Number(b.duration || 0);

}



if(sortBy==="calories"){

return Number(a.calories || 0)
-
Number(b.calories || 0);

}



if(sortBy==="rating"){

return Number(b.rating || 0)
-
Number(a.rating || 0);

}



return 0;


});








return(

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
!loading &&
!error &&
(

<div className="
mb-8
flex
items-center
gap-4
">


<label className="text-gray-400">

Sort By:

</label>



<select

value={sortBy}

onChange={(e)=>setSortBy(e.target.value)}

className="
bg-[#111]
border
border-gray-800
rounded-full
px-5
py-2
"

>


{/* <option value="default">
Default
</option> */}


<option value="duration">
Duration
</option>


<option value="calories">
Calories
</option>


<option value="rating">
Rating
</option>


</select>


</div>

)

}






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
border
border-red-500
p-5
rounded-xl
text-red-400
">

{error}

</div>

)

}







{
!loading &&
!error &&

(

<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
">


{

sortedWorkouts.map((workout)=>(


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

)


}
