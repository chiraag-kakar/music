const binCount = 1024
let particles = new Array(binCount)
let fft
let song

let Particle = function(position) {
  this.position = position
  this.speed = createVector(0, 1)
  this.color = [random(0, 255), random(0,255), random(0,255)]
  
  this.draw = function() {
    fill(this.color)
    ellipse(
      this.position.x, this.position.y,
      this.diameter, this.diameter
    )
  }
  
  this.update = function(level) {
    this.position.y += this.speed.y * level * 10
    
    if (this.position.y > height) {
      this.position.y = 0
    }
    
    this.diameter = random(2,4) + (level * 50)
  }
}

function preload() {
  // body language, everything i wanted, its you, the good side, & the yaer of the monkey work best
  song = loadSound('123.mp3')
  fft = new p5.FFT()
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  song.setVolume(0.5);
  song.loop();  

  positionParticleWave(particles)
}

function draw() {
  background(0, 0, 0, 100)

  // returns an array with [binCount] amplitude readings from lowest to highest frequencies
  let spectrum = fft.analyze()
  updateParticles(spectrum)
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume()
  }
}