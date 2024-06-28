// App.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import MarkdownRenderer from "./components/MarkdownRender";

import './styles/App.scss'

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const res = await axios.get("http://localhost:8000/prompt", { params: { prompt } });
      setResponse(res.data.message);
    } catch (error) {
      console.error("Error fetching the response", error);
      setResponse("Error fetching the response");
    }
  };

  return (
    <>
      <div className="title">
        2024 DACON LLM MODEL
      </div>
      <div className="nav_container">
        <form onSubmit={handleSubmit}>
          <input
            className="summit_input"
            type="text"
            placeholder="Enter the prompt"
            value={prompt}
            onChange={handleInputChange}
          />
          <button className="summit_btn" type="submit">Submit</button>
        </form>
      </div>

        {response && (
          <div className="response_container">
            <h3>Response:</h3>
            <MarkdownRenderer markdownContent={response} />
          </div>
        )}
    </>
  );
}

export default App;
