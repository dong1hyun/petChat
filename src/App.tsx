import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Home from './home';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
