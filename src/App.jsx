import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Wind,
  Loader2,
  AlertCircle,
  Thermometer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [cities, setCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("day");

  // Detect time of day for theme
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 5 && hours < 12) setTimeOfDay("morning");
    else if (hours >= 12 && hours < 17) setTimeOfDay("afternoon");
    else if (hours >= 17 && hours < 20) setTimeOfDay("evening");
    else setTimeOfDay("night");
  }, []);

  // Fetch city suggestions
  useEffect(() => {
    if (searchInput.length < 2) {
      setCities([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=5&language=en`
        );
        const data = await res.json();
        setCities(data.results || []);
        setShowDropdown(true);
      } catch {
        setError("⚠️ Failed to load cities");
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Fetch weather data
  const getWeather = async (lat, lon, name) => {
    setLoading(true);
    setShowDropdown(false);
    setError("");
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
      );
      const data = await res.json();
      if (data.current_weather) setWeather({ ...data.current_weather, name });
      else setError("No weather data found");
    } catch {
      setError("⚠️ Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  // Background image based on weather + time
  const getWeatherImage = (code) => {
    if (code >= 95)
      return "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=2000&q=80";
    if (code >= 80)
      return "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=2000&q=80";
    if (code >= 51)
      return "https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=2000&q=80";
    if (code <= 3)
      return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80";
    if (timeOfDay === "evening")
      return "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=2000&q=80";
    if (timeOfDay === "night")
      return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2000&q=80";
    return "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80";
  };

  const getWeatherEmoji = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "🌤️";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "🌩️";
    return "☁️";
  };

  // Subtle floating cloud background
  const FloatingClouds = () => (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <motion.img
        src="https://pngimg.com/uploads/cloud/cloud_PNG10.png"
        alt="cloud"
        className="absolute top-20 left-[-150px] w-80"
        animate={{ x: [0, 300, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
      />
      <motion.img
        src="https://pngimg.com/uploads/cloud/cloud_PNG17.png"
        alt="cloud"
        className="absolute top-60 right-[-200px] w-96"
        animate={{ x: [0, -400, 0] }}
        transition={{ duration: 40, repeat: Infinity }}
      />
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative transition-all duration-700"
      style={{
        backgroundImage: `url(${
          weather ? getWeatherImage(weather.weathercode) : getWeatherImage(0)
        })`,
      }}
    >
      <FloatingClouds />

      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>

      {/* Glassmorphic Card */}
      <motion.div
        className="relative z-10 bg-white/30 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_8px_32px_rgba(255,255,255,0.3)] border border-white/30 w-full max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          🌈 WeatherNow Pro
        </h1>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search any city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-4 pr-12 text-lg border-2 border-white/50 rounded-2xl bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-yellow-400 outline-none shadow-md"
          />
          <Search className="absolute right-4 top-4 text-yellow-300" size={24} />

          <AnimatePresence>
            {showDropdown && cities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 bg-white/90 w-full mt-2 rounded-2xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto"
              >
                {cities.map((city, i) => (
                  <div
                    key={i}
                    className="p-3 hover:bg-yellow-100 cursor-pointer flex items-center gap-3"
                    onClick={() =>
                      getWeather(city.latitude, city.longitude, city.name)
                    }
                  >
                    <MapPin size={18} className="text-yellow-500" />
                    <span className="font-semibold text-gray-800">
                      {city.name}, {city.country}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-200/60 text-red-800 p-3 rounded-lg flex items-center gap-2 mb-4 shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle size={20} /> {error}
          </motion.div>
        )}

        {/* Loader */}
        {loading && (
          <div className="flex flex-col items-center py-10 text-yellow-200">
            <Loader2 className="animate-spin w-12 h-12 mb-3" />
            <p>Fetching weather data...</p>
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-7xl mb-4 animate-bounce drop-shadow-xl">
              {getWeatherEmoji(weather.weathercode)}
            </div>
            <h2 className="text-3xl font-bold mb-1">
              {weather.name}
            </h2>
            <p className="text-6xl font-extrabold mb-2 drop-shadow-lg">
              {Math.round(weather.temperature)}°C
            </p>
            <p className="text-lg mb-6 text-white/90">
              Wind: {weather.windspeed} km/h
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/30 rounded-2xl flex items-center justify-center gap-2 shadow-lg">
                <Wind className="text-blue-200" />
                <span className="font-semibold">
                  {weather.winddirection}°
                </span>
              </div>
              <div className="p-4 bg-white/30 rounded-2xl flex items-center justify-center gap-2 shadow-lg">
                <Thermometer className="text-pink-200" />
                <span className="font-semibold">
                  Feels like {Math.round(weather.temperature)}°C
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!weather && !loading && (
          <div className="text-center py-10 text-white/80">
            <p className="text-6xl mb-3 animate-pulse">🌤️</p>
            <p className="text-lg">Search your city to view the weather!</p>
          </div>
        )}
      </motion.div>

      <footer className="relative z-10 mt-8 text-white/90 text-sm backdrop-blur-md p-3 rounded-xl shadow-md">
        ☁️ Powered by{" "}
        <span className="font-semibold text-yellow-300">Open-Meteo API</span>
      </footer>
    </div>
  );
}
