import * as fs from "fs";
import * as nodepath from "path";
import Handlebars from "handlebars";
const table = require("markdown-table") as (val: any) => any;
import YAML from "yaml";

import { setIn } from "./util";

const pluginTemplate = fs.readFileSync("plugin_template.md", "utf-8");

const pluginFolder = nodepath.resolve("../plugins");
const pluginNames = fs.readdirSync(pluginFolder);

const info: Record<string, any> = {};

interface PluginArg {
  name: string;
  type: boolean;
  required: boolean;
  default?: any;
  description?: string;
}

interface PluginInfo {
  name: string;
  version: string;
  authors: string[];
  description: string;
  arguments: PluginArg[];
}

function generateDefaultPluginArguments(pluginArgs: PluginArg[]) {
  const args: Record<string, any> = {};

  (pluginArgs || []).forEach((pluginArg) => {
    const defaultValue = Object.hasOwnProperty.call(pluginArg, "default")
      ? pluginArg.default
      : null;

    try {
      setIn(args, pluginArg.name, defaultValue);
    } catch (err) {
      console.log(
        "There seems to be an error in the nesting of your default arguments in info.json"
      );
      console.error(err);
    }
  });

  return args;
}

function generatePluginExample(pluginInfo: PluginInfo) {
  const defaultArgs = generateDefaultPluginArguments(pluginInfo.arguments);

  return {
    PLUGINS: {
      [pluginInfo.name]: {
        path: `./plugins/${pluginInfo.name}/main.js`,
        args: defaultArgs,
      },
    },
  };
}

const generatePluginDocs = () => {
  pluginNames.forEach((name) => {
    console.log(`Generating docs for ${name}...`);
    const pluginPath = nodepath.join(pluginFolder, name);

    const infoPath = nodepath.join(pluginPath, "info.json");
    const pluginInfo = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
    info[name] = pluginInfo;

    const docPath = nodepath.join(pluginPath, "docs.md");
    const docs = fs.existsSync(docPath)
      ? fs.readFileSync(docPath, "utf-8")
      : null;

    const tableHeaders = ["Name", "Type", "Required", "Description"];

    const example = generatePluginExample(pluginInfo);
    const exampleJSON = JSON.stringify(example, null, 2);
    const exampleYAML = YAML.stringify(example, { simpleKeys: true });

    const rendered = Handlebars.compile(pluginTemplate)({
      name,
      version: pluginInfo.version,
      description: pluginInfo.description,
      authors: pluginInfo.authors,
      docs,
      hasArgs: pluginInfo.arguments && pluginInfo.arguments.length,
      argsTable: table([
        tableHeaders,
        ...(pluginInfo.arguments || []).map((arg: any) => [
          arg.name,
          arg.type,
          arg.required,
          arg.description,
        ]),
      ]),
      exampleJSON,
      exampleYAML,
    });
    const readmePath = nodepath.join(pluginPath, "README.md");
    fs.writeFileSync(readmePath, rendered, "utf-8");
    console.log(`${name} done`);
  });

  console.log("Generating index...");

  const indexTemplate = fs.readFileSync("template.md", "utf-8");
  const tableHeaders = ["Plugin", "Description"];
  const rendered = Handlebars.compile(indexTemplate)({
    table: table([
      tableHeaders,
      ...Object.values(info).map((arg: any) => [arg.name, arg.description]),
    ]),
  });
  const indexReadmePath = nodepath.resolve("../README.md");
  fs.writeFileSync(indexReadmePath, rendered, "utf-8");
  console.log(`Index done`);
};

generatePluginDocs();
