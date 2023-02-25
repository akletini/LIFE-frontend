import User from "../models/user/user";
import UserService from "../services/user/UserService";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: <User[]>[],
    userService: <UserService[]>[],
  }),
  actions: {
    async getService() {
      if (this.userService.length != 0) {
        return this.userService[0];
      }
      return new UserService();
    },
    setService(userService: UserService) {
      if (this.userService.length == 0) {
        this.userService.push(userService);
      }
    },
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
