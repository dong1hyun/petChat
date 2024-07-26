import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./index.css"
import Login from './login';
import Agreement from './agreement';
import Auth from './auth';
import Create_account from './create_accout';
import NickNameChange from './nickNameChange';
import PetNameChange from './petNameChange';
import PasswordChange from './passwordChange';
import Home from './home';
import Character from './character';
import MyPage from './myPage';
import Chat from './chat';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/create-account' element={<Create_account />} />
        <Route path='/login' element={<Login />} />
        <Route path='/agreement' element={<Agreement />} />
        <Route path='/home' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/home/character' element={<Character />} />
        <Route path='/password-change' element={<PasswordChange />} />
        <Route path='/nickName-change' element={<NickNameChange />} />
        <Route path='/petName-change' element={<PetNameChange />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
