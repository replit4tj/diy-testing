import { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userInput.trim()) {
      setError('Please enter some text to assess');
      return;
    }

    // Reset states
    setError('');
    setAssessmentResult('');
    setIsLoading(true);

    try {
      // Call backend API
      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get assessment');
      }

      setAssessmentResult(data.assessment);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Assessment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUserInput('');
    setAssessmentResult('');
    setError('');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🤖 AI Assessment Tool</h1>
        <p className="subtitle">Get instant AI-powered feedback on your text</p>
      </header>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="assessment-form">
          <div className="form-group">
            <label htmlFor="user-input">
              Enter your text for assessment:
            </label>
            <textarea
              id="user-input"
              className="text-input"
              placeholder="Paste your essay, code snippet, or any text you'd like assessed..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={10}
              disabled={isLoading}
            />
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || !userInput.trim()}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                '✨ Submit Assessment'
              )}
            </button>

            {userInput && !isLoading && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Error Display */}
        {error && (
          <div className="result-container error-container">
            <h3>❌ Error</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Assessment Result Display */}
        {assessmentResult && !error && (
          <div className="result-container success-container">
            <h3>📊 AI Assessment Results</h3>
            <div className="assessment-content">
              {assessmentResult.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="result-container loading-container">
            <div className="loading-content">
              <div className="spinner-large"></div>
              <p>Analyzing your text with AI...</p>
              <p className="loading-subtext">This may take a few seconds</p>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by OpenAI GPT-3.5 Turbo | Data stored securely with Supabase</p>
      </footer>
    </div>
  );
}

export default App;
