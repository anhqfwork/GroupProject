import React from 'react'
import './currentUser.css'
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
function currentUser() {
    return (
      <div className="currentUser">
        <div className="currentUserTitleContainer">
          <h1 className="currentUserTitle">Edit Profile</h1>
        </div>
        <div className="currentUserContainer">
          <div className="currentUserShow">
            <div className="currentUserShowTop">
              <img
                src="https://images.pexels.com/photos/1319911/pexels-photo-1319911.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1319911.jpg&fm=jpg"
                alt=""
                className="currentUserShowImg"
              />
              <div className="currentUserShowTopTitle">
                <span className="currentUserShowUsername">Anna Becker</span>
              </div>
            </div>
            <div className="userShowBottom">
              <div className="currentUserShowTitle">
                <span>Acounts Details</span>
                <div className="currentUserShowInfo">
                  <PermIdentity className="currentUserShowIcon" />
                  <span className="currentUserShowInfoTitle">annabeck99</span>
                </div>
                <div className="currentUserShowInfo">
                  <CalendarToday className="currentUserShowIcon" />
                  <span className="currentUserShowInfoTitle">10.12.1999</span>
                </div>
                <span>Contact Details</span>
                <div className="currentUserShowInfo">
                  <PhoneAndroid className="currentUserShowIcon" />
                  <span className="currentUserShowInfoTitle">
                    +1 123 456 67
                  </span>
                </div>
                <div className="currentUserShowInfo">
                  <MailOutline className="currentUserShowIcon" />
                  <span className="currentUserShowInfoTitle">
                    annabeck99@gmail.com
                  </span>
                </div>
                <div className="currentUserShowInfo">
                  <LocationSearching className="currentUserShowIcon" />
                  <span className="currentUserShowInfoTitle">
                    New York | USA
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="currentUserUpdate">
            <span className="currentUserUpdateTitle">Edit</span>
            <form action="" className="currentUserUpdateForm">
              <div className="currentUserUpdateLeft">
                <div className="currentUserUpdateItem">
                  <label htmlFor="">Username</label>
                  <input
                    type="text"
                    placeholder="anabeck99"
                    className="currentUserUpdateInput"
                  />
                </div>
                <div className="currentUserUpdateItem">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    placeholder="new password"
                    className="currentUserUpdateInput"
                  />
                </div>
                <div className="currentUserUpdateItem">
                  <label htmlFor="">Full name</label>
                  <input
                    type="text"
                    placeholder="Anna Becker"
                    className="currentUserUpdateInput"
                  />
                </div>
                <div className="currentUserUpdateItem">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    placeholder="annabeck99@gmail.com"
                    className="currentUserUpdateInput"
                  />
                </div>
                <div className="currentUserUpdateItem">
                  <label htmlFor="">Phone</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className="currentUserUpdateInput"
                  />
                </div>
                <div className="currentUserUpdateItem">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="currentUserUpdateInput"
                  />
                </div>
              </div>
              <div className="currentUserUpdateRight">
                <div className="currentUserUpdateUpload">
                  <img
                    src="https://images.pexels.com/photos/1319911/pexels-photo-1319911.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1319911.jpg&fm=jpg"
                    alt=""
                    className="currentUserUpdateImg"
                  />
                  <label htmlFor="file">
                    <Publish className="currentUserUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="currentUserUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default currentUser
