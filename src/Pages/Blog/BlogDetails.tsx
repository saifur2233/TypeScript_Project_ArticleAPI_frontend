import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Blog {
  _id: string;
  title: string;
  email: string;
  description: string;
}

const BlogDetails = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  console.log(blogId);
  const [blog, setBlog] = React.useState<Blog>({
    _id: "",
    title: "",
    email: "",
    description: "",
  });
  const [err, setError] = React.useState<string>("");

  const viewBlogData = async () => {
    await axios
      .get(`http://localhost:5000/api/v1/blogs/${blogId}`)
      .then(function (response) {
        setBlog(response.data.blog);
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  useEffect(() => {
    viewBlogData();
  }, [blogId]);

  return (
    <div className="bg-base-200 p-20">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{blog.title}</h2>
          <p>{blog.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-info">Update</button>
            <button className="btn btn-error">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
