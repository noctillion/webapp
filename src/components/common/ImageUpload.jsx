import React, { useRef } from "react";
import Button from "./Button.jsx";

let ImageUpload = props => {
  let filePickerRef = useRef();

  let pickedHandler = event => {
    console.log(event.target);
  };
  let pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && center} `}>
        <div className="image-upload_preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick an image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
