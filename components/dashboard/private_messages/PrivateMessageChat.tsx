"use client";
import getAdminId from "@/actions/getAdminId";
import getAllAdminMessagesToDestination from "@/actions/getAllAdminMessagesToDestination";
import getSenderMessagesToAdmin from "@/actions/getSenderMessagesToAdmin";
import sendPrivateMessage from "@/actions/sendPrivateMessage";
import setPrivateMessageSeen from "@/actions/setPrivateMessageSeen";
import { useRouter } from "next/navigation";
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { BiCheckDouble } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { CgCheck } from "react-icons/cg";
import { BarLoader } from "react-spinners";

const PrivateMessageChat = ({ destinationId }: { destinationId: string }) => {
  const [userAllMessages, setUserAllMessages] = useState<
    PrivateMessageType[] | null
  >(null);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const rout = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoading(true);
      const userMessages = await getSenderMessagesToAdmin(destinationId);
      const adminMessages = await getAllAdminMessagesToDestination(
        destinationId
      );
      const allMessages = [...(userMessages || []), ...(adminMessages || [])];
      const sortedMessages = allMessages.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      const adminId = await getAdminId();
      userMessages?.map(async (Pm) => {
        await setPrivateMessageSeen(destinationId, adminId!, Pm._id!, true);
      });
      setUserAllMessages(sortedMessages || null);
      rout.refresh();
      setIsDataLoading(false);
    };

    // Set up the interval to fetch data every 1 second
    fetchData();
  }, [destinationId]);

  async function onKeyDownHandle(key: KeyboardEvent<HTMLTextAreaElement>) {
    if (key.code === "Enter") {
      key.preventDefault();
      if (key.currentTarget.value.trim().length > 0) {
        await SendMessage(key.currentTarget.value);
        textAreaRef.current!.value = "";
      }
    }
  }

  async function handleSendButtonClick(e: MouseEvent<HTMLButtonElement>) {
    if (textAreaRef.current && textAreaRef.current.value.length > 0) {
      await SendMessage(textAreaRef.current.value);
      textAreaRef.current.value = "";
    }
  }

  async function SendMessage(text: string) {
    const newMessage: PrivateMessageType = {
      text: text,
      seen: false,
      from: "admin",
      createdAt: new Date().toISOString(),
    };

    const adminId = await getAdminId();
    if (!adminId) {
      return;
    }

    const res = await sendPrivateMessage(text, adminId, destinationId, "admin");

    if (!res) {
      return;
    }
    setUserAllMessages((prev) => [...(prev || []), newMessage]);
  }
  if (!userAllMessages) {
    return (
      <div className="mt-[50vh] flex justify-center">
        <BarLoader />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col space-y-4 mt-5 mb-40 px-4 max-h-[70vh] overflow-y-auto w-full">
        {userAllMessages?.map((item, index) => (
          <p
            key={index}
            className={`${
              item.from === "admin"
                ? "bg-blue-400 text-black self-end"
                : "bg-sky-600 text-white self-start"
            } w-auto max-w-[70%] p-2 rounded-md shadow-md break-words whitespace-normal`}
          >
            {item.text}{" "}
            {item.from === "admin" ? (
              item.seen ? (
                <BiCheckDouble />
              ) : (
                <CgCheck />
              )
            ) : undefined}
          </p>
        ))}
      </div>

      {/* Input Section */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-[90vw] sm:w-[80vw] max-w-[600px] flex items-center gap-2 bg-white/50 backdrop-blur-sm p-2 rounded-md shadow-lg">
        <textarea
          ref={textAreaRef}
          placeholder="پیام خود را بنویسید"
          className="flex-grow h-12 p-2 placeholder:text-black text-black bg-transparent border border-gray-300 rounded-md resize-none focus:outline-none"
          onKeyDown={onKeyDownHandle}
        />
        <button
          onClick={handleSendButtonClick}
          className="flex items-center box-border justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
        >
          <BsSend className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default PrivateMessageChat;
