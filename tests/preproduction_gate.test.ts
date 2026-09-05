import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { vehiclesData } from '../src/data/vehiclesData.generated';

describe('Automobile Quick Pre-Production Gate', () => {
  it('should verify inventory manifest contains 31 active and 16 sold vehicles', () => {
    const active = vehiclesData.filter((v: any) => v.status === 'available');
    const sold = vehiclesData.filter((v: any) => v.status === 'sold');
    expect(active.length).toBe(31);
    expect(sold.length).toBe(16);
  });

  it('should verify changelog records the final preproduction milestone', () => {
    const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
    const content = fs.readFileSync(changelogPath, 'utf-8');
    expect(content).toContain('1.0.0-rc1');
    expect(content).toContain('PR #635');
  });
});
