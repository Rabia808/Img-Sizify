import React, { useState } from "react";
import Button from "./Button";
import UploadSvg from "./final.svg";
import "./Upload.css";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";

const Upload = (props) => {
  const [originalImage, setOriginalImage] = useState("");
  const [originalImageFile, setOriginalImageFile] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [fileName, setFileName] = useState("");

  // tareting file input from upload button-------------------------------------------------------------------------->>

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
      const downloadLink = URL.createObjectURL(output);
      // console.log(downloadLink);
      setOriginalImageFile(false);
      setCompressedImage(downloadLink);
      // console.log(compressedImage);
    });
    // setOriginalImage("");
    // console.log(compressedImage);
    // console.log("image compressed");
  };

  const downloadImage = () => {
    saveAs(compressedImage, "Compressed_" + fileName); // Put your image url here.
  };

  // const downloadImage = () => {
  //   saveAs({ compressedImage }, `${fileName}Compressed.jpg`);
  // };

  return (
    <div className="upload">
      <section>
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
        ) : compressedImage ? (
          <>
            <img className="uploaded" src={compressedImage} alt="compressed" />
            <Button name="Download" onClick={downloadImage}></Button>
          </>
        ) : (
          <>
            <img className="svg" src={UploadSvg} alt="Upload" />
            <Button name="Upload Image" onClick={uploadImageHandler} />
          </>
        )}
        {/* ---------------------------------------------------------------------------------- */}
        {/* {originalImageFile && !compressedImage && !originalImage && (
          <>
            <img className="uploaded" src={originalImageFile} alt="Uploaded" />
            <Button
              name="Compress Image"
              onClick={(e) => {
                handleCompressImage(e);
              }}
            />
          </>
        )}
        {compressedImage && (
          <>
            <img className="uploaded" src={compressedImage} alt="compressed" />
            <Button
              name="Download"
              onClick={() => console.log("clicked")}
            ></Button>
          </>
        )}
        {originalImage && (
          <>
            <img className="svg" src={UploadSvg} alt="Upload" />
            <Button name="Upload Image" onClick={uploadImageHandler} />
          </>
        )} */}
        {/* { (!originalFile && compressedFile) && component} */}
      </section>

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
