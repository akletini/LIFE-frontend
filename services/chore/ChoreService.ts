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

  public async getChorePage(page: number): Promise<ApiResponse<Chore>> {
    let url =
      ChoreService.BASE_URL +
      "/get?" +
      new URLSearchParams({
        page: String(page),
        size: String(5),
      });
    let apiResponse: ApiResponse<Chore>;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    apiResponse = await response.json();
    return apiResponse;
  }
}
