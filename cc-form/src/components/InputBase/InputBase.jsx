import React from 'react';
import './InputBase.css';
import { CARD, CARDICON } from './constants';

const InputBase = ({ errorM, error, cardType, isCard, ...props }) => (
    <label>
        <input className='input-root' {...props}/>
        {errorM && <div className='error'>{errorM}</div>}
        {(!errorM || !error.cardError) && isCard && CARD.includes(cardType) && (
            <img
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "10px",
                    width: "50px",
                    height: "33px"
                }}
                src={CARDICON[cardType]}
                alt='card'
            />
        )}
    </label>
)

export default InputBase;