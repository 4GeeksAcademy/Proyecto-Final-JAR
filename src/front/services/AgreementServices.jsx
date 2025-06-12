import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const AgreementServices = () => {   
    
    
    const [agreements, setAgreements] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getAgreements()
    }, [])


    // GETs list of Agreements
    const getAgreements = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/agreements')
            if (!resp.ok) throw new Error('error getting Agreements');
            const data = await resp.json();
            setAgreements(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };


}