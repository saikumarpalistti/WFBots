import { Document, MetadataMode, NodeWithScore, RouterQueryEngine, SimpleDirectoryReader, SummaryIndex, VectorStoreIndex, storageContextFromDefaults } from "llamaindex";
import { Request, Response } from "express";

import { promises as fs } from 'fs';
import path from 'path';

export async function queryDocument(req: Request) {
	try {
		if(!process.env.OPENAI_API_KEY) throw new Error("No Open AI Key Available to call.")
		
		const documents =  await new SimpleDirectoryReader().loadData({
			directoryPath:path.resolve(__dirname, './storage') ,
		  });
             if(documents!==null)
				{
                   console.log("have conntent")
				}
		  const vectorIndex = await VectorStoreIndex.fromDocuments(documents);
  const summaryIndex = await SummaryIndex.fromDocuments(documents);
		
  const vectorQueryEngine = vectorIndex.asQueryEngine();
  const summaryQueryEngine = summaryIndex.asQueryEngine();

  const queryEngine = RouterQueryEngine.fromDefaults({
    queryEngineTools: [
      {
        queryEngine: vectorQueryEngine,
        description: "Useful for summarization ",
      },
      {
        queryEngine: summaryQueryEngine,
        description: "Useful for retrieving specific data",
      },
    ],
  });
  
 
  const summaryResponse = await queryEngine.query({
    query:req.body.query
  });

  console.log({
	answer: summaryResponse.response,
	metadata: JSON.stringify(summaryResponse.metadata.selections)});
// res.status(200).json({data:summaryRespons
   
	}
	catch(err) {
		console.error(err);
	}
}
