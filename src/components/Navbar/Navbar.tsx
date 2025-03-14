import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <Link to="/blogs">
            <button>Blogs</button>
          </Link>
        </li>
        <li>
          <Link to="/weather">
            <button>Weather</button>
          </Link>
        </li>
        <li>
          <Link to="/flags">
            <button>Flags</button>
          </Link>
        </li>
        <li>
          <Link to="/shopping">
            <button>Shopping</button>
          </Link>
        </li>
        <li>
          <Link to="/stocks">
            <button>Stocks</button>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <button>Contact</button>
          </Link>
        </li>
        <li>
          <Link to="/resume">
            <button>Resume</button>
          </Link>
        </li>
        <li>
          <Link to="/crossword">
            <button>Crossword</button>
          </Link>
        </li>
        <li>
          <Link to="/hangman">
            <button>Hangman</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}; 