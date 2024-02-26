document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('grapeCanvas');
    const ctx = canvas.getContext('2d');

    function drawGrape(x, y, width, height) {
        ctx.fillStyle = '#6A4C93'; // Grape color
        ctx.beginPath();
        ctx.save(); // Save the current state of the context
        ctx.translate(x, y); // Translate to the grape's location
        ctx.scale(width / height, 1); // Scale to make the grape ovular
        ctx.arc(0, 0, height / 2, 0, Math.PI * 2); // Draw a circle
        ctx.restore(); // Restore the context to unscaled state
        ctx.fill();
    }

    // Coordinates and sizes for a bunch of grapes
    const grapePositions = [
        {x: 540, y: 260, width: 80, height: 60},
        {x: 500, y: 210, width: 80, height: 60},
        {x: 500, y: 310, width: 80, height: 60}, 
        {x: 460, y: 290, width: 80, height: 60},
        {x: 460, y: 260, width: 80, height: 60},
        {x: 410, y: 330, width: 80, height: 60},
        {x: 400, y: 250, width: 80, height: 60},
        {x: 360, y: 320, width: 80, height: 60},
        {x: 330, y: 290, width: 80, height: 60},
        {x: 290, y: 330, width: 80, height: 60},
        {x: 250, y: 350, width: 80, height: 60}
    ];

    // Draw each grape in the bunch
    grapePositions.forEach(function(grape) {
        drawGrape(grape.x, grape.y, grape.width, grape.height);
    });
});
