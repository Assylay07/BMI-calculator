document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bmi-form');
  const messageEl = document.getElementById('message');

  form.addEventListener('submit', (e) => {
    const weight = parseFloat(form.weight.value);
    const height = parseFloat(form.height.value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      e.preventDefault(); 
      messageEl.textContent = 'Please enter valid positive numbers for weight and height.';
      messageEl.style.color = '#b91c1c';
      return;
    }

    if (height > 3 || height < 0.5) {
      e.preventDefault();
      messageEl.textContent = 'Height in meters must be between 0.5 and 3.0 m.';
      return;
    }

    messageEl.textContent = '';
  });
});
