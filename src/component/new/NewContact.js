import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../App";

export const NewContact = () => {
  const data = useContext(UserContext);
  const [profilePic, setProfilePic] = useState("");
  const nameRef = useRef();
  const urlRef = useRef();
  //to get the image
  const handleAddProfilePic = (e) => {
    let temp = URL.createObjectURL(e.target.files[0]);
    setProfilePic(temp);
  };
  // function to add new contact
  const handleAddContact = (e) => {
    e.preventDefault();
    // validation
    if (nameRef.current.value === "") {
      alert("Please Enter Name");
    } else if (profilePic === "") {
      alert("Please choose your profile pic");
    } else if (urlRef.current.value === "") {
      alert("Please neter your url");
    } else {
      let obj = {
        id: Math.ceil(Math.random() * 1212),
        name: nameRef.current.value,
        image: profilePic,
        twitter: urlRef.current.value,
      };
      data.contactDetails.push(obj);
      data.setContactDetails([...data.contactDetails]);
      localStorage.setItem("Users", JSON.stringify(data.contactDetails));
    }
  };
  return (
    <div className="landing">
      <form className="card p-4 me-5 border-0 shadow">
        <div className="card-header mb-3">
          <h3 className="text-center">Add New Contact</h3>
        </div>
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
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Avatar
          </label>
          <div className="col-sm-7">
            <input
              type="file"
              className="form-control shadow border-0 p-2"
              id="inputEmail3"
              onChange={handleAddProfilePic}
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
              onClick={handleAddContact}
            >
              Save
            </button>
            <button
              type="submit"
              className="btn btn-outline-secondary border-0 shadow text-dark rounded ms-4 mt-5"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
