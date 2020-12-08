import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import '../style/start.css'
import logo from '../style/images/WFL.jpg'

const names = [
  {
    name: "Jaron Degen",
    github: "https://github.com/jarondegen",
    linkedin: "https://www.linkedin.com/in/jarondegen/",
    angellist: "https://angel.co/u/jaron-degen"
  },
  {
    name: "Daniel Black",
    github: "https://github.com/drblack8",
    linkedin: "https://www.linkedin.com/in/danielrobertblack/",
    angellist: "https://angel.co/u/daniel-r-black"
  },
  {
    name: "Andrea Jackson",
    github: "https://github.com/aganesh0988",
    linkedin: "https://www.linkedin.com/in/andrea-jackson1/",
    angellist: "https://angel.co/u/andrea-jackson-13"
  },
  {
    name: "Quincy Jones",
    github: "https://github.com/doncibo",
    linkedin: "https://www.linkedin.com/in/don-quincy-jones/",
    angellist: "https://angel.co/u/quincy-jones-8"
  }
];
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      {names.map((el, idx) => (
        <div key={idx} className={`name-div ${idx}`}>
          <div>{el.name}</div>
          <a className="icons" target="_blank" href={el.github}>
            <i className="fab fa-2x fa-github-square"></i>
          </a>
          <a className="icons" target="_blank" href={el.linkedin}>
            <i className="fab fa-2x fa-linkedin"></i>
          </a>
          <a className="icons" target="_blank" href={el.angellist}>
            <i className="fab fa-2x fa-angellist"></i>
          </a>
        </div>
      ))}
    </div>
  </footer>
);



const Start = () => {
  const [flip, setFlip] = useState(false)


  return (
    <>
      <div className="start-page-container">
        <div className="start-logo-container">
          <img className="start-logo" src={logo} />
        </div>
        <div className="forms-container">
          {
            flip ? <SignUpForm />
              : <LoginForm />
          }
          <a className="log-or-sign" onClick={() => flip ? setFlip(false) : setFlip(true)}>
            {flip ? 'Already have an account?' : 'Don\'t have an account?'}
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Start
