const fs = require('fs');

// Define fundamental particles and laws, and quantum gate options
const fundamentalParticles = ["Electron","Quark","Neutrino","Photon","Gluon","W boson","Z boson","Higgs boson","Graviton","Dark matter particle","Dark energy particle","Axion"];
const fundamentalLaws = ["Law of Conservation of Energy","Law of Conservation of Momentum","Law of Conservation of Mass-Energy","Newton's Laws of Motion","Maxwell's Equations of Electromagnetism","Einstein's Theory of General Relativity","Quantum Mechanics","String Theory","Standard Model of Particle Physics","Big Bang Theory","Entropy thermodynamics","Chaos Theory"];
const quantumGateOptions = ["Hadamard","Grover's Algorithm","Quantum Simulated Annealing"];

// Define the Universe class with customizable parameters
class Universe {
  constructor(params) {
    this.name = params.name;
    this.dob = params.dob;
    this.location = params.location;
    this.currentDimensions = params.currentDimensions;
    this.currentLaws = params.currentLaws;
    this.currentParticles = params.currentParticles;
    this.dimensions = params.dimensions;
    this.laws = params.laws;
    this.particles = params.particles;
    this.circuit = [];
    for (let i = 0; i < params.dimensions; i++) {
      this.circuit.push(0);
    }
    this.keyTurned = false;
    this.swappedToNewUniverse = false;
  }

  // Apply a quantum gate to a specified qubit
  setQuantumGate(gateType, target) {
    switch (gateType) {
      case 'Hadamard':
        // Apply Hadamard gate
        this.circuit[target] = 1 - 2 * this.circuit[target];
        break;
      case "Grover's Algorithm":
        // Implement Grover's Algorithm
        break;
      case "Quantum Simulated Annealing":
        // Implement Quantum Simulated Annealing
        break;
      default:
        throw new Error("Invalid quantum gate type.");
    }
  }

  // Measure all qubits to collapse the superposition
  measureAll() {
    const counts = {};
    let currentState = 0;
    for (let i = 0; i < this.circuit.length; i++) {
      if (this.circuit[i] == 1) {
        currentState += 2**i;
      }
    }
    counts[currentState.toString()] = 1;
    return counts;
  }

  async turnKey() {
    const turn = await askQuestion("Turn the key to open the doorway to the new universe? (y/n)");
    if (turn === "y") {
      if (!this.keyTurned) {
        const start = 1; // Start index shifted to account for 0th state already measured in QuantumCircuit class
        const end = 2**this.dimensions-1;
        const counts = this.measureAll();
        const collapsedState = parseInt(Object.keys(counts)[0]);
        if (collapsedState >= start && collapsedState <= end) {
          console.log("The key has successfully turned and the doorway to the new universe has been opened!");
          console.log("Welcome to the new universe with the following parameters: ");
          console.log("Dimensions: ", this.dimensions);
          console.log("Physical laws: ", this.laws);
          console.log("Fundamental particles: ", this.particles);

          // Ask the user if they want to swap to the new universe, only if they haven't swapped yet
          if (!this.swappedToNewUniverse) {
            const swap = await askQuestion("Do you want to swap to the new universe? (y/n)");
            if (swap === "y") {
              console.log("You have successfully swapped to the new universe.");
              console.log("The previous universe had the following parameters: ");
              console.log("Dimensions: ", this.currentDimensions);
              console.log("Physical laws: ", this.currentLaws);
              console.log("Fundamental particles: ", this.currentParticles);
              this.keyTurned = true;
              this.swappedToNewUniverse = true;
            } else {
              console.log("You chose not to swap to the new universe.");
            }
          }
        } else {
          console.log("The key failed to turn. Please try again.");
        }
      } else {
        console.log("The key has already been turned. The doorway to the new universe is open.");
      }
    } else {
      console.log("You chose not to turn the key. The doorway to the new universe remains closed.");
    }
  }
}

// Add error handling for askQuestion function
const readline = require('readline');

