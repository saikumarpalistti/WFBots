import express, { Application } from "express";

/**
 * This file contains routes related to webhook router
 */
import llamaRouter from './rtr-llama'

const router = express.Router();

router.use('/llama', llamaRouter);

export default router;