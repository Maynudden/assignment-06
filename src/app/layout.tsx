import type { Metadata } from "next";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";
import Toast from "@/components/Toast";


export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description: "Train with intent. Log every set.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body>

        <WorkoutProvider>

          {children}

          <Toast />

        </WorkoutProvider>

      </body>

    </html>

  );
}
