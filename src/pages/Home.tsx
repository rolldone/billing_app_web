// src/pages/Home.tsx

import React from 'react';
import "./Home.css"
import illustration from "../assets/illustration.svg"
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Coding</title>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossOrigin="anonymous"
            />
            {/* main css */}
            <link rel="stylesheet" href="assets/css/main.css" />
            {/* navbar section */}
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        Coding
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <a className="nav-link" href="#">
                                Features
                            </a>
                            <a className="nav-link" href="#">
                                Pricing
                            </a>
                            <Link className="nav-link" to="about">
                                About
                            </Link>
                            <Link className="nav-link" to="contact">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {/* content section */}
            <section className="content">
                <img src={illustration} alt="img" />
                <div className="text">
                    <h1>Oops! site under maintenance</h1>
                    <p className="w-25">
                        we apologize for any inconveniences caused we've almost done,{" "}
                        <a href="http://"> Turn back</a>
                    </p>
                </div>
            </section>
            {/* footer section */}
            <footer>
                <div className="container">
                    <hr />
                    <p>© 2022 · coding</p>
                </div>
            </footer>
        </>

    );
};

export default Home;
