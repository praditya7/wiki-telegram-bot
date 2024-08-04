1. Made with:

- NodeJS

2. Prerequisites:

- axios module(npm install axios)
- node-telegram-bot module(npm install node-telegram-bot)

Dependencies are present in package.json file

3. Instructions to Run:

- Install all the dependencies.

- Replace the 'telegramBotToken' with your own token. Token can be generated using BotFather on Telegram. Search for BotFather on Telegram and type /newbot. This will generate a new bot along with token.

- Replace 'chatID' with your own chatID. chatID can be generated using Rose bot. Add Rose bot to the desired conversation. After that type /id and you will get the chatID.

- After the above steps we can run the script using 'node index.js' in the terminal.

- You can generate a new article at will using
  /newarticle in the the telegram chat. If it is a group chat, make sure the custom bot is an admin and has the permission to send messages.

API used:

- English Wikipedia API: https://en.wikipedia.org/w/api.php
