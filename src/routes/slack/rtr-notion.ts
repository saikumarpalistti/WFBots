import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post("/read/database", async (req, res, next) => {
	try {
		console.log(req.body);
	} catch (err) {
		res.status(400).json({ error: err, data: null });
	}
});

router.param("", async (req, res, next) => {
});

export default router;
