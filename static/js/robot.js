class RobotServerApi {
  constructor(baseURL = config.robotServerBase) {
    this.baseURL = baseURL;
  }

  async runScript(data) {
    try {
      const result = await apiClient.postJson(`${this.baseURL}/run_script`, data);
      return { status: result.status, result: result.result };
    } catch (error) {
      console.error('Ошибка при отправке команды:', error);
      errorDialog.showError(error.message);
      return { error: error.message };
    }
  }

  async xarmCommand(command) {
    try {
      const data = await apiClient.postJson(`${this.baseURL}/api/xarm/command`, { command });
      return { status: data.result };
    } catch (error) {
      console.error('Ошибка при отправке команды:', error);
      return { error: error.message };
    }
  }
}

const robotServerApi = new RobotServerApi();

window.robotServer = {
  xarm_command: (cmd) => robotServerApi.xarmCommand(cmd),
  robot_script: (data) => robotServerApi.runScript(data),
  getPosition: (name) => robotServerApi.runScript('/xarm_positions', name)
};
