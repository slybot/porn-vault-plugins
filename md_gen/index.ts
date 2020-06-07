import * as fs from "fs";
import * as nodepath from "path";
import Handlebars from "handlebars";
const table = require("markdown-table") as (val: any) => any;
import YAML from "yaml";

import { setIn } from "./util";

interface PluginArg {
  name: string;
  type: boolean;
  required: boolean;
  default?: any;
  description?: string;
}

type PluginEvents =
  | "actorCreated"
  | "actorCustom"
  | "sceneCreated"
  | "sceneCustom"
  | "movieCreated";

interface PluginInfo {
  name: string;
  version: string;
  authors: string[];
  description: string;
  pluginEvents: PluginEvents[];
  arguments: PluginArg[];
}

const pluginTemplate = fs.readFileSync("plugin_template.md", "utf-8");

const pluginFolder = nodepath.resolve("../plugins");
const pluginDirNames = fs.readdirSync(pluginFolder);

const info: Record<string, PluginInfo> = {};

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

function generatePluginEvents(pluginName: string, pluginEvents: string[]) {
  const events: Record<string, string[]> = {};

  pluginEvents.forEach((eventName) => {
    events[eventName] = [pluginName];
  });

  return events;
}

function generatePluginExample(pluginInfo: PluginInfo) {
  const defaultArgs = generateDefaultPluginArguments(pluginInfo.arguments);

  const pluginEvents = generatePluginEvents(pluginInfo.name, pluginInfo.pluginEvents);

  return {
    PLUGINS: {
      [pluginInfo.name]: {
        path: `./plugins/${pluginInfo.name}/main.js`,
        args: defaultArgs,
      },
    },
    PLUGIN_EVENTS: pluginEvents,
  };
}

const generatePluginDocs = () => {
  pluginDirNames.forEach((pluginDirName) => {
    console.log(`Generating docs for ${pluginDirName}...`);
    const pluginPath = nodepath.join(pluginFolder, pluginDirName);

    const infoPath = nodepath.join(pluginPath, "info.json");
    const pluginInfo = JSON.parse(fs.readFileSync(infoPath, "utf-8")) as PluginInfo;
    info[pluginDirName] = pluginInfo;

    const docPath = nodepath.join(pluginPath, "docs.md");
    const docs = fs.existsSync(docPath) ? fs.readFileSync(docPath, "utf-8") : null;

    const tableHeaders = ["Name", "Type", "Required", "Description"];

    const example = generatePluginExample(pluginInfo);
    const exampleJSON = JSON.stringify(example, null, 2);
    const exampleYAML = YAML.stringify(example, { simpleKeys: true });

    const rendered = Handlebars.compile(pluginTemplate)({
      name: pluginInfo.name,
      version: pluginInfo.version,
      description: pluginInfo.description,
      authors: pluginInfo.authors.join(", "),
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
    console.log(`${pluginDirName} done`);
  });

  console.log("Generating index...");

  const indexTemplate = fs.readFileSync("template.md", "utf-8");
  const tableHeaders = ["Plugin", "Description"];
  const rendered = Handlebars.compile(indexTemplate)({
    table: table([
      tableHeaders,
      ...Object.entries(info).map(([pluginDirName, pluginInfo]) => [
        `[${pluginInfo.name}](https://github.com/boi123212321/porn-vault-plugins/blob/master/plugins/${pluginDirName}/README.md)`,
        pluginInfo.description,
      ]),
    ]),
  });

  const indexReadmePath = nodepath.resolve("../README.md");
  fs.writeFileSync(indexReadmePath, rendered, "utf-8");
  console.log(`Index done`);
};

generatePluginDocs();
