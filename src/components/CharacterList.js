// src/components/CharacterList.js
import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import AddCharacterForm from './AddCharacterForm';

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Отримання даних персонажів з JSON файлів
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch('/api/characters');
                if (response.ok) {
                    const data = await response.json();
                    setCharacters(data);
                } else {
                    console.error('Помилка при завантаженні персонажів');
                }
            } catch (error) {
                console.error('Помилка:', error);
            }
        };

        fetchCharacters();
    }, []);

    const handleAddCharacter = (newCharacter) => {
        setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
        setIsModalOpen(false); // Закриваємо модальне вікно після додавання персонажа
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="character-list">
            <h1>Список персонажів</h1>

            {/* Список карток персонажів з карткою додавання на початку */}
            <div className="cards-container">
                <div className="add-character-card" onClick={handleOpenModal}>
                    <span className="add-character-plus">+</span>
                </div>
                {characters.map((character, index) => (
                    <CharacterCard key={index} character={character} />
                ))}
            </div>

            {/* Модальне вікно з формою */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <AddCharacterForm onAddCharacter={handleAddCharacter} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CharacterList;
