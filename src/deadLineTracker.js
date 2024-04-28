const { App } = require("@slack/bolt");
require("dotenv").config();
// Initializes your app with credentials
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode:true, // enable to use socket mode
    appToken: process.env.APP_TOKEN
});

async function initializeBot() {
  const port = 3000
  await app.start(process.env.PORT || port);
  console.log('Bolt app started!!');
};

initializeBot().then(() => {
    app.message("hey", async ({ command, say }) => {
        try {
          say("Hello Human!");
        } catch (error) {
            console.log("err")
          console.error(error);
        }
    });
})