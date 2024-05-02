import { deadlineTrackerBot, initializeDeadlineTrackerBot } from "./deadLineTracker";

export async function initializeSlackBots() {
	try {
		if (process.env.APP_TOKEN && process.env.SLACK_BOT_TOKEN && process.env.SLACK_SIGNING_SECRET) {
			await initializeDeadlineTrackerBot();
		} else {
			throw new Error("No Slack API Tokens or Keys available to Call. Slack Bots did not get initialized.");
		}
	} catch (err) {
		console.error(err);
		return {};
	}
}
