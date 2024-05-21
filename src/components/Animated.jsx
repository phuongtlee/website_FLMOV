import "../App.css";
import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import Pagination from "./Pagination";

function Animated() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const data = await fetch(`https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${page}`);
    const dataJ = await data.json();
    setState(dataJ.data.items);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);
  return (
    <div className="container">
      <div className="content-container">
        <div className="label">
          {/* <div className="label-container">
            <label className="label-content">
              Chọn thể loại:
              <select name="selectedMovie" className="label-options">
                <option value="" className="content-select">
                  Action
                </option>
                <option value="" className="content-select">
                  Horror
                </option>
                <option value="" className="content-select">
                  Drama
                </option>
              </select>
            </label>

            <label className="label-content">
              Chọn quốc gia:
              <select name="selectedCountry" className="label-options">
                <option value="" className="content-select">
                  USA
                </option>
                <option value="" className="content-select">
                  UK
                </option>
                <option value="" className="content-select">
                  France
                </option>
              </select>
            </label>

            <label className="label-content">
              Năm:
              <select name="selectedCountry" className="label-options">
                <option value="" className="content-select">
                  2024
                </option>
                <option value="" className="content-select">
                  2023
                </option>
                <option value="" className="content-select">
                  2022
                </option>
              </select>
            </label>
            <div className="apply-chosen">
              <i>LỌC</i>
            </div>
          </div> */}
        </div>
        <div className="movie-list-container">
          <div className="movie-list-wrapper">
            <div className="movie-list">
              {state.map((Val) => {
                const {
                  _id,
                  name,
                  slug,
                  poster_url,
                  origin_name,
                  thumb_url,
                  year,
                } = Val;
                const pic_url = "https://img.phimapi.com/" + Val.thumb_url;
                return (
                  <>
                    <MovieItem
                      name={Val.name}
                      slug={Val.slug}
                      thumb_url={pic_url}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
}

export default Animated;
