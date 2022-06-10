import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import ToDoList from './components/ToDoList';
import CreateToDo from "./components/CreateToDo";
import Admin from "./components/Admin";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {
  const [isLoggedIn, setLogin] = useState();
  const [isDarkMode, setDarkMode] = useState('false')

  useEffect(() => {
    let darkTheme = localStorage.getItem('DarkMode')
    if(darkTheme === 'true'){
      setDarkMode(darkTheme)
    } else {
      setDarkMode('false')
    }
  },[])

  useEffect(() => {
    let theme = document.getElementsByTagName('link')[1];
    console.log(isDarkMode)
    if (isDarkMode === 'true') {
      theme.setAttribute('href', './css/dark.css');
    } else {
      theme.setAttribute('href', './css/light.css');
    }
  },[isDarkMode])

  function onThemeSwitch(e){
    console.log(e.target.checked)
    if(e.target.checked){
      setDarkMode('true')
      localStorage.setItem('DarkMode', 'true')
    } else {
      localStorage.setItem('DarkMode', 'false')
      console.log('setting to false')
      setDarkMode('false')
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  
  console.log(isLoggedIn);  

  return (
      <div className="App">
       <BrowserRouter>
          <Nav SwitchTheme={onThemeSwitch} />
          <div className="AppBody">
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/todo' element={<ToDoList />} />
              <Route path="/createtodo" element={<CreateToDo />} /> 
              <Route path="/admin" element={<Admin />} /> 
              <Route path='*' element={<Navigate replace to='/' />} />
           </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;