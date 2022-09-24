import React, { useRef, useState, useEffect } from "react";
import styles from "./Account.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { connect } from "react-redux";
import { deleteUser, modifyAccountInfo } from "../action";
import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";

function Account(data) {
  const myref = useRef(null);

  const allAccounts = data.data.reducer.accountPage;

  const newData = JSON.stringify(allAccounts);

  localStorage.setItem("accountPageDetails", newData);

  const datalocal = JSON.parse(localStorage.getItem("accountPageDetails"));

  const [accountInfo, setaccountInfo] = useState([]);
  const [accountHolder, setaccountHolder] = useState("");

  useEffect(() => {}, [datalocal, accountInfo, allAccounts]);

  const handleOnClick = (e) => {
    setaccountHolder(e.target.value);

    Object.entries(datalocal).map((item, i) => {
      if (e.target.value === item[0]) {
        setaccountInfo(item[1]);
      }
    });
  };

  const getProfilePic = (e) => {
    e.preventDefault();
    myref.current.click();
  };

  const onclickHandle = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setaccountInfo({ ...accountInfo, profilePic: reader.result });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const profileUpdateHandler = (e) => {
    e.preventDefault();
    data.updateInfo(accountInfo, accountHolder);
  };

  const deleteAccount = () => {
    data.deleteUser(accountHolder);

    alert("Account Deleted Successfully");
  };

  return (
    <>
      <Navbar/>
      <div className={styles.mainWrapper}>
        <div className={styles.accountsWrapper}>
          <div className={styles.div1}>
            <h5>List of Accounts</h5>
            <p>Accounts</p>

            <select
              className={styles.accountsType}
              onClick={(e) => handleOnClick(e)}
            >
              <option>Select account</option>
              <option>Admin</option>
              <option>Editor</option>
              <option>Merchant</option>
              <option>Customer</option>
            </select>
          </div>
          <div className={styles.div2}>
            <h5 className={styles.avatarHeading}>Change Avatar</h5>
            <div className={styles.profileImg}>
              <img
                src={accountInfo.profilePic}
                alt=""
                className={styles.profilePic}
              />
              <div
                className={styles.deleteImgIconWrapper}
                onClick={() =>
                  setaccountInfo({ ...accountInfo, profilePic: "" })
                }
              >
                <RiDeleteBin6Line className={styles.deleteIcon} />
              </div>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/bmp,image/svg,image/webp,"
              id={styles.inputFile}
              className={styles.userProfilePicUploader}
              ref={myref}
              onChange={(e) => {
                onclickHandle(e);
              }}
            />

            <button
              className={styles.imgUploadBtn}
              onClick={(e) => getProfilePic(e)}
            >
              UPLOAD NEW PHOTO
            </button>
          </div>
          <div className={styles.div3}>
            <h5 className={styles.avatarHeading}>Account Settings</h5>

            <form className={styles.accountsInfo}>
              <div>
                <label htmlFor="accountName">Account Name</label>
                <input
                  type="text"
                  id="accountName"
                  value={accountInfo.name}
                  onChange={(e) =>
                    setaccountInfo({ ...accountInfo, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="email">Account Email</label>
                <input
                  type="email"
                  id="email"
                  value={accountInfo.email}
                  onChange={(e) =>
                    setaccountInfo({ ...accountInfo, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={accountInfo.password}
                  onChange={(e) =>
                    setaccountInfo({ ...accountInfo, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="rePassword">Re-enter Password</label>
                <input
                  type="password"
                  id="rePassword"
                  value={accountInfo.password}
                  onChange={(e) =>
                    setaccountInfo({ ...accountInfo, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="Phone">Phone</label>
                <input
                  type="number"
                  id="phone"
                  value={accountInfo.phone}
                  onChange={(e) =>
                    setaccountInfo({ ...accountInfo, phone: e.target.value })
                  }
                />
              </div>
              <button
                className={styles.updateProfileBtn}
                onClick={(e) => {
                  profileUpdateHandler(e);
                }}
              >
                UPDATE YOUR PROFILE
              </button>
            </form>
            <button
              className={styles.deleteProfileBtn}
              onClick={() => {
                deleteAccount();
              }}
            >
              DELETE YOUR ACCOUNT
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

const mapstateToProps = (props) => ({
  data: props,
});

const mapDispatchToProps = (dispatch) => ({
  updateInfo: (val, name) => {
    dispatch(modifyAccountInfo(val, name));
  },
  deleteUser: (userName) => {
    dispatch(deleteUser(userName));
  },
});

export default connect(mapstateToProps, mapDispatchToProps)(Account);
