import User from "~~/models/user";

export class UserService {
  static BASE_URL: string;
  static API_URL: string;

  constructor() {
    const config = useRuntimeConfig();
    UserService.API_URL = config.public.apiBaseUrl;
    UserService.BASE_URL = UserService.API_URL + "/users";
  }
  public async getUserById(userId: number) {
    let url = UserService.BASE_URL + "/get/" + userId;
    let user = new User();
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
          console.log("Fetch error in getUserById()");
        }
      })
      .then((result) => {
        user = result;
      })
      .catch((error) =>
        console.error("Error happened on server for getUserById()", error)
      );
    return user;
  }

  public async getUserByEmail(email: string) {
    let url = UserService.BASE_URL + "/getByEmail/" + email;
    let user = new User();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok && response.body) {
          return response.json();
        } else {
          console.log("Fetch error in getUserByEmail()");
        }
      })
      .then((result) => {
        user = result;
      })
      .catch((error) => {
        console.error("Error happened on server for getUserByEmail()", error);
      });
    return user;
  }

  public async addUser(user: User) {
    let url = UserService.BASE_URL + "/add";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in addUser()");
        }
      })
      .then((result) => {
        user = result;
      })
      .catch((error) =>
        console.error("Error happened on server for addUser()", error)
      );
    return user;
  }

  public async updateUser(user: User) {
    let url = UserService.BASE_URL + "/update";
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in updateUser()");
        }
      })
      .then((result) => {
        user = result;
      })
      .catch((error) =>
        console.error("Error happened on server for updateUser()", error)
      );
    return user;
  }
}

export default UserService;
