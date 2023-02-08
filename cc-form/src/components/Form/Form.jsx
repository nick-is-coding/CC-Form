import React from 'react';
import InputBase from '../InputBase/InputBase';
import './Form.css';
import { OTHERCARDS } from '../InputBase/constants';
import { cardNumberValidation, onlyTextValidation, cardExpiryValidation, securityCodeValidation } from '../InputBase/validations';

const INIT_CARD = {
    card: '',
    cardHolder: '',
    expiry: '',
    securityCode: '',
}


class Form extends React.Component {
    constructor() {
        super();

        this.state = {
            cardData: INIT_CARD,
            maxLength: OTHERCARDS.length,
            error: {},
            cardType: null,
        }
    }

    findDebitCardType = (cardNumber) => {
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        };
        for(const card in regexPattern) {
            if(cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
        } return '';
    }

    handleValidations = (type, value) => {
        let errorText;
        switch(type) {
            case 'card':
                errorText = cardNumberValidation(value);
                this.setState((prevState) => ({
                    cardType: this.findDebitCardType(value),
                    error: {
                        ...prevState.error,
                        cardError: errorText,
                    }
                }));
                break;
            case 'cardHolder':
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({ error: {...prevState.error, cardHolderError: errorText}}));
                break;
            case 'expiry':
                errorText = cardExpiryValidation(value);
                this.setState((prevState) => ({ error: {...prevState.error, expiryError: errorText}}));
                break;
            case 'securityCode':
                errorText = securityCodeValidation(value);
                this.setState((prevState) => ({ error: {...prevState.error, securityCodeError: errorText}}));
                break;
            default:
                break;
        }
    }

    handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);

    handleInputData = (e) => {

        if (e.target.name === 'card') {
            let mask = e.target.value.split(' ').join('');
            if (mask.length){
                mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
                this.setState((prevState) => ({
                    cardData: { 
                        ...prevState.cardData,
                        [e.target.name]: mask,
                    },
                }));
            } else {
                this.setState((prevState) => ({
                cardData: { 
                    ...prevState.cardData,
                    [e.target.name]: '',
                },
            }));}
            } else {
                this.setState((prevState) => ({
                    cardData: { 
                        ...prevState.cardData,
                        [e.target.name]: e.target.value,
                    },
                }));
            }
    }

    checkErrorBeforeSave = () => {
        let errorValue = {};
        let isError = false;
        Object.keys(this.state.cardData).forEach((val) => {
            if(!this.state.cardData[val].length) {
                errorValue = { ...errorValue, [`${val}Error`]: 'Required'};
                isError = true;
            }
        });
        this.setState({ error: errorValue })
    }

    handleAddCard = (e) => {
        e.preventDefault();
        const errorCheck = this.checkErrorBeforeSave();
        if(!errorCheck){
            this.setState({
                cardData: INIT_CARD,
                cardType: null,
            });
        }
    }

    render() {

        const inputData = [
            {label: 'Card Number', name: 'card', type: 'text', error:'cardError'},
            {label: 'CardHolder\'s Name', name: 'cardHolder', type: 'text', error:'cardHolderError'},
            {label: 'Expiry Date(MM/YY)', name: 'expiry', type: 'text', error:'expiryError'},
            {label: 'Security Code', name: 'securityCode', type: 'text', error:'securityCodeError'},
        ];

        return (
            <div>
                <h1>Add New Card</h1>
                <form onSubmit={this.handleAddCard}>
                    {inputData.map((item) => (
                        <InputBase 
                        placeholder={item.label}
                        type={item.type}
                        value={this.state.cardData && this.state.cardData[item.name]}
                        onChange={this.handleInputData}
                        autoComplete="off"
                        maxLength={this.state.maxLength}
                        name={item.name}
                        onBlur={this.handleBlur}
                        error={this.state.error}
                        cardType={this.state.cardType}
                        isCard={item.name === 'card'}
                        errorM={
                            (this.state.error
                            && this.state.error[item.error]
                            && this.state.error[item.error].length > 1)
                            ? this.state.error[item.error]
                            : null
                        }
                    />
                    ))}
                    <div>
                        <InputBase type="submit" value="Add Card" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Form;