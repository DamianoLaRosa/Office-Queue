//DO NOT DELETE: TO BE USED FOR FUTURE REPORTS

// Dati stimati e effettivi
const estimated = [6, 12, 2.5, 6, 1.5, 1, 2, 1, 1, 1, 6, 1, 1, 1, 0.5, 0.5, 1, 2, 6, 1];
const actual = [4, 17, 3.5, 8, 1.5, 1, 1, 0.5, 1, 0.75, 6, 1, 0.5, 1, 0.75, 1, 1.5, 2, 3, 1];

// Funzioni utili
const sum = arr => arr.reduce((a, b) => a + b, 0);

// Total Estimation Error Ratio
function totalEstimationErrorRatio(spent, estimated) {
  const ratio = sum(spent) / sum(estimated) - 1;
  return ratio; // valore frazionario (es. 0.1 = +10%)
}

// Absolute Relative Task Estimation Error
function absoluteRelativeTaskEstimationError(spent, estimated) {
  const n = spent.length;
  const total = spent.reduce((acc, val, i) => {
    return acc + Math.abs(val / estimated[i] - 1);
  }, 0);
  return total / n; // valore medio assoluto percentuale
}

// Funzione per calcolare media
function mean(arr) {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

// Funzione per calcolare deviazione standard
function stdev(arr) {
  const avg = mean(arr);
  const variance = arr.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / (arr.length);
  return Math.sqrt(variance);
}

// Calcoli
const meanEst = mean(estimated);
const stdevEst = stdev(estimated);          // popolazione

const meanAct = mean(actual);
const stdevAct = stdev(actual);

// Output
console.log("\n\n=== Estimated ===");
console.log("Media:", meanEst.toFixed(2), "hours");
console.log("Dev st:", stdevEst.toFixed(2));

console.log("\n=== Actual ===");
console.log("Media:", meanAct.toFixed(2), "hours");
console.log("Dev st:", stdevAct.toFixed(2));

// Calcolo
const teer = totalEstimationErrorRatio(actual, estimated);
const artee = absoluteRelativeTaskEstimationError(actual, estimated);

// Output
console.log("\nTotal Estimation Error Ratio:", (teer * 100).toFixed(2) + "%");
console.log("Absolute Relative Task Estimation Error:", (artee * 100).toFixed(2) + "%");