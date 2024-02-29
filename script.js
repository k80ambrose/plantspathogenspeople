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
var fontSize = 24; 
ctx.font = fontSize + "px 'Namdhinggo', serif"; 
ctx.fillStyle = 'black';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText("Disease Triangle", canvas.width / 2, canvas.height / 2);


// Function to check if a click is within the bounds of the blue leg
function isClickOnBlueLeg(clickX, clickY) {
    // Approximate bounds of the blue leg
    var x1 = triangleHorizontalMargin;
    var y1 = triangleVerticalMargin + triangleHeight;
    var x2 = triangleHorizontalMargin + size / 2;
    var y2 = triangleVerticalMargin;
  
    // Calculate the distance of the click from the line of the blue leg
    var distance = Math.abs((y2 - y1) * clickX - (x2 - x1) * clickY + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
  
    return distance < legWidth; // true if click is within the width of the leg
  }
  
  // Add an event listener to the canvas for the click event
  canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;
  
    if (isClickOnBlueLeg(clickX, clickY)) {
      breakBlueLeg();
    }
  });
  
  function breakBlueLeg() {
    // Clear the blue leg and redraw it in two parts with a gap to simulate breaking
    // Clearing the leg
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.moveTo(triangleHorizontalMargin + size / 2, triangleVerticalMargin);
    ctx.lineTo(triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
    ctx.lineWidth = legWidth + 2; // Slightly larger to ensure full coverage
    ctx.stroke();
  
    // Redrawing the leg in two parts
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = legWidth;
    
    // Top part
    ctx.beginPath();
    ctx.moveTo(triangleHorizontalMargin + size / 2, triangleVerticalMargin);
    ctx.lineTo(triangleHorizontalMargin + size / 4, triangleVerticalMargin + triangleHeight / 2);
    ctx.stroke();
  
    // Bottom part (with a gap for the break)
    ctx.beginPath();
    ctx.moveTo(triangleHorizontalMargin + size / 4, triangleVerticalMargin + triangleHeight / 2 + 20); // 20 pixels gap
    ctx.lineTo(triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
    ctx.stroke();
  }
    