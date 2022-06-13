import Component from "./components/QDecimalInput";

const version = __UI_VERSION__;

function install(app) {
  app.component(Component.name, Component);
}

export { version, Component, install };
