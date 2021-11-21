import React, { useState } from "react";
import "./orderList.css";
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";
import { orders } from "../../dummyData";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { DeleteOutline, Delete, Clear, Search } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import { createTheme, TextField } from "@material-ui/core";
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
      },
      textField: {
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
        margin: theme.spacing(1, 0.5, 1.5),
        "& .MuiSvgIcon-root": {
          marginRight: theme.spacing(0.5),
        },
        "& .MuiInput-underline:before": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme }
);
function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <Clear fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}
function OrderList() {
  const [data, setData] = useState(orders);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = orders.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    console.log(filteredRows);
    setData(filteredRows);
  };
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      field: "delete",
      flex: 0.7,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      renderHeader: () => {
        return (
          <IconButton
            onClick={() => {
              const selectedIDs = new Set(selectionModel);
              // you can call an API to delete the selected IDs
              // and get the latest results after the deletion
              // then call setData() to update the data locally here
              setData((r) => r.filter((x) => !selectedIDs.has(x.id)));
            }}
          >
            <Delete style={{ color: "red" }} />
          </IconButton>
        );
      },
    },
    { field: "id", headerName: "ID", flex: 0.7, disableColumnMenu: true },
    {
      field: "userId",
      headerName: "UserID",
      flex: 0.7,
      disableColumnMenu: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      disableColumnMenu: true,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.7,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row.id}>
              <button className="orderListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="orderList">
      <div className="orderListManage">
        <span className="orderListManageTitle">Orders</span>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
          },
        }}
      />
    </div>
  );
}

export default OrderList;
