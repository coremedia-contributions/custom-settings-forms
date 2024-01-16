import CMSettingsForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/CMSettingsForm";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import PropertyFieldGroup from "@coremedia/studio-client.main.editor-components/sdk/premular/PropertyFieldGroup";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import AddCustomSettingsFormPlugin from "./plugins/AddCustomSettingsFormPlugin";
import IEditorContext from "@coremedia/studio-client.main.editor-components/sdk/IEditorContext";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import csfService from "./csfService";
import ExampleSettingsForm from "./example/ExampleSettingsForm";

interface CSFStudioPluginConfig extends Config<StudioPlugin> {
}

class CSFStudioPlugin extends StudioPlugin {
  declare Config: CSFStudioPluginConfig;

  constructor(config: Config<CSFStudioPlugin> = null) {
    super(ConfigUtils.apply(Config(CSFStudioPlugin, {

      rules: [

        Config(CMSettingsForm, {
          plugins: [
            Config(AddCustomSettingsFormPlugin, { before: [(Config(PropertyFieldGroup, { itemId: "cmSettingsSettingsForm" }))] }),
          ],
        }),

      ],
    }), config));
  }

  /*override init(editorContext: IEditorContext) {
    super.init(editorContext);

    csfService._.registerCustomSettingsForm(Config(ExampleSettingsForm, {pattern: "Example"}));
  }*/
}

export default CSFStudioPlugin;
