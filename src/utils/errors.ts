export type ErrorPayload = {
  code: string;
  details: string;
};

export class PageError extends Error {
  payload: ErrorPayload;

  constructor(message: string, opts: ErrorPayload) {
    super(JSON.stringify({ message, ...opts })); // encode all into message
    this.name = "PageError";
    this.payload = opts;
  }
}

type ParsedError = {
  code: string;
  message: string;
  details: string;
};

export function parseError(error: Error): ParsedError {
  try {
    const parsed = JSON.parse(error.message);
    return {
      code: parsed.code ?? "500",
      message: parsed.message ?? "Unknown error",
      details: parsed.details ?? "",
    };
  } catch {
    return {
      code: "500",
      message: "Unexpected error occurred",
      details: "",
    };
  }
}
