const { https } = require('firebase-functions');
const { Configuration,OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
exports.getDatafromServer  = https.onCall((data) => {
  return openai.completion
  .create({
    model: 'text-davinci-002',
    prompt: data.prompt,
    max_tokens: 1024,
    temperature: 0.5
  })
    .then(response => {
      return response.text;
    })
    .catch(error => {
      console.log(error);
      throw new https.HttpsError('failed to complete GPT chat');
    });
});