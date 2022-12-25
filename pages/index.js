import Head from 'next/head';
import Image from 'next/image';
import logo from '../assets/logo.png';
import { useState } from "react";

const Home = () => {
  const [ userInput, setUserInput ] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const onUserChangeText = (event) => {
	console.log(event.target.value);
	setUserInput(event.target.value);	
  } 

  const callGenerateEndpoint = async() => {
	  setIsGenerating(true);
	  
	  console.log("calling openAi...");
	  
	  const response = await fetch('/api/generate', {
		method: 'POST',
		headers: {
			//'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userInput })
	 });
	  
	  const data = await response.json();
	  const { output } = data;
	  
	  console.log("openAi replied...", output.text);
	  setApiOutput(`${output.text}`);
	  
	  setIsGenerating(false);
  }	
  	
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1><b>Trix The Creative</b></h1>
          </div>
          <div className="header-subtitle">
            <h2><i>hey it's Trix here, can I write that next hit for you?</i></h2>
          </div>
        </div>
		
		<div className="prompt-container">
			<textarea placeholder="e.g:  Write a rap song with the following words: bag, money, cars, lambo, gangstars, hoods, riffle, glock" 
			className="prompt-box" onChange={onUserChangeText} value={userInput}></textarea>
			<div className="prompt-buttons">
				<a className={isGenerating ? "generate-button loading" : "generate-button"} onClick={callGenerateEndpoint}>
					<div className="generate">
					{isGenerating ? <span className="loader"></span> : <p>Generate</p>}
					</div>
				</a>
			</div>
			{/**/}
			{apiOutput && (
				<div className="output">
					<div className="output-header-container">
						<div className="output-header">
							<h3>Output</h3>
						</div>
					</div>
					<div className="output-content">
						<p>{apiOutput}</p>
					</div>
				</div>  
			)}
		</div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://my-portfolio-quf2.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={logo} alt="buildspace logo" />
            <p>Meet The Creative</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
