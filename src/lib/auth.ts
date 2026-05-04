import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getUserFromToken() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch {
    return null;
  }
}