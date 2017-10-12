'use strict';

const Telegram = require('telegram-node-bot');

class TodoController extends Telegram.TelegramBaseController {
  addHandler($) {
    $.getUserSession('I am alive 🤖 🤖 🤖')
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

  checkHandler($) {
    let index;
    index = parseInt($.message.text.split(' ').slice(1)[0]);
    if (isNaN(index)) return $.sendMessage('Sorry you didn\' pass a valid index');
    $.getUserSession('todos').then(todos => {
      if (index >= todos.length) return $.sendMessage('Sorry you didn\' pass a valid index');
      todos.splice(index, 1);
      $.setUserSession('todos', todos);
      $.sendMessage('Checked TODO');
    })
  }

  get routes() {
    return {
      'addCommand': 'addHandler',
      'getCommand': 'getHandler',
      'checkCommand': 'checkHandler'
    };
  }

  _serializeList(todoList) {
    let serialized = '*Your Todos:*\n';
    todoList.forEach((t, i) => {
      serialized += `*${i}* - ${t}\n`;
    });
    return serialized;
  }

}

module.exports = TodoController;
