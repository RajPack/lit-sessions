import { delay, of } from "rxjs"
import { todoListMock } from "../mock/data/todo-list-mock.data"

export const TodoItemService = {
    getTodoList() {
        return of(todoListMock).pipe(
            delay(1500)
        )
    },
    addTodoItem(item: string) {
        todoListMock.unshift({text: item, isComplete: false})
        return of(todoListMock)
    }
}