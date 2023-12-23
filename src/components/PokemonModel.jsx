import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { getPokemonDetails } from "../api/PokemonAPI";
import debounce from 'lodash/debounce';

export default function PokemonModel({ isOpen, closemodal, urlll }) {
  //const [loader, setLoad] = useState(false);
  const [pokemon, setPokemon] = useState("");

  const getDetailsFunc = (urll) => {
    //setLoad(true);
    try {
      getPokemonDetails(urll)
        .then((result) => {
          setPokemon(result);
          //setLoad(false);
        })
        .catch((result) => {
          console.log(result.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const debouncedGetDetailsFunc = debounce(getDetailsFunc, 300); // Adjust the debounce time as needed
    debouncedGetDetailsFunc(urlll);
  
    return () => debouncedGetDetailsFunc.cancel();
  }, [urlll]);
  

  return (
    <>
      {isOpen ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-1/2">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  { pokemon.stats?.length > 0
                    ? pokemon.stats?.map((item, index) => (
                        <>
                        <h1 className="p-2 font-bold text-gray-500 uppercase ">{item.stat?.name}</h1>
                        <div className="flex justify-center items-center" key={index}>
                          <h1 className="p-4 font-semibold text-gray-700 w-10">
                          {item?.base_stat} { " " }
                          </h1>
                          <ProgressBar percentage={item?.base_stat} color="blue" className="p-1"/>
                        </div>
                        </>
                      ))
                    : null}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closemodal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
