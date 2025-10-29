
# 🌦️ WeatherNow – Advanced Weather Forecast App

WeatherNow is a **modern and stylish weather application** built with **React + Vite**, powered by the **OpenWeather API**, and styled using **Tailwind CSS**.
It provides **real-time weather updates**, dynamic **animated backgrounds**, and visually appealing **cloud and weather condition effects** — all in one clean interface.

---

## 🚀 Features

✅ **Real-Time Weather Data** – Fetches current temperature, humidity, and wind speed using OpenWeather API.
✅ **Dynamic Backgrounds** – Changes visuals based on current weather (sunny, cloudy, rainy, stormy, etc.).
✅ **Search Functionality** – Get instant weather for any city in the world.
✅ **Responsive UI** – Fully responsive for desktop, tablet, and mobile.
✅ **Animated Cloud Effects** – Adds a lively, realistic atmosphere with animated cloud movements.
✅ **Error Handling** – Displays friendly messages for invalid locations or API errors.
✅ **Fast Build & Deploy** – Uses Vite for ultra-fast development and build times.

---

## 🧠 Tech Stack

| Category     | Technology                      |
| ------------ | ------------------------------- |
| Frontend     | React.js (Vite)                 |
| Styling      | Tailwind CSS                    |
| Weather Data | OpenWeatherMap API              |
| Icons        | Lucide React / Weather Icons    |
| Deployment   | GitHub Pages / Netlify / Vercel |

---

## 🏗️ Installation & Setup

Follow these steps to run WeatherNow locally 👇

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/weather.now.git
cd weather.now
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create an `.env` file in the project root

Add your **OpenWeather API key** (you can get it from [openweathermap.org](https://openweathermap.org/api)):

```
VITE_WEATHER_API_KEY=your_api_key_here
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Then open your browser and navigate to:

```
http://localhost:5173
```

### 5️⃣ Build for production

```bash
npm run build
```

---

## 🌤️ Usage

1. Enter your **city name** in the search bar.
2. Click **Search** or press **Enter**.
3. Instantly view:

   * Temperature 🌡️
   * Weather type ☁️
   * Humidity 💧
   * Wind speed 🌬️
4. Background and cloud animations will automatically adjust based on the weather type.

---

## 🧩 Folder Structure

```
weather.now/
│
├── public/
│   ├── favicon.ico
│   └── cloud-bg.jpg  ← optional static assets
│
├── src/
│   ├── assets/       ← contains image URLs or local icons
│   ├── components/
│   │   ├── WeatherCard.jsx
│   │   ├── CloudAnimation.jsx
│   │   └── SearchBar.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── postcss.config.cjs
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ☁️ Cloud & Background Images (Using URLs)

These images are fetched directly using public URLs from reliable sources like **Unsplash** or **Freepik**.
Example image links used in this project:

| Weather Type | Image URL                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| ☀️ Sunny     | [https://images.unsplash.com/photo-1501973801540-537f08ccae7b](https://images.unsplash.com/photo-1501973801540-537f08ccae7b) |
| 🌧️ Rainy    | [https://images.unsplash.com/photo-1501594907352-04cda38ebc29](https://images.unsplash.com/photo-1501594907352-04cda38ebc29) |
| ⛅ Cloudy     | [https://images.unsplash.com/photo-1506744038136-46273834b3fb](https://images.unsplash.com/photo-1506744038136-46273834b3fb) |
| ⛈️ Stormy    | [https://images.unsplash.com/photo-1504384308090-c894fdcc538d](https://images.unsplash.com/photo-1504384308090-c894fdcc538d) |
| 🌫️ Mist     | [https://images.unsplash.com/photo-1489515217757-5fd1be406fef](https://images.unsplash.com/photo-1489515217757-5fd1be406fef) |

*(You can freely replace these URLs with your preferred images.)*

---

## 💡 Troubleshooting

### 1️⃣ PostCSS / Tailwind error:

If you get `@tailwindcss/postcss` error:

```bash
npm install -D @tailwindcss/postcss
```

### 2️⃣ Missing cloud animations:

Ensure your `CloudAnimation.jsx` is importing correct image URLs or SVG animations.

### 3️⃣ Vite build errors:

Delete `node_modules` and `package-lock.json`, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🌍 Deployment

### ✅ GitHub Pages

1. Install Vite deploy adapter:

   ```bash
   npm install gh-pages --save-dev
   ```
2. Add the following in `package.json`:

   ```json
   "homepage": "https://your-username.github.io/weather.now/",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Deploy:

   ```bash
   npm run deploy
   ```

### ✅ Netlify

 !(https://projectweather56.netlify.app/)

---

## 🖼️ Demo Preview

![WeatherNow Demo](https://images.unsplash.com/photo-1528825871115-3581a5387919)

---

## 🧑‍💻 Author

**👤 Dinesh**
🚀 Frontend Developer | React.js | Tailwind CSS | API Integration
📧 [svdkr8374@gmail.com]
🌐 [svdkrdinesh]

---

## 📜 License

This project is licensed under the **MIT License**.
You’re free to use, modify, and distribute it for personal and commercial purposes.

---

