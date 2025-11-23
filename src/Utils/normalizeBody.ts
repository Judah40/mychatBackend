export async function normalizeBody(body: any): Promise<Buffer> {
  if (Buffer.isBuffer(body)) return body;
  if (typeof body === "string") return Buffer.from(body);

  if (body instanceof Blob) {
    return Buffer.from(await body.arrayBuffer());
  }

  throw new Error("Unsupported body type");
}
