function updateUI(stdDev, beta, sharpe, alpha, score, descriptor) {
  document.getElementById('stdDevTab').textContent = stdDev.toFixed(4);
  document.getElementById('betaTab').textContent = beta.toFixed(4);
  document.getElementById('sharpeTab').textContent = sharpe.toFixed(4);
  document.getElementById('alphaTab').textContent = alpha.toFixed(4);
  document.getElementById('riskScoreTab').textContent = score;
  document.getElementById('riskDescriptorTab').textContent = descriptor;
  document.getElementById('results').classList.remove('d-none');
}