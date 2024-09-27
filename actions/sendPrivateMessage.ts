"use server";
import connectDB from "@/database/connectDB";
import PrivateMessage from "@/models/PrivateMessage";
import SenderPrivateMessages from "@/models/SenderPrivateMessages";
import { revalidatePath } from "next/cache";

const sendPrivateMessage = async (
  text: string,
  senderId: string,
  destinationId: string,
  from: string
) => {
  //TODO validate if text is not so short or so long
  await connectDB();
  try {
    const newPrivateMessage = new PrivateMessage({
      senderId,
      text: text,
      seen: false,
      from,
    });
    const SenderAllMessages: SenderPrivateMessagesType[] | null =
      await SenderPrivateMessages.find({ senderId });
    const doesSenderHasChatWhitDestination = SenderAllMessages?.some(
      (pm) => pm.destinationId === destinationId
    );
    if (SenderAllMessages && doesSenderHasChatWhitDestination) {
      await SenderPrivateMessages.findOneAndUpdate(
        { senderId: senderId, destinationId: destinationId },
        { $push: { sentPrivateMessages: newPrivateMessage } }
      );
      return true;
    } else {
      const newUserPrivateMessages = new SenderPrivateMessages({
        senderId,
        destinationId,
        from,
        sentPrivateMessages: [newPrivateMessage],
      });
      await newUserPrivateMessages.save();
      revalidatePath("/", "layout");
      return true;
    }
  } catch (error: any) {
    console.log(error.message, "from sendPrivateMessage Action");
    return false;
  }
};

export default sendPrivateMessage;
