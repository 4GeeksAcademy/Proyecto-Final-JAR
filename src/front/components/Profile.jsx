
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
    geo_dir: "",
    prof_experience: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [notice, setNotice] = useState(null);
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
        geo_dir: store.user.geo_dir || "",
        prof_experience: store.user.prof_experience || ""
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

  const showTemporaryNotice = (message) => {
    setNotice(message);
    setTimeout(() => {
      setNotice(null);
    }, 4000);
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showTemporaryNotice("No se encontró el token.");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error actualizando usuario");
        return res.json();
      })
      .then(data => {
        localStorage.setItem("user", JSON.stringify(data));
        loader();
        setIsEditing(false);
        showTemporaryNotice("Tu perfil se ha actualizado correctamente.");
      })
      .catch(err => {
        console.error("Error actualizando usuario:", err);
        showTemporaryNotice("Hubo un error al actualizar el perfil.");
      });
  };

  const handleSaveProfessionalInfo = () => {
    const token = localStorage.getItem("token");
    const professionalId = store.user?.professional_id;

    if (!token) {
      showTemporaryNotice("No se encontró el token.");
      return;
    }
    if (!professionalId) {
      showTemporaryNotice("No se encontró el ID del profesional.");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/professionals/${professionalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        prof_experience: form.prof_experience
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Error actualizando info profesional");
        return res.json();
      })
      .then(data => {
        if (data.prof_experience) {
          const updatedUser = { ...store.user, prof_experience: data.prof_experience };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          dispatch({ type: "LOGIN", payload: { user: updatedUser } });
          setForm(prev => ({
            ...prev,
            prof_experience: data.prof_experience
          }));
          setIsEditingExperience(false);
        }
        showTemporaryNotice("Información profesional guardada correctamente.");
      })
      .catch(err => {
        console.error("Error guardando info profesional:", err);
        showTemporaryNotice("Hubo un error al guardar la información profesional.");
      });
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handlePasswordChange = (field) => (e) => {
    setPasswords({ ...passwords, [field]: e.target.value });
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      showTemporaryNotice("Las contraseñas no coinciden.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = store.user?.id;

    if (!token || !userId) {
      showTemporaryNotice("Falta token o ID de usuario.");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/change-password/${userId}`, {
      method: "PUT",
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
          setShowPasswordForm(false);
          setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          });
          showTemporaryNotice("Contraseña cambiada exitosamente.");
        } else {
          showTemporaryNotice(data.message || "Error al cambiar la contraseña.");
        }
      })
      .catch(err => {
        console.error("Error cambiando contraseña:", err);
        showTemporaryNotice("Hubo un error al cambiar la contraseña.");
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

      {store.user?.is_professional && store.user?.plan && (
        <div className="d-flex justify-content-center my-4">
          <div className="card text-white bg-primary mb-3" style={{ maxWidth: "24rem" }}>
            <div className="card-header">Subscription Info</div>
            <div className="card-body">
              <h5 className="card-title">Plan: {store.user.plan.name.charAt(0).toUpperCase() + store.user.plan.name.slice(1)}</h5>
              <p className="card-text">{store.user.plan.description}</p>
              <p className="card-text">Price: ${store.user.plan.price.toFixed(2)}</p>
              {store.user.subscription_end && (
                <p className="card-text">Valid until: {new Date(store.user.subscription_end).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container my-5">
        <div className="justify-content-center align-items-center">
          <div className="userIcon">
            <CircleUserRound size={200} />
          </div>
          <div>
            <p className="userName">{form.firstname || "User Name"}</p>
          </div>
        </div>

        <div className="row mt-5 justify-content-center g-3">
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" value={form.firstname} onChange={handleChange("firstname")} disabled={!isEditing} maxLength={20} />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">First Last Name</label>
            <input type="text" className="form-control" value={form.lastname1} onChange={handleChange("lastname1")} disabled={!isEditing} maxLength={20} />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Second Last Name</label>
            <input type="text" className="form-control" value={form.lastname2} onChange={handleChange("lastname2")} disabled={!isEditing} maxLength={20} />
          </div>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Country</label>
            <input type="text" className="form-control" value={form.address_country} onChange={handleChange("address_country")} disabled={!isEditing} maxLength={40} />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">County</label>
            <input type="text" className="form-control" value={form.address_county} onChange={handleChange("address_county")} disabled={!isEditing} maxLength={40} />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">City</label>
            <input type="text" className="form-control" value={form.address_city} onChange={handleChange("address_city")} disabled={!isEditing} maxLength={40} />
          </div>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Postcode</label>
            <input type="text" className="form-control" value={form.address_postcode} onChange={handleChange("address_postcode")} disabled={!isEditing} maxLength={10} />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Street</label>
            <input type="text" className="form-control" value={form.address_street} onChange={handleChange("address_street")} disabled={!isEditing} maxLength={40} />
          </div>
          <div className="col-lg-2 col-md-7 col-sm-7">
            <label className="form-label">Tax Number</label>
            <input type="text" className="form-control" value={form.tax_number} onChange={handleChange("tax_number")} disabled={!isEditing} maxLength={50} />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="row justify-content-center">
            <button className="col-lg-2 col-md-2 col-sm-3 m-3 pricingButtonPlus" onClick={() => setIsEditing(true)} disabled={isEditing}>
              Edit
            </button>
            <button className="col-lg-2 col-md-2 col-sm-3 m-3 pricingButtonPlus" onClick={handleSave} disabled={!isEditing}>
              Save
            </button>
          </div>

          {store.user?.is_professional && (
            <div className="row justify-content-center my-4">
              <div className="col-lg-6 col-md-8 col-sm-12">
                {notice && (
                  <div className="alert alert-info text-center my-3">{notice}</div>
                )}
                <label className="form-label">Professional Experience</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={form.prof_experience}
                  onChange={handleChange("prof_experience")}
                  disabled={!isEditingExperience}
                  placeholder="Describe your professional experience"
                />
              </div>
              <div className="col-12 text-center mt-3">
                {!isEditingExperience ? (
                  <button className="pricingButtonPlus me-2" onClick={() => setIsEditingExperience(true)}>
                    Edit Experience
                  </button>
                ) : (
                  <>
                    <button className="pricingButtonPlus me-2" onClick={handleSaveProfessionalInfo}>
                      Save  Experience
                    </button>
                    <button className="pricingButtonPlus" onClick={() => {
                      setIsEditingExperience(false);
                      setForm(prev => ({
                        ...prev,
                        prof_experience: store.user.prof_experience || ""
                      }));
                    }}>
                      Cancel
                    </button>
                  </>
                )}

              </div>
            </div>
          )}

          <div className="row justify-content-center">
            <button className="col-lg-2 col-md-2 col-sm-4 my-5 customButton" onClick={() => setShowPasswordForm(!showPasswordForm)}>
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>
          </div>

          {showPasswordForm && (
            <div className="row justify-content-center">
              <div className="col-lg-3 col-md-7 col-sm-7">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-control" value={passwords.currentPassword} onChange={handlePasswordChange("currentPassword")} />
              </div>
              <div className="col-lg-3 col-md-7 col-sm-7">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" value={passwords.newPassword} onChange={handlePasswordChange("newPassword")} />
              </div>
              <div className="col-lg-3 col-md-7 col-sm-7">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" value={passwords.confirmPassword} onChange={handlePasswordChange("confirmPassword")} />
              </div>

              <div className="col-12 text-center mt-3">
                <button className="btn btn-primary" onClick={handleChangePassword}>
                  Change Password
                </button>
              </div>
            </div>
          )}

          <div className="row justify-content-center">
            <button className="col-lg-2 col-md-2 col-sm-4 my-5 customButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};