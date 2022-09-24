import React from "react";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import styles from "./Product.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { modifyProductList } from "../action";
import { modifyCategoryList } from "../action";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";
import { modifyCallApi } from "../action";
import { addNewCategory } from "../action";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "../App.css";

function Product(data) {
  const prodData = data.data;

  const category = useRef(null);

  let navigateToAdd = useNavigate();
  const arr = data.data.reducer.productPage.products;
  const arr1 = arr.map((item) => {
    return {
      ...item,
      checked: false,
    };
  });
  console.log(arr1);
  const multy = [];

  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState([]);
  const [modal, setmodal] = useState(false);

  console.log(products);

  useEffect(() => {
    if (prodData.reducer.accountPage.length !== 0) {
      setcategories(data.data.reducer.productPage.categories);
      setproducts(arr1);
    }
  }, [prodData]);

  const deleteProductList = (name) => {
    const deletedData = [];
    products.map((item) => {
      if (item.name !== name) {
        deletedData.push(item);
      }
    });

    data.deleteProduct(deletedData);
  };

  const deleteCategoryList = (category) => {
    const deletedCategory = [];
    categories.map((item) => {
      if (category !== item) {
        deletedCategory.push(item);
      }
    });

    data.deleteCategory(deletedCategory);
  };

  const handlechange = (e, naam) => {
    let arr3 = products.map((item) =>
      item.name === e.target.name
        ? {
            ...item,
            checked: e.target.checked,
          }
        : { ...item }
    );

    setproducts(arr3);
  };

  const handleClick = () => {
    const newList = products.filter((item) => !item.checked && item.name);

    data.deleteProduct(newList);
  };

  const getCategory = (e) => {
    e.preventDefault();

    let newCategory = e.target.categoryName.value.toString();
    console.log(newCategory);

    e.target.categoryName.value = "";

    const apiCall = false;

    setmodal(!modal);
    data.callApi(apiCall);
    data.addCategory(newCategory);
  };

  return (
    <>
      <Navbar/>
      <div Id={styles.productPageWrapper}>
        <div id={styles.productWrapper}>
          <div className={styles.productTableWrapper}>
            <table className={styles.productTable}>
              <tr className={styles.productTh}>
                <th> &nbsp; </th>
                <th>PRODUCT NAME</th>
                <th>UNIT SOLD</th>
                <th>IN STOCK</th>
                <th>EXPIRE DATE</th>
                <th>&nbsp;</th>
              </tr>

              {products.map((item, i) => {
                return (
                  <tr className={styles.productTr} key={i}>
                    <td>
                      <input
                        type="checkbox"
                        id={styles.checkBox}
                        checked={item.checked}
                        name={item.name}
                        onChange={(e) => {
                          handlechange(e, item.name);
                        }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.unitSold}</td>
                    <td>{item.stock}</td>
                    <td>{item.expireDate}</td>
                    <td>
                      <div className={styles.deleteContainer}>
                        <RiDeleteBin6Line
                          className={styles.deleteIcon}
                          onClick={() => deleteProductList(item.name)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.addBtn}
              onClick={() => navigateToAdd("/AddProduct")}
            >
              ADD NEW PRODUCT
            </button>
            <button
              className={styles.delBtn}
              onClick={() => handleClick(multy)}
            >
              DELETE SELECTED PRODUCT
            </button>
          </div>
        </div>
        <div Id={styles.categoryWrapper}>
          <h3 className={styles.categoryHeading}>Product Categories</h3>

          <div className={styles.categoryTableWrapper}>
            <table className={styles.categoryTable}>
              {categories.map((item, i) => {
                return (
                  <tr className={styles.categoryTr} key={i}>
                    <td>{item}</td>
                    <td>
                      <div className={styles.deleteContainer}>
                        <RiDeleteBin6Line
                          className={styles.deleteIcon}
                          onClick={() => {
                            deleteCategoryList(item);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>

          <button className={styles.addCatBtn} onClick={() => setmodal(true)}>
            ADD NEW CATEGORY{" "}
          </button>
        </div>
        {/* {popup && <AddCategory props={setpopup}/>} */}
        <Modal
          size="lg"
          isOpen={modal}
          toggle={() => setmodal(!modal)}
          className={styles.formWrapper}
        >
          <ModalHeader
            className={styles.categoryHeadings}
            toggle={() => setmodal(!modal)}
          >
            {/* <button className={styles.closePopup}>X</button> */}
            Add category name here
          </ModalHeader>

          <ModalBody className={styles.addCategoryFormWrapper}>
            <form
              className={styles.addCategoryForm}
              onSubmit={(e) => {
                getCategory(e);
              }}
            >
              <label htmlfor="categoryName">Category Name</label>
              <input
                ref={category}
                type="text"
                name="categoryName"
                id="categoryName"
                className={styles.categoryName}
              />
              <button className={styles.submitBtn} type="submit" value="submit">
                Submit
              </button>
            </form>
          </ModalBody>
          {/* <ModalFooter className={styles.modalfooter}></ModalFooter> */}
        </Modal>
      </div>
      <Footer/>
    </>
  );
}

const mapstateToProps = (props) => ({
  data: props,
});

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (name) => {
    dispatch(modifyProductList(name));
  },
  deleteCategory: (name) => {
    dispatch(modifyCategoryList(name));
  },
  callApi: (apiCall) => {
    dispatch(modifyCallApi(apiCall));
  },
  addCategory: (name) => {
    dispatch(addNewCategory(name));
  },
});

export default connect(mapstateToProps, mapDispatchToProps)(Product);