const getTypeColor=(type) => {
    const typeColors = {
      normal: 'bg-gray-300',
      fire: 'bg-red-500 text-white',
      water: 'bg-blue-500 text-white',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500 text-white',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700 text-white',
      poison: 'bg-purple-500 text-white',
      ground: 'bg-yellow-600 text-white',
      flying: 'bg-indigo-700',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700 text-white',
      ghost: 'bg-purple-700 text-white',
      default: 'bg-gray-200'
    };
    
    return typeColors[type] || typeColors.default;
  };
  export default getTypeColor;