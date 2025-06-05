// ImageSearch.jsx
import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { useState, useImperativeHandle, forwardRef, useRef } from "react";
import styles from "./imageSearch.module.css";

const ImageSearch = forwardRef(({ onImageSelected, onSend, variant }, ref) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelectedImage(null);
      setFile(null);
      setFileName("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  }));

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
      setFile(selectedFile);
      setFileName(selectedFile.name);
      if (onImageSelected) {
        onImageSelected(selectedFile);
      }
    }
  };

  const handleSend = () => {
    if (file && onSend && selectedImage) {
      onSend(file);
    }
  };

  const inputWrapperClass =
    variant === "trie"
      ? styles.inputWrapperTrie
      : variant === "cuisine"
      ? styles.inputWrapperCuisine
      : "";
  const sendButtonClass =
    variant === "trie"
      ? styles.sendButtonTrie
      : variant === "cuisine"
      ? styles.sendButtonCuisine
      : "";

  return (
    <div className={styles.searchContainer}>
      <div className={`${styles.inputWrapper} ${inputWrapperClass}`}>
        <label className={styles.fileInputLabel}>
          <FiSearch className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          {!fileName && (
            <span className={styles.placeholderText}>Importer votre photo</span>
          )}
          {fileName && <span className={styles.fileName}>{fileName}</span>}
        </label>
        <button
          className={`${styles.sendButton} ${sendButtonClass}`}
          onClick={handleSend}
        >
          <FaArrowRight color="white" />
        </button>
      </div>
    </div>
  );
});

export default ImageSearch;
