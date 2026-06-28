import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import pool from "./db";
import bcrypt from "bcryptjs";

const secretKey = process.env.JWT_SECRET || "default_secret_key_change_me_in_prod";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const [rows] = await pool.execute('SELECT * FROM admins WHERE email = ?', [email]);
    const admin = (rows as any[])[0];

    if (!admin) return false;

    const passwordMatch = await bcrypt.compare(password, admin.password_hash);
    
    if (passwordMatch) {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const session = await encrypt({ adminId: admin.id, email: admin.email, expires });

      const cookieStore = await cookies();
      cookieStore.set("session", session, { expires, httpOnly: true, secure: process.env.NODE_ENV === "production" });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch (error) {
    return null;
  }
}
