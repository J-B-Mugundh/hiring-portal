import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import LazyLoad from 'react-lazyload';

import "../CSS/navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LaunchIcon from '@mui/icons-material/Launch';
import ContactMailIcon from '@mui/icons-material/ContactMail'; // Import the Contact Mail icon
import logo from "../assests/logo.png";
import { FaBlog } from "react-icons/fa";
import { Dock } from "@mui/icons-material";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('/');
  const [hideElements, setHideElements] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setActiveTab(location.pathname);

    const routesToHideElements = ['/signin', '/signup'];
    setHideElements(routesToHideElements.includes(location.pathname));
  }, [location.pathname]);

  const handlePostJob = () => {
    const email = localStorage.getItem('userEmail');
    if (email) {
        axios.get('http://localhost:5000/api/users/profile', {
            params: { email }
        })
            .then(response => {
                const { role } = response.data;
                navigate("/owner");
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    } else {
        // Show toast if user is not logged in
        toast.error('Please log in to continue', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};

  return (
    <div className="navbar">
      <ToastContainer />
      <div className="hirehublogo">
        <LazyLoad height={40} offset={100} once>
          <Link to={'/'}> <img className="logoimg" src={logo} alt="Logo" /> </Link>
        </LazyLoad>
      </div>
      <div className="icons">
        <div className={`icon home ${activeTab === '/' ? 'active' : ''}`}>
          <HomeIcon />
          <Link to="/" onClick={() => setActiveTab('/')}><span>Home</span></Link>
        </div>
        {!hideElements && (
          <>
            <div className={`icon jobs ${activeTab === '/jobcard' ? 'active' : ''}`}>
              <WorkIcon />
              <Link to="/jobcard" onClick={() => setActiveTab('/jobcard')}><span>Jobs</span></Link>
            </div>
            <div className={`icon aboutus ${activeTab === '/about' ? 'active' : ''}`}>
              <InfoIcon />
              <Link to="/about" onClick={() => setActiveTab('/about')}><span>About</span></Link>
            </div>
            <div
              className={`icon contactus ${activeTab === "/contactus" ? "active" : ""
                }`}
            >
              <ContactMailIcon />

              <Link to="/contactus" onClick={() => setActiveTab("/contactus")}>


                <span>Contact Us</span>
              </Link>
            </div>

            <div
              className={`icon resume-analyzer ${activeTab === "/resume-analyzer" ? "active" : ""
                }`}
            >
              <Dock />

              <Link to="/resume-analyzer" onClick={() => setActiveTab("/resume-analyzer")}>


                <span>Scan Resume</span>
              </Link>
            </div>

            <div className={`icon aboutus ${activeTab === '/blog' ? 'active' : ''}`}>
              <FaBlog />
              <Link to="/blog" onClick={() => setActiveTab('/blog')}><span>Blog</span></Link>
            </div>
            <div
              className={`icon login ${activeTab === "/profile" ? "active" : ""
                }`}
            >

              {isLoggedIn ? (
                <>
                  <AccountCircleIcon />
                  <Link to="/profile" onClick={() => setActiveTab('/profile')}><span>Profile</span></Link>
                </>
              ) : (
                <>
                  <LoginIcon />
                  <Link to="/signin" onClick={() => setActiveTab('/signin')}><span>Login</span></Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
      {!hideElements && (
        <div className="posting">
          <span onClick={handlePostJob}>Employer/Post Job</span>
          <LaunchIcon className="posting-icon" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
