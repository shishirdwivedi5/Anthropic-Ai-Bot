const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const cohortGptindex = pc.index("cohort-ai");

async function createMemory({ messageId, embedding , embeddingAI, metadata }) {
 
  

  try {
    await cohortGptindex.upsert([
      {
        id: messageId,
        values: [embedding,embeddingAI],
         metadata:  metadata ,
      },
    ]);
    console.log("Pinecone upsert successful");
  } catch (error) {
    console.log("Pinecone upsert error:", error);
  }
}

async function getMemory(embedding, user_id) {
  try {
  const result =   await cohortGptindex.query({
      vector:  embedding,
      topK: 5,
      includeValues: false,
    includeMetadata: true,
    filter : {
      userId : user_id
    }
    }) 
    console.log("Pinecone query successful" )
     return result 
  } catch (error) {
    console.log("Pinecone query error:", error);
  }
}

module.exports = { createMemory ,  getMemory };
