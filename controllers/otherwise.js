const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
  handle($) {
    $.sendMessage('Sorry I dont understand');
  }
}

module.exports = OtherwiseController;
