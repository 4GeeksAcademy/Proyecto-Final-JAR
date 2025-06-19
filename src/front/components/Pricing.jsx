import { Navbar } from "./Navbar"

import "../../front/pricing.css"

export const Pricing = () => {
    return (
        <div className="container-fluid pricingCustom  text-center p-5 ">
            <h1 className="py-3 pageTittle">Choose your Plan </h1>

            <div className="pricingCustomPlans  my-3">
                <div className="row d-flex justify-content-center gap-4">
                    <div className="basicPlan  col-sm-12 col-md-3  col-lg-3  ">

                        <h1 className=" pricingTittle my-5">BASIC </h1>
                        <div className="customText pricingPrice">
                            <p>
                                <strong>€25.00 </strong>/month
                            </p>
                        </div>

                        <button className=" mt-4 mb-3  pricingButton   ">Start my subscription </button>

                        <div className="capacitiesPlan my-3">
                            <p> up to 5 </p>

                            <p>candidatures per month</p>



                        </div>
                        {/* <p className="customCurrentClientMonth">25 Current Client Per Month </p> */}

                    </div>
                    <div className="standardPlan col-sm-12 col-md-3  col-lg-3   ">
                        <h1 className=" pricingTittle my-5">STANDARD </h1>
                        <div className="customText pricingPrice">
                            <p>
                                <strong>€50.00 </strong>/month
                            </p>
                        </div>

                        <button className="mt-4 mb-3  pricingButton   ">Start my subscription </button>

                        <div className="capacitiesPlan my-3">
                            <p> up to 15 </p>

                            <p>candidatures per month</p>



                        </div>
                        {/* <p className="customCurrentClientMonth" >50 Current Client Per Month </p> */}



                    </div>
                    <div className="plusPlan col-sm-12 col-md-3  text-white col-lg-3">
                        <div className="plusPlanCustom">
                            <div className="popularPricing text-center">
                                <p>Best Value</p>
                            </div>

                            <h1 className=" pricingTittlePlus text-white my-3">PLUS </h1>
                            <div className="customText pricingPrice">
                                <p className="my-5 text-white">
                                    <strong>€99.00 </strong>/month
                                </p>
                            </div>

                            <button className="  mb-2 pricingButtonPlus  ">Start my subscription </button>

                            <div className="capacitiesPlan my-3">
                                <p className="unlimitedCustom">Unlimited </p>

                                < p>candidatures per month</p>


                            </div>
                        </div>
                        {/* <p className="customCurrentClientMonth" >Unlimited Current client per montth </p> */}



                    </div>


                </div>
            </div>
        </div>
    );
};