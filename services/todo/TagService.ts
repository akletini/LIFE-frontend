import { Tag } from "~~/models/todo/tag";

export class TagService {
  static BASE_URL: string;
  static API_URL: string;

  constructor() {
    const config = useRuntimeConfig();
    TagService.API_URL = config.public.apiBaseUrl;
    TagService.BASE_URL = TagService.API_URL + "/todos/tags";
  }

  public async getTagById(tagId: number) {
    let url = TagService.BASE_URL + "/get/" + tagId;
    let tag: Tag = new Tag();
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
          console.log("Fetch error in getTagById()");
        }
      })
      .then((result) => {
        tag = result;
      })
      .catch((error) =>
        console.error("Error happened on server for getTagById()", error)
      );

    return tag;
  }

  public async getAllTags() {
    let url = TagService.BASE_URL + "/getAll";
    let tagArray: Tag[] = [];
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
          console.log("Fetch error in getAllTags()");
        }
      })
      .then((result) => {
        tagArray = result;
      })
      .catch((error) =>
        console.error("Error happened on server for getAllTags()", error)
      );

    return tagArray;
  }

  public async addTag(tag: Tag) {
    let url = TagService.BASE_URL + "/add";
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

  public async updateTag(tag: Tag) {
    let url = TagService.BASE_URL + "/update";
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in updateTag()");
        }
      })
      .then((result) => {
        tag = result;
      })
      .catch((error) =>
        console.error("Error happened on server for updateTag()", error)
      );

    return tag;
  }

  public async deleteTag(tagId: number) {
    let url = TagService.BASE_URL + "/delete/" + tagId;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Fetch error in deleteTag()");
        }
      })
      .catch((error) =>
        console.error("Error happened on server for deleteTag()", error)
      );
  }
}

export default TagService;
