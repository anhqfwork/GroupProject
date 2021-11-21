import React from "react";
import "./newEmployee.css";
import { Publish } from "@material-ui/icons";
function NewEmployee() {
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
              <img
                src="https://images.pexels.com/photos/1319911/pexels-photo-1319911.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1319911.jpg&fm=jpg"
                alt=""
                className="employeeCreateImg"
              />
              <label htmlFor="file">
                <Publish className="employeeUpdateIcon" />
              </label>
              <input
                type="file"
                id="file"
                placeholder="file"
                style={{ display: "none" }}
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
