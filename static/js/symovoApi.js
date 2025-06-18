const apiUrl = `http://${location.hostname}/api/v0/amr`;

async function fetchRobotIds() {
  try {
    const robots = await apiClient.getJson(apiUrl);
    console.log("Available Robots:", robots);
    robots.forEach(robot => {
      console.log(`Robot ID: ${robot.id}, Name: ${robot.name}`);
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

fetchRobotIds();
