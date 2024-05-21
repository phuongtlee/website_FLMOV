import "../App.css";
import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import Pagination from "./Pagination";

function Home() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const data = await fetch(`
    https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`);
    const dataJ = await data.json(); // fetching data from API in JSON Format
    setState(dataJ.items); //storing that data in the state
  };

  useEffect(() => {
    fetchTrending(); //calling the fetchTrending function only during the initial rendering of the app.
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
          <h1 className="movie-list-title" style={{ fontSize: "2.5em" }}>
            MỚI CẬP NHẬT
          </h1>
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
                return (
                  <>
                    <MovieItem
                      name={Val.name}
                      slug={Val.slug}
                      thumb_url={Val.thumb_url}
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

export default Home;
