import { useEffect, useState } from "react";
import styles from "./ImageResult.module.css";

interface Props {
  query: string;
  imageUrl: string;
}

export default function ImageResult({ query, imageUrl }: Props) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
  }, [imageUrl]);
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          key={imageUrl}
          src={imageUrl}
          alt={`Random result for ${query}`}
          className={`${styles.image} ${loaded ? styles.visible : ""}`}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
        {!loaded && (
          <div className={styles.loadingOverlay}>
            <img src="/loader.svg" alt="Loading..." />
          </div>
        )}
      </div>
      <div className={styles.caption}>
        <span className={styles.captionText}>
          Showing random image for <span className={styles.query}>{query}</span>
        </span>
      </div>
    </div>
  );
}