![Status: Active](https://documentation.coremedia.com/badges/badge_status_active.png "Status: Active")
![For CoreMedia CMS](https://documentation.coremedia.com/badges/badge_coremedia_cms.png "For CoreMedia CMS")

# Custom Settings Forms (CSF)

With the custom settings form plugin, you can define custom forms in Studio for your settings content.  

### Installation

- From the project's root folder, clone this repository as a submodule of the extensions folder. Make sure to use the branch name that matches your workspace version.
```shell
git submodule add https://github.com/coremedia-contributions/custom-settings-forms modules/extensions/csf
```

- Use the extension tool in the root folder of the project to link the modules to your workspace.
 ```shell
mvn extensions:sync -f workspace-configuration/extensions -Denable=csf
```

### How to use
1. Add a dependency to the CSF plugin in your Studio client plugins `package.json`.
```json
{
  ...
  "dependencies": {
    ...
    "@coremedia-blueprint/studio-client.main.custom-settings-forms": "1.0.0-SNAPSHOT",
    ...
  },
  ...
}
```

2. Create your custom settings form definition extending the `CustomSettingsForm` component for your settings content and add all the fields and form components.

**Example**
MySettingsForm.ts
```typescript
import CustomSettingsForm from "@coremedia-blueprint/studio-client.main.custom-settings-forms/CustomSettingsForm";
...

interface MySettingsFormConfig extends Config<CustomSettingsForm> {
}

class MySettingsForm extends CustomSettingsForm {
  declare Config: MySettingsFormConfig;

  constructor(config: Config<MySettingsForm> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(MySettingsForm, {
      title: "My Settings",
      items: [
        Config(StringPropertyField, { propertyName: "settings.mySettings.settingOne" }),
        Config(IntegerPropertyField, {propertyName: "settings.mySettings.settingTwo"}),
        ...
      ],
    }), config));
  }
}

export default MySettingsForm;

```

3. Register the custom settings form with the name pattern for your settings content.

**Example**
MyStudioPlugin.ts

```typescript
import csfService from "@coremedia-blueprint/studio-client.main.custom-settings-forms/csfService";
import MySettingsForm from "./forms/MySettingsForm";

...

class MyStudioPlugin extends StudioPlugin {

  constructor(config: Config<MyStudioPlugin> = null) {
    ...
  }

  override init(editorContext: IEditorContext) {
    super.init(editorContext);
    
    // Register your custom settings form with the pattern that matches the name of your settings content.
    csfService._.registerCustomSettingsForm(Config(MySettingsForm, { pattern: "My Settings" }));
  }
}

export default MyStudioPlugin;

```
