import Tag from "~~/models/todo/tag";
import Todo from "~~/models/todo/todo";
import TodoService from "../../services/todo/TodoService";
import Page from "~~/models/page";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: <Todo[]>[],
    currentPage: <Page<Todo>[]>[],
    todoService: <TodoService[]>[],
    currentFilters: <string[]>[],
    currentSort: "dueAt",
    currentTags: <number[]>[],
  }),
  actions: {
    async getService() {
      if (this.todoService.length != 0) {
        return this.todoService[0];
      }
      const currentUserId = localStorage.getItem("currentUserId");
      const userService = await useUserStore().getService();
      const userById = await userService.getUserById(Number(currentUserId));
      const todoService = new TodoService();
      TodoService.ASSIGNED_USER = userById;
      return todoService;
    },
    getCurrentPage(): Page<Todo> {
      return this.currentPage[0];
    },
    setCurrentPage(page: Page<Todo>) {
      this.currentPage.length = 0;
      this.currentPage.push(page);
    },
    getCurrentSort(): string {
      return this.currentSort;
    },
    setCurrentSort(sort: string) {
      this.currentSort = sort;
    },
    getCurrentFilters(): string[] {
      return this.currentFilters;
    },
    setCurrentFilters(filters: string[]) {
      this.currentFilters.length = 0;
      filters.forEach((filter) => this.currentFilters.push(filter));
    },
    getCurrentFilterTags(): number[] {
      return this.currentTags;
    },
    setCurrentFilterTags(tags: number[]) {
      this.currentTags.length = 0;
      tags.forEach((tag) => this.currentTags.push(tag));
    },
    getAllTodos(): Todo[] {
      return this.todos;
    },
    setTodos(todos: Todo[]) {
      this.todos.length = 0;
      todos.forEach((chore) => this.todos.push(chore));
    },
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
