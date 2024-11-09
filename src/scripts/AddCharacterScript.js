// Функція для додавання персонажа
export async function addCharacter(character) {
    try {
        const response = await fetch('/api/characters', {  // Перевірте, що сервер слухає на правильному порту
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        });

        if (!response.ok) {
            throw new Error(`Помилка: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result.message);
        console.log(`Ідентифікатор персонажа: ${result.id}`);  // Виводимо ідентифікатор нового персонажа
    } catch (error) {
        console.error('Помилка додавання персонажа:', error);
    }
}
