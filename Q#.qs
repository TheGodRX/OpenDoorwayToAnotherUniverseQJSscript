open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Measurement;
open Microsoft.Quantum.Math;
open Microsoft.Quantum.Canon;

operation Universe() : Unit {
    use f = ["Electron", "Quark", "Neutrino", "Photon", "Gluon", "W boson", "Z boson", "Higgs boson", "Graviton", "Dark matter particle", "Dark energy particle", "Axion"];
    use o = ["Law of Conservation of Energy", "Law of Conservation of Momentum", "Law of Conservation of Mass-Energy", "Newton's Laws of Motion", "Maxwell's Equations of Electromagnetism", "Einstein's Theory of General Relativity", "Quantum Mechanics", "String Theory", "Standard Model of Particle Physics", "Big Bang Theory", "Entropy thermodynamics", "Chaos Theory"];

    let dim = 0;
    let laws = "";
    let particles = "";
    let gate = "";
    let target = 0;

    // Get user input
    Message("Please enter your name: ");
    let name = InputString();
    Message("Please enter your date of birth (DD/MM/YYYY): ");
    let dob = InputString();
    Message("Please enter your location coordinates (latitude,longitude): ");
    let loc = InputString();
    Message("Enter the number of dimensions for the current universe: ");
    let curDim = InputInt();
    Message("Enter the physical laws for the current universe: ");
    let curLaws = InputString();
    Message("Enter the fundamental particles for the current universe: ");
    let curParticles = InputString();
    Message("Do you want to generate a random universe? (y/n) ");
    let generate = InputString();
    if (generate == "n") {
        Message($"Enter the number of dimensions for the new universe (current universe has {curDim} dimensions): ");
        dim = InputInt();
        Message($"Enter the physical laws for the new universe (current laws: {curLaws}): ");
        laws = InputString();
        Message($"Enter the fundamental particles for the new universe (current particles: {curParticles}): ");
        particles = InputString();
    } else {
        dim = Random(10) + 1;
        laws = o[Random(Length(o))];
        particles = f[Random(Length(f))];
    }
    Message("Choose a quantum gate to apply (options: 'H', 'CNOT', 'S'): ");
    gate = InputString();
    Message($"Choose a target qubit (0 to {dim - 1}): ");
    target = InputInt();

    // Initialize qubits
    using (qs = Qubit[dim]) {
        // Apply quantum gate
        for (i in 0 .. dim - 1) {
            if (i == target) {
                if (gate == "H") {
                    H(qs[i]);
                } elif (gate == "CNOT") {
                    for (j in 0 .. dim - 1) {
                        if (j != target) {
                            CNOT(qs[target], qs[j]);
                        }
                    }
                } elif (gate == "S") {
                    SA(qs[target]);
                } else {
                    fail "Invalid quantum gate type.";
                }
            }
        }

        // Measure qubits
        let collapsedState = MeasureInteger(qs);

        // Open doorway to new universe
        let start = 1;
        let end = PowI(2, dim) - 1;
        if (collapsedState >= start and collapsedState <= end) {
            Message("Doorway to the new universe has been opened!");
            Message($"Welcome to the new universe with {dim} dimensions, {laws} physical laws and {particles} fundamental particles.");
            Message("   __________");
            Message("  /          \\");
            Message(" /            \\");
            Message("|              |");
            Message("|              |");
            Message("|      *       |");
            Message("|              |");
            Message("|              |");
            Message(" \\            /");
            Message("  \\__________/");

            // Swap to new universe
            let swap = "";
            if (not HasBeenMeasured(qs)) {
                Message("Do you want to swap to the new universe? (y/n) ");
                swap = InputString();
            }
            if (swap == "y") {
                Message("You have successfully swapped to the new universe.");
                Message($"The previous universe had {curDim} dimensions, {curLaws} physical laws and {curParticles} fundamental particles.");
                Message("   __________");
                Message("  /          \\");
                Message(" /            \\");
                Message("|     *    *   |");
                Message("|      |   |   |");
                Message("|______|___|___|");
                Message(" Door opened!");
            } else {
                Message("You chose not to swap to the new universe.");
            }
        } else {
            Message("The key failed to turn. Please try again.");
        }
    }
}
