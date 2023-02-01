import Tag from "~~/models/todo/tag";

export const useTagStore = defineStore("tagStore", {
  state: () => ({
    tags: <Tag[]>[],
  }),
  actions: {
    getById(id: number): Tag | undefined {
      return this.tags.find((tag) => tag.id === id);
    },
    getByName(name: string): Tag | undefined {
      return this.tags.find((tag) => tag.name === name);
    },
    getAll(): Tag[] {
      return this.tags;
    },
    add(tag: Tag) {
      const found = this.tags.find((entry) => entry.id === tag.id);
      if (found == undefined) {
        this.tags.push(tag);
      }
    },
    addAll(tags: Tag[]) {
      this.tags = tags;
    },
    update(tag: Tag) {
      const index = this.tags.findIndex((entry) => entry.id === tag.id);
      if (index != -1) {
        this.tags[index] = tag;
      }
    },
    remove(tag: Tag) {
      const tagWithIndex = this.tags.findIndex(
        (tempTag) => tag.id === tempTag.id
      );
      if (tagWithIndex > -1) {
        this.tags.splice(tagWithIndex, 1);
      }
    },
  },
});
