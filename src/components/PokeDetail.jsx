import { useState, useEffect } from 'react';
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */
import { useParams } from 'react-router-dom';
import { AuroraBackground } from "./ui/aurora-background";
import Loader from './Loader';


const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };
  

  const imageVariants = {
    hover: { 
      scale: 1.05,
      y: -5,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      }
    }
  };

const PokeDetail = () => {
  const { id } = useParams();
  const [pokemon,setPokemon] = useState(null);
  const [species,setSpecies] = useState(null);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setIsLoading(true);
        const data=await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if (!data.ok)
          throw new Error('Failed to fetch Pokemon details');
        
        
        const response=await data.json();
        setPokemon(response);

        const speciesRes= await fetch(response.species.url);
        if (!speciesRes.ok)
        throw new Error('Failed to fetch species details');
    
        const speciesData = await speciesRes.json();
        setSpecies(speciesData);
        
      }
      catch(err)
      {
        console.error("Error fetching Pokemon details:", err);
      } 
      finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetail();
  },[id]);

  if (isLoading)
    return (<Loader/>);

  const englishFlavorText = species?.flavor_text_entries.find(
    entry => entry.language.name === "en"
  )?.flavor_text.replace(/\f/g, ' ');


  
  return (
    <AuroraBackground className="min-h-screen">
      <div className="relative z-10 w-full max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold capitalize mb-6 text-center mt-6">{pokemon?.name}</h1>
        
        <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="hover"
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 mt-4">
          <div className="flex flex-col md:flex-row  gap-8">
            <div className="flex-shrink-0 md:flex md:items-center md:justify-center">
              <motion.img 
                 variants={imageVariants}
                 whileHover="hover"
                 whileTap="hover"
                src={pokemon.sprites.other['official-artwork'].front_default} 
                alt={pokemon.name}
                className="w-64 h-64 object-contain mx-auto"
              />
            </div>
            
            <div className="flex-grow">
                {englishFlavorText && (
                    <div className="mb-6 bg-blue-50 p-4 rounded-lg italic text-gray-700">
                    "{englishFlavorText}"
                    </div>
                )}

               <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Details</h3>
                  <p><span className="font-medium">ID: </span> {pokemon.id}</p>
                  <p><span className="font-medium">Height: </span> {(pokemon.height/10).toFixed(2)}m</p>
                  <p><span className="font-medium">Weight: </span> {(pokemon.weight/10).toFixed(2)}kg</p>
                  <p><span className="font-medium">Generation: </span>{species?.generation.name.toUpperCase()}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Types</h3>
                  <div className="flex gap-2 mt-2">
                    {pokemon.types.map(type => (
                      <span 
                        key={type.type.name}
                        className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm capitalize"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                  
                  {species?.habitat?.name && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-700">Habitat</h3>
                      <span className="px-3 py-1 rounded-full bg-green-500 text-white text-sm capitalize">
                        {species?.habitat?.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700">Abilities</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {pokemon.abilities.map((item, ind) => (
                    <span 
                      key={ind}
                      className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm capitalize"
                    >
                      {item.ability.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700">Stats</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {pokemon.stats.map(stat => (
                    <div key={stat.stat.name} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium capitalize">
                          {stat.stat.name.replace('-', ' ')}
                        </span>
                        <span className="text-sm font-medium">{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100,(stat.base_stat/150)*100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
};

export default PokeDetail;