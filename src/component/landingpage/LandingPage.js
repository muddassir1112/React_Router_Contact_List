import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const LandingPage = () => {
  const data = useContext(UserContext);
  const location = useLocation(); //useLocation hook of react-router to pass the data from link
  const navigate = useNavigate(); //navigate hook to navigate through pages
  const { from } = location.state; //destructuring of data pass from links
  // function to delete contact
  const handleDeleteContact = (id) => {
    let confirm = window.confirm(
      "Please confirm you want to delete this record."
    );
    if (confirm === true) {
      for (let i = 0; i < data.contactDetails.length; i++) {
        if (data.contactDetails[i].id === id) {
          data.contactDetails.splice(i, 1);
        }
      }
      data.setContactDetails([...data.contactDetails]);
      localStorage.setItem("Users", JSON.stringify(data.contactDetails));
      navigate("/destroy");
    } else return;
  };
  return (
    <>
      <div className="landing">
        <div className="card mb-3 shadow border-0" style={{ width: "600px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={from.image}
                className="img-fluid rounded m-1"
                alt="..."
              />
            </div>
            <div className="col-md-8 ps-4">
              <div className="card-body">
                <h3
                  className="card-title"
                  style={{ textTransform: "capitalize" }}
                >
                  {from.name}{" "}
                  <i className="fas fa-star" style={{ color: "#e3b43e" }}></i>
                </h3>
                <p className="card-text text-primary me-5">{from.twitter}</p>
                <div className="d-grid gap-2 d-md-block mt-4">
                  <Link
                    type="button"
                    className="btn btn-outline-light me-3 rounded shadow text-primary"
                    to="/edit"
                    state={{ from: from }}
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-light rounded shadow text-danger"
                    onClick={() => handleDeleteContact(from.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
