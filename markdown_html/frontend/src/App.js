import React from 'react';
import './App.css';
import MarkdownConverter from './MarkdownConverter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
                <h1>Markdown to HTML Converter</h1>
                <MarkdownConverter />
      </header>
    </div>
  );
}

export default App;
