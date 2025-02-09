import { useEffect, useState } from "react";

function App() {
  const [news, setNews] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  async function fetchCities() {
    try {
      const response = await fetch("http://localhost:3000/api/cities");
      const data = await response.json();
      setCities(data.data); // Set unique cities in state
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  }

  async function fetchNews() {
    try {
      let url = "http://localhost:3000/api/news";
      const params = new URLSearchParams();

      if (city) params.append("city", city);
      if (category) params.append("category", category);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setNews(data.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  }

  useEffect(() => {
    fetchCities(); // Fetch unique cities when the page loads
    fetchNews();   // Fetch news when filters change
  }, [city, category]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-center">Local News</h1>

      {/* 🔹 Filters */}
      <div className="flex gap-4 mb-4 justify-center">
        <select
          className="p-2 border rounded shadow-sm"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((c, index) => (
            <option key={index} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Politics">Politics</option>
          <option value="Business & Economy">Business & Economy</option>
          <option value="Technology">Technology</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Sports">Sports</option>
          <option value="Health & Science">Health & Science</option>
          <option value="Crime & Law">Crime & Law</option>
          <option value="Weather & Environment">Weather & Environment</option>
          <option value="Education">Education</option>
          <option value="Lifestyle & Culture">Lifestyle & Culture</option>
        </select>

        <button className="p-2 bg-blue-500 text-white rounded shadow-sm" onClick={fetchNews}>
          Apply Filters
        </button>
      </div>

      {/* 🔹 News List */}
      {news.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 flex">
          <div className="w-2/5 flex items-center justify-center">
            {item.image_url ? (
              <img className="w-full h-auto object-contain rounded-lg" src={item.image_url} alt={item.title} />
            ) : (
              <p className="text-gray-500">No Image Available</p>
            )}
          </div>
          <div className="w-3/5 pl-4">
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>City:</strong> {item.city} | <strong>Category:</strong> {item.category}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Publisher:</strong> {item.publisher} | <strong>Phone:</strong> {item.phone}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
