
window.robotServer = {
    module: null, // Переменная для хранения экземпляра класса ArduinoApi
    
    // Инициализация модуля
    init: function() {
      if (!this.module) {
        this.module = new robotServerApi(); // Создаем экземпляр только один раз
      }
    },
    async xarm_command(command) {
      return await this.module.xarmSendCommand(command);
    },
    async robot_script(data) {
      return await this.module.sendCommand(data);
    },
    // Пример метода для отправки команды 'success'
    async getPosition(name) {
      return await this.module.sendCommand('/xarm_positions',name);
    },
  };

  class robotServerApi {
    constructor(baseURL = 'http://' + location.hostname + ':8000') {
      this.baseURL = baseURL;
    }
  
    // Метод для отправки команды на сервер
    async sendCommand(data) {
      try {
        const result = await apiClient.postJson(`${this.baseURL}/run_script`, data);
        return {
          status: result.status,
          result: result.result,
        };
      } catch (error) {
        console.error('Ошибка при отправке команды:', error);
        errorDialog.showError(error.message);
        return { error: error.message };
      }
    }
    // Метод для отправки команды на сервер
    async xarmSendCommand(command) {
      try {
        const data = await apiClient.postJson(`${this.baseURL}/api/xarm/command`, { command });
        return { status: data.result };
      } catch (error) {
        console.error('Ошибка при отправке команды:', error);
        return { error: error.message };
      }
    }
  }
  // Инициализируем модуль при загрузке
window.robotServer.init();

