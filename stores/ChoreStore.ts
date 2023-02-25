import Chore from "~~/models/chore/chore";
import Page from "~~/models/page";
import ChoreService from "~~/services/chore/ChoreService";

export const useChoreStore = defineStore("choreStore", {
  state: () => ({
    chores: <Chore[]>[],
    currentPage: <Page<Chore>[]>[],
    choreService: <ChoreService[]>[],
  }),
  actions: {
    async getService() {
      if (this.choreService.length != 0) {
        return this.choreService[0];
      }
      const currentUserId = localStorage.getItem("currentUserId");
      const userService = await useUserStore().getService();
      const userById = await userService.getUserById(Number(currentUserId));
      const choreService = new ChoreService();
      ChoreService.ASSIGNED_USER = userById;
      return choreService;
    },
    getCurrentPage(): Page<Chore> {
      return this.currentPage[0];
    },
    setCurrentPage(page: Page<Chore>) {
      this.currentPage[0] = page;
    },
    getAllChores(): Chore[] {
      return this.chores;
    },
    setChores(chores: Chore[]) {
      this.chores.length = 0;
      chores.forEach((chore) => this.chores.push(chore));
    },
    getById(id: number): Chore {
      return this.chores.find((chore) => chore.id == id) || new Chore();
    },
    add(chore: Chore) {
      this.chores.push(chore);
    },
    update(chore: Chore) {
      const index = this.chores.findIndex((entry) => entry.id === chore.id);
      if (index != -1) {
        this.chores[index] = chore;
      }
    },
    remove(chore: Chore) {
      const choreWithIndex = this.chores.findIndex(
        (tempChore) => chore.id === tempChore.id
      );
      if (choreWithIndex > -1) {
        this.chores.splice(choreWithIndex, 1);
      }
      const currentPageContent = this.getCurrentPage().content;
      currentPageContent.length = 0;
      this.chores.forEach((obj) => currentPageContent.push(obj));
    },
  },
});
