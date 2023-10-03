export class MemoryCache {
  constructor() {
    this.cache = new Map();
  }

  set(id, instance) {
    this.cache.set(id, instance);
  }

  get(id) {
    return this.cache.get(id);
  }
}
