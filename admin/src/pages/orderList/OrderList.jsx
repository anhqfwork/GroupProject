import React, { useState, useEffect } from 'react'
import './orderList.css'
import {
    DataGrid,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from '@material-ui/data-grid'
import { orders } from '../../dummyData'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { DeleteOutline, Delete, Clear, Search } from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/styles'
import { createTheme, TextField } from '@material-ui/core'
import { axios } from '../../axios'

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
const defaultTheme = createTheme()
const useStyles = makeStyles(
    (theme) =>
        createStyles({
            root: {
                padding: theme.spacing(0.5, 0.5, 0),
                justifyContent: 'space-between',
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            },
            textField: {
                [theme.breakpoints.down('xs')]: {
                    width: '100%',
                },
                margin: theme.spacing(1, 0.5, 1.5),
                '& .MuiSvgIcon-root': {
                    marginRight: theme.spacing(0.5),
                },
                '& .MuiInput-underline:before': {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                },
            },
        }),
    { defaultTheme }
)
function QuickSearchToolbar(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </div>
            <TextField
                variant='standard'
                value={props.value}
                onChange={props.onChange}
                placeholder='Search…'
                className={classes.textField}
                InputProps={{
                    startAdornment: <Search fontSize='small' />,
                    endAdornment: (
                        <IconButton
                            title='Clear'
                            aria-label='Clear'
                            size='small'
                            style={{
                                visibility: props.value ? 'visible' : 'hidden',
                            }}
                            onClick={props.clearSearch}
                        >
                            <Clear fontSize='small' />
                        </IconButton>
                    ),
                }}
            />
        </div>
    )
}
function OrderList() {
    const [orders, setOrders] = useState([])

    const getAllOrders = async () => {
        const res = await axios
            .get('api/order')
            .catch((err) => console.log(err))
        if (res && res.data) {
            const orders = res.data.orders
            // const newData = {
            //   ...data,
            //   username: data.user.username,
            // }
            for (let i = 0; i < orders.length; i++) {
                orders[i].username = orders[i].user.username
                orders[i].name = orders[i].user.name
            }
            console.log(orders)
            setOrders(orders)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    const [selectionModel, setSelectionModel] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const requestSearch = (searchValue) => {
        setSearchText(searchValue)
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
        const filteredRows = orders.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString())
            })
        })
        console.log(filteredRows)
        setOrders(filteredRows)
    }

    const columns = [
        { field: '_id', headerName: 'ID', flex: 0.7, disableColumnMenu: true },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1.0,
            disableColumnMenu: true,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1.5,
            disableColumnMenu: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.9,
            disableColumnMenu: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 0.7,
            disableColumnMenu: true,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 2,
            disableColumnMenu: true,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={'/order/' + params.row._id}>
                            <button className='orderListEdit'>Edit</button>
                        </Link>
                    </>
                )
            },
        },
    ]
    return (
        <div className='orderList'>
            <div className='orderListManage'>
                <span className='orderListManageTitle'>Orders</span>
            </div>
            <DataGrid
                getRowId={(order) => order._id}
                rows={orders.reverse()}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    setSelectionModel(ids)
                }}
                components={{ Toolbar: QuickSearchToolbar }}
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
            />
        </div>
    )
}

export default OrderList
