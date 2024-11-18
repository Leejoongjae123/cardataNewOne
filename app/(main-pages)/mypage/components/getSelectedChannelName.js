import { useChatContext } from 'stream-chat-react';

// 현재 선택된 채널의 채널명을 반환하는 함수
const getSelectedChannelName = () => {
  const { channel } = useChatContext();

  // 선택된 채널이 없을 경우 null 반환
  if (!channel) return null;

  // 채널의 이름을 반환
  return channel.data.name || channel.id; // 이름이 없으면 채널 ID 반환
};

export default getSelectedChannelName;
