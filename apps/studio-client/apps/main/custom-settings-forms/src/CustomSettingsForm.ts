import DocumentForm from "@coremedia/studio-client.main.editor-components/sdk/premular/DocumentForm";
import PropertyFieldGroup from "@coremedia/studio-client.main.editor-components/sdk/premular/PropertyFieldGroup";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CSFServiceImpl from "./CSFServiceImpl";

interface CustomSettingsFormConfig extends Config<DocumentForm>, Partial<Pick<CustomSettingsForm,
  "pattern"
>> {
}

class CustomSettingsForm extends PropertyFieldGroup {
  declare Config: CustomSettingsFormConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.studio.csf.config";

  constructor(config: Config<CustomSettingsForm> = null) {
    super((()=> ConfigUtils.apply(Config(CustomSettingsForm, { itemId: CSFServiceImpl.createItemIdValueFromString(config.pattern) }), config))());
  }

  pattern: string = null;
}

export default CustomSettingsForm;
