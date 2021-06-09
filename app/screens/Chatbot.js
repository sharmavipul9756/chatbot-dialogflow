import React, { Component} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {GiftedChat, Bubble} from 'react-native-gifted-chat'
import {Dialogflow_V2} from 'react-native-dialogflow'
import {dailogflowConfig} from '../env'
const botAvatar = require('../assets/images/avatar.png')
const bot = {
  _id: 2,
  name: 'Mr Bot',
  avatar: botAvatar

}

class Chatbot extends Component {
  state = {
    messages : [{
      _id: 1, 
      text: 'hi',
      createdAt: new Date().getTime(),
      user: bot
    },{
      _id: 2, 
      text: 'hi My name is Mr Bot',
      createdAt: new Date().getTime(),
      user: bot
    }],
    id: 1, 
    name: '',
    
  }
  
  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dailogflowConfig.client_email,
      dailogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_GB,
      dailogflowConfig.project_id,
    )
  }
  
  sendBotResponse(text) {
    let msg;
    if(text == 'travel') {
       msg = {
        _id : this.state.messages.length + 1,
        text : 'Would you like to buy plane ticket',
        createdAt: new Date().getTime(),
        user: bot
      }
    }
    else if(text == 'Show options') {
      msg = {
       _id : this.state.messages.length + 1,
       text : 'Please choose your destination',
       createdAt: new Date().getTime(),
       user: bot,
       isOptions: true,
        data: [
          {
            title: 'Thailand',
            image:
              'https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2020/06/GettyImages-636982952-e1592703310661.jpg',
          },
          {
            title: 'USA',
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6q9FR_WrRIBMgx2QgVBQ3BO_ORQB8-b9qw&usqp=CAU',
          },
          {
            title: 'Japan',
            image:
              'https://rccl-h.assetsadobe.com/is/image/content/dam/royal/ports-and-destinations/destinations/japan/assets/japan-fuji-mountain-himeji-castle-full-cherry-blossom-h.jpg?$750x667$',
          },
        ],
     }
   }
   else {
    msg = {
      _id : this.state.messages.length + 1,
      text : text,
       createdAt: new Date().getTime(),
      user: bot
    };
   }
    
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, [msg]),
    }));

  }
  onSend(messages=[]) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, messages),
    }));

    let text = messages[0].text;
    Dialogflow_V2.requestQuery(
      text,
      (result) => this.handleGoogleResponse(result),
      (error) => {console.error(error)}
    )

  }
  handleGoogleResponse(result) {
   
  
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
  // console.log(text);
    this.sendBotResponse(text);
  }
  onQuickReply(quickReply) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, quickReply),
    }));

    let message = quickReply[0].value;

    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error),
    );
  }
  renderBubble = (props) => {
    if (props.currentMessage.isOptions) {
      return (
        <ScrollView style={{backgroundColor: 'white'}} horizontal={true}>
          {props.currentMessage.data.map((item) => (
            <Card
              containerStyle={{
                padding: 0,
                borderRadius: 15,
                paddingBottom: 7,
                overflow: 'hidden',
              }}
              key={item.title}>
              <Card.Image
                style={{width: 220, height: 110}}
                resizeMode="cover"
                source={{uri: item.image}}></Card.Image>
              <Card.Divider />
              <Card.Title>{item.title}</Card.Title>
              <Button
                title="Choose"
                style={{height: 35}}
                onPress={() => this.sendBotResponse(item.title)}
              />
            </Card>
          ))}
        </ScrollView>
      );
    }

    return (
      <Bubble
        {...props}
        textStyle={{right: {color: 'white'}}}
        wrapperStyle={{
          left: {backgroundColor: 'yellow'},
          right: {backgroundColor: 'pink'},
        }}
      />
    );
  };
  render() {
    return (
     <View style={{flex: 1, backgroundColor: 'white'}}>
       <GiftedChat 
       messages={this.state.messages}
       onSend={(message)=> this.onSend(message)}
       onQuickReply={(quickReply)=> this.onQuickReply(quickReply)}
       renderBubble={this.renderBubble}
       user={{_id: 1}}
       />

     </View>
    );
  }
}

export default Chatbot