import { useState, useEffect } from 'react';
import './Flags.css';

interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    alt: string;
  };
}

export const Flags = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const handleCountryClick = (countryName: string) => {
    const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(countryName)}`;
    window.open(wikipediaUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flags-container">
        <div className="loading">Loading countries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flags-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="flags-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="flags-grid">
        {filteredCountries.map((country) => (
          <div
            key={country.name.common}
            className="flag-card"
            onClick={() => handleCountryClick(country.name.common)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCountryClick(country.name.common);
              }
            }}
          >
            <img
              src={country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="flag-image"
            />
            <h3 className="country-name">{country.name.common}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}; 