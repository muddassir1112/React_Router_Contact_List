import React from "react";
import { Link } from "react-router-dom";

export const Delete = () => {
  return (
    <div className="landing">
      <div
        className="card shadow pt-4 pb-3 border-0"
        style={{ width: "600px" }}
      >
        <div className="row g-0">
          <div className="card-body text-center">
            <h3 className="card-title">Ooppps!</h3>
            <p className="card-text text-dark pt-3">
              Your record has been deleted successfull!
            </p>
            <p className="card-text text-muted italic pt-3">Oh dang!</p>
            <Link
              to="/"
              className="btn btn-warning border-0 shadow text-dark rounded ms-4 mt-5"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
