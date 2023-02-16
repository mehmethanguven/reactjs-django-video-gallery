import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';

import HomeScreen from './pages/home/HomeScreen';
import LoginScreen from './pages/login/LoginScreen';
import RegisterScreen from './pages/register/RegisterScreen';
import VideoScreen from './pages/videos/VideoScreen';
import CategoryListScreen from './pages/categories/CategoryListScreen';
import VideoListScreen from './pages/videos/VideoListScreen';

import './App.css';
function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />

          <Route path='/video/:id' component={VideoScreen} />
          <Route path='/admin/categorylist' component={CategoryListScreen} />

          <Route path='/admin/videolist' component={VideoListScreen} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
