import fs from "fs-extra";

const { readJson, writeJson } = fs;

export async function loadData(file) {
  try {
    return await readJson(file);
  } catch {
    return [];
  }
}

export async function saveData(file, data) {
  await writeJson(file, data, { spaces: 2 });
}
