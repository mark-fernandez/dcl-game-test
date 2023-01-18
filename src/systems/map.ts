export class Map<K extends string, V extends number> {
    private map: { [key: string]: V } = {}

    get(key: K): V | undefined {
        return this.map[key]
    }

    set(key: K, value: V): void {
        this.map[key] = value
    }

    delete(key: K): boolean {
        const hasKey = key in this.map
        delete this.map[key]
        return hasKey
    }

    clear(): void {
        this.map = {}
    }

    size(): number {
        return Object.keys(this.map).length
    }

    keys(): K[] {
        return Object.keys(this.map) as K[]
    }
}

// interface IMazeMap {
//     [x:number]: number;

//     get(key: number): number | undefined
//     set(key: number, value: number): void
//     delete(key: number): boolean
//     clear(): void
//     size(): number
// }

// class TestMap implements IMazeMap {
//     [x: number]: number
//     private map: { [key: number]: number } = {}

//     get(key: number): number | undefined {
//         return this.map[key]
//     }

//     set(key: number, value: number): void {
//         this.map[key] = value
//     }

//     delete(key: number): boolean {
//         const hasKey = key in this.map
//         delete this.map[key]
//         return hasKey
//     }

//     clear(): void {
//         this.map = {}
//     }

//     size(): number {
//         return Object.keys(this.map).length
//     }
// }