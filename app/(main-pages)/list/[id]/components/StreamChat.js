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
import { createClient } from "@/utils/supabase/client";
function StreamChat({
  profiles,
  carSpec,
  dictionary,
  carData,
  userData,
  language,
}) {
  const [channelName, setChannelName] = useState("");
  const [activeChannel, setActiveChannel] = useState(null);
  const [fullChannelName, setFullChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);
  const supabase = createClient();

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
    if (!client || isCreatingChannel) return;
    setIsCreatingChannel(true);
    setIsLoading(true);

    try {
      const channelName = carData.title?.[language];
      const fullChannelName = channelName + "_" + carData.id + `_${language}`;
      setFullChannelName(fullChannelName);

      // Check if the channel is already active
      if (activeChannel && activeChannel.data.name === fullChannelName) {
        setIsLoading(false);
        return;
      }
      console.log("123123");

      // 기존 채널 검색
      let existingChannels = [];
      try {
        existingChannels = await client.queryChannels(
          { name: fullChannelName },
          { last_message_at: -1 },
          { limit: 1 }
        );
      } catch (error) {
        console.error("채널 검색 중 오류 발생:", error);
        existingChannels = [];
      }



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

      console.log("newChannel:", newChannel);

      await newChannel.create();
      await newChannel.watch();
      setActiveChannel(newChannel);

      try {
        const { data: existingChat, error: fetchError } = await supabase
          .from('chatInfo')
          .select('*')
          .eq('chatId', newChannel.id)
          .limit(1); // Limit to 1 to ensure single row
        console.log("existingChat:", existingChat);
        if (fetchError) {
          console.error("Supabase에서 chatId 조회 중 오류 발생:", fetchError);
        } else if (existingChat && existingChat.length > 0) {
          console.log("이미 존재하는 chatId입니다. 데이터 저장을 건너뜁니다.");
        } else {
          // Insert new chatId and profiles if it doesn't exist
          const { data, error } = await supabase
            .from('chatInfo')
            .insert([
              { chatId: newChannel.id, profiles: profiles }
            ]);

          if (error) {
            console.error("Supabase에 데이터 저장 중 오류 발생:", error);
          } else {
            console.log("Supabase에 데이터가 성공적으로 저장되었습니다:", data);
          }
        }
      } catch (error) {
        console.error("Supabase 처리 중 오류 발생:", error);
      }
    } catch (error) {
      console.error("채널 처리 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
      setIsCreatingChannel(false);
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
                    {carData.platform === "SKEncar" ? (
                      <>
                        <div className="text-lg font-bold">
                          {carData.title[language]}
                        </div>
                        <div className="text-medium text-gray-500">
                          {carSpec}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-lg font-bold">
                          {carData?.titlePo[language]}
                        </div>
                        <div className="text-medium text-gray-500">
                          {`${carData.modelYearPo} · ${carData.mileagePo}km · ${carData.isAccidentPo[language]} · ${carData.carNoPo}`}
                        </div>
                      </>
                    )}
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
