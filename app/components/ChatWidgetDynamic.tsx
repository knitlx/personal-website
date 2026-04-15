"use client";

import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget"), {
  ssr: false,
});

interface ChatWidgetDynamicProps {
  title?: string;
}

export default function ChatWidgetDynamic({ title }: ChatWidgetDynamicProps) {
  return <ChatWidget title={title} />;
}
