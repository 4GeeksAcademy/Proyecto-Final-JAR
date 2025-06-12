import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const UserServices = () => {   
        
    const [users, setUsers] = useState()
    useEffect(() => {

        console.log("Component Loading")
        getUsers()
    }, [])


    // GETs list of Users
    const getUsers = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/users')
            if (!resp.ok) throw new Error('error getting users');
            const data = await resp.json();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };
};
   


// POST Create User
export const createUser = async (formData) => {
    try {
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/users', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating user');
        return await resp.json();
    } catch (error) {
        throw error;
    }
};






    // //EDIT users
    // const handleEdit = (user) => {
    //     setIsEditing(!isEditing);
    //     setCurrentUser({ ...user });
    // };

    // const handleChange = (e) => {
    //     setPostData({ ...currentUser, postData, [e.target.name]: e.target.value });
    // };

    // const handleUpdate = async () => {
    //     try {
    //         const response = await fetch('https://improved-spork-7rw667jq57p3w7449-3001.app.github.dev/api/users/' + id, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(currentUser)
    //         });
            

       

// };