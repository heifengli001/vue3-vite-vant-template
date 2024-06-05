import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
  state: () => {
    return { activeFooterBar: "service" };
  },
  getters: {  },
  actions: {
    setActiveFooterBar(value) {
      this.activeFooterBar = value;
    },
  },
});
