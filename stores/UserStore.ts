import User from "../models/user/user";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: <User[]>[],
  }),
  actions: {
    getById(id: number): User | undefined {
      return this.users.find((user) => user.id === id);
    },
    getByEmail(email: string): User | undefined {
      return this.users.find((user) => user.email === email);
    },
    add(user: User) {
      const found = this.users.find((entry) => entry.id === user.id);
      if (found == undefined) {
        this.users.push(user);
      }
    },
    update(user: User) {
      const index = this.users.findIndex((entry) => entry.id === user.id);
      if (index != -1) {
        this.users[index] = user;
      }
    },
  },
});
