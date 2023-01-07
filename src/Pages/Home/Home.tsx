import React from "react";

const Home = () => {
  return (
    <div className="bg-base-200 py-20">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Cookies!</h2>
            <p>We are using cookies for no reason.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-ghost">Deny</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
