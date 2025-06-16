import { CircleUserRound } from "lucide-react";
import React, { useState } from "react";
import { fetchUserById, updateUser } from "../services/UserServices.jsx";
import "../../front/profile.css";

export const Profile = () => {
  const [searchId, setSearchId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    firstname: "",
    lastname1: "",
    lastname2: "",
    username: "",
    email: "",
    address_country: "",
    address_county: "",
    address_city: "",
    address_postcode: "",
    address_street: "",
    tax_number: "",
    geo_dir: "",
  });

  const handleSearch = async () => {
    try {
      const userData = await fetchUserById(searchId);
      setUser(userData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("User not found.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await updateUser(searchId, user);
      alert("User updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error saving changes.");
    }
  };

  return (
    <div className="container-fluid profileCustom align-content-center my-5">
      <h2 className="text-center text-white mb-4">Profile</h2>

      {/* Search row */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter user ID or username"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="col-12 col-sm-4 col-md-2 col-lg-2 mb-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* User icon + name */}
      <div className="row justify-content-center align-items-center mb-5">
        <div className="userIcon col-12 col-md-4 text-center mb-3 mb-md-0">
          <CircleUserRound size={200} />
        </div>
        <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
          <p className="userName">{`${user.firstname} ${user.lastname1}`}</p>
        </div>
      </div>

      {/* Form inputs in rows of 3 on md and lg */}
      <div className="container">
        {/* Row 1 */}
        <div className="row justify-content-center g-3">
          <div className="col-lg-3 col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={user.firstname}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="form-label">Last Name 1</label>
            <input
              type="text"
              className="form-control"
              name="lastname1"
              value={user.lastname1}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="form-label">Last Name 2</label>
            <input
              type="text"
              className="form-control"
              name="lastname2"
              value={user.lastname2}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row justify-content-center g-3 mt-3">
          <div className="col-lg-3 col-md-6">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={user.username}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              name="address_country"
              value={user.address_country}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row justify-content-center g-3 mt-3">
          <div className="col-lg-3 col-md-6">
            <label className="form-label">County</label>
            <input
              type="text"
              className="form-control"
              name="address_county"
              value={user.address_county}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="address_city"
              value={user.address_city}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="form-label">Postcode</label>
            <input
              type="text"
              className="form-control"
              name="address_postcode"
              value={user.address_postcode}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="row justify-content-center g-3 mt-3">
          <div className="col-lg-3 col-md-6">
            <label className="form-label">Street</label>
            <input
              type="text"
              className="form-control"
              name="address_street"
              value={user.address_street}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="form-label">Tax Number</label>
            <input
              type="text"
              className="form-control"
              name="tax_number"
              value={user.tax_number}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="form-label">Geo Dir</label>
            <input
              type="text"
              className="form-control"
              name="geo_dir"
              value={user.geo_dir}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="row justify-content-center mt-5">
          <div className="col-auto">
            <button
              className="pricingButtonPlus"
              onClick={() => setIsEditing(true)}
              disabled={isEditing}
              type="button"
            >
              Edit
            </button>
          </div>
          <div className="col-auto">
            <button
              className="pricingButtonPlus"
              onClick={handleSave}
              disabled={!isEditing}
              type="button"
            >
              Save
            </button>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <button className="pricingButtonPlus" type="button">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
