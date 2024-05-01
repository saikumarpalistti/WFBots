import { deadlineTrackerBot, initializeDeadlineTrackerBot } from "./DeadLineTracker";

export async function initalizeSlackBots() {
    await initializeDeadlineTrackerBot();
}