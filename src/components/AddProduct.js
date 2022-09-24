import React, { useRef } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddProduct.module.css";
import { RiUploadCloudFill } from "react-icons/ri";
import { addNewProduct } from "../action";
import { modifyCallApi } from "../action";
import moment from "moment";
import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";

function AddProduct(props) {
  let navigateToProduct = useNavigate();
  const myContainer = useRef(null);

  const [File, setFile] = useState([]);

  const getFileFromIcon = () => {
    myContainer.current.click();
  };
  const getFileFromBtn = (e) => {
    e.preventDefault();
    myContainer.current.click();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let expiryDate = e.target.expireDate.value.toString();

    const date = moment(expiryDate).format("DD MMMM YYYY");

    let newProductObject = {
      category: e.target.productDescription.value,
      description:
        e.target.productName.value +
        " - Lorem ipsum dolor amet gentrify glossier locavore messenger bag chillwave hashtag irony migas wolf kale chips small batch kogi direct trade shaman.",
      expireDate: date,
      name: e.target.productName.value,
      stock: e.target.UnitsInStock.value,
      unitSold: "1,450",
      image: myContainer.current.value,
    };
    e.target.productDescription.value = "";
    e.target.productName.value = "";
    e.target.expireDate.value = "";
    e.target.productName.value = "";
    e.target.UnitsInStock.value = "";
    myContainer.current.value = "";
    navigateToProduct("/product");
    const apiCall = false;
    console.log(newProductObject);
    props.callApi(apiCall);
    props.addProduct(newProductObject);
  };

  return (
    <>
      <Navbar/>
      <div id={styles.mainWrapper}>
        <div id={styles.formWrapper}>
          <h3 className={styles.addProHeading}>Add Product</h3>
          <form
            id={styles.addProductForm}
            onSubmit={(e) => {
              onSubmitHandler(e);
            }}
          >
            <div className={styles.fieldWrapper}>
              <div className={styles.inputFieldWrapper}>
                <label htmlfor="productName">Product Name</label>
                <input
                  ref={myContainer}
                  type="text"
                  name="productName"
                  id="productName"
                  className={styles.productName}
                />
                <label htmlfor="productDescription">Description</label>
                <textarea
                  ref={myContainer}
                  type="text"
                  name="productDescription"
                  id="productDescription"
                  rows={5}
                  cols={50}
                  className={styles.productDescription}
                />
                <label htmlfor="productCategory">Category</label>
                <select
                  name="productCategory"
                  id="productCategory"
                  className={styles.productCategory}
                >
                  <option>Select cetegory</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Most Popular">Most Popular</option>
                  <option value="Trending">Trending</option>
                </select>

                <div className={styles.dateWrapper}>
                  <div className={styles.expiryWrapper}>
                    <label htmlfor="expireDate">Expire Date</label>
                    <br />
                    <input
                      type="date"
                      name="expireDate"
                      id="expireDate"
                      className={styles.expireDate}
                    />
                  </div>
                  <div className={styles.stockWrapper}>
                    <label htmlfor="UnitsInStock">Units In Stock</label>
                    <input
                      type="number"
                      name="UnitsInStock"
                      id="UnitsInStock"
                      className={styles.UnitsInStock}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.productImageWrapper}>
                <div id={styles.fileUploadWrapper}>
                  <div
                    className={styles.uploadFileImage}
                    onClick={() => {
                      getFileFromIcon();
                    }}
                  >
                    <RiUploadCloudFill />
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/bmp,image/svg,image/webp,"
                    id={styles.inputFile}
                    className={styles.inputFile}
                    ref={myContainer}
                  />
                </div>
                <button
                  id={styles.fileUploadBtn}
                  onClick={(e) => {
                    getFileFromBtn(e);
                  }}
                >
                  UPLOAD PRODUCT IMAGE
                </button>
              </div>
            </div>

            <button id={styles.addProductBtn} type="submit" value="Submit">
              ADD PRODUCT NOW
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

const mapstateToProps = (props) => ({});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (newProduct) => {
    dispatch(addNewProduct(newProduct));
  },
  callApi: (apiCall) => {
    dispatch(modifyCallApi(apiCall));
  },
});

export default connect(mapstateToProps, mapDispatchToProps)(AddProduct);
