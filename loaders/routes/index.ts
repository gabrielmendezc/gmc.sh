import type { DataLoader } from "@remix-run/core";

let loader: DataLoader = async () => {
  return {
    message: "hello",
  };
};

export = loader;
