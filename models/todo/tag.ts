export class Tag {
    private id?: number | undefined;
    private name: string;
    private color: string;
    
    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    public get getId(): number | undefined {
        return this.id;
    }

    public set setId(value: number | undefined) {
        this.id = value;
    }

    public get getName(): string {
        return this.name;
    }

    public set setName(value: string) {
        this.name = value;
    }

    public get getColor(): string {
        return this.color;
    }

    public set setColor(value: string) {
        this.color = value;
    }
}

export default Tag