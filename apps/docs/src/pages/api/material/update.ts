import { MaterialIconController } from "src/api/material/controller";
import { createNextHandler } from "src/utils/api";
import { StatusCode } from "src/utils/errors";

export default createNextHandler(["POST"])(async (_req, res) => {
  const controller = new MaterialIconController();

  await controller.updateEverything();
  res.status(StatusCode.Accepted).end();
});
