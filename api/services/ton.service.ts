import axios from "axios";

export class TonService {
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

  static async validateProof(address: string, proof: any): Promise<boolean> {
    try {
      const response = await axios.post(
        "https://tonapi.io/v2/tonconnect/proof/check",
        {
          address,
          proof
        }
      );

      return response.data.valid === true;
    } catch (err: any) {
      console.error(
        "TON proof validation error:",
        err?.response?.data || err
      );
      return false;
    }
  }
}
