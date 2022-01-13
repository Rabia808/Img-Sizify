import React from "react";
import Button from "./Button";
import "./CompressFile.css";

const CompressFile = () => {
  return (
    <div className="compress">
      <section className="img-preview">
        <img
          src="https://image.shutterstock.com/image-photo/side-view-coffee-shop-workers-260nw-777762505.jpg"
          alt="uploaded image"
        ></img>
        <p>coffee.jpg</p>
      </section>
      <Button name="Compress Image" />
      {/* <Button name="Download Image" /> */}
      <p>
        All images will be compressed with the best quality and filesize ratio.
      </p>
    </div>
  );
};

export default CompressFile;
