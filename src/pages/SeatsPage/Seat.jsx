import { useEffect, useState } from "react";
import styled from "styled-components"



export default function Seat({ seat }) {

    let [select, setSelect] = useState('notselected');



    function selectseat() {
        if (!seat.isAvailable) {
            alert('Esse assento não está disponível')
        } else {
            if (select === 'notselected') {

                setSelect('selected');
            } else {

                setSelect('notselected');
            }
           
            console.log(seat.id)
        }
    }

    return (
        <SeatItem onClick={selectseat} state={select === 'notselected' ? seat.isAvailable : select}>{seat.name}</SeatItem>
    )
}

const SeatItem = styled.div`
    border: 1px solid ${state => state.state === 'selected' ? '#0e7d71' : state.state ? '#7b8b99' : '#f7c52b'};
    background-color: ${state => state.state === 'selected' ? '#1aae9a' : state.state ? '#c3cfd9' : '#FBE192'};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`