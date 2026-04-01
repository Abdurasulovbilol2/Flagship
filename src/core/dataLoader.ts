import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export function loadJsonData<T>(relativePath: string): T {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const content = fs.readFileSync(absolutePath, "utf-8");
  return JSON.parse(content) as T;
}

export function loadCsvData<T extends Record<string, string>>(
  relativePath: string,
): T[] {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const content = fs.readFileSync(absolutePath, "utf-8");
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as T[];
}
