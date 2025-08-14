function calculateDailyReturns(data) {
  const dates = Object.keys(data).sort();
  const returns = [];
  for (let i = 1; i < dates.length; i++) {
    const prev = parseFloat(data[dates[i - 1]]['4. close']);
    const curr = parseFloat(data[dates[i]]['4. close']);
    returns.push((curr - prev) / prev);
  }
  return returns;
}

function calculateStandardDeviation(returns) {
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
  return Math.sqrt(variance);
}

function covariance(arr1, arr2) {
  const mean1 = arr1.reduce((a, b) => a + b, 0) / arr1.length;
  const mean2 = arr2.reduce((a, b) => a + b, 0) / arr2.length;
  return arr1.reduce((sum, val, i) => sum + (val - mean1) * (arr2[i] - mean2), 0) / arr1.length;
}

function calculateBeta(stockReturns, marketReturns) {
  const cov = covariance(stockReturns, marketReturns);
  const marketVar = calculateStandardDeviation(marketReturns) ** 2;
  return cov / marketVar;
}

function calculateSharpeRatio(returns, riskFreeRate = 0.02 / 252) {
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const stdDev = calculateStandardDeviation(returns);
  return (avgReturn - riskFreeRate) / stdDev;
}

function calculateAlpha(stockReturns, marketReturns, beta, riskFreeRate = 0.02 / 252) {
  const avgStock = stockReturns.reduce((a, b) => a + b, 0) / stockReturns.length;
  const avgMarket = marketReturns.reduce((a, b) => a + b, 0) / marketReturns.length;
  return avgStock - (riskFreeRate + beta * (avgMarket - riskFreeRate));
}

function calculateCompositeRisk(stdDev, beta, sharpe, alpha) {
  const normStdDev = Math.min(stdDev / 0.05, 1);
  const normBeta = Math.min(beta / 2, 1);
  const normSharpe = 1 - Math.min(sharpe / 2, 1);
  const normAlpha = alpha < 0 ? 1 : 0;

  const score = (
    0.35 * normStdDev +
    0.30 * normBeta +
    0.25 * normSharpe +
    0.10 * normAlpha
  ) * 100;

  return Math.round(score);
}

function getRiskDescriptor(score) {
  if (score < 20) return "🟢 Very Low Risk";
  if (score < 40) return "🟡 Low Risk";
  if (score < 60) return "🟠 Moderate Risk";
  if (score < 80) return "🔴 High Risk";
  return "🚨 Very High Risk";
}