import { Navbar } from "./Navbar"

import "../../front/pricing.css"
import { useEffect, useState } from "react";
import { stripeServicesPlans } from "../services/stripeServices.jsx";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Pricing = () => {
    const [plans, setPlans] = useState([]);
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
        stripeServicesPlans()
            .then((data) => {
                setPlans(prev => prev = data);
                console.log("Plans fetched successfully:", plans);
            })
            .catch((error) => {
                console.error("Error fetching plans:", error);
            });
    }
        , []);


    const handleSelectPlan = (plan) => {
        // Handle plan selection logic here
        localStorage.setItem("selectedPlan", JSON.stringify(plan));
        dispatch({
            type: 'SELECT_PLAN',
            payload: plan
        });
        navigate('/checkout');
    };

    return (
        <div className="container-fluid pricingCustom  text-center p-5 ">
            <h1 className="py-3 pageTittle">Choose your Plan </h1>

            <div className="pricingCustomPlans  my-3">
                <div className="row d-flex justify-content-center gap-4">
                    {plans?.map((plan) => (
                        <div key={plan.id} className={`col-sm-12 col-md-3  col-lg-3  ${plan.name}Plan ${plan.name=="plus" && 'text-white'}`}>
                            <div className={`${plan.name=="plus" ? "plusPlanCustom" : ""}`}>
                                {plan.name=="plus" && <div className="popularPricing text-center">
                                    <p>Best Value</p>
                                </div>}
                                <h1 className={`pricingTittle my-5 ${plan.name=="plus" && 'text-white'}`}>{plan.name.toUpperCase()}</h1>
                                <div className="customText pricingPrice">
                                    <p className={`${plan.name=="plus" ? "text-white" : ""}`}>
                                        <strong>€{(plan.price)} </strong>/month
                                    </p>
                                </div>
                                
                                <button disabled={!store.user?.is_professional || store.user?.plan?.name.length>0} onClick={()=>handleSelectPlan(plan)} className={`mt-4 mb-3 ${plan.name=="plus" ? 'pricingButtonPlus' : 'pricingButton'}`}>{store.user?.plan?.name == plan.name ? "Your subscription" : "Start my subscription"}</button>

                                <div className="capacitiesPlan my-3">
                                    {plan.name=="plus" ? (
                                        <>
                                        <p className="unlimitedCustom">{plan.description.split(' ')[0]} </p>
                                        <p >{plan.description.split(' ').slice(1, plan.description.length).join(' ')} </p>
                                        </>
                                        
                                    ) : (
                                        <>
                                            <p>{plan.description}</p>
                                        </>
                                    )}
                                   

                                </div>
                            </div>
                        </div>
                    ))}

                    
                </div>
            </div>
        </div>
    );
}