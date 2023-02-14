import { NextApiRequest ,NextApiResponse} from 'next';
import { Configuration, OpenAIApi } from 'openai';
import jimp from 'jimp';

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET,
  });
  const openai = new OpenAIApi(configuration);
  // Get data submitted in request's body.
  const body = req.body
  const {ingredients,theme,number,dish} = body;
  const textPrompt = `Create a catchy description for the following restauraunt or foods based on the folling details. ingredients: ${ingredients} , theme: ${theme}, dish : ${dish}:`;
  const imagePrompt = `close up view from above of ${dish} with ingredients : ${ingredients} a ${theme} theme and ${number} of ingredients against studio kitchen table + cinematic shot + up angle + shot with hasselblad + incredibly detailed, sharpen, details + dramatic lighting, + 50mm, 80mm, 100m + lightroom gallery + behance photographys + unsplash --q 2 --ar 3:2 --v 4 --uplight`;

  try{
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: textPrompt,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1000,
    });
    const images = await openai.createImage({
      prompt:imagePrompt,
      n:4,
      size:"1024x1024"
    });

    res.status(200).json({ data:{
      images: images.data.data,
      description:completion.data.choices[0].text,
    }})
  }catch(e){
    res.status(500).json({ data:{
      error:e
    }})
    console.log(e)
  }
}