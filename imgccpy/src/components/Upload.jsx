import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from '@mui/lab/Masonry';
const Upload = () => {
  const [selFile, setSelFile] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    retrieveData();
  }, [])

  const retrieveData = () => {
    axios.get('/retrieve')
    .then(response => {
      var photos = response.data
      console.log(photos);
      setData(photos.map(image => (
        <img alt={`https://fucketbuckets.s3.us-west-2.amazonaws.com/${image.Key}`} src={`https://fucketbuckets.s3.us-west-2.amazonaws.com/${image.Key}`}>

        </img>
      )))
    });
  }

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selFile);
    console.log(formData);
    
    axios
      .post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
         console.log('SUCCESS!!');
         setTimeout(() => {
          retrieveData()
        }, "1000");
       })
       .catch(err => {
         console.log('FAILURE!!');
       });
    
  };


  const formPreventDefault = (a) => {
    a.preventDefault();
  };

  return (
    <div>
      <Masonry columns={6} sx={{
            margin: 0
         }}>
            {data}
         </Masonry>
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
