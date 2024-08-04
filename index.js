const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

// Replace with your actual bot token and chat ID
const telegramBotToken = "7443063848:AAF9Qvh1YIWl4sMRIpXrmVgTiKgozZIcjs0";
const chatID = "-1002218125397"; // Replace with your channel or chat ID

// Initialize the Telegram bot
const bot = new TelegramBot(telegramBotToken, { polling: true });

// Function to fetch a random article title
async function getArticle() {
  const base_url = "https://en.wikipedia.org/w/api.php";
  const params = {
    format: "json",
    action: "query",
    list: "random",
    rnnamespace: 0,
    rnlimit: 1,
  };

  try {
    const res = await axios.get(base_url, { params });
    const articleTitle = res.data.query.random[0].title;
    return articleTitle;
  } catch (err) {
    console.error("Error fetching article title:", err);
    throw err;
  }
}

// Function to fetch the summary of an article
async function getSummary(articleTitle) {
  const base_url = "https://en.wikipedia.org/w/api.php";
  const params = {
    format: "json",
    action: "query",
    prop: "extracts",
    exintro: true,
    explaintext: true,
    titles: articleTitle,
  };

  try {
    const res = await axios.get(base_url, { params });
    const pages = res.data.query.pages;
    const pageId = Object.keys(pages)[0];
    const summary = pages[pageId].extract;
    return summary;
  } catch (err) {
    console.error(`Error fetching summary for article "${articleTitle}":`, err);
    throw err;
  }
}

// Function to fetch summary and post to Telegram
async function postArticleToTelegram(chatID) {
  try {
    const articleTitle = await getArticle();
    if (articleTitle) {
      const summary = await getSummary(articleTitle);
      const message = `*Title:* ${articleTitle}\n\n*Summary:* ${summary}`;
      await bot.sendMessage(chatID, message, { parse_mode: "Markdown" });
      console.log("Message posted successfully");
    }
  } catch (err) {
    console.error("Error in posting article to Telegram:", err);
  }
}

bot.onText(/\/newarticle/, (msg) => {
  const chatID = msg.chat.id;
  postArticleToTelegram(chatID);
});

postArticleToTelegram(chatID);
