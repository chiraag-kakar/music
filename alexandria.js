function positionParticleWave(particles) {
    // takes array (particles)
    // puts the 'tickle' in par-tickle
    
    for (let i = 0; i < particles.length; i++) {
      let x = i / binCount * width * 2
      let y = random(0, height)
      let position = createVector(x, y)
      let partickle = new Particle(position)
      particles[i] = partickle
    }
    
  }
  
  function updateParticles(spectrum) {
    // update and draw all [binCount] particles!
    // Each particle gets a level that corresponds to
    // the level at one bin of the FFT spectrum. 
    // This level is like amplitude, often called "energy."
    // It will be a number between 0-255.
    spectrum.forEach((bin, i) => {
      let binLevel = map(bin, 0, 255, 0, 1)
      particles[i].update(binLevel)
      particles[i].draw()
    })
  }