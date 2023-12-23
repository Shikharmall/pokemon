import React, { useEffect, useState } from "react";
import { getPokemonDetails } from "../api/PokemonAPI";
import PokemonModel from "./PokemonModel";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function PokemonCard({ url }) {
  const [loader, setLoad] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [randomBgColor, setRandomBgColor] = useState(getRandomColor());

  const getDetailsFunc = React.useCallback((urll) => {
    setLoad(true);
    try {
      getPokemonDetails(urll)
        .then((result) => {
          setPokemon(result);
          setLoad(false);
        })
        .catch((result) => {
          console.log(result.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(
    () => (
      getDetailsFunc(url),
      setImageLoading(true),
      setRandomBgColor(getRandomColor())
    ),
    [url]
  );

  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`rounded-lg shadow-md p-3 w-full h-full `}
        style={{ backgroundColor: randomBgColor }}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center w-full h-full">
          {loader ? (
            <h1 className="text-white text-md font-semibold bg-gray-300 p-1 m-1 pl-3 pr-3 rounded-full bg-opacity-20 flex justify-center items-center ">
              loading...
            </h1>
          ) : (
            <>
              <div className="grow flex flex-col  items-center">
                <h4 className="text-white text-2xl font-semibold">
                  {capitalizeFirstLetter(pokemon.name)}
                </h4>
                {pokemon.types?.length > 0
                  ? pokemon.types?.map((item, index) => (
                      <p
                        className="text-white text-md font-semibold bg-gray-300 p-1 m-1 pl-3 pr-3 rounded-full bg-opacity-40"
                        key={index}
                      >
                        {item.type?.name}
                      </p>
                    ))
                  : null}
              </div>

              <div className="text-green-500 w-30 h-30 flex flex-col justify-center items-center p-3">
                <h4 className="text-white text-2xl font-semibold flex justify-center items-center text-opacity-45">
                  #{pokemon.id}
                </h4>
                {imageLoading && (
                  <p className="text-white text-md font-semibold bg-gray-300 p-1 m-1 pl-3 pr-3 rounded-full bg-opacity-20 flex justify-center items-center">
                    Loading image...
                  </p>
                )}
                <img
                  className="w-30 h-30"
                  width="100px"
                  height="100px"
                  src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt={pokemon.name}
                  onLoad={() => setImageLoading(false)}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <PokemonModel isOpen={isOpen} closemodal={closeModal} urlll={url} />
    </>
  );
}
