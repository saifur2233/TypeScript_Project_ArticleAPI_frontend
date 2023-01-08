import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Blog {
  _id: string;
  title: string;
  description: string;
}

const AllBlogs = () => {
  const navigate = useNavigate();

  const [myblog, setMyBlog] = React.useState<Blog[]>([]);
  const [isLoding, setIsLoding] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  const getData = async () => {
    await axios
      .get("http://localhost:5000/api/v1/blogs")
      .then(function (response) {
        setMyBlog(response.data.blogs);
      })
      .catch(function (error) {
        setError(error.message);
      })
      .then(function () {
        // always executed
        setIsLoding(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(myblog);

  return (
    <div className="bg-base-200 py-20">
      {isLoding && <h2>Please wait, Blog is Loading...</h2>}
      {error && <h2>{error}</h2>}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {myblog &&
          myblog.map((blog, id) => (
            <div key={id} className="card bg-neutral text-neutral-content">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.description}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(`/blog/${blog._id}`);
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBlogs;
