# Dialog

A Web Component for presenting a modal dialog

## Using it

Try it out directly (requires a modern browser)

```javascript
import "https://cdn.skypack.dev/afix-dialog@latest";
```

Or install with

```bash
npm install afix-dialog
```

And use like this

```js
import "afix-dialog"`
```

### Attributes

| Name | Description                          | Default |
| ---- | ------------------------------------ | ------- |
| open | Whether or not the dialog is visible | Unset   |

### DialogElement

#### Methods

##### show(): void

Shows the dialog

##### close(): void

Hides the dialog

#### Events

##### close

Emitted when the dialog is closed

##### open

Emitted when the dialog is opened

### CSS Custom Properties

Remember **all custom properties are prefixed with the component name**. e.g. `background-color` is `--afix-dialog-background-color`.

| Name                | Description                                      | Default         |
| ------------------- | ------------------------------------------------ | --------------- |
| background-color    | The background of the dialog                     | rgba(0,0,0,0.9) |
| transition-duration | The amount of time the in/out transition takes   | 200ms           |
| transition-easing   | The easing function used when showing the dialog | ease-in-out     |
