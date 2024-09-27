"use server";

import connectDB from "@/database/connectDB";
import SenderPrivateMessages from "@/models/SenderPrivateMessages";

const setPrivateMessageSeen = async (
  senderId: string,
  destinationId: string,
  privateMessageId: string,
  seenState: boolean
) => {
  try {
    await connectDB();
    await SenderPrivateMessages.findOneAndUpdate(
      { senderId, destinationId, "sentPrivateMessages._id": privateMessageId },
      { $set: { "sentPrivateMessages.$.seen": seenState } }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export default setPrivateMessageSeen;
