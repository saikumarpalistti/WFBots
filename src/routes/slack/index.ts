import express, { Application } from "express";

/**
 * This file contains routes related to webhook router
 */
import notionRouter from './rtr-notion'

const router = express.Router();

router.use('/notion', notionRouter);

export default router;