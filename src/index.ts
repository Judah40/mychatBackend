import { profileRoute } from "./module/Profile/Profile.route";
import { rateLimiterMiddlware } from "./middleware/redisRateLimit.middleware";
import { UserRoute } from "./module/Users/Users.route";
import express, { NextFunction, Request, Response } from "express";
import { requireAuthenticatedUser } from "./middleware/auth";

export const app = express();

app.use(express.json({ limit: "10mb" })); // add a limit to avoid DOS attacks
// app.use(rateLimiterMiddlware);
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/User", UserRoute);
app.use("/api/v1/profile", requireAuthenticatedUser, profileRoute);
// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send("Something broke!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
