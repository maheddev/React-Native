import {useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';

const Payment = () => {
  const [name, setName] = useState('');

  const makePayment = async () => {
    axios({
      method: 'POST',
      url: 'https://us-central1-stripe-react-native-ddbc4.cloudfunctions.net/completePaymentWithStripe',
      data: {
        amount: 100,
        currency: 'usd',
        token: 'tok_mastercard',
      },
    }).then(response => {
      console.log(response);
    });
  };
  return (
    <View>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Name"
        style={{
          width: 300,
          fontSize: 20,
          padding: 10,
          borderWidth: 1,
        }}
      />
      <Button title="Pay Now!" onPress={makePayment} />
    </View>
  );
};

export default Payment;
