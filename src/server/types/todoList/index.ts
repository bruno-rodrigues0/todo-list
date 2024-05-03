type TStats = 'done' | 'in process' | 'todo'

export interface ITodo {
    addItem(): void;
    removeItem(): void;
    markAsDone(): void;
    markAsInProcess(): void;
    markAsTodo(): void;
}

export type TItem = {
    name: string
    stats: TStats
}

export class TodoList implements ITodo {

    static name: string;

    private _listItem: Array<TItem> = [];
    private _doneList: Array<TItem> = [];

    constructor(name: string){
        TodoList.name = name;
    }

    private set listItem(item: TItem){
        this._listItem.push(item);
    }

    private set doneList(item: TItem){
        let index = this._listItem.findIndex(i => i === item)
        this._doneList.push(this._listItem[index]);
    }

    public addItem(): void {
        
    }
    public removeItem(): void {
        throw new Error("Method not implemented.");
    }
    public markAsDone(): void {
        throw new Error("Method not implemented.");
    }
    public markAsInProcess(): void {
        throw new Error("Method not implemented.");
    }
    public markAsTodo(): void {
        throw new Error("Method not implemented.");
    }



}
