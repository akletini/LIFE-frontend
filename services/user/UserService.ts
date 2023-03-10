import User from "~~/models/user/user";

export class UserService {
  static BASE_URL: string;
  static AUTH_URL: string;
  static API_URL: string;

  constructor() {
    const config = useRuntimeConfig();
    UserService.API_URL = config.public.apiBaseUrl;
    UserService.BASE_URL = UserService.API_URL + "/users";
    UserService.AUTH_URL = UserService.API_URL + "/auth";
  }
  public async getUserById(userId: number) {
    let url = UserService.BASE_URL + "/get/" + userId;
    let user = new User();
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
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
      .catch((error) => {
        console.error("Error happened on server for getUserById()", error);
      });
    return user;
  }

  public async getUserByEmail(email: string) {
    let url = UserService.BASE_URL + "/getByEmail/" + email;
    let user = new User();
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
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
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
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

  public async register(user: User) {
    let url = UserService.AUTH_URL + "/register";
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
          console.log("Fetch error in register()");
        }
      })
      .then((result) => {
        user = result;
      })
      .catch((error) =>
        console.error("Error happened on server for register()", error)
      );
    return user;
  }

  public async authenticate(user: User) {
    let url = UserService.AUTH_URL + "/authenticate";
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
          console.log("Fetch error in register()");
        }
      })
      .then((result) => {
        user = result;
        localStorage.setItem("accessToken", user.jwtToken);
      })
      .catch((error) =>
        console.error("Error happened on server for register()", error)
      );
    return user;
  }

  public async logout(user: User) {
    let url = UserService.AUTH_URL + "/logout";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in logout()");
        }
      })
      .then((result) => {
        user = result;
      })
      .catch((error) =>
        console.error("Error happened on server for logout()", error)
      );
    return user;
  }

  public async updateUser(user: User) {
    let url = UserService.BASE_URL + "/update";
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
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
