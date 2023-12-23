import React, { useEffect, useState } from "react";
import { getData } from "../api/PokemonAPI";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [loader, setLoad] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  const getPokemonsData = (offset) => {
    setLoad(true);
    try {
      getData(offset)
        .then((result) => {
          //setVerifiedSocieties(res.data.data);
          setPokemons(result.data.results);
          //setOffset(offset + 10);
          setLoad(false);
        })
        .catch((result) => {
          console.log(result.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getPokemonsData(offset), [offset]);


  return (
    <div className="relative sm:rounded-lg m-5 ml-20 mr-20" id="movetop">
      <div className="flex flex-wrap items-center justify-between py-4 px-4 bg-white dark:bg-gray-800 rounded-tl-lg rounded-tr-lg">
        <div className="relative p-2 grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2.5 pl-10 text-sm text-gray-500 border border-gray-300 placeholder-gray-400 rounded-lg w-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 box-border"
            placeholder="Search pokemon"
            //value={search}
            //onChange={filterhoadata}
          />
        </div>
        <div className="relative p-2 grow-0">
          <select
            id="priority"
            name="priority"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //value={formData.priority}
            //onChange={onChangeHandler}
          >
            <option value="All">All</option>
            <option value="Grass">Grass</option>
            <option value="Fire">Fire</option>
          </select>
        </div>
      </div>

      {loader ? (
        <div className="w-full h-full">
          <div className="flex justify-center p-30 pb-10 bg-white dark:bg-gray-800">
            {/*}img src={Loaderimage} alt="loader" className="w-20 h-20" />*/}
            <h1>loading..</h1>
          </div>
        </div>
      ) : (
        <>
          <div className="page-wrapper">
            <div className="page-content">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {pokemons && pokemons.length > 0
                  ? pokemons.map((item, index) => (
                      <div className="col cursor-pointer" key={index}>
                        <PokemonCard url={item.url} />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 place-content-between">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() =>
                setOffset((prevOffset) => Math.max(0, prevOffset - 8))
              }
            >
              Previous
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setOffset((prevOffset) => prevOffset + 8)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
