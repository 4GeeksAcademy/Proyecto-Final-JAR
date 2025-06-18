import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import "../../front/profile.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";


export const Profile = () => {
  const { store, dispatch } = useGlobalReducer();
  const [form, setForm] = useState({
    firstname: "",
    lastname1: "",
    lastname2: "",
    address_country: "",
    address_county: "",
    address_city: "",
    address_postcode: "",
    address_street: "",
    tax_number: "",
    geo_dir: ""
  });
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si está en edición



  // Cargar datos de usuario al montar el componente
  // Ejecuta loader al inicio
  useEffect(() => {
    loader();
  }, []);

  // Este useEffect espera a que el usuario esté en el store y entonces actualiza el formulario
  useEffect(() => {
    if (store.user && Object.keys(store.user).length > 0) {
      setForm({
        firstname: store.user.firstname || "",
        lastname1: store.user.lastname1 || "",
        lastname2: store.user.lastname2 || "",
        address_country: store.user.address_country || "",
        address_county: store.user.address_county || "",
        address_city: store.user.address_city || "",
        address_postcode: store.user.address_postcode || "",
        address_street: store.user.address_street || "",
        tax_number: store.user.tax_number || "",
        geo_dir: store.user.geo_dir || ""
      });
    }
  }, [store.user]);


  const loader = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({ type: "LOGIN", payload: { user } });
    }
  };


  const profileLoader = () => {
    if (store.user) {
      console.log(store.user)
      setForm({
        firstname: store.user.firstname,
      })
    }
  }
  // Guardar cambios
  const handleSave = () => {
    const token = localStorage.getItem("token"); // consumimos el token en login
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }



    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        alert("Perfil actualizado");

        // ✅ Actualizamos el localStorage
        localStorage.setItem("user", JSON.stringify(data));
        // Volvemos a cargar los datos directamente desde el loader

        // <- Aquí se recarga desde el localStorage al store, y luego se actualiza el formulario con el useEffect
        loader();



      })
      .catch(err => console.error("Error updating user:", err));
  };


  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };




  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar token y usuario
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Limpiar el store global
    dispatch({ type: "LOGOUT" }); 

    // Redireccionar a home 
    navigate("/"); // o navigate("/")
  };


  return (
    <div className="container-fluid profileCustom align-content-center my-5">
      <h2 className="text-center text-white">
        {store.user?.is_professional ? "Professional profile" : "Client profile"}
      </h2>

      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="userIcon col-4">
            <CircleUserRound size={200} />
          </div>
          <div className="col-3">
            <p className="userName">{form.firstname || "User Name"}</p>
          </div>
        </div>

        <div className="row mt-5 justify-content-center g-3">
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={form.firstname}
              onChange={handleChange("firstname")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Last Name 1</label>
            <input
              type="text"
              className="form-control"
              value={form.lastname1 || ""}
              onChange={handleChange("lastname1")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Last Name 2</label>
            <input
              type="text"
              className="form-control"
              value={form.lastname2 || ""}
              onChange={handleChange("lastname2")}
              disabled={!isEditing}
            />
          </div>



        </div>

        <div className="row justify-content-center my-5">
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              value={form.address_country || ""}
              onChange={handleChange("address_country")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">County</label>
            <input
              type="text"
              className="form-control"
              value={form.address_county || ""}
              onChange={handleChange("address_county")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={form.address_city || ""}
              onChange={handleChange("address_city")}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Postcode</label>
            <input
              type="text"
              className="form-control"
              value={form.address_postcode || ""}
              onChange={handleChange("address_postcode")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Street</label>
            <input
              type="text"
              className="form-control"
              value={form.address_street || ""}
              onChange={handleChange("address_street")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Tax Number</label>
            <input
              type="text"
              className="form-control"
              value={form.tax_number || ""}
              onChange={handleChange("tax_number")}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Geo Dir</label>
            <input
              type="text"
              className="form-control"
              value={form.geo_dir || ""}
              onChange={handleChange("geo_dir")}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="row justify-content-center my-5">
          <div className="row justify-content-center">
            <button
              className="col-2 mx-5 pricingButtonPlus"
              onClick={() => setIsEditing(true)}
              disabled={isEditing}
            >
              Edit
            </button>
            <button
              className="col-2 mx-5 pricingButtonPlus"
              onClick={handleSave}
              disabled={!isEditing}
            >
              Save
            </button>
          </div>
          <div className="row justify-content-center">
            <button className="col-2 my-5 pricingButtonPlus">Change Password</button>
          </div>
          <div className="row justify-content-center">
            <button
              className="col-2 my-2 pricingButtonPlus"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
