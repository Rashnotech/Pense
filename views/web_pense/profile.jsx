import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
    <div className="profile-container">
        {/* Header Section */}
        <header className="header-section">
            <div className="header-content">
                <img src="add_photo_url" alt="Your Photo" className="profile-photo" />
                <div className="profile-info">
            <h1>User Name</h1>
            <p>Title / Position</p>
            <p>bio</p>
            {/* We Add user social media icons or links to their social media */}
            <div className="social-media-icons">
              {/* Insert social media icons or links here */}
            </div>
            </div>
        </div>
        </header>

      {/* Main Section */}
    <main className="main-section">
        <div className="main-content">
            <h2>Blog Posts</h2>
          {/* we should Display user blog posts here */}
            <ul>
            <li>Blog Post 1</li>
            <li>Blog Post 2</li>
            </ul>
        </div>
    </main>


      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          {/* Navigation links */}
          <nav className="footer-nav">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Profile;