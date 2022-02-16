import React, { useState, useEffect } from 'react'
import './productList.css'
import {
    DataGrid,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from '@material-ui/data-grid'
import { products } from '../../dummyData'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { DeleteOutline, Delete, Clear, Search, SystemUpdateAltSharp } from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/styles'
import { createTheme, TextField } from '@material-ui/core'
import { axios } from '../../axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

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
function ProductList() {
    const [data, setData] = useState([])
    const [selectionModel, setSelectionModel] = React.useState([])
    const [searchText, setSearchText] = React.useState('')

    const getAllProducts = async () => {
        const res = await axios
            .get('api/product')
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            setData(res.data.products)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    const requestSearch = async (searchValue) => {
        setSearchText(searchValue)
        const searchProduct = {title: searchValue}
        const res = await axios.post('api/product/searchSpecificProduct', searchProduct)
        if (res && res.data) {
            setData(res.data.product)
        }
    }

    const handleDelete = async (id) => {
        const res = await axios.delete(`api/product/${id}`).catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            getAllProducts()
            toast.success('Delete Product Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }
    
    const columns = [
        {
            field: 'delete',
            flex: 0.7,
            disableColumnMenu: true,
            sortable: false,
            filterable: false,
            renderHeader: () => {
                return (
                    <IconButton
                        onClick={() => {
                            const selectedIDs = new Set(selectionModel)
                            // you can call an API to delete the selected IDs
                            // and get the latest results after the deletion
                            // then call setData() to update the data locally here
                            setData((r) =>
                                r.filter((x) => !selectedIDs.has(x.id))
                            )
                        }}
                    >
                        <Delete style={{ color: 'red' }} />
                    </IconButton>
                )
            },
        },
        { field: '_id', headerName: 'ID', flex: 0.7, disableColumnMenu: true },
        {
            field: 'product',
            headerName: 'Product',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                return (
                    <div className='productListItem'>
                        <img
                            src={params.row.image}
                            alt=''
                            className='productListImg'
                        />
                    </div>
                )
            },
        },
        {
            field: 'title',
            headerName: 'Product Name',
            flex: 2,
            disableColumnMenu: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 1.5,
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
                        <Link to={'/product/' + params.row._id}>
                            <button className='productListEdit'>Edit</button>
                        </Link>
                        <DeleteOutline
                            className='productListDelete'
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                )
            },
        },
    ]
    return (
        <div className='productList'>
            <div className='productListManage'>
                <span className='productListManageTitle'>Products</span>
                <Link to='/newproduct'>
                    <button className='productAddButton'>Create</button>
                </Link>
            </div>
            <DataGrid
                getRowId = {(data) => data._id}
                rows={data}
                columns={columns}
                pageSize={12}
                disableSelectionOnClick
                rowsPerPageOptions={[12]}
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

export default ProductList
