import React, { useState, useEffect } from "react";
import "./newUser.css";
import { Publish } from "@material-ui/icons";
export default function NewUser() {
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    }
  }, [avatar])
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);

    setAvatar(file);
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form action="" className="newUserForm">
        <div className="newUserItem">
          <label htmlFor="">Username</label>
          <input type="text" placeholder="john" />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Password</label>
          <input type="text" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="newUserItem">
          <div className="newUserUpload">
            {avatar && (
              <img src={avatar.preview} alt="" className="userCreateImg" />
            )}
            <label htmlFor="file">
              <Publish className="userUpdateIcon" />
            </label>
            <input
              type="file"
              id="file"
              placeholder="file"
              style={{ display: "none" }}
              onChange={handlePreviewAvatar}
            />
          </div>
        </div>
      </form>
      <button className="newUserButton">Create</button>
    </div>
  );
}
