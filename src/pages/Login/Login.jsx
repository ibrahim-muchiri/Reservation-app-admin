import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./login.scss";

function Login() {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    });

    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();


    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value}));
    }
    const handleOnclick = async (e) =>{
        e.preventDefault()
        dispatch({type: "LOGIN_START"});
        try{
            const res = await axios.post("/auth/login", credentials);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
            navigate("/");
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data});
        }
    }
    // console.log(user);

  return <div className="login">
        <div className='lbutton'>
            <input type="text" placeholder='username' id="username" onChange={handleChange} />
            <input type="password" placeholder='password' id="password" onChange={handleChange} />

            <button disabled={loading} onClick={handleOnclick} className="loginButton">login</button>

            {error && <span>{error.message}</span>}

        </div>
      
    </div>
  
}

export default Login
