import React from 'react';
import getTypeColor from '../color';


const PokemonCard = ({ pokemon }) => {
  const abilities=pokemon.abilities.map(item=>{
      const name=item.ability.name;
      return `${name.charAt(0).toUpperCase()+name.slice(1)}`;
    }).join(",")
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className={`h-1 w-full ${getTypeColor(pokemon.types[0]?.type.name)}`}></div>
      
      <div className="bg-gray-100 p-4 flex justify-center">
        <img 
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
          <p className="text-gray-600 text-sm font-medium mb-1">Abilities</p>
          <p className="text-sm">{abilities}</p>
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
    </div>
  );
};

export default PokemonCard;