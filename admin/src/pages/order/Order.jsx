import React, { useState } from "react";
import "./order.css";
import { DataGrid } from "@material-ui/data-grid";
import { order } from "../../dummyData";
function Order() {
  const [data, setData] = useState(order.orderItems);

  const columns = [
    { field: "title", headerName: "Title", width: 150, editable: true },
    { field: "price", headerName: "Price", width: 150, editable: true },
    { field: "quantity", headerName: "Quantity", width: 150, editable: true },
    {
      field: "img",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <img src={params.row.img} alt="" className="orderListImg" />
          </>
        );
      },
    },
  ];

  return (
    <div className="order">
      <h1 className="orderTitle">Order</h1>
      <div className="topContent">
        <form action="" className="orderForm">
          <div className="orderItem">
            <label className="itemTitle">ID User:</label>
            <input type="text" placeholder="1" />
          </div>
          <div className="orderItem">
            <label className="itemTitle">Total Price:</label>
            <input type="text" placeholder="500" />
          </div>
          <div className="orderItem">
            <label className="itemTitle">Status:</label>
            <select>
              <option value="">Pending</option>
              <option value="">Waiting to delivery</option>
              <option value="">Delivering</option>
              <option value="">Complete</option>
              <option value="">Decline</option>
            </select>
          </div>
        </form>
      </div>
      <div style={{ height: 250 }} className="bottomContent">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[3]}
        />
      </div>
      <button className="updateOrderButton">Update</button>
    </div>
  );
}

export default Order;
