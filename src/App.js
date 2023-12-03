// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardList from './components/CardList';
import TypeList from './components/TypeList';
import './TypeList.css';
import logoPokemon from './images/logo-pokemon.png';

function App() {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemonCards = async () => {
      try {
        const apiKey = '79880f70-14d7-4880-af42-9f29302ec80d';
        const apiUrl = `https://api.pokemontcg.io/v2/cards?apiKey=${apiKey}`;
        const response = await axios.get(apiUrl);

        const sortedCards = response.data.data.sort((a, b) =>
          a.nationalPokedexNumbers[0] - b.nationalPokedexNumbers[0]
        );

        console.log(response);
        setCards(sortedCards);

        // Extraire les types uniques des cartes
        const uniqueTypes = extractUniqueTypes(sortedCards);
        setTypes(uniqueTypes);
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes Pokémon :', error);
      }
    };

    fetchPokemonCards();
  }, []);

  // Fonction pour extraire les types uniques à partir des cartes
  const extractUniqueTypes = (cards) => {
    const allTypes = cards.flatMap((card) => card.types);
    return Array.from(new Set(allTypes));
  };

  // Fonction pour mettre à jour les types sélectionnés
  const handleTypeSelection = (selectedType) => {
    if (selectedTypes.includes(selectedType)) {
      // Si le type est déjà sélectionné, le retirer
      setSelectedTypes(selectedTypes.filter((type) => type !== selectedType));
    } else {
      // Si le type n'est pas sélectionné, l'ajouter
      setSelectedTypes([...selectedTypes, selectedType]);
    }
  };

  // Fonction pour gérer le changement de terme de recherche
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrer les cartes en fonction des types sélectionnés et du terme de recherche
  const filteredCards = selectedTypes.length > 0
    ? cards.filter((card) => selectedTypes.every((type) => card.types.includes(type)))
    : cards;

  const filteredCardsByName = filteredCards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <img src={logoPokemon} alt='Logo Pokémon' className='logoPokemon'/>
      <input
        type="text"
        placeholder="Rechercher par nom"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <div className='container'>
        <TypeList types={types} onTypeClick={handleTypeSelection} />
        <CardList cards={filteredCardsByName} onSearchTermChange={handleSearchTermChange} />
      </div>
    </div>
  );
}

export default App;
