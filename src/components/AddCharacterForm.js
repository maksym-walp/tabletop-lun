import React, { useState } from 'react';
import { addCharacter } from '../scripts/AddCharacterScript';

function AddCharacterForm() {
    const [character, setCharacter] = useState({
        name: '',
        health: '',
        armorClass: '',
        level: '',
        classType: '',
        race: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter((prevCharacter) => ({ ...prevCharacter, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Якщо форма порожня, додаємо персонажа "Aragon" тільки тоді
        if (Object.values(character).every(value => value === '')) {
            const defaultCharacter = {
                name: 'Aragon',
                health: 100,
                armorClass: 15,
                level: 5,
                classType: 'Warrior',
                race: 'Human',
                image: 'https://example.com/image.jpg'
            };
            await addCharacter(defaultCharacter);  // Додаємо дефолтного персонажа
        } else {
            await addCharacter(character);  // Викликаємо функцію додавання персонажа
        }

        // Очищаємо форму після відправки
        setCharacter({ name: '', health: '', armorClass: '', level: '', classType: '', race: '', image: '' });
    };

    const handleImportJSON = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedCharacter = JSON.parse(event.target.result);
                    setCharacter(importedCharacter); // Встановлюємо дані з JSON-файлу у форму
                } catch (error) {
                    console.error("Неможливо імпортувати JSON:", error);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-character-form">
            <input name="name" placeholder="Ім'я" value={character.name} onChange={handleChange} required />
            <input name="health" placeholder="Здоров'я" value={character.health} onChange={handleChange} required />
            <input name="armorClass" placeholder="Клас захисту" value={character.armorClass} onChange={handleChange} required />
            <input name="level" placeholder="Рівень" value={character.level} onChange={handleChange} required />
            <input name="classType" placeholder="Клас" value={character.classType} onChange={handleChange} required />
            <input name="race" placeholder="Раса" value={character.race} onChange={handleChange} required />
            <input name="image" placeholder="URL зображення" value={character.image} onChange={handleChange} />

            {/* Кнопки для додавання і імпорту персонажа */}
            <div className="button-group">
                <button type="submit" className="submit-button">Додати персонажа</button>
                <label htmlFor="import-json" className="import-button">
                    Імпортувати з JSON
                </label>
                <input
                    type="file"
                    id="import-json"
                    accept=".json"
                    onChange={handleImportJSON}
                    style={{ display: 'none' }}
                />
            </div>
        </form>
    );
}

export default AddCharacterForm;
