"use server";

import connectDB from "@/database/connectDB";
import PrivateMessageInfo from "./PrivateMessageInfo";
import SenderPrivateMessages from "@/models/SenderPrivateMessages";
import { BiSmile } from "react-icons/bi";
import getAdminId from "@/actions/getAdminId";
const UserPrivateMessageList = async () => {
  await connectDB();
  const admin = await getAdminId();
  const allUserPivateMessage: SenderPrivateMessagesType[] =
    await SenderPrivateMessages.find({ senderId: { $ne: admin } });
  if (allUserPivateMessage.length === 0) {
    return (
      <p className=" mt-20 flex justify-center items-center">
        پیامی ندارید ...
        <BiSmile />
      </p>
    );
  }
  const formatedMessages: SenderPrivateMessagesType[] =
    allUserPivateMessage.map((Pm, i) => {
      const formatedMessage: SenderPrivateMessagesType = {
        senderId: Pm.senderId.toString(),
        destinationId: Pm.destinationId.toString(),
        sentPrivateMessages: [
          ...Pm.sentPrivateMessages.map((item) => {
            const formatedPrivateMessage: PrivateMessageType = {
              text: item.text,
              seen: item.seen,
              _id: item._id?.toString(),
              from: item.from,
            };
            return formatedPrivateMessage;
          }),
        ],
      };
      return formatedMessage;
    });
  return (
    <ul className=" space-y-5 mt-20">
      {formatedMessages.map((userPM) => (
        <PrivateMessageInfo key={userPM.senderId} userPrivateMessage={userPM} />
      ))}
    </ul>
  );
};
export default UserPrivateMessageList;
