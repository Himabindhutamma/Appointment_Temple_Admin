import React from 'react';
// import ImageUploading from 'react-images-uploading';

const MBImageUpload = () => {
    const [file, setFile] = React.useState([]);

    function uploadSingleFile(e) {
        if(e.target.files.length !== 0)
      setFile([...file, URL.createObjectURL(e.target.files[0])]);
      console.log("file", file);
    }
  
    function upload(e) {
      e.preventDefault();
      console.log(file);
    }
  
    function deleteFile(e) {
      const s = file.filter((item, index) => index !== e);
      setFile(s);
      console.log(s);
    }
  
    return (
      <form>
        <div className="form-group preview">
          {file.length > 0 &&
            file.map((item, index) => {
              return (
                <div key={item}>
                  <img src={item} alt="" />
                  <button type="button" onClick={() => deleteFile(index)}>
                    delete
                  </button>
                </div>
              );
            })}
        </div>
        <div className="form-group">
          <input
            type="file" 
            disabled={file.length === 5}
            className="form-control"
            onChange={uploadSingleFile}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={upload}
        >
          Upload
        </button>
      </form>
    );
}
export default MBImageUpload