import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { fortune500 } from './fortune500';
import './Stocks.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  volume: string;
  latestDay: string;
}

export const Stocks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [stocksData, setStocksData] = useState<Record<string, StockData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredStocks = fortune500.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchStockData = async (symbol: string) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Check if we got rate limited
      if (data.Note) {
        throw new Error('API call frequency limit reached. Please try again later.');
      }

      const quote = data['Global Quote'];
      if (!quote || Object.keys(quote).length === 0) {
        throw new Error(`No data available for ${symbol}`);
      }

      return {
        symbol,
        name: fortune500.find(s => s.symbol === symbol)?.name || symbol,
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        percentChange: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: quote['06. volume'],
        latestDay: quote['07. latest trading day']
      };
    } catch (err) {
      throw new Error(`Error fetching ${symbol}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const updateSelectedStocks = async () => {
      if (selectedStocks.length === 0) return;
      
      setLoading(true);
      setError(null);

      for (const symbol of selectedStocks) {
        if (!isMounted) break;

        try {
          const data = await fetchStockData(symbol);
          if (isMounted) {
            setStocksData(prev => ({
              ...prev,
              [symbol]: data,
            }));
          }
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err);
          if (isMounted) {
            setError(prev => 
              prev ? `${prev}\n${err instanceof Error ? err.message : String(err)}` 
                   : err instanceof Error ? err.message : String(err)
            );
            setSelectedStocks(prev => prev.filter(s => s !== symbol));
          }
        }

        // Add delay between requests to respect rate limits
        if (isMounted && selectedStocks.length > 1) {
          await new Promise(resolve => setTimeout(resolve, 15000));
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    updateSelectedStocks();

    return () => {
      isMounted = false;
    };
  }, [selectedStocks]);

  const handleStockToggle = (symbol: string) => {
    setSelectedStocks(prev =>
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <div className="stocks-container">
      <div className="stocks-header">
        <h2>Stock Market Tracker</h2>
        <input
          type="text"
          placeholder="Search Fortune 500 companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="stocks-layout">
        <div className="stocks-list">
          <h3>Fortune 500 Companies</h3>
          {filteredStocks.map((stock) => (
            <div key={stock.symbol} className="stock-item">
              <label className="stock-checkbox">
                <input
                  type="checkbox"
                  checked={selectedStocks.includes(stock.symbol)}
                  onChange={() => handleStockToggle(stock.symbol)}
                />
                <span className="stock-label">
                  {stock.symbol} - {stock.name}
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="stocks-display">
          {loading && <div className="loading">Loading stock data...</div>}
          {error && <div className="error">{error}</div>}
          
          <div className="stocks-grid">
            {selectedStocks.map((symbol) => {
              const stock = stocksData[symbol];
              if (!stock) return null;

              return (
                <div key={symbol} className="stock-card">
                  <div className="stock-header">
                    <h3>{stock.name}</h3>
                    <div className="stock-price">${stock.price.toFixed(2)}</div>
                    <div className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%
                    </div>
                  </div>
                  <div className="stock-details">
                    <p>Volume: {parseInt(stock.volume).toLocaleString()}</p>
                    <p>Latest Trading Day: {stock.latestDay}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="disclaimer">
        * Data provided by Alpha Vantage. Updates every 15 seconds per stock due to API limitations.
      </div>
    </div>
  );
}; 