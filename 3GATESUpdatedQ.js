const { stdin, stdout } = require('process'), fs = require('fs');
const f = ["Electron", "Quark", "Neutrino", "Photon", "Gluon", "W boson", "Z boson", "Higgs boson", "Graviton", "Dark matter particle", "Dark energy particle", "Axion"],
  o = ["Law of Conservation of Energy", "Law of Conservation of Momentum", "Law of Conservation of Mass-Energy", "Newton's Laws of Motion", "Maxwell's Equations of Electromagnetism", "Einstein's Theory of General Relativity", "Quantum Mechanics", "String Theory", "Standard Model of Particle Physics", "Big Bang Theory", "Entropy thermodynamics", "Chaos Theory"],
  g = {
    'h': (q, t) => q.setHadamardGate(t),
    'c': (q, t, d) => q.setCNOTGate(t,d),
    's': (q, t) => q.setSimulatedAnnealing(t)
  };

class Universe {
  constructor(p) {
    Object.assign(this, p);
    this.cir = Array.from({ length: p.dim }, () => 0);
    this.k = false;
    this.swap = false;
  }
  setQuantumGate(t, target, details) {
    if (t in g) g[t](this, target, details);
    else throw new Error("Invalid quantum gate type.");
  }
  setHadamardGate(target) {
    const cir = this.cir;
    cir[target] = 1 - 2 * cir[target];
  }
  setCNOTGate(target, dim) {
    const cir = this.cir;
    for (let i = 0; i < Math.pow(2, dim); i++) {
      const temp = Array.from({ length: dim }, (_, j) => j === target ? 1-cir[target] : cir[j]);
      cir.splice(0, dim, ...temp);
    }
  }
  setSimulatedAnnealing(target) {
    const cir = this.cir;
    const p0 = this.measureAll();
    cir[target] = 1 - 2 * cir[target];
    const p1 = this.measureAll();
    if (Math.random() < Math.min(1, p1 / p0)) return;
    cir[target] = 1 - 2 * cir[target];
  }
  measureAll() {
    let curState = 0;
    const cir = this.cir;
    for (let i = 0; i < cir.length; i++) if (cir[i] === 1) curState += 2 ** i;
    return curState;
  }
  async turnKey() {
    const turn = await askQuestion("Turn key to open the doorway to the new universe? (y/n) ");
    if (turn === "y") {
      if (!this.k) {
        const start = 1, end = 2 ** this.dim - 1, collapsedState = this.measureAll();
        if (collapsedState >= start && collapsedState <= end) {
          console.log("Doorway to the new universe has been opened!");
          console.log(`Welcome to the new universe with ${this.dim} dimensions, ${this.laws} physical laws and ${this.particles} fundamental particles.`);
          console.log("   __________");
          console.log("  /          \\");
          console.log(" /            \\");
          console.log("|              |");
          console.log("|              |");
          console.log("|      *       |");
          console.log("|              |");
          console.log("|              |");
          console.log(" \\            /");
          console.log("  \\__________/");
          if (!this.swap) {
            const swap = await askQuestion("Do you want to swap to the new universe? (y/n) ");
            if (swap === "y") {
              console.log("You have successfully swapped to the new universe.");
              console.log(`The previous universe had ${this.curDim} dimensions, ${this.curLaws} physical laws and ${this.curParticles} fundamental particles.`);
              console.log("   __________");
              console.log("  /          \\");
              console.log(" /            \\");
              console.log("|     *    *   |");
              console.log("|      |   |   |");
              console.log("|______|___|___|");
              console.log(" Door opened!");
              this.k = true;
              this.swap = true;
            } else console.log("You chose not to swap to the new universe.")
          }
        } else console.log("The key failed to turn. Please try again.")
      } else console.log("The key has already been turned. The doorway to the new universe is open.")
    } else console.log("You chose not to turn the key. The doorway to the new universe remains closed.")
  }
}

async function askQuestion(q) {
  return new Promise((resolve, reject) => {
    const rl = require('readline').createInterface({ input: stdin, output: stdout });
    rl.question(q, (a) => {
      if (a.trim() === '') reject(new Error("Input cannot be empty."));
      else {
        rl.close();
        resolve(a)
      }
    })
  })
}

async function getUniverseParams() {
  const name = await askQuestion("Please enter your name: "),
    dob = await askQuestion("Please enter your date of birth (DD/MM/YYYY): "),
    loc = await askQuestion("Please enter your location coordinates (latitude,longitude): "),
    curDim = parseInt(await askQuestion("Enter the number of dimensions for the current universe: ")),
    curLaws = await askQuestion("Enter the physical laws for the current universe: "),
    curParticles = await askQuestion("Enter the fundamental particles for the current universe: "),
    generate = await askQuestion("Do you want to generate a random universe? (y/n) "),
    dim = generate === "n" ? parseInt(await askQuestion(`Enter the number of dimensions for the new universe (current universe has ${curDim} dimensions): `)) : Math.floor(Math.random() * 10) + 1,
    laws = generate === "n" ? await askQuestion(`Enter the physical laws for the new universe (current laws: ${curLaws}): `) : o[Math.floor(Math.random() * o.length)],
    particles = generate === "n" ? await askQuestion(`Enter the fundamental particles for the new universe (current particles: ${curParticles}): `) : f[Math.floor(Math.random() * f.length)],
    gate = await askQuestion("Choose a quantum gate to apply (options: 'h', 'c', 's'): "),
    target = parseInt(await askQuestion(`Choose a target qubit (0 to ${dim - 1}): `));
  return { name, dob, loc, curDim, curLaws, curParticles, dim, laws, particles, gate, target };
}

async function main() {
  const log = fs.createWriteStream('UniverseLog.txt', { flags: 'a' });
  try {
    const { name, dob, loc, curDim, curLaws, curParticles, dim, laws, particles, gate, target } = await getUniverseParams(),
      uni = new Universe({ name, dob, loc, curDim, curLaws, curParticles, dim, laws, particles });
    uni.setQuantumGate(gate, target, dim);
    await uni.turnKey();
    log.write(`User ${name} opened the doorway to the universe with ${dim} dimensions, ${laws} physical laws and ${particles} fundamental particles.\n`);
    if (uni.k && !uni.swap) {
      const swap = await askQuestion("Do you want to swap to the new universe? (y/n) ");
      if (swap === "y") {
        console.log("You have successfully swapped to the new universe.");
        console.log(`The previous universe had ${uni.curDim} dimensions, ${uni.curLaws} physical laws and ${uni.curParticles} fundamental particles.`);
        console.log("   __________");
        console.log("  /          \\");
        console.log(" /            \\");
        console.log("|     *    *   |");
        console.log("|      |   |   |");
        console.log("|______|___|___|");
        console.log(" Door opened!");
        log.write(`User ${name} swapped to the new universe.\n`);
        uni.swap = true;
      } else console.log("You chose not to swap to the new universe.")
    } else if (uni.swap) console.log("Universe Swapped.");
    else console.log("The key has not been turned, so you cannot swap to the new universe.")
  } catch (error) {
    console.log(error.message)
  }
  log.end()
}

main();
