import React from 'react'
import './widgetSm.css'
import {Visibility} from '@material-ui/icons'
export default function WidgetSm() {
    return (
      <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
          <li className="widgetSmListItem">
            <img
              src="https://images.pexels.com/photos/10157060/pexels-photo-10157060.jpeg?cs=srgb&dl=pexels-kira-schwarz-10157060.jpg&fm=jpg"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">Anna Keller</span>
              <span className="widgetSmUserTitle">Customer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
            </button>
          </li>
          <li className="widgetSmListItem">
            <img
              src="https://images.pexels.com/photos/10157060/pexels-photo-10157060.jpeg?cs=srgb&dl=pexels-kira-schwarz-10157060.jpg&fm=jpg"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">Anna Keller</span>
              <span className="widgetSmUserTitle">Customer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
            </button>
          </li>
          <li className="widgetSmListItem">
            <img
              src="https://images.pexels.com/photos/10157060/pexels-photo-10157060.jpeg?cs=srgb&dl=pexels-kira-schwarz-10157060.jpg&fm=jpg"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">Anna Keller</span>
              <span className="widgetSmUserTitle">Customer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
            </button>
          </li>
          <li className="widgetSmListItem">
            <img
              src="https://images.pexels.com/photos/10157060/pexels-photo-10157060.jpeg?cs=srgb&dl=pexels-kira-schwarz-10157060.jpg&fm=jpg"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">Anna Keller</span>
              <span className="widgetSmUserTitle">Customer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
            </button>
          </li>
          <li className="widgetSmListItem">
            <img
              src="https://images.pexels.com/photos/10157060/pexels-photo-10157060.jpeg?cs=srgb&dl=pexels-kira-schwarz-10157060.jpg&fm=jpg"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">Anna Keller</span>
              <span className="widgetSmUserTitle">Customer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
            </button>
          </li>
        </ul>
      </div>
    );
}
