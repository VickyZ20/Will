import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { PresignedPost } from "aws-sdk/clients/s3";

function Welcome(props) {
    return (
        <div className="container">
            <section className="container">
                <h1>House Explorer</h1>
                <h2>Here you can look for your new house or add one!</h2>

                <div className="container">
                    <Switch>
                        {!props.user ? (
                            <Link to="/searchpage">
                                <button className="btn"> Find a house </button>
                            </Link>
                        ) : (
                            <Link to="/searchpage">
                                <button className="btn">
                                    {" "}
                                    Find a roommate{" "}
                                </button>
                            </Link>
                        )}
                    </Switch>
                </div>
            </section>
        </div>
    );
}
export default Welcome;
