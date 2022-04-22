class Dialog {

  el;

  constructor(el) {
    this.el = el;
  }

  show() {
    this.el.style.display = "";
    document.getElementById("darken").style.display = "";
    return this;
  }

  disappear() {
    this.el.style.display = "none";
    document.getElementById("darken").style.display = "none";
    return this;
  }

  async hide() {
    this.el.classList.remove("dialog");
    this.el.classList.add("dialogOut");
    document.getElementById("darken").id = "darkenOut";
    await new Promise(resolve => setTimeout(resolve, 500));
    document.getElementById("darkenOut").style.display = "none";
    document.getElementById("darkenOut").id = "darken";
    this.el.style.display = "none";
    this.el.classList.add("dialog");
    this.el.classList.remove("dialogOut");
    return this;
  }

  hideButton(el) {
    el.addEventListener("click", () => this.hide());
    return this;
  }

}