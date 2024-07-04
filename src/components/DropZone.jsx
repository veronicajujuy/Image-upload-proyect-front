import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const MyDropzone = ({ userProfileId }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    const file = acceptedFiles[0];
    console.log("userProfile", userProfileId);
    const formData = new FormData();
    formData.append("file", file); // el nombre "file" tiene que ser igual al nombre que le pusimos en el backend

    axios
      .post(
        `http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        console.log("file upload successfully");
      })
      .catch((err) => console.log(err));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Arrastre los archivos hacia aquí ...</p>
      ) : (
        <p>Arrastre los archivos aquí o cliquee para seleccionarlos</p>
      )}
    </div>
  );
};
export default MyDropzone;
