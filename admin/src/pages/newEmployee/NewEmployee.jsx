import React, { useState, useEffect } from "react";
import "./newEmployee.css";
import { Publish } from "@material-ui/icons";
function NewEmployee() {
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);

    setAvatar(file);
  };
  return (
    <div className="newEmployee">
      <div className="newEmployee">
        <h1 className="newEmployeeTitle">New Employee</h1>
        <form action="" className="newEmployeeForm">
          <div className="newEmployeeItem">
            <label htmlFor="">Username</label>
            <input type="text" placeholder="john" />
          </div>
          <div className="newEmployeeItem">
            <label htmlFor="">Full Name</label>
            <input type="text" placeholder="John Smith" />
          </div>
          <div className="newEmployeeItem">
            <label htmlFor="">Email</label>
            <input type="text" placeholder="john@gmail.com" />
          </div>
          <div className="newEmployeeItem">
            <label htmlFor="">Password</label>
            <input type="text" placeholder="password" />
          </div>
          <div className="newEmployeeItem">
            <label htmlFor="">Phone</label>
            <input type="text" placeholder="+1 123 456 78" />
          </div>
          <div className="newEmployeeItem">
            <label htmlFor="">Address</label>
            <input type="text" placeholder="New York | USA" />
          </div>
          <div className="newEmployeeItem">
            <label htmlFor="">Admin</label>
            <select className="isAdminSelect">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="newEmployeeItem">
            <div className="newEmployeeUpload">
              {avatar && (
                <img
                  src={avatar.preview}
                  alt=""
                  className="employeeCreateImg"
                />
              )}

              <label htmlFor="file">
                <Publish className="employeeUpdateIcon" />
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
        <button className="newEmployeeButton">Create</button>
      </div>
    </div>
  );
}

export default NewEmployee;
