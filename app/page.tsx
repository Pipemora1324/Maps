"use client";

import React, { useState, useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";

// Carga dinámica del mapa (evita error SSR en Next.js)
const MapComponent = dynamic(() => import("./components/MapComponent"), {
  ssr: false,
});

export default function RunningTracker() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);

  const isDark = useMemo(() => {
    if (typeof window !== "undefined") {
      return theme === "dark";
    }
    return false;
  }, [theme]);

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setRoutePoints((prev) => [...prev, [latlng.lat, latlng.lng]]);
  };

  return (
    <section
      className={`min-h-screen ${
        isDark ? "bg-gray-900" : "bg-amber-50"
      } transition-colors duration-300 p-4 sm:p-6 lg:p-8`}
    >
      <section className="max-w-md mx-auto">
        {/* Selector de tema */}
        <section className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-lg transition-colors ${
              theme === "light"
                ? "bg-amber-200 text-amber-900"
                : isDark
                ? "bg-gray-800 text-gray-400"
                : "bg-white text-gray-600"
            }`}
          >
            <Sun size={20} />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark"
                ? "bg-gray-700 text-yellow-400"
                : isDark
                ? "bg-gray-800 text-gray-400"
                : "bg-white text-gray-600"
            }`}
          >
            <Moon size={20} />
          </button>
        </section>

        {/* Tarjeta principal */}
        <section
          className={`${
            isDark ? "bg-gray-800" : "bg-white"
          } rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300 border-2 border-amber-500 shadow-gray-400`}
        >
          {/* Mapa con botón y distancia */}
          <section className="relative p-6">
            {/* Botón de retroceso */}
            <button
              className={`absolute top-8 left-8 ${
                isDark ? "bg-gray-700" : "bg-white"
              } p-3 rounded-full shadow-lg z-10`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={isDark ? "text-white" : "text-gray-800"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* 🗺️ Mapa interactivo */}
            <section className="rounded-3xl overflow-hidden h-80 sm:h-96">
              <MapComponent
                onMapClick={handleMapClick}
                routePoints={routePoints}
                isDark={isDark}
              />
            </section>

            {/* Distancia visible sobre el mapa */}
            <span className="absolute bottom-6 left-6 bg-amber-500 text-white px-6 py-3 rounded-2xl font-bold text-xl shadow-lg">
              2.03 <span className="text-sm font-normal">Km</span>
            </span>
          </section>

          {/* Sección “Running Goal” */}
          <section className="px-6 pb-6">
            <section className="bg-gray-900 rounded-3xl p-6 flex items-center gap-6">
              <span className="bg-gray-800 p-4 rounded-2xl">
                {/* 🏃‍♂️ Icono de tenis/corredor */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 2l2 2-2 4 4 1 1-3 3 2-2 4 2 3-3 6-2-1 1-4-4-2-3 3-2-2 4-5-1-5z" />
                  <circle cx="16" cy="4" r="2" fill="white" />
                </svg>
              </span>
              <span className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">
                  Running
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  3000 meters per day
                </p>
                <span className="relative h-2 bg-gray-700 rounded-full overflow-hidden block">
                  <span
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full block"
                    style={{ width: "67%" }}
                  ></span>
                </span>
              </span>
            </section>
          </section>

          {/* Sección “Today Stats” */}
          <section className="px-6 pb-8">
            <h2
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Today
            </h2>
            <section className="grid grid-cols-3 gap-4">
              {/* Distancia */}
              <span
                className={`${
                  isDark ? "bg-gray-700" : "bg-gray-50"
                } rounded-2xl p-4 text-center transition-colors duration-300 block shadow-md`}
              >
                <span
                  className={`${
                    isDark ? "bg-gray-600" : "bg-white"
                  } w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={isDark ? "text-blue-400" : "text-blue-500"}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </span>
                <p
                  className={`text-2xl font-bold mb-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  2.03
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Kilometer
                </p>
              </span>

              {/* Tiempo */}
              <span
                className={`${
                  isDark ? "bg-gray-700" : "bg-gray-50"
                } rounded-2xl p-4 text-center transition-colors duration-300 block shadow-md`}
              >
                <span
                  className={`${
                    isDark ? "bg-gray-600" : "bg-white"
                  } w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={isDark ? "text-blue-400" : "text-blue-500"}
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6l4 2"
                    />
                  </svg>
                </span>
                <p
                  className={`text-2xl font-bold mb-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  15
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  minutes
                </p>
              </span>

              {/* Calorías */}
              <span
                className={`${
                  isDark ? "bg-gray-700" : "bg-gray-50"
                } rounded-2xl p-4 text-center transition-colors duration-300 block shadow-md`}
              >
                <span
                  className={`${
                    isDark ? "bg-gray-600" : "bg-white"
                  } w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={isDark ? "text-orange-400" : "text-orange-500"}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                  </svg>
                </span>
                <p
                  className={`text-2xl font-bold mb-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  75
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Calories
                </p>
              </span>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
