// CardList.js
import React from 'react';

const CardList = ({ cards, searchTerm, setSearchTerm }) => {
  // Filtrer les cartes en fonction du terme de recherche
  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm ? searchTerm.toLowerCase() : '')
  );
  return (
      <ul>
        {filteredCards.map((card) => (
          <li key={card.id}>
            <img src={`${card.images.small}`} alt={card.name} />
          </li>
        ))}
      </ul>
  );
};

export default CardList;
