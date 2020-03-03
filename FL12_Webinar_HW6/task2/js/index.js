const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");
const $search_input = $("#search");
const $search = $("#search-submit");
const $search_cancel = $("#search-cancel");



//Add to local storage plugin
(function( $ ) {
  $.fn.handleFirstLoad = function() {
    const key = 'tasks';
    if (localStorage.getItem(key)) {
      let tasks = JSON.parse(localStorage.getItem(key));
      tasks.forEach( task => {
        $list.prepend (
          $('<li/>', {'class': 'item'}).append(
              $('<span/>', {'class': 'item-text'}).text(task.text)
          ).append(
              $('<button/>', {'class': 'item-remove'}).text('Remove')
          )
        );
      })
    }
  }
  $.fn.addtoLocalStorage = function(newItemText) {
    const newItem = {
      text: newItemText,
      done: false,
    }
    const key = 'tasks';
      let tasks;
      if (!localStorage.getItem(key)) {
        tasks = []; 
      } else {
        tasks = JSON.parse(localStorage.getItem(key));
      }
      tasks.push(newItem);
      localStorage.setItem('tasks',JSON.stringify(tasks));
      return this;
  }
  $.fn.removeFromLocalStorage = function(taskName) {
    const key = 'tasks';
      let tasks = JSON.parse(localStorage.getItem(key));
      let index = tasks.findIndex(task => task.text === taskName);
      tasks.splice(index,1);

      localStorage.setItem('tasks',JSON.stringify(tasks));
      return this;
  }
  $.fn.changeStatus = function(taskName) {
    const key = 'tasks';
      let tasks = JSON.parse(localStorage.getItem(key));
      let index = tasks.findIndex(task => task.text === taskName);
      tasks[index].done = tasks[index].done ? false : true;

      localStorage.setItem('tasks',JSON.stringify(tasks));
      return this;
  }
}( jQuery ));

//Get and show items from the local storage
$( document ).ready().handleFirstLoad();

//add new task
$add.click ( function (e) {
  e.preventDefault();
  const taskName = $input.val();
  $list.prepend (
    $('<li/>', {'class': 'item'}).append(
        $('<span/>', {'class': 'item-text'}).text(taskName)
    ).append(
        $('<button/>', {'class': 'item-remove'}).text('Remove')
    ).addtoLocalStorage(taskName)
  );
  $input.val('');
})

//remove tasks
$list.on('click',".item-remove", function(e) {
  e.preventDefault();
  const taskName = $(this).prev().text();
  $(this).parent().removeFromLocalStorage(taskName).remove();
})

//mark item as completed
$list.on('click','.item-text', function(e) {
  e.preventDefault();
  $(this).toggleClass("done").changeStatus($(this).text());
})

//search
$search.click ( function (e) {
  e.preventDefault();
  const searchName = $search_input.val();
  $(`.item-text:not(:contains(${searchName}))`).parent().hide();
  // $search_input.val('');
})

//search cancel
$search_cancel.click ( function (e) {
  e.preventDefault();
  $(`.item-text`).parent().show();
  $search_input.val('');
})