import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="tobarWrapper">
        <div className="topLeft">
          <span className="logo">Management</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <Link to="/currentUser">
            <img
              src="https://images.pexels.com/photos/8802893/pexels-photo-8802893.jpeg?cs=srgb&dl=pexels-s-migaj-8802893.jpg&fm=jpg"
              alt=""
              className="topAvatar"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
