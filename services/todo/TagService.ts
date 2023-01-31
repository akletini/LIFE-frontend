import { Tag } from "~~/models/todo/tag";

export class TagService {
  static BASE_URL: string;
  static API_URL: string;

  constructor() {
    const config = useRuntimeConfig();
    TagService.API_URL = config.public.apiBaseUrl;
    TagService.BASE_URL = TagService.API_URL + "/todos/tags";
  }

  public async addTag(tag: Tag) {
    let url = TagService.BASE_URL + "/addTag";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in addTag()");
        }
      })
      .then((result) => {
        tag = result;
      })
      .catch((error) =>
        console.error("Error happened on server for addTag()", error)
      );

    return tag;
  }
}

export default TagService;
