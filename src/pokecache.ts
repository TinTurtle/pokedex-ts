
export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache{
    #cache =  new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number; //  in milliseconds

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    }

    #reap(){
        this.#cache.forEach((value, key, map) => {
            if(value.createdAt > Date.now() - this.#interval){
                this.#cache.delete(key);
            }
        })
    }

    #startReapLoop(){
        this.#reapIntervalId = setInterval(this.#reap, this.#interval);
    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    add<T>(key: string, val: T){
        try{
            const entry: CacheEntry<T> = {
                createdAt: Date.now(),
                val: val
            }
            this.#cache.set(key,entry);
        } catch(error){
            if(error instanceof Error) {
                console.error(`Error: ${error.message}`);
            }else {
                console.error("Unknown Error!");
            }
        }
    }


    get<T>(key: string) {
        return this.#cache.get(key) ?? undefined;
    }
};