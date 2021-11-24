import React from 'react'
import './newProduct.css'
function NewProduct() {
    return (
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form action="" className="addProductForm">
          <div className="addProductItem">
            <label htmlFor="file">Image</label>
            <input type="file" placeholder="file" />
          </div>
          <div className="addProductItem">
            <label htmlFor="">Title</label>
            <input type="text" placeholder="Book 1" />
          </div>
          <div className="addProductItem">
            <label htmlFor="">Category</label>
            <input type="text" placeholder="Manga" />
          </div>
          <div className="addProductItem">
            <label htmlFor="">Publisher</label>
            <input type="text" placeholder="KimDong" />
          </div>
          <div className="addProductItem">
            <label htmlFor="">Price</label>
            <input type="text" placeholder="20" />
          </div>
          <div className="addProductItem">
            <label htmlFor="">In Stock</label>
            <input type="text" placeholder="10" />
          </div>
          <div className="addProductItem">
            <label htmlFor="">Description</label>
            <input
              type="text"
              placeholder="A very good book that everyone loves"
            />
          </div>
          <div className="addProductItem">
            <label htmlFor="">Rating</label>
            <input
              type="text"
              placeholder="4"
            />
          </div>
          <button className="addProductButton">Create</button>
        </form>
      </div>
    );
}

export default NewProduct
