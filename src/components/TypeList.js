// TypeList.js
import React, { useState } from 'react';

const TypeList = ({ types, onTypeClick }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeClick = (type) => {
    // Vérifiez si le type est déjà sélectionné
    const isAlreadySelected = selectedTypes.includes(type);

    // Mettez à jour le tableau des types sélectionnés en ajoutant ou en retirant le type
    setSelectedTypes((prevSelectedTypes) =>
      isAlreadySelected
        ? prevSelectedTypes.filter((selectedType) => selectedType !== type)
        : [...prevSelectedTypes, type]
    );

    // Appel de la fonction de gestion de type fournie par le parent
    onTypeClick(type);
  };

  return (
    <div>
      <div className="type-buttons">
        {types.map((type, index) => (
          <button
            key={index}
            className={`type-button ${type.toLowerCase()} ${
              selectedTypes.includes(type) ? 'selected' : ''
            }`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeList;
