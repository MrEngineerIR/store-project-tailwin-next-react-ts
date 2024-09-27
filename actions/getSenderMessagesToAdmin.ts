"use server";

import connectDB from "@/database/connectDB";
import SenderPrivateMessages from "@/models/SenderPrivateMessages";

const getSenderMessagesToAdmin = async (senderId: string) => {
  await connectDB();
  const res: SenderPrivateMessagesType | null =
    await SenderPrivateMessages.findOne({
      senderId,
    });
  if (!res) {
    return undefined;
  }

  const messages: PrivateMessageType[] = res.sentPrivateMessages?.map((Pm) => {
    const formatedPm: PrivateMessageType = {
      seen: Pm.seen,
      text: Pm.text,
      from: Pm.from,
      _id: Pm._id?.toString(),
      createdAt: Pm.createdAt,
    };
    return formatedPm;
  });
  return messages;
};
export default getSenderMessagesToAdmin;
