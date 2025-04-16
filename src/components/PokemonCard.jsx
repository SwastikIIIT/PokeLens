import React from 'react';
import getTypeColor from '../color';
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */

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

const PokemonCard = ({ pokemon }) => {
  const abilities=pokemon.abilities.map(item=>{
      const name=item.ability.name;
      return `${name.charAt(0).toUpperCase()+name.slice(1)}`;
    }).join(",")
  
  return (
    <motion.div variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className={`h-1 w-full ${getTypeColor(pokemon.types[0]?.type.name)}`}></div>
      
      <div className="bg-gray-100 p-4 flex justify-center">
        <motion.img
          variants={imageVariants} 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name}
          className="h-48 w-48 object-contain"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
          <span className="text-gray-500 font-medium">#{pokemon.id.toString()}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {pokemon.types.map((item,index) => (
            <span 
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTypeColor(item.type.name)}`}
            >
              {item.type.name}
            </span>
          ))}
        </div>
        
        <div className="mb-4 pb-3 border-b border-gray-100">
          <p className="mb-1"><span className='text-gray-600  text-md  font-medium'>Abilities:</span> <span className="text-md italic text-gray-700">{abilities}</span></p>
        </div>
        
        <div className="flex justify-between items-center px-2">
          <div>
            <p className="text-gray-500">Height</p>
            <p className="font-medium">{(pokemon.height/10).toFixed(2)} m</p>
          </div>
          <div>
            <p className="text-gray-500">Weight</p>
            <p className="font-medium">{(pokemon.weight/10).toFixed(2)} kg</p>
          </div>

          <div>
            <p className="text-gray-500">Exp</p>
            <p className="font-medium">{pokemon.base_experience || '??'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonCard;