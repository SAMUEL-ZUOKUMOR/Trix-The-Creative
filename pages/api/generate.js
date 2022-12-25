import { Configuration, OpenAIApi } from "openai";
require("dotenv").config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

//base prompt
const basePromptPrefix = "";

const generateAction = async (req, res) => {
	
	console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
	
	  const baseCompletion = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${basePromptPrefix}${req.body.userInput}\n`,
		temperature: 0.7,
		max_tokens: 350,
	  });
	
	const basePromptOutput = baseCompletion.data.choices.pop();
	
	//second prompt
	const secondPrompt = `${req.body.userInput}${basePromptOutput}`
	
	const secondPromptCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${secondPrompt}`,
		temperature: 0.8,
		max_tokens: 450
	});
	
	const secondPromptOutput = secondPromptCompletion.data.choices.pop();
	
	res.status(200).json({ output: secondPromptOutput });
}
	
export default generateAction;	
	
