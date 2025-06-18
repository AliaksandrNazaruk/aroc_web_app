'use strict';
class IgusApi {
    constructor(baseUrl = '/api/igus') {
        this.baseUrl = baseUrl;
    }

    // Получить состояние мотора
    async getState() {
        return apiClient.getJson(`${this.baseUrl}/state`);
    }

    // Получить данные мотора (сжатый формат)
    async getData() {
        return apiClient.getJson(`${this.baseUrl}/data`);
    }

    // Универсальная отправка команды
    async sendCommand(type, params = {}) {
        return apiClient.postJson(`${this.baseUrl}/` + type, params);
    }

    // Команда reference (homing)
    async reference() {
        return this.sendCommand('reference');
    }

    // Команда move_to_position
    async moveToPosition(position, velocity = 5000, acceleration = 5000) {
        return this.sendCommand('move_to_position', { position, velocity, acceleration });
    }

    // Сброс ошибок
    async faultReset() {
        return this.sendCommand('fault_reset');
    }
}

// Пример использования:
window.igus = new IgusApi();

// Получить состояние
igus.getData().then(console.log).catch(console.error);

// Отправить reference
// igus.reference().then(console.log).catch(console.error);

// Переместить мотор
// igus.moveToPosition(1000, 5000, 5000).then(console.log).catch(console.error);
