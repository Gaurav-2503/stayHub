import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [redirect , setRedirect] = useState(false);

    const {setUser} = useContext(UserContext);

    const loginUser = async (ev) => {

      ev.preventDefault();

      try{
        // in the api we have send the user and grabbing that  here 
        const currentLoginUserInfo = await axios.post('/login' , {
          email , 
          password
        } );

        setUser(currentLoginUserInfo.data);
        setRedirect(true);
        alert("Wecome , Login Successful");

      }catch(e){
        console.log(e.message)
        alert("Login Not Successful");
      }
    }

    if(redirect) {
      return <Navigate to={'/'} />
    }



  return (
    <div className="mt-5 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-2xl mx-auto" onSubmit={loginUser}>
          <input  type="email" 
                  placeholder="Enter the Email-id"
                  onChange={ev => setEmail(ev.target.value)}
          />

          <input  type="password" 
                  placeholder="password"
                  onChange={ev => setPassword(ev.target.value)}
           />
           
          <button className="login-btn">Log in</button>
        </form>
        <div className="text-center">
          <span className="me-3">Don&apos;t have an Account ?</span>
          <Link className="underline text-blue-500 font-bold" to={"/register"}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
