import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { useState, useImperativeHandle, forwardRef, useRef } from "react";

const ImageSearch = forwardRef(({ onImageSelected, onSend }, ref) => {
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
        }
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
        if (file && onSend) {
            onSend(file);
        }
    };

    return (
        <div className="searchContainer">
            <div className="inputWrapper">
                <label className="fileInputLabel">
                    <FiSearch className="searchIcon" />
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="fileInput"
                    />
                    {!fileName && (
                        <span className="placeholderText">Importer votre photo</span>
                    )}
                    {fileName && (
                        <span className="fileName">{fileName}</span>
                    )}
                </label>
                <button className="sendButton" onClick={handleSend}>
                    <FaArrowRight color="white" />
                </button>
            </div>
        </div>
    );
});
export default ImageSearch;