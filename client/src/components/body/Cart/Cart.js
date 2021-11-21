import React from "react";
import './Cart.css'
import { Button, ButtonGroup, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { cart } from "../../../dummyData";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const Cart = () => {
    const cartItems = cart.cartItems;
    return (
        <main>
            <h3 className='cart-header'>Your cart</h3>
            <div className="cart" style={{}}>
            <div className="cart-module">
                <label htmlFor="promo-code">Enter a promotional code</label>
                <input id="promo-code" type="text" name="promo-code" maxlength="5" className="promo-code-field" />
                <button className="promo-code-cta">Apply</button>
            </div>
            {/* <div className="cart-labels">
                <ul>
                <li className="item item-heading">Item</li>
                <li className="price">Price</li>
                <li className="quantity">Quantity</li>
                <li className="subtotal">Subtotal</li>
                </ul>
            </div>
            <div >
                {cartItems.length === 0 ? <p>No items in cart.</p> : null}
                {cartItems && cartItems.map((product) => {
                return (
                    <div className="cart-product">
                    <div className='item'>
                        <div className='product-image'>
                            <img src={product.product.img} alt='' className="product-frame"/>
                        </div>
                        <div className='product-details'>
                            <h1>{product.product.title}</h1>
                        </div>
                    </div>
                    <div className="price" style={{fontWeight:'bold'}}>{product.product.price}</div>
                    <div className="quantity" style={{display:'flex'}}>
                        
                        <button onclick="dec()" style={{width:20, fontSize:30}}>-</button>
                        <input name="number" type="text" readonly value={product.quantity} style={{width:20}}/>
                        <button onclick="inc()" style={{width:20}}>+</button>  
                        
                    </div>
                    <div className="subtotal" style={{fontWeight:'bold', color:'red'}}>{product.product.price * product.quantity}</div>
                    <div className="remove">
                        <button><DeleteIcon /></button>
                    </div>
                    </div>
                )
                })}
            </div> */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="center">Unit price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center"><IconButton><DeleteIcon /></IconButton></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item) => {
                            return (
                                <TableRow>
                                    <TableCell padding='checkbox' sx={{width:150, paddingTop:2}}>
                                        <img src={item.product.img} alt={item.product.title}/>
                                        <p>{item.product.title}</p>
                                    </TableCell>
                                    <TableCell align="center">${item.product.price}</TableCell>
                                    <TableCell align="center">{item.quantity}</TableCell>
                                    <TableCell align="center" style={{color:'red'}}>${item.product.price * item.quantity}</TableCell>
                                    <TableCell align="center"><IconButton><DeleteIcon /></IconButton></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            <aside className="cart-aside">
            <div className="summary">
                <div className="summary-total-items"><span className="total-items"></span> Items in your Bag</div>
                <div className="summary-subtotal">
                <div className="subtotal-title">Subtotal</div>
                <div className="subtotal-value final-value" id="cart-subtotal">{cart.price}</div>
                <div className="summary-promo hide">
                    <div className="promo-title">Promotion</div>
                    <div className="promo-value final-value" id="cart-promo"></div>
                </div>
                </div>
                <div className="summary-delivery">
                </div>
                <div className="summary-total">
                <div className="total-title">Total</div>
                <div className="total-value final-value" id="cart-total">{cart.price}</div>
                </div>
                <div className="summary-checkout">
                <Button variant="contained" type='submit' style={{width:'100%', margin:'0 auto'}}>Submit</Button>
                </div>
            </div>
            </aside>
        </main>
    )
}

export default Cart