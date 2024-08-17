export default function Page({ params }: { params: { sessionId: string } }) {
  return (
    <div className="flex flex-row justify-center pt-56 text-5xl text-black">
      Chatbot session for sessionId: {params.sessionId}
    </div>
  );
}
