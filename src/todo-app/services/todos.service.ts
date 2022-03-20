import { delay, of } from "rxjs";
import { TodoItem } from "../interfaces/todo-item";
import { todoListMock } from "../mock/data/todo-list-mock.data";

let todoList = [...todoListMock];

export const TodoItemService = {
  getTodoList() {
    return of(todoList).pipe(delay(1500));
  },
  addTodoItem(item: string) {
    todoList.unshift({ text: item, isComplete: false });
    return of(todoList);
  },
  deleteTodoItem(todo: TodoItem) {
    todoList = todoList.filter((item) => item !== todo);
    return of(true);
  },
  updateTodoitem(udpateObj: TodoItem) {
    todoList.forEach((item) => {
      if (item.text === udpateObj.text) {
        Object.assign(item, udpateObj);
      }
    });
  },
};
