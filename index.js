const Telegram = require('telegram-node-bot'),
  tg = new Telegram.Telegram('356500286:AAEaPNsrxCg4IaB8MDHfgdjg-mI8KLoItd0', {
    workers: 1
  });

const  TodoController = require('./controllers/todo');
const  OtherwiseController = require('./controllers/otherwise');

const todoCtrl = new TodoController();

tg.router
  .when(new Telegram.TextCommand('/add', 'addCommand'), todoCtrl)
  .when(new Telegram.TextCommand('/get', 'getCommand'), todoCtrl)
  .otherwise(new OtherwiseController());
