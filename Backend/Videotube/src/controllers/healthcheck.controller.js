import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandles.js";

const healthcheck = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiRespone(200, "ok", "Healthcheck passed"));
});

export { healthcheck };
