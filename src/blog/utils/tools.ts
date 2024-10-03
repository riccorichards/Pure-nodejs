import { ApiError, BadRequestError } from "./errorHandlers";

class Tools {
  async handleError(error: unknown) {
    if (error instanceof Error) {
      throw new BadRequestError(error.message);
    }
    throw new ApiError();
  }
}

export default Tools;
