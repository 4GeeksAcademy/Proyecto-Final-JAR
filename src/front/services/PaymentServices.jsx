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
};

// GET a payment by ID
export const fetchPaymentById = async (paymentId) => {
  const numericId = Number(paymentId);
  if (isNaN(numericId)) {
    throw new Error("Payment ID must be a number");
  }
  try {
    const response = await fetch(
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/payments/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Payment not found");
      }
      throw new Error("Error fetching payment");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Payment **DOUBLE CHECK IT REQUIRED** NO ENDPOINT
export const createPayment = async (formData) => {
    try {
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/payments', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating payment');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update Payment
export const updatePayment = async (paymentId, formData) => {
  try {
    const resp = await fetch(`https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/payments/${paymentId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating payment');
    return await resp.json();
  } catch (error) {
    throw error;
  }
}