async function askQuestion(question) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      // Check for empty input
      if (answer.trim() === '') {
        reject(new Error("Input cannot be empty."));
      } else {
        rl.close();
        resolve(answer);
      }
    });
  });
}

async function getUniverseParams() {
  const name = await askQuestion("Please enter your name: ");
  const dob = await askQuestion("Please enter your date of birth (DD/MM/YYYY): ");
  const location = await askQuestion("Please enter your location coordinates (latitude, longitude): ");
  const currentDimensions = parseInt(await askQuestion("Enter the number of dimensions for the current universe: "));
  const currentLaws = await askQuestion("Enter the physical laws for the current universe: ");
  const currentParticles = await askQuestion("Enter the fundamental particles for the current universe: ");

  let dimensions, laws, particles;
  const generate = await askQuestion("Do you want to generate a random universe? (y/n)");
  if (generate === "n") {
    dimensions = parseInt(await askQuestion(`Enter the number of dimensions for the new universe (current universe has ${currentDimensions} dimensions): `));
    laws = await askQuestion(`Enter the physical laws for the new universe (current laws: ${currentLaws}): `);
    particles = await askQuestion(`Enter the fundamental particles for the new universe (current particles: ${currentParticles}): `);
  } else {
    dimensions = Math.floor(Math.random() * 10) + 1;
    laws = fundamentalLaws[Math.floor(Math.random() * fundamentalLaws.length)];
    particles = fundamentalParticles[Math.floor(Math.random() * fundamentalParticles.length)];
    console.log("A new universe has been generated with the following parameters: ");
    console.log("Dimensions: ", dimensions);
    console.log("Physical laws: ", laws);
    console.log("Fundamental particles: ", particles);
  }

  const quantumGateType = await askQuestion("Choose a quantum gate to apply (options: 'Hadamard', 'Grover's Algorithm', 'Quantum Simulated Annealing'): ");
  const target = parseInt(await askQuestion(`Choose a target qubit (0 to ${dimensions-1}): `));
  let gateType;

  if (quantumGateOptions.includes(quantumGateType)) {
    gateType = quantumGateType;
  } else {
    gateType = "Hadamard";
  }

  return { name, dob, location, currentDimensions, currentLaws, currentParticles, dimensions, laws, particles, gateType, target };
}

async function main() {
  const universeLog = fs.createWriteStream('UniverseLog.txt', {flags:'a'});
  try {
    // Get universe parameters and create a new universe
    const {
      name,
      dob,
      location,
      currentDimensions,
      currentLaws,
      currentParticles,
      dimensions,
      laws,
      particles,
      gateType,
      target
    } = await getUniverseParams();
    const universe = new Universe({
      name,
      dob,
      location,
      currentDimensions,
      currentLaws,
      currentParticles,
      dimensions,
      laws,
      particles
    });

    // Apply quantum gate to create the desired quantum state
    universe.setQuantumGate(gateType, target);

    // Turn key to open doorway to the new universe
    await universe.turnKey();
    universeLog.write(`User ${name} opened the doorway to the universe with dimensions = ${dimensions}, physical laws = ${laws} and fundamental particles = ${particles}\n`);

    // Ask the user if they want to swap to the new universe, only if they haven't swapped yet
    if (universe.keyTurned && !universe.swappedToNewUniverse) {
      const swap = await askQuestion("Do you want to swap to the new universe? (y/n)");
      if (swap === "y") {
        console.log("You have successfully swapped to the new universe.");
        console.log("The previous universe had the following parameters: ");
        console.log("Dimensions: ", universe.currentDimensions);
        console.log("Physical laws: ", universe.currentLaws);
        console.log("Fundamental particles: ", universe.currentParticles);
        universeLog.write(`User ${name} swapped to the new universe\n`);
        universe.swappedToNewUniverse = true;
      } else {
        console.log("You chose not to swap to the new universe.");
      }
    } else if (universe.swappedToNewUniverse) {
      console.log("Universe Swapped.");
    } else {
      console.log("The key has not been turned, so you cannot swap to the new universe.");
    }
  } catch (error) {
    console.log(error.message);
  }
  universeLog.end();
}

main();
