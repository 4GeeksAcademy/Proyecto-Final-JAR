
import { Navbar } from "./Navbar"
import { CircleUserRound } from "lucide-react"



import "../../front/profile.css"

export const Profile = () => {
    return (
          <div className="container-fluid profileCustom align-content-center my-5">
        <h2 className="text-center text-white "> Profile </h2>
        <div className="container my-5">

            <div className="row  justify-content-center align-items-center ">
                <div className="userIcon col-4">
                <CircleUserRound  size={200 } />
                </div>

                <div className="col-3 ">
                    <p className="userName">"Name User"</p>
                </div>
            </div>




          <div className="row mt-5 justify-content-center g-3">
            <div className="col-lg-2 col-md-6 col-sm-4">
                  <label for="basic-url" class="form-label">First Name L</label>
                 <input type="input" className="form-control" />
             
            </div>
            <div className="col-lg-2 col-md-6 col-sm-4">
                  <label for="basic-url" class="form-label">Last Name 1 </label>
                 <input type="input" className="form-control" />
             
            </div>
            <div className="col-lg-2 col-md-6 col-sm-4">
                  <label for="basic-url" class="form-label">Last Name 2</label>
                 <input type="input" className="form-control" />
            </div>
          </div>
          <div className="row  justify-content-center my-5">

            <div className="col-lg-2 col-md-6 col-sm-4">
                  <label for="basic-url" class="form-label">Username</label>
              <input type="input" className="form-control" />
            </div>
             <div className="col-lg-2 col-md-6 col-sm-4">
                  <label for="basic-url" class="form-label">Email</label>
              <input type="input" className="form-control" />
            </div>
             <div className="col-lg-2 col-md-6 col-sm-4">
                  <label for="basic-url" class="form-label">Country</label>
              <input type="input" className="form-control" />
            </div>
          </div>

          <div className="row  justify-content-center my-5">
              
            <div className="col-lg-2 col-md-6 col-sm-4">
                <label for="basic-url" class="form-label">County</label>
              <input type="input" className="form-control" />
            </div>
             <div className="col-lg-2 col-md-6 col-sm-4">
                  <label for="basic-url" class="form-label">City</label>
              <input type="input" className="form-control" />
            </div>
             <div className="col-lg-2 col-md-6 col-sm-4">
                  <label for="basic-url" class="form-label">Addres postcard</label>
              <input type="input" className="form-control" />
            </div>
          </div>

          <div className="row justify-content-center">
            <button className=" col-2 mx-5  pricingButtonPlus  ">Edit </button>
            <button className=" col-2 mx-5 pricingButtonPlus  ">Save </button>
           
          </div>
          <div className="row  justify-content-center">


             <button className=" col-2 my-5 pricingButtonPlus  ">Change Password </button>
          </div>
        </div>
      </div>


    );
};