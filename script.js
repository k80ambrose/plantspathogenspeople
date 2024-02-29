var canvas = document.getElementById('disease-triangle-canvas');
var ctx = canvas.getContext('2d');
var size = canvas.width; // Assuming width and height are the same
var triangleHeight = size * Math.sqrt(3) / 2; // Height of an equilateral triangle

// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw the equilateral triangle
ctx.beginPath();
ctx.moveTo(size / 2, size - triangleHeight); // Top point
ctx.lineTo(size / 4, size); // Bottom left point
ctx.lineTo(3 * size / 4, size); // Bottom right point
ctx.closePath();
ctx.fillStyle = 'lightgrey';
ctx.fill();

// Adjust leg length based on the triangle size
var legLength = size / 3;

// Draw the blue leg along the left edge
ctx.beginPath();
ctx.moveTo(size / 2, size - triangleHeight); // Top point
ctx.lineTo(size / 4, size); // Bottom left point
ctx.strokeStyle = 'blue';
ctx.lineWidth = legLength / 10; // Width of the leg
ctx.stroke();

// Draw the green leg along the right edge
ctx.beginPath();
ctx.moveTo(size / 2, size - triangleHeight); // Top point
ctx.lineTo(3 * size / 4, size); // Bottom right point
ctx.strokeStyle = 'green';
ctx.lineWidth = legLength / 10; // Width of the leg
ctx.stroke();

// Draw the pink leg along the bottom edge
ctx.beginPath();
ctx.moveTo(size / 4, size); // Bottom left point
ctx.lineTo(3 * size / 4, size); // Bottom right point
ctx.strokeStyle = 'pink';
ctx.lineWidth = legLength / 10; // Width of the leg
ctx.stroke();
