import { NavLink, useParams } from "react-router-dom";

import {
  editAddress,
  addNewAddress,
  resetAddressError,
  resetEditAddressForm,
} from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import "./EditAddress.css";
import { useState, useEffect } from "react";

const EditAddress = () => {
  const dispatch = useDispatch();

  const { addressId } = useParams();

  const { user, loading, addressMutationResult, error } = useSelector(
    (state) => state.user,
  );

  const addressToBeEdited =
    user &&
    user.addresses &&
    user.addresses.find((address) => address._id === addressId);

  const [buildingNumber, setBuildingNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    if (addressToBeEdited) {
      setBuildingNumber(addressToBeEdited.buildingNumber);
      setStreetName(addressToBeEdited.streetName);
      setLocation(addressToBeEdited.location);
      setCity(addressToBeEdited.city);
      setPincode(addressToBeEdited.pincode);
    }

    dispatch(resetEditAddressForm());
  }, []);

  const handleInputChange = (value, type) => {
    dispatch(resetAddressError());

    if (type === "buildingNumber") {
      setBuildingNumber(value);
    }
    if (type === "streetName") {
      setStreetName(value);
    }
    if (type === "location") {
      setLocation(value);
    }
    if (type === "city") {
      setCity(value);
    }
    if (type === "pincode") {
      setPincode(value);
    }
  };

  const handleAddressSubmission = (e) => {
    e.preventDefault();

    const newAddress = {
      buildingNumber,
      streetName,
      location,
      city,
      pincode: parseInt(pincode),
    };

    if (addressId === "new") {
      dispatch(addNewAddress({ username: user.username, newAddress }));
    } else {
      dispatch(editAddress({ username: user.username, addressId, newAddress }));
    }

    setBuildingNumber("");
    setStreetName("");
    setLocation("");
    setCity("");
    setPincode("");
  };

  return (
    <>
      <Header />
      <main className="edit-address-main">
        <section className="edit-address-container">
          <h2>{addressId !== "new" ? "Edit Address" : "Add New Address"}</h2>
          {!user && (
            <p>
              Please login first. <NavLink to="/login">Click here.</NavLink>
            </p>
          )}
          {addressMutationResult !== "success" && user && (
            <div className="edit-address-form-container">
              <form
                onSubmit={handleAddressSubmission}
                className="edit-address-form"
              >
                <div className="edit-address-form-item">
                  <label htmlFor="buildingNumberInput">Building Number:</label>
                  <input
                    value={buildingNumber}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "buildingNumber")
                    }
                    required
                    type="text"
                    id="buildingNumberInput"
                  />
                  {error && error.error && error.error.buildingNumber && (
                    <p>Please provide a valid input for building number.</p>
                  )}
                </div>
                <div className="edit-address-form-item">
                  <label htmlFor="streetNameInput">Street Name:</label>
                  <input
                    value={streetName}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "streetName")
                    }
                    required
                    type="text"
                    id="streetNameInput"
                  />
                  {error && error.error && error.error.streetName && (
                    <p>Please provide a valid input for street name.</p>
                  )}
                </div>
                <div className="edit-address-form-item">
                  <label htmlFor="locationInput">Location:</label>
                  <input
                    value={location}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "location")
                    }
                    required
                    type="text"
                    id="locationInput"
                  />
                  {error && error.error && error.error.location && (
                    <p>Please provide a valid input for location.</p>
                  )}
                </div>
                <div className="edit-address-form-item">
                  <label htmlFor="cityInput">City:</label>
                  <input
                    value={city}
                    onChange={(e) => handleInputChange(e.target.value, "city")}
                    required
                    type="text"
                    id="cityInput"
                  />
                  {error && error.error && error.error.city && (
                    <p>Please provide a valid input for city.</p>
                  )}
                </div>
                <div className="edit-address-form-item">
                  <label htmlFor="pincodeInput">Pincode:</label>
                  <input
                    value={pincode}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "pincode")
                    }
                    required
                    type="number"
                    id="pincodeInput"
                  />
                  {error && error.error && error.error.pincode && (
                    <p>Please provide a valid input for pincode.</p>
                  )}
                </div>
                <div>
                  <button
                    className="edit-address-form-submit-btn"
                    type="submit"
                  >
                    {addressId === "new" ? "Add Address" : "Update Address"}
                  </button>
                  {loading === "loading" && (
                    <p style={{ padding: "1rem 0" }}>Adding address!</p>
                  )}
                </div>
              </form>
            </div>
          )}
          {loading === "idle" && addressMutationResult === "success" && (
            <p style={{ padding: "1rem 0" }}>
              Address {addressId === "new" ? "added" : "updated"} successfully!
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default EditAddress;
