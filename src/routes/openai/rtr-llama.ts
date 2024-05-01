import express, { NextFunction, Request, Response } from "express";

import { queryDocument } from "../../controllers/openai/DocBot";

const router = express.Router();

router.post("/query/docs", async (req, res, next) => {
	try {
		console.log(req.body);
		let resp = await queryDocument(req);
		res.status(200).json(resp);
	} catch (err) {
		res.status(400).json({ error: err, data: null });
	}
});

router.param("", async (req, res, next) => {});

export default router;
