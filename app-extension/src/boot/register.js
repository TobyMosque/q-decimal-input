import { boot } from "quasar/wrappers";
import VuePlugin from "@tobymosque/quasar-ui-q-decimal-input";

export default boot(({ app }) => {
  app.use(VuePlugin);
});
