import axios from "axios";
import { useEffect, useState } from "react";
import MyDropzone from "./DropZone";

export const UserProfiles = () => {
  const [user, setUser] = useState("");
  const fetchUserProfiles = () => {
    axios
      .get("http://localhost:8080/api/v1/user-profile")
      .then((res) => setUser(res.data));
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return (
    <>
      <h1>Usuarios</h1>
      {user &&
        user.map((item) => {
          return (
            <div key={item.userProfileId}>
              <p>
                {item.userProfileId ? (
                  <img
                    src={`http://localhost:8080/api/v1/user-profile/${item.userProfileId}/image/download`}
                  />
                ) : null}
                {console.log(item.userProfileLink)}
              </p>
              <p>{item.userProfileId}</p>
              <p>{item.username}</p>
              <p>{item.userProfileLink}</p>
              <div>
                <MyDropzone userProfileId={item.userProfileId} />
              </div>
            </div>
          );
        })}
    </>
  );
};
