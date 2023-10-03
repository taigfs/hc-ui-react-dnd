class MemoryCache {
  constructor() {
    this.cache = new Map();
  }

  addInstance(id, instance) {
    this.cache.set(id, instance);
  }

  getInstance(id) {
    return this.cache.get(id);
  }
}
