import Tag from "./tag";

export class Todo {
    
    private id?: number | undefined;
    private title: String;
    private description: String;
    private tag: Tag;
    private createdAt: Date;
    private dueAt: Date;
    private fileAttachment?: File | undefined;
    private state: Todo.State;
    
    constructor(id: number, title: string, description: string, createdAt: Date, dueAt: Date, tag: Tag, state: Todo.State) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.dueAt = dueAt;
        this.state = state;
        this.tag = tag;
    }

    public get getId(): number | undefined {
        return this.id;
    }

    public set setId(value: number) {
        this.id = value;
    }

    public get getTitle(): String {
        return this.title;
    }

    public set setTitle(value: String) {
        this.title = value;
    }

    public get getDescription(): String {
        return this.description;
    }

    public set setDescription(value: String) {
        this.description = value;
    }

    public get getCreatedAt(): Date {
        return this.createdAt;
    }

    public set setCreatedAt(value: Date) {
        this.createdAt = value;
    }

    public get getDueAt(): Date {
        return this.dueAt;
    }

    public set setDueAt(value: Date) {
        this.dueAt = value;
    }

    public get getFileAttachment(): File | undefined {
        return this.fileAttachment;
    }

    public set setFileAttachment(value: File | undefined) {
        this.fileAttachment = value;
    }

    public get getState(): Todo.State {
        return this.state;
    }

    public set setState(value: Todo.State) {
        this.state = value;
    }

    public get getTag(): Tag {
        return this.tag;
    }
    
    public set setTag(tag: Tag) {
        this.tag = tag;
    }
}

export namespace Todo {
    export enum State {
        OPEN,
        DONE,
    }
}

export default Todo