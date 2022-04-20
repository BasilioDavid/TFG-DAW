import Dexie, { Table } from 'dexie';

export class IndexedDbCacheServiceGeneric<K, V> extends Dexie {
    private storages: { [storageName: string]: Table<V, K> };

    protected constructor(
        databaseName: string,
        version: number,
        indexes: { [storageName: string]: string | null }
    ) {
        super(databaseName);

        this.version(version).stores(indexes);

        this.storages = Object.keys(indexes)
            .map((table) => [table, this.table<V, K>(table)])
            .reduce((result, [key, value]) => {
                return { ...result, [key as string]: value };
            }, {});
    }

    protected add(store: string, value: V): Promise<K> {
        return this.storages[store].add(value);
    }

    protected addAny(store: string, values: V[]): Promise<K> {
        return this.storages[store].bulkPut(values);
    }

    protected findAll(store: string): Promise<V[]> {
        return this.storages[store].toArray();
    }

    protected findOne(store: string, id: K): Promise<V | undefined> {
        return this.storages[store].get(id);
    }

    protected deleteOne(store: string, id: K): Promise<void> {
        return this.storages[store].delete(id);
    }

    protected update(store: string, id: K, value: V): Promise<number> {
        return this.storages[store].update(id, value);
    }
}
