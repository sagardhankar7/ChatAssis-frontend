import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../utility/Constants"
import { Shimmer } from "../utility/Shimmer"
import "./App.css"
import { v4 as uuid } from 'uuid';
import OutputChat from "./components/OutputChat.jsx";
import InputChat from "./components/InputChat.jsx";
import InputBox from "./components/InputBox.jsx";
import LogoBar from "./components/LogoBar.jsx";
import {BrowserRouter , Routes, Route} from "react-router-dom"
import Chat from "./components/Chat.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path={`/`} element={<Chat/>}></Route>
        <Route path={`/chat/:chatid`} element={<Chat/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
