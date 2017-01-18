#### [README for English](https://github.com/waka-templates/template-simple/blob/master/README_en.md)

## template-simple
A template simple to show how to write a custom template by yourself.

## 自定义模板的规范说明

* 模板的仓库下必须有 `template` 目录，在该目录下定义你的模板文件
* 模板仓库的根目录下必须有 `meta.js` 或 `meta.json` 文件，该文件必须导出为一个对象，对象可定义以下字段:
    * `prompts`: 收集用户自定义数据
    * `filters`: 根据条件过滤文件
    * `completeMessage`: 脚手架渲染完成后给予的提示信息

### prompts

`prompts` 是一个哈希对象, 定义规范可以参考[Inquirer.js question object](https://github.com/SBoudrias/Inquirer.js/#question). 示例如下:

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

所有的用户输入完成之后, `template` 目录下的所有文件将会用 [Handlebars](http://handlebarsjs.com/) 进行渲染. 用户输入的数据会作为模板渲染时的使用数据.

### 带条件的 prompts

`prompt` 可以添加一个 `when` 字段，该字段表示此 `prompt` 会根据 `when` 的值来判断是否出现在终端提示用户进行输入. 可参考[Inquirer.js question object](https://github.com/SBoudrias/Inquirer.js/#question). 示例:

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

在上述示例中, 只有用户在 `lint` 中的回答值是 `yes` 时, `eslint` 才会被触发, 在终端显示让用户选择 `eslint` 的配置规范.

### 文件过滤

`filters` 字段是一个包含文件过滤规则的哈希对象, 键用于定义符合 [minimatch glob pattern](https://github.com/isaacs/minimatch) 规则的过滤器, 键值是 `prompts` 中用户的输入值. 例如:

```
{
  "prompts": {
      "unit": {
          "type": "confirm",
          "message": "Setup unit tests with Mocha?"
      }
  },  
  "filters": {
    "test/*": "unit"
  }
}
```

在上述示例中, `template` 目录下 `test` 目录只有用户在 `unit` 中的回答值是 `yes` 时才会生成. 

如果要匹配以 `.` 开头的文件, 则需要将 minimatch 的 `dot` 选项设置成 `true`.

### 其它配置

在 `meta.{js,json}` 文件中, 有一些可选的选项配置:

* `destDirName` - 项目的目录名字

```
{
  "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev"
}
```

* `isCwd` - 项目是否在当前目录下被渲染

```
{
  "completeMessage": "{{#isCwd}}To get started:\n\n  npm install\n  npm run dev.{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev.{{/isCwd}}"
}
```