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

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    loader();
  }, []);

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
    } else {
      console.error("No user found in localStorage");
    }
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
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
        localStorage.setItem("user", JSON.stringify(data));
        loader();
        setIsEditing(false);
      })
      .catch(err => console.error("Error updating user:", err));
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handlePasswordChange = (field) => (e) => {
    setPasswords({ ...passwords, [field]: e.target.value });
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("La nueva contraseña no coincide con la confirmación.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró el token. Inicia sesión de nuevo.");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Contraseña cambiada correctamente.");
          setShowPasswordForm(false);
          setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          });
        } else {
          alert(data.message || "Error al cambiar la contraseña.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Hubo un error al cambiar la contraseña.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/");
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
              value={form.lastname1}
              onChange={handleChange("lastname1")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Last Name 2</label>
            <input
              type="text"
              className="form-control"
              value={form.lastname2}
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
              value={form.address_country}
              onChange={handleChange("address_country")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">County</label>
            <input
              type="text"
              className="form-control"
              value={form.address_county}
              onChange={handleChange("address_county")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={form.address_city}
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
              value={form.address_postcode}
              onChange={handleChange("address_postcode")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Street</label>
            <input
              type="text"
              className="form-control"
              value={form.address_street}
              onChange={handleChange("address_street")}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Tax Number</label>
            <input
              type="text"
              className="form-control"
              value={form.tax_number}
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
              value={form.geo_dir}
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
            <button
              className="col-2 my-5 pricingButtonPlus"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>
          </div>

          {showPasswordForm && (
            <div className="row justify-content-center">
              <div className="col-lg-2 col-md-7 col-sm-7">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange("currentPassword")}
                />
              </div>
              <div className="col-lg-2 col-md-7 col-sm-7">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange("newPassword")}
                />
              </div>
              <div className="col-lg-2 col-md-7 col-sm-7">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange("confirmPassword")}
                />
              </div>
              <div className="col-12 text-center mt-3">
                <button className="btn btn-primary" onClick={handleChangePassword}>
                  Save Password
                </button>
              </div>
            </div>
          )}

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
