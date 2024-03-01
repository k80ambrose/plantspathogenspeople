var canvas = document.getElementById('disease-triangle-canvas');
var ctx = canvas.getContext('2d');
var size = Math.min(canvas.width, canvas.height) - 60; // Subtract a bit to fit the stroke
var triangleHeight = size * (Math.sqrt(3) / 2); // Height of an equilateral triangle
var legStates = {
    blue: false, // false means unbroken, true means broken
    green: false,
    pink: false
};

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

function toggleLegState(color, startX, startY, midX, midY, endX, endY) {
    // Store the text before clearing the canvas
    var diseaseText = "Disease Triangle";

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the equilateral triangle
    ctx.beginPath();
    ctx.moveTo(triangleHorizontalMargin + size / 2, triangleVerticalMargin);
    ctx.lineTo(triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
    ctx.lineTo(triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight);
    ctx.closePath();
    ctx.fillStyle = 'lightgrey';
    ctx.fill();

    // Redraw the legs along the edges of the triangle
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

    // Determine which leg is being toggled
    var legKey = color === '#70C1FF' ? 'blue' : (color === '#B8BC8A' ? 'green' : 'pink');

    // Check if the leg is currently broken
    if (legStates[legKey]) {
        // If broken, repair the leg
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = legWidth;
        ctx.strokeStyle = color;
        ctx.stroke();

        // Update the leg state to unbroken
        legStates[legKey] = false;
    } else {
        // If unbroken, break the leg
        breakLeg(color, startX, startY, midX, midY, endX, endY); // Call breakLeg here

        // Update the leg state to broken
        legStates[legKey] = true;
    }

    // Redraw the text
    ctx.font = fontSize + "px 'Namdhinggo', serif";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(diseaseText, canvas.width / 2, canvas.height / 2 + triangleVerticalMargin / 2);
}
     
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

// Define popupVisible object
var popupVisible = {
    'popup-container-blue': false,
    'popup-container-green': false,
    'popup-container-pink': false
};

// Function to toggle popup visibility
function togglePopup(containerId) {
    var popupContainer = document.getElementById(containerId);
    console.log('Toggling visibility for container:', containerId);
    if (popupVisible[containerId] === false) {
        popupContainer.style.display = 'block';
        popupVisible[containerId] = true;
        console.log('Popup container', containerId, 'is now visible');
    } else {
        popupContainer.style.display = 'none';
        popupVisible[containerId] = false;
        console.log('Popup container', containerId, 'is now hidden');
    }
}

canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    console.log('Canvas clicked at coordinates:', clickX, clickY);

    // Track if a leg was clicked
    var legClicked = false;

    if (isClickOnLeg(clickX, clickY, triangleHorizontalMargin + size / 2, triangleVerticalMargin, triangleHorizontalMargin, triangleVerticalMargin + triangleHeight)) {
        // Blue leg
        console.log('Blue leg clicked');
        toggleLegState('#70C1FF', triangleHorizontalMargin + size / 2, triangleVerticalMargin, triangleHorizontalMargin + size / 4, triangleVerticalMargin + triangleHeight / 2, triangleHorizontalMargin, triangleVerticalMargin + triangleHeight);
        togglePopup('popup-container-blue', popupVisible);
        legClicked = true;
    } else if (isClickOnLeg(clickX, clickY, triangleHorizontalMargin + size / 2, triangleVerticalMargin, triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight)) {
        // Green leg
        console.log('Green leg clicked');
        toggleLegState('#B8BC8A', triangleHorizontalMargin + size / 2, triangleVerticalMargin, triangleHorizontalMargin + 3 * size / 4, triangleVerticalMargin + triangleHeight / 2, triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight);
        togglePopup('popup-container-green', popupVisible);
        legClicked = true;
    } else if (isClickOnLeg(clickX, clickY, triangleHorizontalMargin, triangleVerticalMargin + triangleHeight, triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight)) {
        // Pink leg
        console.log('Pink leg clicked');
        toggleLegState('#FFA69E', triangleHorizontalMargin, triangleVerticalMargin + triangleHeight, triangleHorizontalMargin + size / 2, triangleVerticalMargin + triangleHeight, triangleHorizontalMargin + size, triangleVerticalMargin + triangleHeight);
        togglePopup('popup-container-pink', popupVisible);
        legClicked = true;
    }

    // Hide other popups if a leg was clicked
    if (legClicked) {
        hideOtherPopups();
    }
});

// Draw the "Disease Triangle" text
var fontSize = 24; 
ctx.font = fontSize + "px 'Namdhinggo', serif"; 
ctx.fillStyle = 'black';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText("Disease Triangle", canvas.width / 2, canvas.height / 2 + triangleVerticalMargin / 2);


// VIDEO STUFF
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