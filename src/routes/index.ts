/**
 * Sets up routes for the provided Express application
 */

import express, { Application } from "express";

import openAIRouter from "./openai"

/**
 * Sets up routes for the provided Express application
 *
 * @param {Application} server - The Express Application object
 */
const setRoutes = (server: Application): void => {
	/**
	 * HTTP/HTTPS Router
	 */
	server.use('/openai', openAIRouter)
};

export default setRoutes;
