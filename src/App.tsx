import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Blogs } from './pages/Blogs/Blogs';
import { BlogPost } from './pages/BlogPost/BlogPost';
import { Weather } from './pages/Weather/Weather';
import { Flags } from './pages/Flags/Flags';
import { Shopping } from './pages/Shopping/Shopping';
import { Contact } from './pages/Contact/Contact';
import { Resume } from './pages/Resume/Resume';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import { Stocks } from './pages/Stocks/Stocks';
import { Crossword } from './pages/Crossword/Crossword';
import { Hangman } from './pages/Hangman/Hangman';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Brody's Blog</h1>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/flags" element={<Flags />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/shopping/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/crossword" element={<Crossword />} />
            <Route path="/hangman" element={<Hangman />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
