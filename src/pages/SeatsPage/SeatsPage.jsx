import { useEffect, useState } from "react";
import Seat from "./Seat";
import { Link, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";

export default function SeatsPage({setPurchasedseat, purchasedseat, name, setName, cpf, setCpf, seats, setSeats}) {

    let [seatsselected, setSeatsselected]= useState([])

    const navigate = useNavigate();

    
   
   
    const parametros = useParams();
    console.log(parametros);

     useEffect(() => {

         const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`;

         const promise = axios.get(url);

         promise.then(resposta => {
             setSeats(resposta.data)
         });
         promise.catch(erro => console.log(erro.response.data));
     }, []);

     if (seats === undefined) {
        return <div>Carregando.....</div>
    }

    function sendpost (e){
        
        e.preventDefault();
        
         const requisicao = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
             ids: seatsselected,
             name: name,
		     cpf: cpf})
         requisicao.then(() => navigate("/sucesso"))
        
         requisicao.catch( erro => {
             const {mensagem} = erro.response.data;
             alert(mensagem);
           });        


    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
            {seats.seats.map((seat) => <Seat key={seat.id} seat={seat} seatsselected={seatsselected} setSeatsselected={setSeatsselected} setPurchasedseat={setPurchasedseat} purchasedseat={purchasedseat} />
            )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle state={'selected'} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle state={'available'} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle state={'unavailable'} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={sendpost}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input data-test="client-name"  id="name"  required type="text" placeholder="Digite seu nome..." value={name} onChange={e => setName(e.target.value)}/>

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input data-test="client-cpf" id="cpf" required placeholder="Digite seu CPF..." value={cpf} onChange={e => setCpf(e.target.value)} />

                <button data-test="book-seat-btn"  type="submit">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={seats.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.weekday} - {seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${state=> state.state === 'selected' ?'#0e7d71':state.state === 'available' ? '#7b8b99':'#f7c52b'};
    background-color: ${state=> state.state === 'selected' ?'#1aae9a':state.state === 'available' ? '#c3cfd9':'#FBE192'};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`