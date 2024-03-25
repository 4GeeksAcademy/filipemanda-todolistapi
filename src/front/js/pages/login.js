import React, { useState, useEffect, useContext, } from "react";
import { Link } from "react-router-dom";
import { Home } from "./home";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";


export const Login = () => {
    const [input, setinput] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();


    const createUser = (event) => {
        event.preventDefault()
        fetch('https://silver-space-fiesta-v67rqqww952p456-3001.app.github.dev/user', {
            method: 'POST',
            body: JSON.stringify({
                email: input,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                navigate("/")
            })
    }


    const logInUser = (event) => {
        event.preventDefault()
        fetch('https://silver-space-fiesta-v67rqqww952p456-3001.app.github.dev/login', {
            method: 'POST',
            body: JSON.stringify({
                email: input,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.email)
                navigate("/")
            })
    }

    return (
        <div className="text-center">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(event) => setinput(event.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" onClick={createUser} className="btn btn-primary">Submit</button>
                <Link to="/"><button onClick={logInUser} className="btn btn-primary" type="submit">log-in</button>

                </Link>



            </form>
        </div>
    );
};