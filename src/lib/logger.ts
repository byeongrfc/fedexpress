import { Logger } from "@logtail/next";

const isProd = process.env.NODE_ENV === "production";

class CustomLogger extends Logger {
  private __customConsoleLog = (
    level: "Info" | "Warn" | "Error",
    message: string,
    args?: { [key: string]: unknown }
  ) => {
    console.log(`${level}: ${message}`, args ?? {});
  };

  info = (message: string, args?: { [key: string]: unknown }) => {
    this.__customConsoleLog("Info", message, args);
  };

  warn = (message: string, args?: { [key: string]: unknown }) => {
    this.__customConsoleLog("Warn", message, args);
  };

  error = (message: string, args?: { [key: string]: unknown }) => {
    this.__customConsoleLog("Error", message, args);
  };
}

export function structureError(error: unknown) {
  return {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    raw: error,
  };
}

const logger = isProd ? new Logger() : new CustomLogger();

export default logger;
