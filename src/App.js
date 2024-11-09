import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CharacterListPage from './pages/CharacterListPage';
import Login from './pages/LoginPage';
import './styles/App.css';
import './styles/CharacterList.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<CharacterListPage />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
