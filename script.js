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
var legStates = { blue: false, green: false, pink: false };

function toggleLegState(color) {
    legStates[color] = !legStates[color]; // Toggle the state
}


// Functions to check if a click is within the bounds of the legs
function isClickOnLeg(clickX, clickY, x1, y1, x2, y2) {
    // Calculate the distance of the click from the line of the leg
    var distance = Math.abs((y2 - y1) * clickX - (x2 - x1) * clickY + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
    return distance < legWidth; // true if click is within the width of the leg
}

// Draw the legs along the edges of the triangle
ctx.lineWidth = legWidth;

// Blue leg (left side)
ctx.strokeStyle = '#70C1FF';
ctx.beginPath();
ctx.moveTo(triangleHorizontalMargin + size / 2, triangleVerticalMargin);
ctx.lineTo(triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
ctx.stroke();

// Green leg (right side)
ctx.strokeStyle = '#B8BC8A';
ctx.beginPath();
ctx.moveTo(triangleHorizontalMargin + size / 2, triangleVerticalMargin);
ctx.lineTo(triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight);
ctx.stroke();

// Pink leg (bottom side)
ctx.strokeStyle = '#FFA69E';
ctx.beginPath();
ctx.moveTo(triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
ctx.lineTo(triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight);
ctx.stroke();

// Break leg function
function breakLeg(color, startX, startY, midX, midY, endX, endY) {
    // Clear the leg
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = legWidth + 2; // Slightly larger to ensure full coverage
    ctx.stroke();

    // Redraw the leg in two parts
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = color;
    ctx.lineWidth = legWidth;

    // Top part
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(midX, midY);
    ctx.stroke();

    // Bottom part (with a gap for the break)
    ctx.beginPath();
    ctx.moveTo(midX, midY + 20); // 20 pixels gap
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

// Add event listener for click
canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    // Determine which leg is clicked and toggle its broken state
    if (isClickOnLeg(clickX, clickY, triangleHorizontalMargin + size / 2, triangleVerticalMargin, triangleHorizontalMargin, triangleVerticalMargin + triangleHeight)) {
        toggleLegState('blue');
    } else if (isClickOnLeg(clickX, clickY, triangleHorizontalMargin + size / 2, triangleVerticalMargin, triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight)) {
        toggleLegState('green');
    } else if (isClickOnLeg(clickX, clickY, triangleHorizontalMargin, triangleVerticalMargin + triangleHeight, triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight)) {
        toggleLegState('pink');
    }
    redrawLegs(); // Redraw legs based on their current state
});


// Draw the "Disease Triangle" text
var fontSize = 24; 
ctx.font = fontSize + "px 'Namdhinggo', serif"; 
ctx.fillStyle = 'black';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText("Disease Triangle", canvas.width / 2, canvas.height / 2 + triangleVerticalMargin / 2);

var video = document.getElementById('disease-timelapse-video');

// Function to play the video backwards
function playBackwards() {
  if (video.currentTime === 0) {
    video.pause(); // Pause if it's already at the beginning
  } else {
    video.currentTime -= 0.1; // Move back in time
    setTimeout(playBackwards, 30); // Adjust the timeout to control playback speed
  }
}

// Add event listener to toggle video playback direction
canvas.addEventListener('click', function(event) {
  // You can incorporate checks here to see if a leg was clicked
  // For simplicity, this will just toggle the playback direction
  if (video.paused || video.playbackRate < 0) {
    video.playbackRate = 1.0;
    video.play();
  } else {
    video.pause();
    playBackwards(); // Call the function to play backwards
  }
});

function redrawLegs() {
    // Clear and redraw the triangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(triangleHorizontalMargin + size / 2, triangleVerticalMargin);
    ctx.lineTo(triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
    ctx.lineTo(triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight);
    ctx.closePath();
    ctx.fillStyle = 'lightgrey';
    ctx.fill();
    
    // Redraw each leg based on its state
    Object.keys(legStates).forEach(function(leg) {
        var color = leg === 'blue' ? '#70C1FF' : (leg === 'green' ? '#B8BC8A' : '#FFA69E');
        var startX = triangleHorizontalMargin + size / 2, startY = triangleVerticalMargin;
        var endX = leg === 'blue' ? triangleHorizontalMargin : (leg === 'green' ? triangleHorizontalMargin + size : triangleHorizontalMargin + size / 2);
        var endY = leg === 'pink' ? triangleVerticalMargin + triangleHeight : triangleVerticalMargin + triangleHeight;
        var midX = (startX + endX) / 2, midY = (startY + endY) / 2;
        
        if (legStates[leg]) {
            breakLeg(color, startX, startY, midX, midY, endX, endY);
        } else {
            drawLeg(color, startX, startY, endX, endY);
        }
    });
    
    // Redraw the "Disease Triangle" text
    ctx.font = fontSize + "px 'Namdhinggo', serif"; 
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Disease Triangle", canvas.width / 2, canvas.height / 2 + triangleVerticalMargin / 2);
}
redrawLegs(); // Call this initially to draw the legs
