import React, { useEffect } from "react";
import "../App.css";

const Genre = ({ genre, setGenre, setPage, type, value, setValue }) => {
  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=55b993abee2aac669e1b738919ecdf65&language=en-US`
    );
    const { genres } = await data.json();
    console.log(genres);
    setGenre(genres);
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  //Adding a particular genre to the selected array
  const CategoryAdd = (genres) => {
    //first - select everything that's inside of values using the spread operator
    //second - add those genres that are being sent from the non-selected arrays
    setValue([...value, genres]);
    //removing those genres from the non selected array that have been added to the selected array.
    setGenre(genre.filter((g) => g.id !== genres.id));
    setPage(1);
  };

  //removing a perticular genre from the selected array
  const CategoryRemove = (genres) => {
    setValue(value.filter((g) => g.id !== genres.id));
    setGenre([...genre, genres]);
    setPage(1);
  };
  return (
    <>
      <div className="genre-container">
        <div className="genre-list">
          {value && //if value exist
            value.map((Val) => {
              const { id, name } = Val;
              return (
                <>
                  <div className="genre" key={id}>
                    <button
                      className="genre-buttons"
                      onClick={() => CategoryRemove(Val)}
                    >
                      {name}
                    </button>
                  </div>
                </>
              );
            })}

          {genre && //if genre exist
            genre.map((Gen) => {
              const { id, name } = Gen;
              return (
                <>
                  <div className="genre" key={id}>
                    <button className="genre-button" onClick={() => CategoryAdd(Gen)}>
                      {name}
                    </button>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Genre;
