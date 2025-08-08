import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ProblemStudyPage from './components/ProblemStudyPage';
import PastExamPage from './components/PastExamPage';
import MockExamPage from './components/MockExamPage';
import ExamPage from './components/ExamPage';
import VideoStudyPage from './components/VideoStudyPage';
import BasicTermsPage from './components/BasicTermsPage';
import MyPage from './components/MyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problem-study" element={<ProblemStudyPage />} />
          <Route path="/past-exam" element={<PastExamPage />} />
          <Route path="/mock-exam" element={<MockExamPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/video-study" element={<VideoStudyPage />} />
          <Route path="/basic-terms" element={<BasicTermsPage />} />
          <Route path="/my-page" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
