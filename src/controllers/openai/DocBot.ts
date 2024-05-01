import { Document, MetadataMode, NodeWithScore, VectorStoreIndex } from "llamaindex";
import { Request, Response } from "express";

import { promises as fs } from 'fs';
import path from 'path';

export async function queryDocument(req: Request) {
	try {
		if(!process.env.OPENAI_API_KEY) throw new Error("No Open AI Key Available to call.")
		const filePath = path.resolve(__dirname, 'test.md');
		const essay = await fs.readFile(filePath, "utf-8");
	
		// Create Document object with essay
		const document = new Document({ text: essay, id_: filePath });
	
		// Split text and create embeddings. Store them in a VectorStoreIndex
		const index = await VectorStoreIndex.fromDocuments([document]);
	
		// Query the index
		const queryEngine = index.asQueryEngine();
		const { response, sourceNodes } = await queryEngine.query({
			query: req.body.query,
		});
	
		// Output response with sources
		console.log(response);
		if (sourceNodes) {
			sourceNodes.forEach((source: NodeWithScore, index: number) => {
				console.log(`\n${index}: Score: ${source.score} - ${source.node.getContent(MetadataMode.NONE).substring(0, 50)}...\n`);
			});
		}
		return { response: response, sourceNodes: sourceNodes }
	}
	catch(err) {
		console.error(err);
	}
}
