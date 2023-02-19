import { Todo } from "~~/models/todo/todo";
import User from "~~/models/user/user";

export class TodoService {
  static BASE_URL: string;
  static API_URL: string;
  static ASSIGNED_USER: User;

  constructor() {
    const config = useRuntimeConfig();
    TodoService.API_URL = config.public.apiBaseUrl;
    TodoService.BASE_URL = TodoService.API_URL + "/todos";
  }

  public async getTodoById(todoId: number) {
    let url = TodoService.BASE_URL + "/get/" + todoId;
    let todo: Todo = new Todo();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in getTodoById()");
        }
      })
      .then((result) => {
        todo = result;
      })
      .catch((error) =>
        console.error("Error happened on server for getTodoById()", error)
      );
    return todo;
  }

  public async getAllTodos() {
    let url = TodoService.BASE_URL + "/getAll";
    let todoArray: Todo[] = [];
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in getAllTodos()");
        }
      })
      .then((result) => {
        todoArray = result;
      })
      .catch((error) =>
        console.error("Error happened on server for getAllTodos()", error)
      );
    return todoArray;
  }

  public async addTodo(todo: Todo) {
    let url = TodoService.BASE_URL + "/add";
    todo.assignedUser = TodoService.ASSIGNED_USER;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in addTodo()");
        }
      })
      .then((result) => {
        todo = result;
      })
      .catch((error) =>
        console.error("Error happened on server for addTodo()", error)
      );
    return todo;
  }

  public async updateTodo(todo: Todo) {
    let url = TodoService.BASE_URL + "/update";
    todo.assignedUser = TodoService.ASSIGNED_USER;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in updateTodo()");
        }
      })
      .then((result) => {
        todo = result;
      })
      .catch((error) =>
        console.error("Error happened on server for updateTodo()", error)
      );
    return todo;
  }

  public async deleteTodo(todo: Todo) {
    let url = TodoService.BASE_URL + "/delete";
    todo.assignedUser = TodoService.ASSIGNED_USER;
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in deleteTodo()");
        }
      })
      .catch((error) =>
        console.error("Error happened on server for deleteTodo()", error)
      );
  }
}

export default TodoService;
