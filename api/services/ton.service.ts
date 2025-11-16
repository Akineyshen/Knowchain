export class TonService {
  // Simple TON raw address validation (workchain:hash)
  static isValidRawAddress(rawAddress: string): boolean {
    if (!rawAddress || typeof rawAddress !== "string") {
      return false;
    }

    const trimmed = rawAddress.trim();
    const regex = /^-?\d+:[0-9a-fA-F]{64}$/;

    return regex.test(trimmed);
  }

  static normalizeRawAddress(rawAddress: string): string {
    return rawAddress.trim();
  }
}
