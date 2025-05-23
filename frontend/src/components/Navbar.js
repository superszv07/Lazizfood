import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContexReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  let data = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      const res = await fetch("http://localhost:5000/api/getUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const user = await res.json();
      if (user.success && user.user?.profilePic) {
        setProfilePic(user.user.profilePic);
      } else {
        setProfilePic(null);
      }
    };

    if (localStorage.getItem("authToken")) {
      fetchUser();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setProfilePic(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          LAZiZFOOD
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/myorder">
                  My Orders
                </Link>
              </li>
            )}
          </ul>

          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">
                Signup
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <div
                className="btn bg-white text-success me-2"
                onClick={() => setCartView(true)}
              >
                My Cart{" "}
                <Badge pill bg="danger">
                  {data.length}
                </Badge>
              </div>
              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}

              <div className="btn bg-white text-danger" onClick={handleLogout}>
                Logout
              </div>

              {/* ✅ Profile Round Icon */}
              <Link to="/prof" className="ms-2 me-3">
                <img
                  src={profilePic || "./profile.png"}
                  alt="Pro"
                  className="rounded-circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    border: "2px solid white",
                  }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
