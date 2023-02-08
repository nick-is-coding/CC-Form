import moment from 'moment';

export const cardNumberValidation = (cardNumber) => {
    const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for(const card in regexPattern) {
        if(cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
            if(cardNumber) {
                return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
                    ? ''
                    : 'Enter a Valid Card';
            }
        };
    } 
    return 'Enter a Valid Card';
};


export const cardExpiryValidation = (value) => {
    if (value) {
        if(/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())){
            let today = new Date();
            const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(today.getFullYear(),
                today.getMonth() + 1, 0).getDate()}`
            let currentDate = moment(new Date(date));
            let visaValue = value.split('/');
            let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
            return currentDate < moment(visaDate)
                ? undefined
                : 'Please enter a valid date';
        } else {
            return 'Invalid date format';
        }
    }
};

export const onlyTextValidation = (value) => {
    if(value) {
        if(/^[a-zA-Z ]*$/i.test(value)) {
            return undefined
        } else {
            return 'Alphabetical letters only';
        }
    } else {
        return undefined;
    }
};

export const securityCodeValidation = (min, value) => 
    (value && value.length < min) ? 'Must be 3 characters or more' : undefined;