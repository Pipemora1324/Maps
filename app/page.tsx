'use client';

import React, { useState, useMemo } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function RunningTracker() {
  const [theme, setTheme] = useState('system');

  const isDark = useMemo(() => {
    if (theme === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false;
    }
    return theme === 'dark';
  }, [theme]);

  return (
    <section className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-amber-50'} transition-colors duration-300 p-4 sm:p-6 lg:p-8`}>
      <section className="max-w-md mx-auto">
        {/* Theme Switcher */}
        <section className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => setTheme('light')}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'light' 
                ? 'bg-amber-200 text-amber-900' 
                : isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'
            }`}
          >
            <Sun size={20} />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 text-yellow-400' 
                : isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'
            }`}
          >
            <Moon size={20} />
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'system' 
                ? isDark ? 'bg-gray-700 text-blue-400' : 'bg-amber-200 text-amber-900'
                : isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'
            }`}
          >
            <Monitor size={20} />
          </button>
        </section>

        {/* Main Card */}
        <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300 border-2 border-amber-500 shadow-gray-400`}>
          {/* Map Container */}
          <section className="relative p-6">
            <button className={`absolute top-8 left-8 ${isDark ? 'bg-gray-700' : 'bg-white'} p-3 rounded-full shadow-lg z-10`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={isDark ? 'text-white' : 'text-gray-800'}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Map Placeholder */}
            <section className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-3xl h-80 sm:h-96 flex items-center justify-center relative overflow-hidden`}>
              <span className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="300" x2="400" y2="300" stroke="currentColor" strokeWidth="1" />
                  <line x1="100" y1="0" x2="100" y2="400" stroke="currentColor" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="1" />
                  <line x1="300" y1="0" x2="300" y2="400" stroke="currentColor" strokeWidth="1" />
                </svg>
              </span>
              
              {/* Route Path Illustration */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <path 
                  d="M 100 350 L 120 320 L 180 280 L 220 250 L 250 200 L 280 150 L 300 100" 
                  stroke="#f59e0b" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Start Marker */}
                <circle cx="100" cy="350" r="8" fill="#374151" stroke="white" strokeWidth="3" />
                {/* End Marker */}
                <circle cx="300" cy="100" r="12" fill="#3b82f6" stroke="white" strokeWidth="3" />
              </svg>
              
              {/* Distance Badge */}
              <span className="absolute bottom-6 left-6 bg-amber-500 text-white px-6 py-3 rounded-2xl font-bold text-xl shadow-lg">
                2.03 <span className="text-sm font-normal">Km</span>
              </span>
            </section>
          </section>

          {/* Running Goal Card */}
          <section className="px-6 pb-6">
            <section className="bg-gray-900 rounded-3xl p-6 flex items-center gap-6">
              <span className={`${isDark ? 'bg-gray-800' : 'bg-gray-800'} p-4 rounded-2xl`}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="2">
                  <path d="M8 24h6l3-6 4 12 4-12 3 6h6" strokeLinecap="round" strokeLinejoin="round"/>
                  <ellipse cx="35" cy="30" rx="8" ry="4" fill="white" stroke="white"/>
                  <path d="M27 30c0-2 3-4 8-4s8 2 8 4" strokeLinecap="round"/>
                  <circle cx="12" cy="18" r="2" fill="white"/>
                </svg>
              </span>
              <span className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">Running</h3>
                <p className="text-gray-400 text-sm mb-3">3000 meters per day</p>
                <span className="relative h-2 bg-gray-700 rounded-full overflow-hidden block">
                  <span className="absolute inset-y-0 left-0 bg-linear-to-r from-amber-500 to-amber-600 rounded-full block" style={{ width: '67%' }}></span>
                </span>
              </span>
            </section>
          </section>

          {/* Today Stats */}
          <section className="px-6 pb-8">
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Today</h2>
            <section className="grid grid-cols-3 gap-4">
              {/* Distance */}
              <span className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4 text-center transition-colors duration-300 block shadow-md`}>
                <span className={`${isDark ? 'bg-gray-600' : 'bg-white'} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={isDark ? 'text-blue-400' : 'text-blue-500'}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>2.03</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Kilometer</p>
              </span>

              {/* Time */}
              <span className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4 text-center transition-colors duration-300 block shadow-md`}>
                <span className={`${isDark ? 'bg-gray-600' : 'bg-white'} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={isDark ? 'text-blue-400' : 'text-blue-500'}>
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                  </svg>
                </span>
                <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>15</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>minutes</p>
              </span>

              {/* Calories */}
              <span className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4 text-center transition-colors duration-300 block shadow-md`}>
                <span className={`${isDark ? 'bg-gray-600' : 'bg-white'} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={isDark ? 'text-orange-400' : 'text-orange-500'}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </span>
                <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>75</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Calories</p>
              </span>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}