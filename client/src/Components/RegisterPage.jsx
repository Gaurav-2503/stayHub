import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const RegisterPage = () => {

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const registerUser = async (ev) => {
        ev.preventDefault();
        // axios.get('/test');    // to check wheather we are able to communicate with back end or not
 
        try{
          await axios.post('/register' , {
            name ,
            email ,
            password
          });

          alert('Registration completed , You can login');
        }catch(e) {
          console.log(e.message)
          alert('Regitration falied , please try again');
        }
    }

  return (
    <div className="mt-5 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register / Sign Up</h1>

        <form className="max-w-xl mx-auto" onSubmit={registerUser}>
          <input type="text" 
                placeholder="Enter Your Name" 
                value={name} 
                onChange={ev => setName(ev.target.value)} 
          />

          <input type="email" 
                placeholder="Enter the Email-id" 
                value={email} 
                onChange={ev => setEmail(ev.target.value)} 
          />

          <input type="password" 
                placeholder="password" 
                value={password} 
                onChange={ev => setPassword(ev.target.value)} 
          />

          <button className="login-btn">Register</button>
        </form>
        <div className="text-center">
          <span className="me-3">Already have an Account ?</span>
          <Link className="underline text-blue-500 font-bold" to={"/login"}>
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
