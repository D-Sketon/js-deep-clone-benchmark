declare module "fastest-json-copy" {
  function copy<T>(value: T): T;
  export { copy };
}
declare module "nano-copy" {
  function nanoCopy<T>(value: T): T;
  export default nanoCopy;
}
declare module "core-js-pure/actual/structured-clone" {
  function structuredClone<T>(value: T): T;
  export default structuredClone;
}
declare module "core-js-pure/actual/map" {
  class Map<K, V> {
    constructor(iterable?: Iterable<[K, V]>);
    [Symbol.toStringTag]: string;
    size: number;
    has(key: K): boolean;
  }
  export default Map;
}
declare module "core-js-pure/actual/set" {
  class Set<T> {
    constructor(iterable?: Iterable<T>);
    [Symbol.toStringTag]: string;
    size: number;
    has(value: T): boolean;
  }
  export default Set;
}
