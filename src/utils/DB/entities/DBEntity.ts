import * as lodash from 'lodash';
import { NoRequiredEntity } from '../errors/NoRequireEntity.error';

type UnpackArray<T> = T extends (infer R)[] ? R : never;
interface Options<T, K extends keyof T> {
  key: K;
  equals?: T[K];
  equalsAnyOf?: T[K][];
  inArray?: UnpackArray<T[K]>;
  inArrayAnyOf?: UnpackArray<T[K]> extends never ? never : UnpackArray<T[K]>[];
}
type OptionsEquals<T, K extends keyof T> = Required<
  Pick<Options<T, K>, 'key' | 'equals'>
>;
type OptionsEqualsAnyOf<T, K extends keyof T> = Required<
  Pick<Options<T, K>, 'key' | 'equalsAnyOf'>
>;
type OptionsInArray<T, K extends keyof T> = Required<
  Pick<Options<T, K>, 'key' | 'inArray'>
>;
type OptionsInArrayAnyOf<T, K extends keyof T> = Required<
  Pick<Options<T, K>, 'key' | 'inArrayAnyOf'>
>;

export default abstract class DBEntity<
  Entity extends { id: string },
  ChangeDTO,
  CreateDTO,
> {
  protected entities: Entity[] = [];

  abstract create(createDto: CreateDTO): Promise<Entity>;

  private runChecks<T extends Entity, K extends keyof T>(
    entity: T,
    options: Options<T, K>,
  ) {
    if (options.equals) {
      return lodash.isEqual(entity[options.key], options.equals);
    }
    if (options.equalsAnyOf) {
      return options.equalsAnyOf.some((inputValue) =>
        lodash.isEqual(entity[options.key], inputValue),
      );
    }
    if (options.inArray) {
      const array = entity[options.key] as (typeof options.inArray)[];
      return array.some((value) => lodash.isEqual(value, options.inArray));
    }
    if (options.inArrayAnyOf) {
      const array = entity[options.key] as (typeof options.inArray)[];
      return array.some((value) =>
        options.inArrayAnyOf?.some((valueInput) =>
          lodash.isEqual(value, valueInput),
        ),
      );
    }
    return false;
  }

  async findOne<K extends keyof Entity>(
    option: OptionsEquals<Entity, K>,
  ): Promise<Entity | null>;
  async findOne<K extends keyof Entity>(
    option: OptionsEqualsAnyOf<Entity, K>,
  ): Promise<Entity | null>;
  async findOne<K extends keyof Entity>(
    options: OptionsInArray<Entity, K>,
  ): Promise<Entity | null>;
  async findOne<K extends keyof Entity>(
    options: OptionsInArrayAnyOf<Entity, K>,
  ): Promise<Entity | null>;
  async findOne<K extends keyof Entity>(
    options: Options<Entity, K>,
  ): Promise<Entity | null> {
    return (
      this.entities.find((entity) => this.runChecks(entity, options)) ?? null
    );
  }

  async findMany<K extends keyof Entity>(
    options: OptionsEquals<Entity, K>,
  ): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(
    option: OptionsEqualsAnyOf<Entity, K>,
  ): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(
    option: OptionsInArray<Entity, K>,
  ): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(
    option: OptionsInArrayAnyOf<Entity, K>,
  ): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(
    options?: Options<Entity, K>,
  ): Promise<Entity[]> {
    if (!options) {
      return this.entities;
    }
    return this.entities.filter((entity) => this.runChecks(entity, options));
  }

  async delete(id: string): Promise<Entity> {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) throw new NoRequiredEntity('delete');
    const deleted = this.entities[idx];
    this.entities.splice(idx, 1);
    return deleted;
  }

  async change(id: string, changeDTO: ChangeDTO): Promise<Entity> {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) throw new NoRequiredEntity('change');
    const changed = { ...this.entities[idx], ...changeDTO };
    this.entities.splice(idx, 1, changed);
    return changed;
  }
}
