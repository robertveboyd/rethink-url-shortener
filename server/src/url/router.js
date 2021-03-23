import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/short-url", controller.getShortUrl);
router.get("/urls", controller.getUrls);
router.delete("/urls", controller.deleteUrls);

export default router;
