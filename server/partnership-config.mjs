import { readFileSync } from 'node:fs';

const configPath = new URL('../shared/partnership-config.json', import.meta.url);

export const partnershipConfig = Object.freeze(
  JSON.parse(readFileSync(configPath, 'utf8')),
);

export const interestLabels = new Map(
  partnershipConfig.interests.map(({ value, label }) => [value, label]),
);
