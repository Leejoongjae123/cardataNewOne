"use client";
import React, { useState, useEffect } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { dictionary } from "@/app/(main-pages)/components/dictionary";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import StreamChat from "./StreamChat";
function ChatModal({ carSpec, dictionary,carData, profiles, language }) {


  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const [defaultLanguage, setDefaultLanguage] = useState('ko');

  useEffect(() => {
    if (language === 'kr') {
      setDefaultLanguage('ko');
    } else if (language === 'en' || language === 'ru') {
      setDefaultLanguage(language);
    }
  }, [language]);

  
  const userData={
    language:defaultLanguage,
    id: profiles.email.split('@')[0],  // '@' 기준으로 분할하여 첫 번째 부분만 사용
    name:'client',
    image:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }
  return (
    <div>
      <button
        className="button bg-secondery px-3 w-full"
        onClick={onOpen}
        // uk-tooltip="title: Chat; offset: 8"
      >
        <IoChatbubbleEllipsesOutline className="w-5 h-5 text-gray-500"></IoChatbubbleEllipsesOutline>
        {dictionary.detail.chat[language]}
      </button>
      <Modal 
        className="w-full h-50vh opacity-100"
        size='5xl'
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
    >
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {dictionary.chat.title[language]}
              </ModalHeader>
              <ModalBody className="h-[50vh]">  {/* 최대 높이 50vh로 제한, 스크롤 가능 */}
                <StreamChat carSpec={carSpec} dictionary={dictionary} carData={carData} userData={userData} language={language}></StreamChat>
              </ModalBody>
              {/* <ModalFooter>
                <Button className="text-white" color="primary" onPress={onClose}>
                  닫기
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ChatModal;
