import React, { useState } from "react";
import "./employeeList.css";
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";
import { allEmployees } from "../../dummyData";
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
function EmployeeList() {
  const [data, setData] = useState(allEmployees);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = allEmployees.filter((row) => {
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
      width: 70,
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
    { field: "id", headerName: "ID", width: 100, disableColumnMenu: true },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="employeeListItem">
            <img src={params.row.avatar} alt="" className="employeeListImg" />
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "Employee",
      width: 140,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      disableColumnMenu: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      width: 100,
      disableColumnMenu: true,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/employee/" + params.row.id}>
              <button className="employeeListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="employeeListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="employeeList">
      <div className="employeeListManage">
        <span className="employeeListManageTitle">Employees</span>
        <Link to="/newEmployee">
          <button className="employeeAddButton">Create</button>
        </Link>
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

export default EmployeeList;
