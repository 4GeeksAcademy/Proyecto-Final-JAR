import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const PremiumServices = () => {   
    
    
    const [premiums, setPremiums] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getPremiums()
    }, [])


    // GETs list of Premiums
    const getPremiums = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/premiums')
            if (!resp.ok) throw new Error('error getting Premiums');
            const data = await resp.json();
            setPremiums(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };


}