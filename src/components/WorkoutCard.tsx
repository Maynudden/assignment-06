import Link from "next/link";

export default function WorkoutCard({ workout }: any) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="
      bg-[#111]
      border
      border-gray-800
      rounded-2xl
      overflow-hidden
      hover:border-[#ccff00]
      transition
      block
      "
    >

      <img
        src={workout.image || "/banner.png"}
        alt={workout.name || workout.title || "Workout"}
        className="
        w-full
        h-64
        object-cover
        "
      />


      <div className="p-5">


        <div className="flex gap-2 mb-4 flex-wrap">

          {(workout.category || workout.categories || []).map(
            (item: string, index: number) => (
              <span
                key={index}
                className="
                text-xs
                bg-[#ccff00]
                text-black
                px-3
                py-1
                rounded-full
                font-bold
                "
              >
                {item}
              </span>
            )
          )}

        </div>


        <h3
          className="
          text-xl
          font-bold
          uppercase
          "
        >
          {workout.name || workout.title}
        </h3>


        <p
          className="
          text-gray-400
          mt-2
          "
        >
          {workout.equipment || "Gym Equipment"}
        </p>


        <div
          className="
          flex
          justify-between
          mt-5
          text-sm
          text-gray-300
          "
        >

          <span>
            ⏱ {workout.duration || 0} min
          </span>


          <span>
            🔥 {workout.calories || 0} kcal
          </span>


          <span>
            ⭐ {workout.rating || 0}
          </span>

        </div>


      </div>

    </Link>
  );
}