import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  LogBox,
  ToastAndroid,
} from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRef} from 'react';
import axios from 'axios';

const App = () => {
  LogBox.ignoreAllLogs();
  const [userMessage, setUserMessage] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const [userMessageArray, setUserMessageArray] = useState([]);
  const [type, setType] = useState('user');
  const yourRef = useRef(null);
  const [mode, setMode] = useState(true);

  //sendMessage function to be triggered when the send button is Clicked
  const sendMessage = () => {
    if (userMessage == '') {
      ToastAndroid.show('Please Enter some Message', ToastAndroid.SHORT);
    } else {
      setUserMessageArray(userMessageArray => [
        ...userMessageArray,
        {
          message: userMessage,
          time: new Date(),
          type: type,
        },
      ]);
      if (mode == true) {
        setMode(false);
        setType('bot');
      } else {
        setMode(true);
        setType('user');
      }
      dataFetched();
      setUserMessage('');
    }
  };
  // Data from the Chat GPT API
  const dataFetched = async () => {
    axios({
      method: 'post',
      url: 'https://us-central1-stripe-react-native-ddbc4.cloudfunctions.net/getDatafromServer',
      data: {
        prompt: userMessage
      },
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  //Render Message to pass the data into Message Bubble Component
  const renderMessage = ({item}) => (
    <MessageBubble message={item.message} time={item.time} type={item.type} />
  );
  //JSX Function to Render the FlatList
  const MessageBubble = ({message, time, type}) => (
    <View
      style={
        type == 'user' ? styles.MessageBubbleRight : styles.MessageBubbleLeft
      }>
      <View style={type == 'user' ? styles.right : styles.left}>
        <Text
          style={type == 'user' ? styles.messageRight : styles.messageLeft}
          selectable>
          {message}
        </Text>
        <Text style={type == 'user' ? styles.dateRight : styles.dateLeft}>
          {time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear()}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.Headers}>
        <Text style={styles.HeaderText}>Ask IT</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.bottomText}>
          <TextInput
            placeholder="Ask me anything!"
            placeholderTextColor="#D5CEA3"
            style={styles.TextInput}
            onChangeText={i => {
              setUserMessage(i);
            }}
            multiline
            value={userMessage}
            autoFocus
          />
          <Pressable style={styles.send} onPress={sendMessage}>
            <Text style={{fontSize: 30}}>Y</Text>
            {/* <Icon name="send-circle" size={50} color={'#D5CEA3'} /> */}
          </Pressable>
        </View>

        <FlatList
          data={userMessageArray}
          renderItem={renderMessage}
          ref={yourRef}
          onContentSizeChange={() => yourRef.current.scrollToEnd()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    marginHorizontal: 10,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: '#1A120B',
    paddingTop: 10,
  },
  Headers: {
    height: 50,
    width: '100%',
    backgroundColor: '#D5CEA3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderText: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: '#1A120B',
  },
  TextInput: {
    height: 43,
    borderWidth: 1,
    width: '100%',
    borderColor: '#D5CEA3',
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 24,
    paddingHorizontal: 15,
    color: '#D5CEA3',
    paddingRight: 40,
    fontFamily: 'Poppins-Regular',
  },
  send: {
    height: 50,
    position: 'absolute',
    right: -3.6,
    bottom: 12.3,
  },
  MessageBubbleRight: {
    marginLeft: 10,
    flexDirection: 'row-reverse',
  },
  right: {
    backgroundColor: '#3C2A21',
    margin: 2,
    padding: 10,
    borderRadius: 20,
    marginLeft: 70,
  },
  messageRight: {
    fontFamily: 'Poppins-Medium',
    color: '#D5CEA3',
  },
  MessageBubbleLeft: {
    marginLeft: 9,
    flexDirection: 'row',
  },
  left: {
    backgroundColor: '#D5CEA3',
    margin: 2,
    padding: 10,
    borderRadius: 20,
    marginRight: 70,
  },
  messageLeft: {
    fontFamily: 'Poppins-Medium',
    color: '#1A120B',
  },
  dateRight: {
    fontFamily: 'Poppins-Italic',
    color: '#D5CEA3',
    fontSize: 7,
    textAlign: 'right',
  },
  dateLeft: {
    fontFamily: 'Poppins-Italic',
    color: '#1A120B',
    fontSize: 7,
  },
});

export default App;
