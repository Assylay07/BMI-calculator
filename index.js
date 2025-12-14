const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для парсинга тела формы
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    return res.send(`
      <html>
        <head><meta charset="utf-8"><title>Error - BMI</title></head>
        <body>
          <p>Invalid input. Weight and height must be positive numbers.</p>
          <p><a href="/">Go back to the form</a></p>
        </body>
      </html>
    `);
  }

  //bmi
  const bmi = weight / (height * height);
  const bmiRounded = Math.round(bmi * 100) / 100;

  //Category
  let category = '';
  let cssClass = '';
  if (bmi < 18.5) {
    category = 'Underweight';
    cssClass = 'underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal weight';
    cssClass = 'normal';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
    cssClass = 'overweight';
  } else {
    category = 'Obese';
    cssClass = 'obese';
  }

  // Ответ:страница с результатом и ссылкой назад
  res.send(`
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>BMI Result</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <main class="container">
        <h1> Your BMI </h1>
        <div class="result-box ${cssClass}">
          <p class="bmi-value">${bmiRounded}</p>
          <p class="bmi-category">${category}</p>
        </div>
        <p><a href="/"> Calculate again </a></p>
      </main>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
