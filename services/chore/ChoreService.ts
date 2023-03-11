import Chore from "~~/models/chore/chore";
import User from "~~/models/user/user";
import { ApiResponse } from "../../models/apiResponse";

export class ChoreService {
  static BASE_URL: string;
  static API_URL: string;
  static ASSIGNED_USER: User;

  constructor() {
    const config = useRuntimeConfig();
    ChoreService.API_URL = config.public.apiBaseUrl;
    ChoreService.BASE_URL = ChoreService.API_URL + "/chores";
  }

  public async getPage(
    page: number,
    filterBy: string[],
    sort?: string
  ): Promise<ApiResponse<Chore>> {
    const sortBy = sort || "dueAt";
    const searchParams = new URLSearchParams({
      page: String(page),
      size: String(5),
      sortBy: sortBy,
    });
    filterBy.forEach((filter) => searchParams.append("filterBy", filter));
    let url = ChoreService.BASE_URL + "/get?" + searchParams;

    let apiResponse: ApiResponse<Chore>;
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
    });
    if (response.ok) {
      apiResponse = await response.json();
      return apiResponse;
    } else if (response.status == 403) {
      console.log("Unauthorized access, logging out");
      logout(ChoreService.ASSIGNED_USER);
    }
    throw new Error();
  }

  public async getChoreById(choreId: number) {
    let url = ChoreService.BASE_URL + "/get/" + choreId;
    let chore = new Chore();
    let response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 403) {
          console.log("Unauthorized access, logging out");
          logout();
        }
      })
      .then((result) => (chore = result));
    return chore;
  }

  public async addChore(chore: Chore): Promise<Chore | Error> {
    let url = ChoreService.BASE_URL + "/add";
    chore.assignedUser = ChoreService.ASSIGNED_USER;
    let responseOk = false;
    let error: Error;
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(chore),
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          responseOk = true;
        } else if (response.status == 403) {
          console.log("Unauthorized access, logging out");
          logout();
        }
        return response.json();
      })
      .then((result) => {
        if (responseOk) {
          return (chore = result);
        } else {
          return (error = result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  public async updateChore(chore: Chore): Promise<Chore | Error> {
    let url = ChoreService.BASE_URL + "/update";
    chore.assignedUser = ChoreService.ASSIGNED_USER;
    let responseOk = false;
    let error: Error;
    let response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(chore),
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          responseOk = true;
        } else if (response.status == 403) {
          console.log("Unauthorized access, logging out");
          logout();
        }
        return response.json();
      })
      .then((result) => {
        if (responseOk) {
          return (chore = result);
        } else {
          return (error = result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  public async completeChore(chore: Chore) {
    let url = ChoreService.BASE_URL + "/complete";
    chore.assignedUser = ChoreService.ASSIGNED_USER;
    let response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(chore),
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 403) {
          console.log("Unauthorized access, logging out");
          logout();
        }
      })
      .then((result) => (chore = result));
    return response;
  }

  public async deleteChore(chore: Chore) {
    let url = ChoreService.BASE_URL + "/delete";
    chore.assignedUser = ChoreService.ASSIGNED_USER;
    let response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(chore),
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status == 403) {
        console.log("Unauthorized access, logging out");
        logout();
      } else if (!(response.status == 204)) {
        return response.json();
      }
    });
    return response;
  }
}

export default ChoreService;
