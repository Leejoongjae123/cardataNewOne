"use client";
import { useCallback, useState, useEffect } from "react";
import {
  Chat,
  useCreateChatClient,
  ChannelList,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react";
import { Button, Input, Spinner, Card } from "@nextui-org/react";
import { createToken } from "@/lib/action";
import "stream-chat-react/dist/css/v2/index.css";
import { Streami18n } from "stream-chat-react";

function StreamChat({ dictionary, carData, userData, language, defaultLanguage }) {
  const [channelName, setChannelName] = useState("");
  const [activeChannel, setActiveChannel] = useState(null);
  console.log('userData:',userData)

  const i18nInstance = new Streami18n({
    language: userData.language || 'ko',
    translationsForLanguage: {
      // 필요한 번역을 여기에 추가할 수 있습니다
    }
  });

  const tokenProvider = useCallback(async () => {
    return await createToken(userData.id);
  }, [userData.id, createToken]);

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
    tokenOrProvider: tokenProvider,
    userData,
  });

  const sort = { last_message_at: -1 };
  const filters = {
    type: "messaging",
    members: { $in: [userData.id] },
  };
  const options = {
    limit: 10,
  };

  const createNewChannel = async () => {
    try {
      const channelName = prompt("채널 이름을 입력하세요:");
      if (!channelName) return;

      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const newChannel = client.channel("messaging", uniqueId, {
        members: [userData.id, "connectcar_ceo"],
        // members: [userData.id],
        name: channelName + "_ru",
        created_by_id: userData.id,
      });

      await newChannel.create();
      await newChannel.watch();

      // // 환영 메시지를 ljj90703001 계정으로 전송
      // await newChannel.sendMessage({
      //   text: "안녕하세요!",
      //   user_id: "jjcoding3001"
      // });

      console.log("새로운 채널 생성 완료:", newChannel);
    } catch (error) {
      console.error("채널 생성 중 오류 발생:", error);
    }
  };

  const showChannelId = () => {
    const activeChannel = client.activeChannel;
    if (activeChannel) {
      alert(`현재 채널 ID: ${activeChannel.id}`);
    } else {
      alert("선택된 채널이 없습니다.");
    }
  };

  const showAllChannels = async () => {
    try {
      const channels = await client.queryChannels(filters, sort, options);
      console.log(
        "모든 채널 목록:",
        channels.map((channel) => ({
          id: channel.id,
          name: channel.data.name,
          members: channel.data.member_count,
          lastMessage: channel.state.last_message_at,
        }))
      );
    } catch (error) {
      console.error("채널 목록 조회 중 오류 발생:", error);
    }
  };

  const handleEnterChannel = async () => {
    try {
      const channels = await client.queryChannels(filters, sort, options);
      const targetChannel = channels.find(
        (channel) => channel.data.name === channelName
      );

      if (!targetChannel) {
        alert("해당 이름의 채널을 찾을 수 없습니다.");
        return;
      }
      console.log("targetChannel:", targetChannel);

      await targetChannel.watch();
      setActiveChannel(targetChannel);
      if (!targetChannel.state.members[userData.id]) {
        await targetChannel.addMembers([userData.id]);
      }

      console.log(`${channelName} 채널에 입장했습니다.`);
    } catch (error) {
      console.error("채널 입장 중 오류 발생:", error);
      alert("채널 입장 중 오류가 발생했습니다.");
    }
  };

  const handleChannelSelect = (channel) => {
    setActiveChannel(channel);
  };

  const deleteChannel = async (channel, e) => {
    try {
      // 버튼 클릭 이벤트가 상위로 전파되는 것을 방지
      e.stopPropagation();

      const confirmDelete = window.confirm(
        "정말로 이 채널을 삭제하시겠습니까?"
      );
      if (!confirmDelete) return;

      await channel.delete();
      if (activeChannel?.cid === channel.cid) {
        setActiveChannel(null);
      }
      alert("채널이 삭제되었습니다.");
    } catch (error) {
      console.error("채널 삭제 중 오류 발생:", error);
      alert("채널 삭제 중 오류가 발생했습니다.");
    }
  };

  // CustomChannelPreview 컴포넌트 수정
  const CustomChannelPreview = (props) => {
    const { channel, setActiveChannel } = props;

    return (
      <div
        className="p-4 border-b hover:bg-gray-100 cursor-pointer relative"
        onClick={() => setActiveChannel(channel)}
      >
        <div className="font-bold text-lg">
          {channel.data.name || "이름 없는 채널"}
        </div>
        <Button
          size="sm"
          color="primary"
          className="text-white"
          onClick={(e) => deleteChannel(channel, e)}
        >
          삭제
        </Button>
      </div>
    );
  };

  if (!client ) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        {/* <Spinner label="Loading..." color="warning"></Spinner> */}
      </div>
    );
  }

  return (
    <Card className="flex w-full h-full mt-5 p-5 ">
      <Chat 
        client={client} 
        theme="str-chat__theme-custom"
        i18nInstance={i18nInstance}
      >
        <div className="grid grid-cols-3 w-full">
          <div className="col-span-1 ">
            <ChannelList
              className="w-full"
              filters={filters}
              sort={sort}
              options={options}
              onSelect={handleChannelSelect}
              Preview={CustomChannelPreview}
            />
          </div>
          <div className="col-span-2 ">
            <Channel channel={activeChannel} className="w-full">
              <Window className="w-full">
                <div className="px-5">
                  <ChannelHeader className="w-full" />
                </div>

                <MessageList className="w-full" />
                <MessageInput className="w-full" />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </Card>
  );
}

export default StreamChat;
