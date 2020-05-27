## label_filter 0.0.1

by boi123212321

Filter labels returned by other plugins

### Arguments

| Name      | Type          | Required | Description       |
| --------- | ------------- | -------- | ----------------- |
| whitelist | Array&lt;String&gt; | false    | Labels to include |
| blacklist | Array&lt;String&gt; | false    | Labels to exclude |

### Example installation with default arguments

`config.json`
```json
---
{
  "PLUGINS": {
    "label_filter": {
      "path": "./plugins/label_filter/main.js",
      "args": {
        "whitelist": [],
        "blacklist": []
      }
    }
  },
  "PLUGIN_EVENTS": {
    "actorCreated": [
      "label_filter"
    ],
    "actorCustom": [
      "label_filter"
    ],
    "sceneCreated": [
      "label_filter"
    ],
    "sceneCustom": [
      "label_filter"
    ],
    "movieCreated": [
      "label_filter"
    ]
  }
}
---
```

`config.yaml`
```yaml
---
PLUGINS:
  label_filter:
    path: ./plugins/label_filter/main.js
    args:
      whitelist: []
      blacklist: []
PLUGIN_EVENTS:
  actorCreated:
    - label_filter
  actorCustom:
    - label_filter
  sceneCreated:
    - label_filter
  sceneCustom:
    - label_filter
  movieCreated:
    - label_filter

---
```
