/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */
import { useState, useEffect } from 'react';

import { Pagination } from 'antd';
import { AuroraBackground } from "./ui/aurora-background";
import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function PokemonHome() {
  const [pokemon,setPokemon]=useState([]);
  const [filteredPokemon,setFilteredPokemon]=useState([]);
  const [searchTerm,setSearchTerm]=useState('');
  const [isLoading,setIsLoading]=useState(true);
  const [currentPage,setCurrentPage]=useState(1);
  const itemsPerPage=8;

  const lastIndex=itemsPerPage*currentPage;
  const firstIndex=lastIndex-itemsPerPage;
  const pokeDisplay=filteredPokemon.slice(firstIndex,lastIndex);

  useEffect(() => {
    const fetchPokemon=async()=>{
      try {
        setIsLoading(true);
        const data=await fetch('https://pokeapi.co/api/v2/pokemon');
        
        if(!data.ok)
        throw new Error('Failed to fetch data from pokemin api');
        
        
        const response=await data.json();
        console.log("Pokemon",response);
        
        const pokemonDetails=await Promise.all(
          response?.results.map(async(item)=>{
            const pokeData=await fetch(item.url);
            const pokeRes=await pokeData.json();
            return pokeRes;
          }));
        
          console.log("Details of Pokemons",pokemonDetails);
        setPokemon(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
       
      } catch (err) {
        console.log("Error in try block",err);
      }
      finally{
        setIsLoading(false);
      }
    };
    
    fetchPokemon();
  },[]);
  
   const handleSearch=(e)=>{
    const val=e.target.value.trim();
    setSearchTerm(val);
     if(val=='')
     setFilteredPokemon(pokemon);
     else{
      const filtered=pokemon.filter((item)=>item.name.toLowerCase().slice(0,val.length).includes(val.toLowerCase()) || item.id.toString()===val);
      setFilteredPokemon(filtered);
     }
  }

  const clearSearch=()=>{
    setSearchTerm('');
    setFilteredPokemon(pokemon);
  }

  if (isLoading) {
    return (
      <Loader/>
    );
  }
  

  return (<>
 <AuroraBackground className="min-h-screen">
      <div className="relative z-10 w-full">
        <div className="pt-10 pb-6 px-4">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4 max-w-4xl mx-auto"
          >
            <div className="text-3xl md:text-6xl font-bold text-gray-800">
              PokéLens Explorer
            </div>
            <div className="font-light text-base md:text-xl text-gray-700 py-2 text-center">
              Discover and explore your favorite Pokémon in a whole new light
            </div>
          </motion.div>
        </div>

       
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="relative max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search by name or id..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white/90 backdrop-blur-sm focus:border-blue-500 focus:outline-none shadow-lg"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              {searchTerm ? (
                <button onClick={()=>clearSearch()} className="hover:text-gray-800 hover:font-bold">
                  ✕
                </button>
              ) : (
                <span>🔍</span>
              )}
            </div>
          </div>
          
          {filteredPokemon.length === 0 ? (
            <div className="text-center p-10 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <p className="text-xl text-gray-600">No Pokémon found matching "{searchTerm}"</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokeDisplay.map((poke) => (
                  <Link to={`/details/${poke.id}`} key={poke.id}>
                      <PokemonCard  pokemon={poke} />
                  </Link>
                ))}
              </div>
              <div className="flex justify-center mt-8 p-4">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                  <Pagination 
                    showQuickJumper 
                    defaultCurrent={1} 
                    total={filteredPokemon.length}
                    pageSize={itemsPerPage} 
                    onChange={(pageNumber)=>setCurrentPage(pageNumber)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AuroraBackground>
    </>
  );
}
