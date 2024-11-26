// import { FloatingContactBtn } from "@/components/floating-contact-btn";
import { ChatFloatingContactBtn } from "./_components/chat-floating-contact-btn";
import Chat from "./_components/prebuilt/chat";

export default function Home() {
  return (
    <main className="flex items-center justify-center overscroll-none px-2 lg:px-24">
      <div className="flex flex-col space-y-4">
        <p className="text-center text-lg font-bold text-white md:text-4xl">
          Hello, m<span className="bg-yellow-400 text-accent-red">AI</span>
          Meals here. What can I help?
        </p>
        <Chat />
        <ChatFloatingContactBtn />
      </div>
    </main>
  );
}
