import React, { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const EditContact = () => {
  const navigate = useNavigate(); //useNavigate hook
  const data = useContext(UserContext);//useContext hook
  const location = useLocation(); //uselocation hook of react-router
  const { from } = location.state;
  const nameRef = useRef();
  const urlRef = useRef();
  //useEffect hook is used to persist the data
  useEffect(() => {
    if (from.name !== "" && from.twitter !== "") {
      nameRef.current.value = from.name;
      urlRef.current.value = from.twitter;
    }
  }, []);
  // function to handle the changes in the data
  const handleSaveChanges = (e) => {
    e.preventDefault();
    //validation
    if (nameRef.current.value === "") {
      alert("First field can not be empty");
    } else if (urlRef.current.value === "") {
      alert("Second field cannot be empty");
    } else {
      data.contactDetails.forEach((ele) => {
        if (ele.id === from.id) {
          ele.name = nameRef.current.value;
          ele.twitter = urlRef.current.value;
        }
      });
      data.setContactDetails([...data.contactDetails]);
      localStorage.setItem("Users", JSON.stringify(data.contactDetails));
      navigate("/");
      window.location.reload();
    }
  };
  //function to abort changes
  const handleCancleChanges = () => {
    alert("You will be redirected to home");
    navigate("/");
  };
  return (
    <div className="landing">
      <form className="card p-4 me-5 border-0 shadow">
        <h3 className="text-center mb-3">Edit Your Contact</h3>
        <div className="row mb-5">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control shadow border-0 p-2"
              placeholder="Your Name...."
              id="inputEmail3"
              ref={nameRef}
            />
          </div>
        </div>
        <div className="row mb-5">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Twitter URL
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control shadow border-0"
              placeholder="https://linktr.ee/blog/how-to-find-your-twitter-url/"
              id="inputPassword3"
              ref={urlRef}
            />
            <button
              type="submit"
              className="btn btn-outline-secondary border-0 shadow text-primary rounded mt-5"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              type="submit"
              className="btn btn-outline-secondary border-0 shadow text-dark rounded ms-4 mt-5"
              onClick={handleCancleChanges}
            >
              Back to Home
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
