import { setCookie, deleteCookie } from "hono/cookie";

const SESSION_COOKIE = "hi5central_session";

export function setSessionCookie(c: any, token: string) {
  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });
}

export function clearSessionCookie(c: any) {
  deleteCookie(c, SESSION_COOKIE, {
    path: "/"
  });
}

export { SESSION_COOKIE };
