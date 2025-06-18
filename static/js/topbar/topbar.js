(function() {
  const settingsBtn = document.getElementById('settings-button');
  const batteryText = document.querySelector('.battery-percentage');
  const batteryFillRect = document.querySelector('.battery-fill');
  const chargingIcon = document.querySelector('.charging-icon');
  const carIcon = document.getElementById('car-icon');
  const liftIcon = document.getElementById('lift-icon');
  const manipulatorIcon = document.getElementById('manipulator-icon');

  settingsBtn.addEventListener('click', () => {
    window.open('keyboard-config.html', 'Keyboard Config', 'width=800,height=600');
  });

  async function updateStatusBar() {
    try {
      const [carData, igusData, xarmData] = await Promise.all([
        apiClient.getJson('/api/symovo_car/data'),
        apiClient.getJson('/api/igus/data'),
        apiClient.getJson('/api/xarm/data')
      ]);

      if (typeof carData.battery_level === 'number') {
        const levelPercent = carData.battery_level * 100;
        batteryText.textContent = `${levelPercent.toFixed(0)}%`;
        const totalHeight = 18;
        const fillHeight = totalHeight * carData.battery_level;
        const fillY = 22 - fillHeight;
        batteryFillRect.setAttribute('y', fillY.toFixed(1));
        batteryFillRect.setAttribute('height', fillHeight.toFixed(1));
        if (levelPercent < 20) {
          batteryFillRect.setAttribute('fill', 'red');
        } else if (levelPercent < 50) {
          batteryFillRect.setAttribute('fill', 'orange');
        } else {
          batteryFillRect.setAttribute('fill', 'green');
        }
      } else {
        batteryText.textContent = '--%';
        batteryFillRect.setAttribute('height', '0');
        batteryFillRect.setAttribute('y', '22');
      }

      chargingIcon.style.display =
        carData.state_flags && carData.state_flags.reed_closed ? 'flex' : 'none';

      if (carData.error) {
        carIcon.src = './icons/car_error.svg';
        carIcon.classList.add('error');
      } else {
        carIcon.src = './icons/car.svg';
        carIcon.classList.remove('error');
      }

      if (igusData.error || !igusData.homing) {
        liftIcon.src = './icons/lift_error.svg';
        liftIcon.classList.add('error');
      } else {
        liftIcon.src = './icons/lift.svg';
        liftIcon.classList.remove('error');
      }

      if (xarmData.has_error || xarmData.has_err_warn) {
        manipulatorIcon.src = './icons/manipulator_error.svg';
        manipulatorIcon.classList.add('error');
      } else {
        manipulatorIcon.src = './icons/manipulator.svg';
        manipulatorIcon.classList.remove('error');
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
      errorDialog.showError(error.message);
    }
  }

  window.addEventListener('load', updateStatusBar);
  setInterval(updateStatusBar, 2500);
})();
