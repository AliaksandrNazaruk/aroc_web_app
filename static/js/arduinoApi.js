'use strict';
// API helper for light control
class ArduinoApi {
  constructor(baseURL = config.robotServerBase) {
    this.baseURL = baseURL;
  }

  async sendCommand(command) {
    try {
      const data = await apiClient.postJson(`${this.baseURL}/send`, { command });

      return { status: data.status, command: data.command };

    } catch (error) {
      console.error('Ошибка при отправке команды:', error);
      return { error: error.message };
    }
  }

  sendSuccessCommand() { return this.sendCommand(1); }
  sendStopLightCommand() { return this.sendCommand(20); }
  sendFailureCommand() { return this.sendCommand(2); }
  sendErrorCommand() { return this.sendCommand(4); }
  sendIdleCommand() { return this.sendCommand(5); }
  sendManualCommand() { return this.sendCommand(6); }
  sendRunningCommand() { return this.sendCommand(3); }
}

window.lightController = new ArduinoApi();
