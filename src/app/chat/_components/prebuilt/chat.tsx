"use client";

import { useEffect, useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { type EndpointsContext } from "@/app/chat/agent";
import Image from "next/image";
import { useActions } from "@/utils/client";
import { LocalContext } from "@/app/chat/shared";
import { HumanMessageText, AIMessageText } from "./message";
import { Calories } from "./calories";
import { Menu } from "./menu";

function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]); // Remove the data URL prefix
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

function FileUploadMessage({ file }: { file: File }) {
  return (
    <div className="ml-auto flex w-full max-w-fit">
      <p>File uploaded: {file.name}</p>
    </div>
  );
}

export default function Chat() {
  const actions = useActions<typeof EndpointsContext>();

  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [history, setHistory] = useState<[role: string, content: string][]>([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    async function loadMessages() {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.length === 0) {
        setElements([
          <div
            key="default-buttons"
            className="flex h-[450px] items-center justify-center sm:space-x-4"
          >
            <button
              onClick={() => onSubmit("Lihat rekomendasi menu untuk saya")}
            >
              <Image
                src="calories-button.svg"
                width={100}
                height={100}
                alt="Calories"
              />
            </button>
            <Image src="logo.svg" width={100} height={100} alt="Logo" />
            <button onClick={() => onSubmit("Hitung keperluan kalori saya")}>
              <Image
                src="menu-button.svg"
                width={100}
                height={100}
                alt="Menu"
              />
            </button>
          </div>,
        ]);
      } else {
        setHistory(
          data.map(({ role, content }: { role: string; content: string }) => [
            role,
            content,
          ]),
        );
        setElements(
          data.map(
            (
              { role, content }: { role: string; content: string },
              index: number,
            ) => {
              if (content.includes("Tool result")) {
                let jsonData;
                try {
                  const jsonString = content
                    .replace(/"Tool result":\s*/, "")
                    .replace(/^"|"$/g, "")
                    .trim();

                  jsonData = JSON.parse(jsonString);
                } catch (error) {
                  console.error("Invalid JSON format:", error);
                  jsonData = null;
                }

                return (
                  <div
                    key={index}
                    className="mr-auto flex w-full max-w-fit flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0"
                  >
                    {jsonData ? (
                      Array.isArray(jsonData) ? (
                        jsonData.map(
                          (
                            item: {
                              id: number;
                              calories: number;
                              gramation: number;
                              description: string;
                              menu_name: string;
                            },
                            idx: number,
                          ) => <Menu {...item} key={idx} />,
                        )
                      ) : (
                        <Calories {...jsonData} />
                      )
                    ) : (
                      <p>Invalid JSON content</p>
                    )}
                  </div>
                );
              }

              return (
                <div key={index} className="mt-auto flex w-full space-y-4">
                  {role === "human" ? (
                    <HumanMessageText content={content} />
                  ) : (
                    <AIMessageText content={content} />
                  )}
                </div>
              );
            },
          ),
        );
      }
    }
    loadMessages();
  }, []);

  async function onSubmit(input: string) {
    const newElements = [...elements];
    let base64File: string | undefined = undefined;
    let fileExtension = selectedFile?.type.split("/")[1];
    if (selectedFile) {
      base64File = await convertFileToBase64(selectedFile);
    }
    const element = await actions.agent({
      input,
      chat_history: history,
      file:
        base64File && fileExtension
          ? {
              base64: base64File,
              extension: fileExtension,
            }
          : undefined,
    });

    newElements.push(
      <div
        className="mt-auto flex w-full flex-col space-y-4"
        key={history.length}
      >
        {selectedFile && <FileUploadMessage file={selectedFile} />}
        <HumanMessageText content={input} />
        <div className="mr-auto flex w-full max-w-fit flex-col space-y-4">
          {element.ui}
        </div>
      </div>,
    );

    (async () => {
      let lastEvent = await element.lastEvent;
      if (Array.isArray(lastEvent)) {
        if (lastEvent[0].invoke_model && lastEvent[0].invoke_model.result) {
          setHistory((prev) => [
            ...prev,
            ["human", input],
            ["ai", lastEvent[0].invoke_model.result],
          ]);
          try {
            await fetch("/api/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                role: "human",
                content: input,
              }),
            });
            await fetch("/api/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                role: "ai",
                content: lastEvent[0].invoke_model.result,
              }),
            });
          } catch (error) {
            console.error(error);
          }
        } else if (lastEvent[1].invoke_tools) {
          setHistory((prev) => [
            ...prev,
            ["human", input],
            [
              "ai",
              `Tool result: ${JSON.stringify(lastEvent[1].invoke_tools.tool_result, null)}`,
            ],
          ]);
          try {
            await fetch("/api/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                role: "human",
                content: input,
              }),
            });
            await fetch("/api/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                role: "ai",
                content: `"Tool result": ${JSON.stringify(lastEvent[1].invoke_tools.tool_result, null)}`,
              }),
            });
          } catch (error) {
            console.error(error);
          }
        } else {
          setHistory((prev) => [...prev, ["human", input]]);
          try {
            await fetch("/api/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                role: "human",
                content: input,
              }),
            });
          } catch (error) {
            console.error(error);
          }
        }
      } else if (lastEvent.invoke_model && lastEvent.invoke_model.result) {
        setHistory((prev) => [
          ...prev,
          ["human", input],
          ["ai", lastEvent.invoke_model.result],
        ]);
        try {
          await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              role: "human",
              content: input,
            }),
          });
          await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              role: "ai",
              content: lastEvent.invoke_model.result,
            }),
          });
        } catch (error) {
          console.error(error);
        }
      }
    })();

    setElements(newElements);
    setInput("");
    setSelectedFile(undefined);
  }

  return (
    <div className="mx-auto flex h-[80vh] w-[90vw] flex-col space-y-4 overflow-y-scroll rounded-lg border-[1px] border-white bg-white p-3 shadow-2xl md:h-[78vh] md:w-[70vw]">
      <LocalContext.Provider value={onSubmit}>
        <div className="mt-auto flex w-full flex-col space-y-4">{elements}</div>
      </LocalContext.Provider>
      <form
        onSubmit={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          await onSubmit(input);
        }}
        className="flex w-full flex-row gap-2"
      >
        <Input
          placeholder="Berikan menu rekomendasi menu untuk saya apabila saya suka makan ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Kirim</Button>
      </form>
    </div>
  );
}
