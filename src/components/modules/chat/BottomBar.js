import { useState } from 'react';
import { firebase } from 'firebase/firebaseApp';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import Textarea from 'react-expanding-textarea';
import axios from 'axios';
import * as ga from 'lib/ga';

const BottomBar = ({ user, id }) => {
  const [input, setInput] = useState('');

  const sendSlackMessage = async () => {
    await axios.post(
      `${process.env.BASEURL}/api/notifications/slack/postMessage`,
      {
        message: `@${user.displayName} is sending a message within chat app.`,
      }
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim().length > 0) return;

    firebase
      .firestore()
      .collection(`chats/${id}/messages`)
      .add({
        text: input,
        sender: user.userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log('Message sent');
      })
      .catch((error) => {
        console.error('Error sending message');
      });
    setInput('');
    sendSlackMessage();

    ga.event({
      action: 'user_sent_chat_message',
    });
  };

  return (
    <div className="flex w-full bg-base-900">
      {/* <form
        className="w-full flex py-4 px-4 sm:px-6 items-end space-x-2"
        onSubmit={sendMessage}
      > */}
      <div className="flex w-full items-end space-x-2 px-4 pb-4">
        <Textarea
          type="text"
          placeholder="Type your message ..."
          className="text-input"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(e)}
        />
        <button type="submit" onClick={(e) => sendMessage(e)}>
          <IoPaperPlaneOutline className="mb-2 h-7 w-7 text-white sm:mb-2" />
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default BottomBar;
