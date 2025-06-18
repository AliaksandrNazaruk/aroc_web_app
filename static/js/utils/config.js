(function(global){
  const host = location.hostname;
  const robotServerPort = 8000;
  const robotServerBase = `http://${host}:${robotServerPort}`;
  global.config = { host, robotServerPort, robotServerBase };
})(this);
