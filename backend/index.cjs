const OpenAI = require("openai");
let  Api_Key1 = "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";
let  Api_Key = "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";
const express = require( "express")
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const openai = new OpenAI({
  apiKey: Api_Key1, // defaults to process.env["OPENAI_API_KEY"]
})

app.post("/api/ques", async (req, res)=> {
  console.log(`${req.body.ques}`);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
   
    messages: [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": req.body.ques}
    ],
    stream: true
  });
  let rep=''
  for await (const chunk of completion) {
    if (chunk.choices[0].finish_reason == null) {
    rep+=chunk.choices[0].delta.content;
    console.log("ok");
    }
    console.log(chunk.choices[0]);
  }

  res.send(JSON.stringify({ans : rep}));

 });
app.listen(8080,()=>{
  console.log("listening on port 8080");
});