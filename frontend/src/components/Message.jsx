import { assets } from "../assets/assets";
import moment from "moment";
import Markdown from "react-markdown";
import Prism from "prismjs";
import { useEffect } from "react";

export default function Message({ message }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [message.content]);
  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/10 rounded-md max-w-2xl border border-[#80609F]/10">
            <p className="text-small dark:text-primary">{message.content}</p>
            <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img src={assets.user_icon} className="w-8 rounded-full" />
        </div>
      ) : (
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primart/20 dark:bg-[#57317C]/30 rounded-md border border-[#80609F]/30 dark:border-[#80609F]/10 my-4">
          {message.isImage ? (
            <img
              src={message.content}
              className="w-full max-w-md rounded-md mt-2"
            />
          ) : (
            <div className="text-small dark:text-primary reset-tw">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
          <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
}
