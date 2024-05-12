let capture;
let buffer;
let delayFrames = 1

; // Delay frames for one second
let maxBufferSize = 50; // Maximum buffer size
let numSegments = 35; // Number of segments to draw
let minSegmentSize = 35; // Minimum size of each segment
let maxSegmentSize = 1; // Maximum size of each segment

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide(); // Hide the video element
  buffer = [];
}

function draw() {
  // Draw the camera feed onto the buffer
  buffer.push(capture.get());
  
  // Limit the buffer size
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  
  // Draw random segments of the delayed frame as the background
  if (buffer.length >= delayFrames) {
    let delayedFrame = buffer[buffer.length - delayFrames];
    for (let i = 0; i < numSegments; i++) { // Draw numSegments random segments
      let x = int(random(width));
      let y = int(random(height));
      let segmentWidth = int(random(minSegmentSize, maxSegmentSize));
      let segmentHeight = int(random(minSegmentSize, maxSegmentSize));
      let segment = delayedFrame.get(x, y, segmentWidth, segmentHeight);
      
      stroke(255); // Set stroke color to white
      strokeWeight(1); // Set stroke thickness
      rect(x, y, segmentWidth, segmentHeight); // Draw the segment with stroke
      image(segment, x, y, segmentWidth, segmentHeight); // Draw the segment image
    }
  }
}