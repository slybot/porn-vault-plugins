## {{ name }} {{ version }}

by {{ authors }}

{{ description }}
{{#if docs}}

### Documentation

{{ docs }}
{{/if}}
{{#if hasArgs}}

### Arguments

{{ argsTable }}
{{/if}}

### Example installation with default arguments

`config.json`
```json
---
{{{ exampleJSON }}}
---
```

`config.yaml`
```yaml
---
{{{ exampleYAML }}}
---
```
