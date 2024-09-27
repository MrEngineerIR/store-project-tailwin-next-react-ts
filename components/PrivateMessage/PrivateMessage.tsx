"use client";
import { getUser } from "@/actions/authenicate";
import getUserByEmail from "@/actions/getUserByEmail";
import getSenderMessagesToAdmin from "@/actions/getSenderMessagesToAdmin";
import sendPrivateMessage from "@/actions/sendPrivateMessage";
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { CgCheck } from "react-icons/cg";
import { BiCheckDouble } from "react-icons/bi";
import { RiArrowGoBackFill } from "react-icons/ri";
import getAdminId from "@/actions/getAdminId";
import getAllAdminMessagesToDestination from "@/actions/getAllAdminMessagesToDestination";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
import setPrivateMessageSeen from "@/actions/setPrivateMessageSeen";

const PrivateMessage = () => {
  const [userAllMessages, setUserAllMessages] = useState<
    PrivateMessageType[] | null
  >(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const rout = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoading(true);
      const userEmail = await getUser();
      const user = await getUserByEmail(userEmail!.email);
      const userMessages: PrivateMessageType[] | undefined =
        await getSenderMessagesToAdmin(user!._id);
      const adminMessages: PrivateMessageType[] | undefined =
        await getAllAdminMessagesToDestination(user!._id);
      const allMessages: PrivateMessageType[] | undefined = [];
      if (userMessages) {
        allMessages.push(...userMessages);
      }
      if (adminMessages) {
        allMessages.push(...adminMessages);
      }
      allMessages.sort((a, b) => a.createdAt - b.createdAt);
      const adminId = await getAdminId();
      const userEmailData = await getUser();
      const userData = await getUserByEmail(userEmailData!.email);
      adminMessages?.map(async (Pm) => {
        await setPrivateMessageSeen(adminId!, userData!._id, Pm._id!, true);
      });
      setUserAllMessages(allMessages || null);
      rout.refresh();
      setIsDataLoading(false);
    };

    fetchData();
  }, []);
  async function onKeyDownHandle(key: KeyboardEvent<HTMLInputElement>) {
    if (key.code === "Enter") {
      key.preventDefault();
      if (key.currentTarget.value.trim().length > 0) {
        await SendMessage(key.currentTarget.value);
        textAreaRef.current!.value = "";
      } else {
        //add notification logic that says you should write a text more than 10 charactor
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
    const userEmail = await getUser();
    const user = await getUserByEmail(userEmail!.email);
    const adminId = await getAdminId();
    if (!adminId) {
      return;
    }
    const res = await sendPrivateMessage(text, user!._id, adminId, "user");
    //if cant send pm to database remove pm from front
    if (!res) {
      return;
    }
    setUserAllMessages((prev) => {
      if (prev === null) {
        const PM: PrivateMessageType = {
          text: text,
          seen: false,
          from: "user",
        };
        return [PM];
      } else {
        const newPMs: PrivateMessageType[] = [
          ...prev,
          { text: text, seen: false, from: "user" },
        ];
        return newPMs;
      }
    });
    //check if res is false show a notification
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
      <button
        onClick={() => rout.back()}
        className="m-4 bg-white/10 rounded-full p-2  hover:bg-black/30"
      >
        <RiArrowGoBackFill />
      </button>
      <div className="flex flex-col space-y-4 mt-5 mb-40 px-4 max-h-[70vh] overflow-y-auto w-full">
        {userAllMessages?.map((item, index) => (
          <p
            key={index}
            className={`${
              item.from === "admin"
                ? "bg-blue-400 text-black self-end"
                : "bg-sky-600 text-white self-start"
            } w-auto max-w-[70%] p-2 rounded-md shadow-md break-words whitespace-normal mb-60`}
          >
            {item.text}{" "}
            {item.from === "user" ? (
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
      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 w-[90vw] sm:w-[80vw] max-w-[600px] flex items-center  gap-2 bg-white/50 backdrop-blur-sm p-2 rounded-md shadow-lg">
        <textarea
          ref={textAreaRef}
          placeholder="پیام خود را بنویسید"
          className="flex-grow h-12 p-2 placeholder:text-black text-black bg-transparent border border-gray-300 rounded-md resize-none focus:outline-none"
          onKeyDown={(e: any) => onKeyDownHandle(e)}
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

export { PrivateMessage };
