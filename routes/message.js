const express = require("express");
const data = require("./data");
const fs = require("fs");

const router = express.Router();

function formatChatHistory(chatHistory) {
      return chatHistory.split('\n')
          .filter(Boolean)
          .map(line => {
              try {
                  const parsedMessage = JSON.parse(line);
                  return `<p>${Object.values(parsedMessage).join(' ')}</p>\n`;
              } catch (error) {
                  console.error('Error parsing message:', error);
                  return ''; 
              }
          })
          .join('');
  }
  

router.get(`/`, (req, res, next) => {
  let chatHistory = "";
  try {
    chatHistory = fs.readFileSync("message.txt", "utf8");
  } catch (err) {
    console.error("Error reading message.txt:", err);
  }
  res.send(`
             <div>
            <h1>Chat History</h1>
            <div>${formatChatHistory(chatHistory)}</div>
        </div>
            <form action="/" onsubmit= "document.getElementById('username').value=localStorage.getItem('username')" method="POST">
            <input id="message" name="message" type="text"placeHolder="message">
            <input type="hidden" name="username" id="username">
            <button type="submit">send</button></form>
            `);
});
router.post(`/`, (req, res, next) => {
  data.push(`${req.body.username}:${req.body.message}`);
  console.log(data);
  console.log(`${req.body.username}:${req.body.message}`);
  const chat = JSON.stringify(data);
  fs.writeFileSync("message.txt", chat);

  res.redirect(`/`);
});

module.exports = router;
