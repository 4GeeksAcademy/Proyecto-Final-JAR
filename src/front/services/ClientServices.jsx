import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const ClientServices = () => {   
    
    
    const [clients, setClients] = useState()
    useEffect(() => {

        console.log("Component Loading")
        getClients()
    }, [])


    // GETs list of Clients
    const getClients = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/clients')
            if (!resp.ok) throw new Error('error getting Clients');
            const data = await resp.json();
            setClients(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };


}