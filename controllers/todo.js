'use strict';

const Telegram = require('telegram-node-bot');

class TodoController extends Telegram.TelegramBaseController {
  addHandler($) {
    let todo = $.message.text.split(' ').slice(1).join(' '); // Removes the comand word from the message

    if (!todo) return $.sendMessage('Sorry please pass a todo item'); // Error message if command is not valid

    $.getUserSession('todos').then(todos => {
      if (!Array.isArray(todos)) $.setUserSession('todos', [todo]);
      else $.setUserSession('todos', todos.concat([todo]))
      $.sendMessage(`You just added: ${todo}`);
    });
  }

  getHandler($) {
    // let todo = $.message.text.split(' ').slice(1).join(' ');
    $.getUserSession('todos').then(todos => {
      // $.sendMessage(`Your todos: ${todos}`);
      $.sendMessage(this._serializeList(todos), { parse_mode: 'Markdown' });
    });
  }

  get routes() {
    return {
      'addCommand': 'addHandler',
      'getCommand': 'getHandler'
    };
  }
  // My serialize function
  _serializeList(todoList) {
    let serialized = '*Your Todos:*\n';
    todoList.forEach((t, i) => {
      serialized += `*${i}* - ${t}\n`;
    });
    return serialized;
  }

  // // His serialize function
  // _serializeList(todoList) {
  //   let serialized = '*Your Todos:*\n\n';
  //   todoList.forEach((t, i) => {
  //     serialized += `*${i}* - ${t}\n`;
  //   });
  //   return serialized;
  //  }
}

module.exports = TodoController;
