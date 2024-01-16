import ContentPropertyNames from "@coremedia/studio-client.cap-rest-client/content/ContentPropertyNames";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import SwitchingContainer from "@coremedia/studio-client.ext.ui-components/components/SwitchingContainer";
import AddItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/AddItemsPlugin";
import DocumentForm from "@coremedia/studio-client.main.editor-components/sdk/premular/DocumentForm";
import {cast} from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CSFServiceImpl from "../CSFServiceImpl";
import csfService from "../csfService";

interface AddCustomSettingsFormPluginConfig extends Config<AddItemsPlugin> {
}

class AddCustomSettingsFormPlugin extends AddItemsPlugin {
  declare Config: AddCustomSettingsFormPluginConfig;

  #activeStateExpression: ValueExpression = null;

  constructor(config: Config<AddCustomSettingsFormPlugin> = null) {
    const componentConfig = cast(DocumentForm, config.cmp.initialConfig);

    super((() => ConfigUtils.apply(Config(AddCustomSettingsFormPlugin, {

      recursive: true,
      items: [
        Config(SwitchingContainer, {
          activeItemValueExpression: this.getActiveStateExpression(componentConfig.bindTo),
          items: csfService._.getCsfRegistry(),
          defaults: {
            bindTo: componentConfig.bindTo,
            forceReadOnlyValueExpression: componentConfig.forceReadOnlyValueExpression
          },
          // plugins: [Config(BindVisibilityPlugin, {
          //   bindTo: this.getActiveStateExpression(componentConfig.bindTo),
          //   transformer: bind(this, this.visibilityTransformer),
          // })],
        }),
      ],
    }), config))());
  }

  protected getActiveStateExpression(bindTo: ValueExpression): ValueExpression {
    if (!this.#activeStateExpression) {
      this.#activeStateExpression = ValueExpressionFactory.createFromFunction((): string => {
        return CSFServiceImpl.createItemIdValueFromString(bindTo.extendBy(ContentPropertyNames.NAME).getValue());
      });
    }
    return this.#activeStateExpression;
  }

  // visibilityTransformer(itemId: string): boolean {
  //   return !csfService._.getCsfRegistry().some(item => {
  //     return item.pattern && CSFServiceImpl.createItemIdValueFromString(item.pattern) === itemId;
  //   });
  // }
}

export default AddCustomSettingsFormPlugin;
