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

```json
---
{{{ exampleJSON }}}
```

```yaml
---
{{{ exampleYAML }}}
```
