export default function NotFound() {

  return (

    <main
    className="
    min-h-screen
    bg-black
    text-white
    flex
    items-center
    justify-center
    px-6
    "
    >

      <div
      className="
      text-center
      "
      >

        <h1
        className="
        text-8xl
        font-black
        text-[#ccff00]
        "
        >
          404
        </h1>


        <h2
        className="
        text-3xl
        font-bold
        mt-5
        "
        >
          WORKOUT NOT FOUND
        </h2>


        <p
        className="
        text-gray-400
        mt-4
        "
        >
          The page you are looking for does not exist.
        </p>



        <a
        href="/"
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
          Back To Workout Library
        </a>


      </div>


    </main>

  );

}