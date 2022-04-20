import Dexie, { Table } from 'dexie';

export abstract class IndexedDbService<K, V> extends Dexie {
  private storage: Table<V, K>;

  protected constructor(
    databaseName: string,
    version: number,
    storageName: string,
    indexes: string
  ) {
    super(databaseName);

    this.version(version).stores({ [storageName]: indexes });

    this.storage = this.table<V, K>(storageName);
  }

  public add(value: V): Promise<K> {
    return this.storage.add(value);
  }

  public bulkAdd(values: V[]): Promise<K> {
    return this.storage.bulkPut(values);
  }

  public put(value: V): Promise<K> {
    return this.storage.put(value);
  }

  public bulkPut(values: V[]): Promise<K> {
    return this.storage.bulkPut(values);
  }

  public findAll(): Promise<V[]> {
    return this.storage.toArray();
  }

  public findOne(id: K): Promise<V | undefined> {
    return this.storage.get(id);
  }

  public deleteOne(id: K): Promise<void> {
    return this.storage.delete(id);
  }

  public update(id: K, value: V): Promise<number> {
    return this.storage.update(id, value);
  }

  public deleteAll() {
    return this.storage.clear();
  }

  public bulkDelete(ids: K[]) {
    return this.storage.bulkDelete(ids);
  }
}
