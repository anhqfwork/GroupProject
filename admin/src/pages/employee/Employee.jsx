import React, { useState, useEffect } from "react";
import "./employee.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
function Employee() {
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
    <div className="employee">
      <div className="employeeTitleContainer">
        <h1 className="employeeTitle">Edit Employee</h1>
      </div>
      <div className="employeeContainer">
        <div className="employeeShow">
          <div className="employeeShowTop">
            <img
              src="https://images.pexels.com/photos/1319911/pexels-photo-1319911.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1319911.jpg&fm=jpg"
              alt=""
              className="employeeShowImg"
            />
            <div className="employeeShowTopTitle">
              <span className="employeeShowEmployeename">Anna Becker</span>
            </div>
          </div>
          <div className="employeeShowBottom">
            <div className="employeeShowTitle">
              <span>Acounts Details</span>
              <div className="employeeShowInfo">
                <PermIdentity className="employeeShowIcon" />
                <span className="employeeShowInfoTitle">annabeck99</span>
              </div>
              <div className="employeeShowInfo">
                <CalendarToday className="employeeShowIcon" />
                <span className="employeeShowInfoTitle">10.12.1999</span>
              </div>
              <span>Contact Details</span>
              <div className="employeeShowInfo">
                <PhoneAndroid className="employeeShowIcon" />
                <span className="employeeShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="employeeShowInfo">
                <MailOutline className="employeeShowIcon" />
                <span className="employeeShowInfoTitle">
                  annabeck99@gmail.com
                </span>
              </div>
              <div className="employeeShowInfo">
                <LocationSearching className="employeeShowIcon" />
                <span className="employeeShowInfoTitle">New York | USA</span>
              </div>
            </div>
          </div>
        </div>
        <div className="employeeUpdate">
          <span className="employeeUpdateTitle">Edit</span>
          <form action="" className="employeeUpdateForm">
            <div className="employeeUpdateLeft">
              <div className="employeeUpdateItem">
                <label htmlFor="">Employee name</label>
                <input
                  type="text"
                  placeholder="anabeck99"
                  className="employeeUpdateInput"
                />
              </div>
              <div className="employeeUpdateItem">
                <label htmlFor="">Full name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="employeeUpdateInput"
                />
              </div>
              <div className="employeeUpdateItem">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="employeeUpdateInput"
                />
              </div>
              <div className="employeeUpdateItem">
                <label htmlFor="">Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="employeeUpdateInput"
                />
              </div>
              <div className="employeeUpdateItem">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="employeeUpdateInput"
                />
              </div>
            </div>
            <div className="employeeUpdateRight">
              <div className="employeeUpdateUpload">
                {avatar && (
                  <img
                    src={avatar.preview}
                    alt=""
                    className="employeeUpdateImg"
                  />
                )}

                <label htmlFor="file">
                  <Publish className="employeeUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handlePreviewAvatar}
                />
              </div>
              <button className="employeeUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Employee;
