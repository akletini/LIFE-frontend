import { Todo } from "~~/models/todo/todo";

export class TodoService {
  readonly BASE_URL = "/todo";

  public addTodo(todo: Todo) {
    let url = this.BASE_URL + "/addTodo";
    /* Dummy */
    return todo;
  }
}

export default TodoService;
