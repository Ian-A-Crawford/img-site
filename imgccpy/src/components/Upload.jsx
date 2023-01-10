import React, { useState } from "react";
import axios from "axios";
const Upload = () => {
  const [name, setName] = useState("");
  const [selFile, setSelFile] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    //formData.append("name", name);
    formData.append('file', selFile);
    console.log(formData);
    axios
      .post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
         console.log('SUCCESS!!');
       })
       .catch(function () {
         console.log('FAILURE!!');
       });
  };

  const formPreventDefault = (a) => {
    alert("yee");
    a.preventDefault();
  };

  return (
    <div>
      <form onSubmit={formPreventDefault}>
        {/* <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input> */}

        <input
          type="file"
          name='file'
          onChange={(e) => setSelFile(e.target.files[0])}
        ></input>

        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
};

export default Upload;
