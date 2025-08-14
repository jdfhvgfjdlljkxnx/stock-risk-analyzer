const API_KEY = 'YOUR_ALPHA_VANTAGE_KEY';
const BENCHMARK = 'SPY';

async function fetchTimeSeries(ticker) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data['Time Series (Daily)'];
}