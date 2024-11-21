import Link from "next/link";

export default function Page({ params }: { params: { sessionId: string } }) {
  return (
    <div className="flex flex-col items-center justify-center pt-[30vh] text-5xl font-semibold text-black">
      {/* Chatbot session for sessionId: {params.sessionId} */}
      <p className="pb-6">
        This page is <br />
        under{" "}
        <span className="bg-accent-red px-2 font-bold text-white">
          construction
        </span>
      </p>
      <p className="text-3xl font-medium leading-5">To return back</p>
      <Link href={`/`}>
        <p className="text-3xl font-normal text-accent-red">click here</p>
      </Link>
    </div>
  );
}
