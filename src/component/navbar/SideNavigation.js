import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../App";

export const SideNavigation = () => {
  const data = useContext(UserContext); //useContext Hook
  const [details, setDetails] = useState([]); //temporary array to print the search result
  const searchRef = useRef(); //ref to get search input
  const loaderRef = useRef(); //ref to display loader
  // useEffect hook to get data from local storage if it exist
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Users")) !== null) {
      data.setContactDetails(JSON.parse(localStorage.getItem("Users")));
      setDetails(JSON.parse(localStorage.getItem("Users")));
    } else fetchContacts();
  }, [data.contactDetails.length]);
  
  //function to get data from api
  const fetchContacts = () => {
    loaderRef.current.style.display = "block";
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((res) => {
        loaderRef.current.style.display = "none";
        for (let i = 0; i < res.length; i++) {
          let obj = {
            id: Math.ceil(Math.random() * 1212),
            name: res[i].login,
            image: res[i].avatar_url,
            twitter: res[i].organizations_url,
          };
          data.contactDetails.push(obj);
          details.push(obj);
        }
        data.setContactDetails([...data.contactDetails]);
        setDetails([...details]);
        localStorage.setItem("Users", JSON.stringify(data.contactDetails));
      })
      .catch((err) => console.log(err));
  };
  // function to search data from list
  const handleSearch = () => {
    let startsWithAlphabet = searchRef.current.value;
    let temp = [];
    if (startsWithAlphabet.length > 2) {
      for (let i = 0; i < data.contactDetails.length; i++) {
        if (data.contactDetails[i].name.includes(startsWithAlphabet)) {
          temp.push(data.contactDetails[i]);
        }
      }
      setDetails(temp);
    } else if (startsWithAlphabet.length === 0) {
      setDetails(data.contactDetails);
    }
  };
  return (
    <>
      <aside className="sidebar">
        <nav className="navbar bg-light">
          <div className="card">
            <div className="card-body mt-3">
              <div className="input-group mb-3">
                <span
                  className="input-group-text shadow border-0"
                  id="basic-addon1"
                >
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control shadow border-0"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  ref={searchRef}
                  onChange={handleSearch}
                />
                <Link
                  to="/addContact"
                  className="btn btn-light ms-2 text-primary shadow rounded"
                  type="button"
                >
                  New
                </Link>
              </div>
              <hr></hr>
            </div>
            {details.length !== 0 ? (
              <div className="container-fluid border-0">
                {details.map((ele, index) => (
                  <ul className="list-group list-group-flush" key={index}>
                    <Link
                      to="/landing"
                      state={{ from: ele }}
                      style={{ textDecoration: "none" }}
                    >
                      <li
                        className="list-group-item border-0 contacts-links"
                        style={{ textTransform: "capitalize" }}
                      >
                        {ele.name}
                      </li>
                    </Link>
                  </ul>
                ))}
              </div>
            ) : (
              <div className="d-flex justify-content-center" ref={loaderRef}>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>
      <div className="detail">
        <Outlet />
      </div>
    </>
  );
};
