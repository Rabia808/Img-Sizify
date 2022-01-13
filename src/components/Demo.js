import React, { Component, useEffect, useState } from "react";

import imageCompression from "browser-image-compression";

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.base64Data = null;
  }

  state = {
    url: null,
  };

  handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

      console.log(compressedFile);
      const src = URL.createObjectURL(compressedFile);
      console.log(src);

      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(compressedFile);
      fileReaderInstance.onload = () => {
        this.base64Data = fileReaderInstance.result;
        console.log(this.base64Data);
        this.setState({
          url: this.base64Data,
        });
      };

      // await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  temp = () => {
    this.setState({});
  };

  //printing on screen
  render() {
    return (
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => this.handleImageUpload(event)}
        />

        <input type="file" accept="image/*" onChange={(event) => this.temp()} />

        {this.state.url ? (
          <img
            source={{ uri: this.state.url }}
            style={{ height: 200, width: 200, flex: 1 }}
          />
        ) : (
          "null"
        )}
      </div>
    );
  }
}

export default Demo;
