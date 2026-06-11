const { GoogleGenAI } = require("@google/genai");

async function embaddingModel(userData) {
  const ai = new GoogleGenAI({});
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: userData,
     config : {
        outputDimensionality: 768,
     }
  });

 return response.embeddings[0].values
}

module.exports = embaddingModel;
