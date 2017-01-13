/**
 * Created by pomy on 13/01/2017.
 */

module.exports = {
    "prompts": {
        "name"       : {
            "type"    : "string",
            "required": true,
            "message" : "Project name"
        },
        "version": {
           "type": "input",
            "message": "project's version",
            "default": "1.0.0"
        },
        "description": {
            "type"    : "string",
            "required": false,
            "message" : "Project description",
            "default" : "A new Vue.js project"
        },
        "author"     : {
            "type"   : "string",
            "message": "Author"
        },
        "suit":{
            "type": "checkbox",
            "message":"select suit?",
            "default": [{
                "name": "vuex",
                "version": "^2.0.0"
            },{
                "name": "vue-resource",
                "version": "^2.0.0"
            },{
                "name": "vue-router",
                "version": "^1.0.3"
            }],
            "choices": [{
                "name": "vuex",
                "value": "^2.0.0",
                "version": "^2.0.0"
            },{
                "name": "vue-resource",
                "version": "^2.0.0",
                "value":"^2.0.0"
            },{
                "name": "vue-router",
                "version": "^1.0.3",
                "value":"^1.0.3"
            }]
        },
        "unit": {
            "type": "confirm",
            "message": "Setup unit tests with Mocha?"
        },
        "build": {
            "type": "list",
            "message": "Vue build",
            "choices": [
                {
                    "name": "Runtime + Compiler: recommended for most users",
                    "value": "standalone",
                    "short": "standalone"
                },
                {
                    "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
                    "value": "runtime",
                    "short": "runtime"
                }
            ]
        },
        "lint": {
            "type": "confirm",
            "message": "Use ESLint to lint your code?"
        },
        "webpack2":{
            "type": "confirm",
            "message": "Use webpack 2?"
        }
    },
    "filters":{
        "test/*": "unit"
    },
    "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/waka-templates/template-simple"
}