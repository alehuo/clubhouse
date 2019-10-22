export default interface Dao<T> {
  findAll(): PromiseLike<T[]>;
  findOne(id: number): PromiseLike<T | undefined>;
  remove(id: number): PromiseLike<number>;
  save(entity: T): PromiseLike<number[]>;
}
