import React from "react";
import "./order.css";
function Order() {
  return (
    <div className="order">
      <h1 className="orderTitle">Order</h1>
      <div className="orderContainer">
        <div className="leftContent">
            <form action="" className="orderForm">
                <div className="orderItem">
                    <label htmlFor="">UserId</label>
                    <input type="text" />
                </div>
            </form>
        </div>
        <div className="rightContent">Right</div>
      </div>
      <button className="updateOrder">Update</button>
    </div>
  );
}

export default Order;
