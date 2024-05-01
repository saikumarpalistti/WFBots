import { deadlineTrackerBot, initializeDeadlineTrackerBot } from "./DeadLineTracker";

export async function initializeSlackBots() {
	try {
		if (!(process.env.APP_TOKEN && process.env.SLACK_BOT_TOKEN && process.env.SLACK_SIGNING_SECRET))
			throw new Error("No Slack API Tokens or Keys available to Call.");
		await initializeDeadlineTrackerBot();
	} catch (err) {
		console.error(err);
	}
}
