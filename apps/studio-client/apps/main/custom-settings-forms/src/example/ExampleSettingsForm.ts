import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CustomSettingsForm from "../CustomSettingsForm";
import StringPropertyField
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/StringPropertyField";
import IntegerPropertyField
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/IntegerPropertyField";

interface ExampleSettingsFormConfig extends Config<CustomSettingsForm> {

}

class ExampleSettingsForm extends CustomSettingsForm {

  declare Config: ExampleSettingsFormConfig;

  constructor(config: Config<ExampleSettingsForm> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(ExampleSettingsForm, {
      title: "Example",
      items: [
              Config(StringPropertyField, {propertyName: "settings.example.settingOne"}),
              Config(IntegerPropertyField, {propertyName: "settings.example.settingTwo"}),
      ]
    }), config));
  }

}

export default ExampleSettingsForm;
