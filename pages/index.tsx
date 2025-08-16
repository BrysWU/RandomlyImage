import { useState } from "react";
import Head from "next/head";
import SearchBar from "../components/SearchBar";
import ImageResult from "../components/ImageResult";
import Particles from "../components/Particles";

// Insert your Pixabay API key below
const PIXABAY_API_KEY = "51822654-9e384426ddba34d57108e4319"; // <-- Put your API key here (https://pixabay.com/api/docs/)

async function fetchPixabayImage(query: string): Promise<string | null> {
  if (!PIXABAY_API_KEY) return null;
  try {
    // Pixabay API docs: https://pixabay.com/api/docs/
    const res = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&per_page=50&safesearch=true`
    );
    const data = await res.json();
    if (Array.isArray(data.hits) && data.hits.length > 0) {
      // Pick a random image from the results
      const idx = Math.floor(Math.random() * data.hits.length);
      return data.hits[idx].webformatURL || data.hits[idx].largeImageURL;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

// Fallback to Lorem Picsum if no Pixabay API key or no results
function fallbackImageUrl(): string {
  // Always random
  return `https://picsum.photos/480/360?random=${Math.random().toString(36).slice(2)}`;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(query: string) {
    setSearch(query);
    setLoading(true);

    let foundImage: string | null = null;
    if (PIXABAY_API_KEY) {
      foundImage = await fetchPixabayImage(query);
    }
    setImageUrl(foundImage || fallbackImageUrl());
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Search Surprise</title>
        <meta name="description" content="A modern, animated search image site" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Particles />
      <main
        style={{
          minHeight: "100vh",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            fontSize: "2.8rem",
            marginBottom: "48px",
            color: "#007bff",
            letterSpacing: "0.04em",
            textShadow: "0 2px 24px #007bff33",
            animation: "fadeInDown 1.2s cubic-bezier(.6,-0.28,.74,.05)"
          }}
        >
          Search Surprise
        </h1>
        <SearchBar onSearch={handleSearch} loading={loading} />
        {imageUrl && search && (
          <ImageResult key={imageUrl} query={search} imageUrl={imageUrl} />
        )}
        <footer
          style={{
            marginTop: "80px",
            color: "#8fa7c8",
            fontSize: "0.98rem",
            textAlign: "center",
            opacity: 0.8,
            zIndex: 2
          }}
        >
          Powered by Pixabay | UI by KHK
        </footer>
      </main>
      <style jsx global>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </>
  );
}