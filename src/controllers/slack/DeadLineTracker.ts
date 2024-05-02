import { AllMiddlewareArgs, App, SlackCommandMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";

import { StringIndexed } from "@slack/bolt/dist/types/helpers";

// Initializes your app with credentials

export const deadlineTrackerBot: App<StringIndexed> | null =
	process.env.APP_TOKEN && process.env.SLACK_BOT_TOKEN && process.env.SLACK_SIGNING_SECRET
		? new App({
				token: process.env.SLACK_BOT_TOKEN,
				signingSecret: process.env.SLACK_SIGNING_SECRET,
				socketMode: true, // enable to use socket mode
				appToken: process.env.APP_TOKEN,
		  })
		: null;

export async function initializeDeadlineTrackerBot() {
	try {
		if (!deadlineTrackerBot) throw new Error("Deadline Tracker Could not be initialized");
		await deadlineTrackerBot.start(process.env.PORT || 3000);
		console.info("Deadline Tracker Bot Initialized!!");
		deadlineTrackerBot.message("hey", async ({ say }: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs<StringIndexed>) => {
			try {
				say("Hello Human!");
			} catch (error) {
				console.error(error);
			}
		});

		deadlineTrackerBot.command("/knowledge", async ({ command, say }: SlackCommandMiddlewareArgs & AllMiddlewareArgs<StringIndexed>) => {
			try {
				say("Knowledge Works!");
			} catch (error) {
				console.error(error);
			}
		});
		return deadlineTrackerBot;
	} catch (err) {
		console.error(err);
	}
}
