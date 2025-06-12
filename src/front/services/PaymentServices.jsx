import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const PaymentServices = () => {   
    
    
    const [payments, setPayments] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getPayments()
    }, [])


    // GETs list of Payments
    const getPayments = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/payments')
            if (!resp.ok) throw new Error('error getting Payments');
            const data = await resp.json();
            setPayments(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };


}