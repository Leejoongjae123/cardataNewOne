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
import { Button, Input, Spinner } from "@nextui-org/react";
import { createToken } from "@/lib/action";
import "stream-chat-react/dist/css/v2/index.css";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

function StreamChat({ carSpec, dictionary, carData, userData, language }) {
  const [channelName, setChannelName] = useState("");
  const [activeChannel, setActiveChannel] = useState(null);
  const [fullChannelName, setFullChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (client) {
      findOrCreateChannel();
    }
  }, [client, fullChannelName]);

  const findOrCreateChannel = async () => {
    if (!client) return;
    setIsLoading(true);
    try {
      const channelName = carData.title?.[language];
      const fullChannelName = channelName + "_" + carData.id + `_${language}`;
      setFullChannelName(fullChannelName);

      // 기존 채널 검색
      const existingChannels = await client.queryChannels(
        { name: fullChannelName },
        { last_message_at: -1 },
        { limit: 1 }
      );

      if (existingChannels.length > 0) {
        const channel = existingChannels[0];
        await channel.watch();
        setActiveChannel(channel);
        setIsLoading(false);
        return;
      }

      // 새 채널 생성
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newChannel = client.channel("messaging", uniqueId, {
        members: [userData.id, "connectcar_ceo"],
        name: fullChannelName,
        created_by_id: userData.id,
      });

      await newChannel.create();
      await newChannel.watch();
      setActiveChannel(newChannel);
    } catch (error) {
      console.error("채널 처리 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
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
        className="flex justify-between p-4 border-b hover:bg-gray-100 cursor-pointer"
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

  console.log("carData:", carData);

  if (!client || isLoading)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Spinner
          label={dictionary.chat.loading[language]}
          color="warning"
        ></Spinner>
      </div>
    );

  return (
    <div className="flex w-full h-full">
      <Chat client={client} theme="str-chat__theme-custom">
        <div className="flex w-full">
          <div className="w-full h-full">
            <Channel channel={activeChannel} className="w-full">
              <Window className="w-full ">
                {/* <div className="w-full px-10 flex">
                  <Image src={carData?.uploadedImageUrls[0]?.url} alt={carData.title[language]} width={100} height={100}></Image>
                  <div className="flex flex-col">
                    <div className="text-lg font-bold">{carData.title[language]}</div>
                    <div className="text-medium text-gray-500">{carData.price}원</div>
                  </div>
                </div> */}
                <div className="flex px-10 gap-x-5">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={carData?.uploadedImageUrls[0]?.url}
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col justify-center items-start px-10 w-full gap-y-5">
                    <div className="text-lg font-bold">
                      {carData.title[language]}
                    </div>
                    <div className="text-medium text-gray-500">
                      {carSpec}
                    </div>
                  </div>
                </div>

                <MessageList className="w-full" scrollBehavior="smooth" />
                <MessageInput className="w-full " />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
}

export default StreamChat;
