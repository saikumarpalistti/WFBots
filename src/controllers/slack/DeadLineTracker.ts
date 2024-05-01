const { App } = require("@slack/bolt");
require("dotenv").config();

// Initializes your app with credentials
export const deadlineTrackerBot = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	socketMode: true, // enable to use socket mode
	appToken: process.env.APP_TOKEN,
});

export async function initializeDeadlineTrackerBot() {
	const port = 3000;
	await deadlineTrackerBot.start(process.env.PORT || port);

	deadlineTrackerBot.message("hey", async ({ command, say }: { command: string; say: any }) => {
		try {
			say("Hello Human!");
		} catch (error) {
			console.log("err");
			console.error(error);
		}
	});
	deadlineTrackerBot.command("/knowledge", async ({ command, say }: { command: string; say: any }) => {
		try {
			say("Knowledge Works!");
		} catch (error) {
			console.log("err");
			console.error(error);
		}
	});
	console.log("Bolt app started!!");
}
