import React, { useState } from "react";
import Navbar from "../component/Navbar";
import Select, { useStateManager } from "react-select";
import { BsStars } from "react-icons/bs";
import { RiCodeAiFill } from "react-icons/ri";
import editor, { Editor } from "@monaco-editor/react";
// import { PiExportDuotone } from "react-icons/pi";
import { IoCopyOutline } from "react-icons/io5";
import { PiExportFill } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { MdRefresh } from "react-icons/md";
import { GoogleGenAI } from "@google/genai";

const Home = () => {
  const options = [
    { value: "HTML-CSS", label: "HTML + CSS" },
    { value: "HTML-Tailwent", label: "HTML + TailwentCSS" },
    { value: "HTML-Bootstrap", label: "HTML + Bootstrap" },
    { value: "HTML-CSS-js", label: "HTML + CSS + js" },
    { value: "HTML-Tailwent-Bootstrap", label: "HTML + Tailwent + Bootstrap" },
  ];

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDPU8nEO0SpLVRAWchCMsHD1e6-sSBHZ-Q",
  });
  const [outputScreen, SetOutputscreen] = useState(true);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt]= useState("");
   const [framework, setFramework]=useState(options[0]);
   const [code, setCode]= useState("");
   const [loading, SetLoading]= useState(false);

  async function getResponse() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:` You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file.`,
    });
    console.log(response.text);
    setCode(response.text);
    SetOutputscreen(true);
    SetLoading(false);
  }

  return (
    <>
   
      <Navbar />
      <div className=" flex item-center px-[100px] justify-between gp-[20px]">
        <div className="left w-[48%] h-[80vh]  mt-[25px] border-[1px] bg-black/10bloor bloor border-white p-[20px]">
          <span>
            <h1 className="glow-basic">AI component generator</h1>{" "}
          </span>
          <p className="text-white mt-5 text-[30px]">
            Framework
          </p>
          
          <Select
      options={options}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#000",
          color: "#fff",
          borderColor: "#333",
          boxShadow: "none",
          "&:hover": { borderColor: "#555" },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#111",
          color: "#fff",
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: isSelected
            ? "#333"
            : isFocused
            ? "#222"
            : "#000",
          color: "#fff",
          cursor: "pointer",
        }),
        singleValue: (base) => ({
          ...base,
          color: "#fff",
        }),
        placeholder: (base) => ({
          ...base,
          color: "#aaa",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "#fff",
          "&:hover": { color: "#aaa" },
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: "#444",
        }),
        input: (base) => ({
          ...base,
          color: "#fff",
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#222", // hover
          primary: "#555",   // active
          neutral0: "#000",  // background
          neutral80: "#fff", // text
        },
      })}
      onChange={(e)=>{
        setFramework(e.value)
        console.log(e.value)
      }}
    />
         
          <p className="text-white mt-10 mb-3 text-3xl">
            describe your component
          </p>
          <textarea
             onChange={()=>{setPrompt(editor.target.value)}} value={prompt} className="bloor rounded-xl w-full min-h-[450px] p-[20px] text-[20px] "
            placeholder="Describe your component and let Ai will code for you...." //place hlder
          ></textarea>
          <button onClick={getResponse} className="  flex generate bg-white h-[60px] w-[140px] ">
            <i>
              <BsStars />
            </i>
            Generate
          </button>
        </div>
        <div
          className="right bloor
         left w-[48%] h-[80vh] bg-black/30 backdrop-brightness-10 border-[1px] border-white mt-[25px] flex flex-col items-center justify-center "
        >
          {outputScreen === false ? (
            <>
              {" "}
              {/* flex-col to next line  */}
              <div className="round h-[100px] w-[100px] rounded-[50%] flex items-center justify-center text-[40px]">
                <RiCodeAiFill />
              </div>
              <p className=" text-white mt-5 text-[gray] text-[20px]">
                Your component & code will appear here.
              </p>
            </>
          ) : (
            <>
              <div className="top h-[90px] w-[100%] ">
                <button
                  onClick={() => {
                    setTab(1);
                  }}
                  className={` w-[50%] p-[20px] mt-[7px] rounded-xl text-white transition-all ${
                    tab === 1 ? "bg-white/10 backdrop-blur-md" : ""
                  }`}
                >
                  code
                </button>
                <button
                  onClick={() => {
                    setTab(2);
                  }}
                  className={` w-[50%] p-[20px] mt-[7px] rounded-xl text-white transition-all ${
                    tab === 2 ? "bg-white-500 backdrop-blur-md" : "b"
                  }`}
                >
                  preview
                </button>
              </div>
              <div className=" flex h-[60px] w-full backdrop-blur-md ">
                <div className=" code_editor par flex items-center text-white justify-center text-[20px]  ">
                  <p>Code editor</p>
                </div>
                <div className="barbtn flex item-center  h-[100%] w-[20%] gap-[20px] ml-[500px] mb-[100px]">
                  {tab === 1 ? (
                    <>
                      <button className="h-[80%] w-[40%] mt-[5px] flex items-center justify-center text-[25px] rounded-xl round hover:bg-white/10 backdrop-blur-md text-white transition-all">
                        <PiExportFill />
                      </button>
                      <button className="h-[80%] w-[40%] mt-[5px] flex items-center justify-center text-[25px] rounded-xl round hover:bg-white/10 backdrop-blur-md text-white transition-all">
                        <IoCopyOutline />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="h-[80%] w-[40%] mt-[5px] flex items-center justify-center text-[25px] rounded-xl round hover:bg-white/10 backdrop-blur-md text-white transition-all">
                        <ImNewTab />
                      </button>
                      <button className="h-[80%] w-[40%] mt-[5px] flex items-center justify-center text-[25px] rounded-xl round hover:bg-white/10 backdrop-blur-md text-white transition-all">
                        <MdRefresh />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="editorr h-full w-full  ">
                {tab === 1 ? (
                  <>
                    <Editor
                      height="100%"
                      theme="vs-dark"
                      language="html"
                      value=""
                    />
                  </>
                ) : (
                  <>
                    <div className="preview w-full h-full flex item-center justyfy-center bg-white text-whitw"></div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
