import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const switchTab = (tab) => {
    if (tab === 'fit') {
      navigate('/');
    } else if (tab === 'log') {
      navigate('/log');
    }
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="header">
      <button className="tab" data-tab="fit" onClick={() => switchTab('fit')}>Fit</button>
      <button className="tab" data-tab="log" onClick={() => switchTab('log')}>Log</button>
      <button onClick={goToProfile}>프로필</button>
    </div>
  );
}

export default Header;
