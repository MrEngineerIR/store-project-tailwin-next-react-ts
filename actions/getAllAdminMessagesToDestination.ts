"use server";

import connectDB from "@/database/connectDB";
import SenderPrivateMessages from "@/models/SenderPrivateMessages";

const getAllAdminMessagesToDestination = async (destinationId: string) => {
  try {
    await connectDB();
    const res: SenderPrivateMessagesType | null =
      await SenderPrivateMessages.findOne({ destinationId });

    //TODO convert id to string then return res
    if (!res) return undefined;
    const messages: PrivateMessageType[] = res.sentPrivateMessages?.map(
      (pm: PrivateMessageType) => {
        const formatedPm: PrivateMessageType = {
          text: pm.text,
          seen: pm.seen,
          from: pm.from,
          _id: pm._id!.toString(),
          createdAt: pm.createdAt,
        };
        return formatedPm;
      }
    );
    return messages;
  } catch (error) {
    console.log(error, "from get user private messages");
    return undefined;
  }
};
export default getAllAdminMessagesToDestination;
