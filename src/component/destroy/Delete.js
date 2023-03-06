import React from "react";

export const Delete = () => {
  return (
    <div className="landing">
      <div className="card mb-3 shadow border-0" style={{ width: "600px" }}>
        <div className="row g-0">
          <div className="card-body text-center">
            <h3 className="card-title">Ooppps!</h3>
            <p className="card-text text-dark pt-3">
              Your record has been deleted successfull!
            </p>
            <p className="card-text text-muted italic pt-3">Oh dang!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
