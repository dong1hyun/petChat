import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import "./index.css"
import Login from './login';
import Agreement from './agreement';
import Auth from './auth';
import Create_account from './create_accout';
import NickNameChange from './nickNameChange';
import PetNameChange from './petNameChange';
import PasswordChange from './passwordChange';
import MyPage from './myPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/agreement' element={<Agreement />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/create-account' element={<Create_account />} />
        <Route path='/password-change' element={<PasswordChange />} />
        <Route path='/nickName-change' element={<NickNameChange />} />
        <Route path='/petName-change' element={<PetNameChange />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
