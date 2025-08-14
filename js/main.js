document.getElementById('tickerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const ticker = document.getElementById('tickerInput').value.toUpperCase();
  const stockData = await fetchTimeSeries(ticker);
  const benchmarkData = await fetchTimeSeries(BENCHMARK);

  const stockReturns = calculateDailyReturns(stockData);
  const marketReturns = calculateDailyReturns(benchmarkData);

  const stdDev = calculateStandardDeviation(stockReturns);
  const beta = calculateBeta(stockReturns, marketReturns);
  const sharpe = calculateSharpeRatio(stockReturns);
  const alpha = calculateAlpha(stockReturns, marketReturns, beta);
  const score = calculateCompositeRisk(stdDev, beta, sharpe, alpha);
  const descriptor = getRiskDescriptor(score);

  updateUI(stdDev, beta, sharpe, alpha, score, descriptor);
});