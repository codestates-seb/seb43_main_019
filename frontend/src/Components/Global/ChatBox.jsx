import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import CustomerChat from "../Chatting/CustomerChat";
import AIChat from "../Chatting/AIChat";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiReset } from "react-icons/bi";

const Btn = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const Container = styled(motion.form)`
  width: 360px;
  height: 500px;
  background-color: var(--gray-300);
  border-radius: 20px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
  justify-items: center;
  align-items: center;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

const Header = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0 0;
  background-color: var(--gray-300);
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 30px;
`;

const Icons = styled.div`
  width: 90px;
  display: flex;
  justify-content: space-between;
`;

const Img = styled.img`
  height: 80px;
  width: auto;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const ChattingBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white-100);
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatInputBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0 0 20px 20px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: var(--black-600);
`;

const ChatInput = styled.input`
  width: 100%;
  height: 35px;
  margin-right: 10px;
  padding-left: 10px;
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  background: #e8e8e8;
  box-shadow: 20px 20px 60px #c5c5c5, -20px -20px 60px #ffffff;
  transition: 0.3s;

  &:focus {
    outline-color: #e8e8e8;
    background: #e8e8e8;
    box-shadow: inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff;
    transition: 0.3s;
  }
`;

const ChatInputBtn = styled.button`
  width: 100%;
  height: 30px;
  position: relative;
  text-transform: uppercase;
  text-decoration: none;
  display: inline-block;
  border-radius: 6em;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
  font-weight: 500;
  color: black;
  background-color: white;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s;
    background-color: #fff;
  }

  &:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
  }
`;

export default function ChatBox() {
  const [isChatting, setIsChatting] = useState(false);
  const [chat, setChat] = useState("");
  const [allChats, setAllChats] = useState([]);

  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  const handlePostChat = async (event) => {
    event.preventDefault();

    if (chat.length === 0) return;

    const myChat = {
      id: allChats.length + 1,
      content: chat,
      customer: true,
    };

    setAllChats((prev) => [...prev, myChat]);
    setChat((prev) => "");

    scrollToBottom();

    let apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    for (let i = 0; i < 5; ++i) {
      apiKey = atob(apiKey);
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${chat}` }],
        temperature: 1,
      }),
    });

    const json = await response.json();
    const answer = json.choices[0].message.content;

    setTimeout(() => {
      scrollToBottom();

      const newAnswerChat = {
        id: answer + allChats.length + 1,
        content: answer,
        customer: false,
      };

      setAllChats((prev) => [...prev, newAnswerChat]);
    }, 1000);

    setTimeout(() => {
      scrollToBottom();
    }, 2000);
  };

  const handleInputChat = (event) => {
    setChat((prev) => event.target.value);
  };

  return isChatting ? (
    <Container layoutId={"chat"} onSubmit={handlePostChat}>
      <Header>
        <Icons>
          <BiReset size={"35px"} onClick={() => setAllChats((prev) => [])} />
          <AiFillCloseCircle
            onClick={() => setIsChatting((prev) => false)}
            size={"35px"}
          />
        </Icons>
      </Header>
      <ChattingBox ref={chatRef}>
        {allChats.map((chat) =>
          chat.customer ? (
            <CustomerChat key={chat.id + ""} chatContent={chat.content} />
          ) : (
            <AIChat key={chat.id + ""} chatContent={chat.content} />
          )
        )}
      </ChattingBox>
      <ChatInputBox>
        <ChatInput value={chat} onChange={(event) => handleInputChat(event)} />
        <ChatInputBtn>입력</ChatInputBtn>
      </ChatInputBox>
    </Container>
  ) : (
    <Btn layoutId={"chat"} onClick={() => setIsChatting(true)}>
      <Img src="/img/operator.png" />
    </Btn>
  );
}
