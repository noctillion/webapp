import React from "react";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div>
      <Loader
        type="Puff"
        color="#0d640e"
        height={100}
        width={100}
        //timeout={3000} //3 secs
      />
    </div>
  );
};

export default Spinner;
