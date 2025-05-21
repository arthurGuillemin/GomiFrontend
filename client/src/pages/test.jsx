import React, { useState } from "react";
import { classifyWasteImage } from "../services/gradioTrashService"; // adapte le chemin

function WasteClassifier() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResults([]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setError("");
    try {
      const result = await classifyWasteImage(image);
      setResults(result);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la classification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="waste-classifier" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Classification des déchets</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {previewUrl && <img src={previewUrl} alt="Aperçu" style={{ maxWidth: "100%", marginTop: "10px" }} />}
        <button type="submit" disabled={loading || !image}>
          {loading ? "Analyse en cours..." : "Analyser"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Résultats :</h3>
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <strong>{item.objet}</strong> → {item.poubelle} ({item.confiance.toFixed(2)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WasteClassifier;
