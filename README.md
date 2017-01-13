## template-simple
A template simple to show how to write a custom template by yourself.

## Writing Custom Templates from Scratch

* A template repo **must** have a template directory that holds the template files.
* A template repo **may** have a metadata file for the template which can be either a meta.js or meta.json file. It can contain the following fields:
    * `prompts`: used to collect user options data
    * `filters`: used to conditional filter files to render
    * `completeMessage`: the message to be displayed to the user when the template has been generated. You can include custom instruction here

### prompts

The `prompts` field in the metadata file should be an object hash containing prompts for the user. For each entry, the key is the variable name and the value is an [Inquirer.js question object](https://github.com/SBoudrias/Inquirer.js/#question). Example:

```
{
    "description": {
        "type": "string",
        "required": false,
        "message": "Project description",
        "default": "project description"
    }
}
```

After all prompts are finished, all files inside `template` will be rendered using [Handlebars](http://handlebarsjs.com/), with the prompt results as the data.

### Conditional Prompts

A prompt can be made conditional by adding a `when` field, which should be a JavaScript expression evaluated with data collected from previous prompts. For example:

```
{
  "prompts": {
    "lint": {
        "type": "confirm",
        "message": ""Use ESLint to lint your code?"
    },
    "eslint": {
      "when": "lint",
      "type": "list",
      "message": "Pick a lint config",
      "choices": [
        "standard",
        "airbnb",
        "none"
      ]
    }
  }
}
```

The prompt for `eslint` will only be triggered when the user answered yes to the `lint` prompt.

### Pre-registered Handlebars Helpers

Two commonly used Handlebars helpers, `if_eq` and `unless_eq` are pre-registered:

```
{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
```

### Custom Handlebars Helpers

You may want to register additional Handlebars helpers using the `helpers` property in the metadata file. The object key is the helper name:

```
module.exports = {
  helpers: {
    lowercase: str => str.toLowerCase()
  }
}
```

Upon registration, they can be used as follows:

```
{{ lowercase name }}
```

### File filters

The `filters` field in the metadata file should be an object hash containing file filtering rules. For each entry, the key is a [minimatch glob pattern](https://github.com/isaacs/minimatch) and the value is a JavaScript expression evaluated in the context of prompt answers data. Example:

```
{
  "filters": {
    "test/*": "needUnitTest"
  }
}
```

Files under `test` will only be generated if the user answered yes to the prompt for `needUnitTest`.

Note that the `dot` option for minimatch is set to `true` so glob patterns would also match dotfiles by default.

### Additional data available in meta.{js,json}

* `destDirName` - destination directory name

```
{
  "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev"
}
```

* `inPlace` - generating template into current directory

```
{
  "completeMessage": "{{#inPlace}}To get started:\n\n  npm install\n  npm run dev.{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev.{{/inPlace}}"
}
```

