import Tag from "~~/models/todo/tag";
import Todo from "~~/models/todo/todo";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: <Todo[]>[],
  }),
  actions: {
    getById(id: number): Todo | undefined {
      return this.todos.find((todo) => todo.id === id);
    },
    getAll(): Todo[] {
      return this.todos;
    },
    add(todo: Todo) {
      const found = this.todos.find((entry) => entry.id === todo.id);
      if (found == undefined) {
        this.todos.push(todo);
      }
    },
    addAll(todos: Todo[]) {
      this.todos = todos;
    },
    update(todo: Todo) {
      const index = this.todos.findIndex((entry) => entry.id === todo.id);
      if (index != -1) {
        this.todos[index] = todo;
      }
    },
    updateTagReferences(tag: Tag) {
      this.todos.forEach((todo) => {
        if (todo.tag?.id === tag.id) {
          todo.tag = tag;
        }
      });
    },
    remove(todo: Todo) {
      const todoWithIndex = this.todos.findIndex(
        (tempTodo) => todo.id === tempTodo.id
      );
      if (todoWithIndex > -1) {
        this.todos.splice(todoWithIndex, 1);
      }
    },
  },
});
