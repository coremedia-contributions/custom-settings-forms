import Container from "@jangaroo/ext-ts/container/Container";
import Config from "@jangaroo/runtime/Config";
import CustomSettingsForm from "./CustomSettingsForm";

class CSFServiceImpl {

  #csfRegistry: Array<Config<CustomSettingsForm>> = null;

  constructor() {

  }

  registerCustomSettingsForm(form: Config<CustomSettingsForm>): void {
    if (form.pattern) {
      this.getCsfRegistry().push(form);
    }
  }

  getCsfRegistry(): Array<Config<CustomSettingsForm>> {
    if (!this.#csfRegistry) {
      this.#csfRegistry = [Config(Container, { cls: "cm-hidden" })];
    }
    return this.#csfRegistry;
  }

  static createItemIdValueFromString(bindTo: string) {
    return bindTo.toLowerCase().replaceAll(" ", "-").replaceAll("--", "-");
  }

}

export default CSFServiceImpl;
