// src/components/CharacterCard.js
import React from 'react';

function CharacterCard({ character }) {
    // Функція для експорту даних персонажа як JSON
    const exportAsJSON = () => {
        const dataStr = JSON.stringify(character, null, 2); // Перетворюємо об'єкт персонажа в JSON з форматуванням
        const blob = new Blob([dataStr], { type: 'application/json' }); // Створюємо Blob із JSON-даними
        const url = URL.createObjectURL(blob); // Створюємо URL для завантаження

        // Створюємо тимчасове посилання для завантаження файлу
        const link = document.createElement('a');
        link.href = url;
        link.download = `${character.name}.json`; // Назва файлу на основі імені персонажа
        link.click(); // Імітуємо кліків користувача
        URL.revokeObjectURL(url); // Очищаємо URL після використання
    };

    return (
        <div className="character-card">
            <img src={character.image} alt={character.name} className="character-image" />
            <h2>{character.name}</h2>
            <p><strong>Здоров'я:</strong> {character.health}</p>
            <p><strong>Клас захисту:</strong> {character.armorClass}</p>
            <p><strong>Рівень:</strong> {character.level}</p>
            <p><strong>Клас:</strong> {character.classType}</p>
            <p><strong>Раса:</strong> {character.race}</p>
            {/* Додаємо кнопку для експорту */}
            <button onClick={exportAsJSON} className="export-button">Експортувати як JSON</button>
        </div>
    );
}

export default CharacterCard;
