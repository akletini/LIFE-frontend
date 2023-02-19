import Chore from "~~/models/chore/chore";
import Page from "~~/models/page";

export const useChoreStore = defineStore("choreStore", {
  state: () => ({
    chores: <Chore[]>[],
    currentPage: <Page<Chore>[]>[],
  }),
  actions: {
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
  },
});
