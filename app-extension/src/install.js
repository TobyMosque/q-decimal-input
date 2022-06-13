module.exports = function (api) {
  if (!api.hasPackage("@tobymosque/quasar-ui-q-branded-components")) {
    console.warn(
      "this extension requires the @tobymosque/q-branded-components"
    );
    console.warn("please, run the following command:");
    console.warn("quasar ext add @tobymosque/q-branded-components");
    throw new Error("@tobymosque/q-branded-components is required");
  }
};
