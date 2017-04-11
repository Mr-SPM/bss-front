const SPM_USER_INFO_STORAGE = 'spm_vue_demo';
export default {
  // 获取localstorage
  fetch() {
    return JSON.parse(window.localStorage.getItem(SPM_USER_INFO_STORAGE) || '[]');
  },
  // 保存信息
  save(Items) {
    window.localStorage.setItem(SPM_USER_INFO_STORAGE, JSON.stringify(Items));
  },
  add(items) {
    let store = this.fetch();
    for (var name in items) {
      store.name = items[name];
    }
    this.save(store);
  },
  edit(items) {
    let store = this.fetch();
    for (let name1 in items) {
      for (var name2 in store) {
        if (name1 === name2) {
          store[name2] = items[name1];
          break;
        }
      }
    }
    this.save(store);
  },
  //  清空localstorage
  clear() {
    window.localStorage.clear();
  }
};
