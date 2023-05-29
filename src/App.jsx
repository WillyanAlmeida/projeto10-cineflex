import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useState } from "react"

export default function App() {

    let [purchasedseat, setPurchasedseat] = useState([])
    let [seats, setSeats] = useState(undefined);
    let [name, setName] = useState("");
    let [cpf, setCpf] = useState("");

    axios.defaults.headers.common['Authorization'] = 'LYBJtjK2liCOeAleBGOoZq8T';

    return (
        <>
            <BrowserRouter>
                <NavContainer >CINEFLEX</NavContainer>
                <Routes>

                    <Route path='/' element={<HomePage />} />
                    <Route path='/assentos/:idSessao' element={<SeatsPage  name={name} setName={setName} cpf={cpf} setCpf={setCpf} purchasedseat={purchasedseat} setPurchasedseat={setPurchasedseat} seats={seats} setSeats={setSeats} />} />
                    <Route path='/sessoes/:idFilme' element={<SessionsPage />} />
                    <Route path='/sucesso' element={<SuccessPage purchasedseat={purchasedseat} seats={seats} cpf={cpf} name={name} setPurchasedseat={setPurchasedseat} setSeats={setSeats} setCpf={setCpf} setName={setName} />}/>

                </Routes>

            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
