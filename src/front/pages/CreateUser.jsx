import React, { useState } from "react";
import { createUser, updateUser, fetchUserById } from "../services/UserServices.jsx";

export const UserForm = () => {
  const [searchId, setSearchId] = useState("");
  const [formData, setFormData] = useState({
    active_user: false,
    email: "",
    password: "",
    is_professional: false,
    firstname: "",
    lastname1: "",
    lastname2: "",
    address_street: "",
    address_city: "",
    address_postcode: "",
    address_county: "",
    address_country: "",
    tax_number: "",
    geo_dir: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = async (e) => {
  e.preventDefault();
  if (!searchId) return;
  try {
    const userId = Number(searchId); // Converts id to number
    if (isNaN(userId)) {
      throw new Error("User ID must be a number");
    }
    const user = await fetchUserById(userId);
    setFormData(user);
    setIsEditing(true);
  } catch (error) {
    console.error("Error searching user:", error);
    setError(error.message); // Shows error message
  }
};


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleReset = () => {
    setFormData({
      active_user: false,
      email: "",
      password: "",
      is_professional: false,
      firstname: "",
      lastname1: "",
      lastname2: "",
      address_street: "",
      address_city: "",
      address_postcode: "",
      address_county: "",
      address_country: "",
      tax_number: "",
      geo_dir: "",
    });
    setIsEditing(false);
    setSearchId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(searchId, formData);
      } else {
        await createUser(formData);
      }
      // Shows a success message or redirect
      alert(isEditing ? "User updated successfully!" : "User created successfully!");
      handleReset();
    } catch (error) {
      console.error("Error submitting user:", error); // Shows error message
      
    }
  };

  return (
    <div className="container my-5">
      <h2>{isEditing ? "Edit User" : "New User"}</h2>

      {/* Search by ID (update user) */}
      <div className="mb-4">
        <form onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter user ID to update"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* User form */}
      <form onSubmit={handleSubmit}>
        {/* Active user */}
        <div className="mb-3">
          <label htmlFor="active_user" className="form-label">Active user</label>
          <input
            className="form-control"
            onChange={handleChange}
            checked={formData.active_user}
            name="active_user"
            type="checkbox"
            id="active_user"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
            id="email"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.password}
            name="password"
            type="password"
            id="password"
          />
        </div>

        {/* Is professional */}
        <div className="mb-3">
          <label htmlFor="is_professional" className="form-label">Is professional</label>
          <input
            className="form-control"
            onChange={handleChange}
            checked={formData.is_professional}
            name="is_professional"
            type="checkbox"
            id="is_professional"
          />
        </div>

        {/* First name */}
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">First name</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.firstname}
            name="firstname"
            type="text"
            id="firstname"
          />
        </div>

        {/* Last name 1 */}
        <div className="mb-3">
          <label htmlFor="lastname1" className="form-label">Last name 1</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.lastname1}
            name="lastname1"
            type="text"
            id="lastname1"
          />
        </div>

        {/* Last name 2 */}
        <div className="mb-3">
          <label htmlFor="lastname2" className="form-label">Last name 2</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.lastname2}
            name="lastname2"
            type="text"
            id="lastname2"
          />
        </div>

        {/* Address street */}
        <div className="mb-3">
          <label htmlFor="address_street" className="form-label">Street</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.address_street}
            name="address_street"
            type="text"
            id="address_street"
          />
        </div>

        {/* Address city */}
        <div className="mb-3">
          <label htmlFor="address_city" className="form-label">City</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.address_city}
            name="address_city"
            type="text"
            id="address_city"
          />
        </div>

        {/* Address postcode */}
        <div className="mb-3">
          <label htmlFor="address_postcode" className="form-label">Postcode</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.address_postcode}
            name="address_postcode"
            type="text"
            id="address_postcode"
          />
        </div>

        {/* Address county */}
        <div className="mb-3">
          <label htmlFor="address_county" className="form-label">County</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.address_county}
            name="address_county"
            type="text"
            id="address_county"
          />
        </div>

        {/* Address country */}
        <div className="mb-3">
          <label htmlFor="address_country" className="form-label">Country</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.address_country}
            name="address_country"
            type="text"
            id="address_country"
          />
        </div>

        {/* Tax number */}
        <div className="mb-3">
          <label htmlFor="tax_number" className="form-label">Tax number</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.tax_number}
            name="tax_number"
            type="text"
            id="tax_number"
          />
        </div>

        {/* Geographic location */}
        <div className="mb-3">
          <label htmlFor="geo_dir" className="form-label">Geographic location</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.geo_dir}
            name="geo_dir"
            type="text"
            id="geo_dir"
          />
        </div>

        <input className="btn btn-primary" type="submit" value={isEditing ? "Update User" : "Create User"} />
        <input className="btn btn-secondary" type="reset" onClick={handleReset} value="Reset" />
      </form>
    </div>
  );
};