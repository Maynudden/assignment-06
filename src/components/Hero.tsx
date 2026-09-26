import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
      max-w-7xl
      mx-auto
      px-6
      py-20
      grid
      md:grid-cols-2
      gap-10
      items-center
      "
    >
      <div>
        <p
          className="
          text-[#ccff00]
          tracking-widest
          text-sm
          font-bold
          "
        >
          WORKOUT LIBRARY
        </p>

        <h1
          className="
          text-5xl
          md:text-7xl
          font-black
          mt-5
          leading-tight
          "
        >
          TRAIN WITH INTENT.
          <br />
          LOG EVERY SET.
        </h1>

        <p
          className="
          text-gray-400
          mt-6
          max-w-xl
          "
        >
          FitLog is a dark, no-nonsense gym companion:
          pick a lift, lock it into today's plan,
          and watch the week's work add up.
        </p>

        <Link
          href="#library"
          className="
          inline-block
          mt-8
          bg-[#ccff00]
          text-black
          px-6
          py-3
          rounded-full
          font-bold
          "
        >
          BROWSE WORKOUTS
        </Link>
      </div>


      <div>
        <img
          src="/banner.png"
          alt="Workout"
          className="
          w-full
          rounded-xl
          "
        />
      </div>

    </section>
  );
}