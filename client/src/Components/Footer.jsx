import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>

<div className="bottom">
      <div className="description">
      
      <Link to={'/'} className="flex gap-3 align-middle">
      <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>

          <span className="font-bold text-xl">airbinb</span>
      </Link>

        <div className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          consectetur repudiandae culpa ab sed perferendis mollitia id animi qui
          excepturi, ex eius nulla sit aut debitis vel eligendi officiis
          voluptatibus illum totam possimus. Similique consequuntur unde a autem
          eos alias!
        </div>

        <div className="contact">
          <p>phone no : +255 10457878545</p>
          <p><a href="#">E-mail : mycollege123@gmail.com</a></p>
        </div>
      </div>

      <div className="blink">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="index.html">About us</a></li>
          <li><a href="index.html">Departments</a></li>
          <li><a href="index.html">Contact Us</a></li>
          <li><a href="index.html">T&amp;P</a></li>
        </ul>
      </div>
    </div>

    <div className="ftr">
      <hr/>
      <footer>© Rights reserved to My college</footer>
      <hr/>
    </div>
    
    </>
  )
}

export default Footer