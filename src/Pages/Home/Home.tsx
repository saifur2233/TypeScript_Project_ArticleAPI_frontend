import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

interface Blog {
  _id: string;
  title: string;
  description: string;
}

const Home = () => {
  const navigate = useNavigate();

  const [myblog, setMyBlog] = React.useState<Blog[]>([]);
  const [isLoding, setIsLoding] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  const pageSize: number = 4;
  const [paginatedPosts, setPaginatedPosts] = React.useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/api/v1/blogs")
      .then(function (response) {
        setMyBlog(response.data.blogs);
        setPaginatedPosts(
          _(response.data.blogs).slice(0).take(pageSize).value()
        );
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

  const pageCount: number = myblog ? Math.ceil(myblog.length / pageSize) : 0;

  if (pageCount == 1) return null;
  const pages: number[] = _.range(1, pageCount + 1);
  const pagination = (pageNo: number) => {
    setCurrentPage(pageNo);
    const startIndex: number = (pageNo - 1) * pageSize;
    const paginatedPost: Blog[] = _(myblog)
      .slice(startIndex)
      .take(pageSize)
      .value();
    setPaginatedPosts(paginatedPost);
  };
  console.log(paginatedPosts);
  return (
    <div className="bg-base-200 py-20">
      {isLoding && <h2>Please wait, Blog is Loading...</h2>}
      {error && <h2>{error}</h2>}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts &&
          paginatedPosts.map((blog, id) => (
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
      <div className="flex justify-center pt-10">
        <div className="btn-group">
          {pages.map((page) => (
            <button
              className={
                page === currentPage ? "btn btn-md btn-active" : "btn btn-md"
              }
              onClick={() => pagination(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
