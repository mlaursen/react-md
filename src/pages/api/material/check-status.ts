import { MaterialIconController } from "src/api/material/controller";
import { createNextHandler } from "src/utils/api";

export default createNextHandler()(async (_req, res) => {
  const controller = new MaterialIconController();

  const stats = await controller.getGeneratingStats();
  res.json(stats);
});
