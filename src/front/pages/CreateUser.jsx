import React, { useEffect, useState } from "react"

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import { Search, ClipboardList, Monitor } from "lucide-react"

import "../../front/home.css"

//***************************************TESTING FETCH******************************** */
import { useNavigate } from "react-router-dom";
import { UserServices } from "../services/UserServices.jsx"
import { createUser } from "../services/UserServices.jsx"; // Named import

export const CreateUser =()=>{
    const navigate = useNavigate()
    const[formData, setFormData] = useState({
        "active_user": false,
        "email": "",
        "password": "",
        "is_professional": false,
        "firstname": "",
        "lastname1": "",
        "lastname2": "",
        "address_street": "",
        "address_city": "",
        "address_postcode": "",
        "address_county": "",
        "address_country": "",
        "tax_number": "",
        "geo_dir": "",
    })

    const handleChange = e => {
    const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };


     const handleReset = () => {
        setFormData({
            "active_user": false,
            "email": "",
            "password": "",
            "is_professional": false,
            "firstname": "",
            "lastname1": "",
            "lastname2": "",
            "address_street": "",
            "address_city": "",
            "address_postcode": "",
            "address_county": "",
            "address_country": "",
            "tax_number": "",
            "geo_dir": "",
        });
    };
    const handleCancel = () => {
        navigate('/');
    };


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await createUser(formData); // Call the imported function
         navigate('/');
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

     return (
        <div className="container my-5">
            <h2>New User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="active_user" className="form-label">Active user</label>
                    <input className="form-control" onChange={handleChange} checked={formData.active_user} name="active_user" type="checkbox" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input className="form-control" onChange={handleChange} value={formData.email} name="email" type="email" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input className="form-control" onChange={handleChange} value={formData.password} name="password" type="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="is_professional" className="form-label">is professional</label>
                    <input className="form-control" onChange={handleChange} checked={formData.is_professional} name="is_professional" type="checkbox" id="is_professional" />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">first name</label>
                    <input className="form-control" onChange={handleChange} value={formData.firstname} name="firstname" type="text" id="firstname" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname1" className="form-label">lastname1</label>
                    <input className="form-control" onChange={handleChange} value={formData.lastname1} name="lastname1" type="text" id="lastname1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname2" className="form-label">lastname2</label>
                    <input className="form-control" onChange={handleChange} value={formData.lastname2} name="lastname2" type="text" id="lastname2" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address_street" className="form-label">street</label>
                    <input className="form-control" onChange={handleChange} value={formData.address_street} name="address_street" type="text" id="address_street" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address_city" className="form-label">city</label>
                    <input className="form-control" onChange={handleChange} value={formData.address_city} name="address_city" type="text" id="address_city" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address_postcode" className="form-label">postcode</label>
                    <input className="form-control" onChange={handleChange} value={formData.address_postcode} name="address_postcode" type="text" id="address_postcode" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address_county" className="form-label">county</label>
                    <input className="form-control" onChange={handleChange} value={formData.address_county} name="address_county" type="text" id="address_county" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address_country" className="form-label">country</label>
                    <input className="form-control" onChange={handleChange} value={formData.address_country} name="address_country" type="text" id="address_country" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tax_number" className="form-label">tax number</label>
                    <input className="form-control" onChange={handleChange} value={formData.tax_number} name="tax_number" type="text" id="tax_number" />
                </div>
                <div className="mb-3">
                    <label htmlFor="geo_dir" className="form-label">geographic location</label>
                    <input className="form-control" onChange={handleChange} value={formData.geo_dir} name="geo_dir" type="text" id="geo_dir" />
                </div>
                <input className="btn btn-primary" type="submit" />
                <input className="btn btn-secondary" type="reset" onClick={handleReset} />
                <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};