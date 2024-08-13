import { useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAddress, selectAddress } from "./userSlice";
import { FaExternalLinkAlt } from "react-icons/fa";

import Header from "../../components/Header";
import "./User.css";

const User = () => {
  const bottomRef = useRef(null);

  const location = useLocation();
  const dispatch = useDispatch();

  const message = location.state;

  const { user, loading, selectedAddress } = useSelector((state) => state.user);

  useEffect(() => {
    if (message && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleAddressDeletion = (addressId) => {
    dispatch(deleteAddress({ username: user.username, addressId }));
  };

  const handleAddressSelection = (addressId, checked) => {
    dispatch(selectAddress({ addressId, checked }));
  };

  return (
    <>
      <Header />
      <main className="user-main">
        <h2>User Profile</h2>
        {!user && (
          <div className="user-error">
            <p>
              Please login by <NavLink to="/login">clicking here.</NavLink>
            </p>
          </div>
        )}
        {user && (
          <>
            <div className="user-container">
              <div className="user-info">
                <p>
                  <strong>Username: </strong>
                  {user.username}
                </p>
                <p>
                  <strong>Email Id: </strong>
                  {user.emailId}
                </p>
                <p>
                  <strong>Phone Number: </strong>
                  {user.phoneNumber}
                </p>
              </div>
              <div className="user-info-links">
                <NavLink className="user-wishlist-link" to="/wishlist">
                  View Your Wishlist <FaExternalLinkAlt size={15} />
                </NavLink>
                <NavLink className="user-wishlist-link" to="/order">
                  View Order History <FaExternalLinkAlt size={15} />
                </NavLink>
              </div>
            </div>
            {user.addresses.length > 0 && (
              <div style={{ padding: " 0 0 1rem 0" }}>
                <p style={{ fontWeight: "bold" }}>
                  Want to add another address?
                </p>
                <NavLink to="/editAddress/new">Click here</NavLink>
              </div>
            )}
            {message && (
              <h4
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  marginTop: "1rem",
                }}
              >
                {message}
              </h4>
            )}
            <div ref={bottomRef} className="addresses-container">
              <h3>Saved Addresses:</h3>
              {user.addresses.length === 0 && (
                <div>
                  <p>You don't have any saved addresses yet.</p>
                  <NavLink to="/editAddress/new">
                    Add a new one by clicking here.
                  </NavLink>
                </div>
              )}
              {user.addresses.length > 0 && (
                <div className="addresses-info">
                  {user.addresses.map((address) => {
                    return (
                      <>
                        <div className="address-box">
                          <div className="address-container">
                            <h3>Address:</h3>
                            <p>
                              <strong>Building Number: </strong>
                              {address.buildingNumber}
                            </p>
                            <p>
                              <strong>Street Name: </strong>
                              {address.streetName}
                            </p>
                            <p>
                              <strong>Location: </strong>
                              {address.location}
                            </p>
                            <p>
                              <strong>City: </strong>
                              {address.city}
                            </p>
                            <p>
                              <strong>Pincode: </strong>
                              {address.pincode}
                            </p>
                          </div>
                          <div className="address-btns-grp">
                            <NavLink to={`/editAddress/${address._id}`}>
                              Edit
                            </NavLink>
                            <button
                              onClick={() => handleAddressDeletion(address._id)}
                            >
                              Delete
                            </button>
                            {selectedAddress === address._id && (
                              <button
                                onClick={() =>
                                  handleAddressSelection(address._id, true)
                                }
                              >
                                Selected
                              </button>
                            )}
                            {selectedAddress !== address._id && (
                              <button
                                onClick={() =>
                                  handleAddressSelection(address._id, false)
                                }
                              >
                                Select
                              </button>
                            )}
                          </div>
                        </div>
                        <div>
                          {loading === "loading" && <p>Deleting Address.</p>}
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default User;
