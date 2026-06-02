import type { APIRoute } from "astro";

export const prerender = false;

const API_BASE =
  import.meta.env.SERVER_API_BASE_URL ||
  import.meta.env.PUBLIC_API_BASE_URL ||
  "https://api.hi5central.com";

export const ALL: APIRoute = async ({ request, params, url }) => {
  const path = params.path || "";
  const targetUrl = `${API_BASE.replace(/\/$/, "")}/${path}${url.search}`;

  const headers = new Headers();

  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");
  const authorization = request.headers.get("authorization");

  if (contentType) headers.set("content-type", contentType);
  if (cookie) headers.set("cookie", cookie);
  if (authorization) headers.set("authorization", authorization);

  const method = request.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);

  const upstream = await fetch(targetUrl, {
    method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: "manual"
  });

  const responseHeaders = new Headers();

  upstream.headers.forEach((value, key) => {
    if (
      key.toLowerCase() !== "content-encoding" &&
      key.toLowerCase() !== "transfer-encoding"
    ) {
      responseHeaders.set(key, value);
    }
  });

  const setCookie = upstream.headers.get("set-cookie");

  if (setCookie) {
    responseHeaders.set("set-cookie", setCookie);
  }

  return new Response(await upstream.arrayBuffer(), {
    status: upstream.status,
    headers: responseHeaders
  });
};
