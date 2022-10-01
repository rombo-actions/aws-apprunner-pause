export type Operation = 'pause' | 'resume';

export function isOperation(value: string): value is Operation {
  return value === 'pause' || value === 'resume';
}
