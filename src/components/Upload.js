import React, { useState } from "react";
import Button from "./Button";
import UploadSvg from "./final.svg";
import "./Upload.css";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";

const Upload = (props) => {
  // States------------------------------------------------------------------>
  const [originalImage, setOriginalImage] = useState("");
  const [originalImageFile, setOriginalImageFile] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [fileName, setFileName] = useState("");

  // targeting file input from upload button-------------------------------------------------------------------------->>

  const uploadImageHandler = () => {
    document.getElementById("select-file").click();
  };

  // handler for uploading file ---------------------------------------------------------------------------------------->>
  const handle = (e) => {
    const imageFile = e.target.files[0];
    setOriginalImage(imageFile);
    setOriginalImageFile(URL.createObjectURL(imageFile));
    setFileName(imageFile.name);
  };

  //handler for compressed image----------------------------------------------------------------->>
  const handleCompressImage = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    //Check for very small size image---------------------------->>
    if (options.maxSizeMB >= originalImage / 1024) {
      alert("Image is too small, cant be compressed");
      return 0;
    }
    //function for compressing image----------------------------------------->>
    let output;
    imageCompression(originalImage, options).then((x) => {
      output = x;
      const downloadLink = URL.createObjectURL(output); //Generating blob file--->
      setOriginalImageFile(false);
      setCompressedImage(downloadLink);
    });
  };

  // Download the imamge------------------------------------------------------------>>
  const downloadImage = () => {
    saveAs(compressedImage, "Compressed_" + fileName);
  };

  return (
    <div className="upload">
      <section>
        {/* Checking for Uploaded file------------------------------------------------------>> */}
        {originalImageFile ? (
          <>
            <img className="uploaded" src={originalImageFile} alt="Uploaded" />
            <Button
              name="Compress Image"
              onClick={(e) => {
                handleCompressImage(e);
              }}
            />
          </>
        ) : // Checking for compressed file--------------------------------------------------------------->>
        compressedImage ? (
          <>
            <img className="uploaded" src={compressedImage} alt="compressed" />
            <Button name="Download" onClick={downloadImage}></Button>
          </>
        ) : (
          // Default home page---------------------------------------------------->>
          <>
            <img className="svg" src={UploadSvg} alt="Upload" />
            <Button name="Upload Image" onClick={uploadImageHandler} />
          </>
        )}
      </section>

      {/* file upload----------------------------------------------------->> */}
      <input
        id="select-file"
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => handle(e)}
      />
      <p>
        All images will be compressed with the best quality and file size ratio.
      </p>
    </div>
  );
};

export default Upload;
