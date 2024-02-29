var canvas = document.getElementById('disease-triangle-canvas');
var ctx = canvas.getContext('2d');
var size = Math.min(canvas.width, canvas.height) - 60; // Subtract a bit to fit the stroke
var triangleHeight = size * (Math.sqrt(3) / 2); // Height of an equilateral triangle

// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Center the triangle on the canvas
var triangleVerticalMargin = (canvas.height - triangleHeight) / 2;
var triangleHorizontalMargin = (canvas.width - size) / 2;

// Draw the equilateral triangle
ctx.beginPath();
ctx.moveTo(triangleHorizontalMargin + size / 2, triangleVerticalMargin);
ctx.lineTo(triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
ctx.lineTo(triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight);
ctx.closePath();
ctx.fillStyle = 'lightgrey';
ctx.fill();

// Leg width proportional to triangle size
var legWidth = size / 20;

// Draw the legs along the edges of the triangle
ctx.lineWidth = legWidth;

// Blue leg (left side)
ctx.strokeStyle = 'blue';
ctx.beginPath();
ctx.moveTo(triangleHorizontalMargin + size / 2, triangleVerticalMargin);
ctx.lineTo(triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
ctx.stroke();

// Green leg (right side)
ctx.strokeStyle = 'green';
ctx.beginPath();
ctx.moveTo(triangleHorizontalMargin + size / 2, triangleVerticalMargin);
ctx.lineTo(triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight);
ctx.stroke();

// Pink leg (bottom side)
ctx.strokeStyle = 'pink';
ctx.beginPath();
ctx.moveTo(triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
ctx.lineTo(triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight);
ctx.stroke();

// Draw the "Disease Triangle" text
var fontSize = 24; // Use the same font size as your paragraph
ctx.font = fontSize + "px 'Namdhinggo', serif"; // Assuming 'Namdhinggo' is the font family
ctx.fillStyle = 'black';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText("Disease Triangle", canvas.width / 2, canvas.height / 2);