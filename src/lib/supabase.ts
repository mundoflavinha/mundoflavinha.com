interface SupabaseAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type: string;
  user: {
    id: string;
    email: string;
  };
}

interface StoredSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
  email: string;
}

const ACCESS_TOKEN_KEY = "mf_admin_access_token";
const REFRESH_TOKEN_KEY = "mf_admin_refresh_token";
const EXPIRES_AT_KEY = "mf_admin_expires_at";
const USER_ID_KEY = "mf_admin_user_id";
const USER_EMAIL_KEY = "mf_admin_user_email";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABSE_ANON_KEY
)?.trim();
const configuredStorageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET?.trim();

export const SUPABASE_ENV_HINT =
  "Supabase nao configurado. Crie o arquivo .env na raiz com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.";

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function ensureSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(SUPABASE_ENV_HINT);
  }
}

function parseErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") return fallback;

  if ("error" in payload && typeof payload.error === "string") {
    return payload.error;
  }

  if ("error_description" in payload && typeof payload.error_description === "string") {
    return payload.error_description;
  }

  if ("msg" in payload && typeof payload.msg === "string") {
    return payload.msg;
  }

  if ("message" in payload && typeof payload.message === "string") {
    return payload.message;
  }

  return fallback;
}

async function requestSupabase(
  path: string,
  init?: RequestInit,
  accessToken?: string,
) {
  ensureSupabaseConfig();

  const headers = new Headers(init?.headers);
  headers.set("apikey", supabaseAnonKey as string);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(`${supabaseUrl}${path}`, {
    ...init,
    headers,
  });
}

function persistSession(payload: SupabaseAuthResponse) {
  if (!canUseBrowserStorage()) return;

  localStorage.setItem(ACCESS_TOKEN_KEY, payload.access_token);
  localStorage.setItem(REFRESH_TOKEN_KEY, payload.refresh_token);
  localStorage.setItem(EXPIRES_AT_KEY, payload.expires_at.toString());
  localStorage.setItem(USER_ID_KEY, payload.user.id);
  localStorage.setItem(USER_EMAIL_KEY, payload.user.email);
}

function clearPersistedSession() {
  if (!canUseBrowserStorage()) return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
}

function getPersistedSession(): StoredSession | null {
  if (!canUseBrowserStorage()) return null;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const expiresAtRaw = localStorage.getItem(EXPIRES_AT_KEY);
  const userId = localStorage.getItem(USER_ID_KEY);
  const email = localStorage.getItem(USER_EMAIL_KEY);

  if (!accessToken || !refreshToken || !expiresAtRaw || !userId || !email) {
    return null;
  }

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt)) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
    expiresAt,
    userId,
    email,
  };
}

function isExpired(session: StoredSession) {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return nowInSeconds >= session.expiresAt - 60;
}

async function refreshAccessToken(refreshToken: string) {
  const response = await requestSupabase("/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as unknown;
    throw new Error(parseErrorMessage(payload, "Nao foi possivel renovar a sessao."));
  }

  const payload = (await response.json()) as SupabaseAuthResponse;
  persistSession(payload);

  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: payload.expires_at,
    userId: payload.user.id,
    email: payload.user.email,
  } satisfies StoredSession;
}

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export async function signInWithPassword(email: string, password: string) {
  const response = await requestSupabase("/auth/v1/token?grant_type=password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as unknown;
    throw new Error(parseErrorMessage(payload, "Falha ao entrar no admin."));
  }

  const payload = (await response.json()) as SupabaseAuthResponse;
  persistSession(payload);
}

export async function getActiveSession() {
  const persisted = getPersistedSession();
  if (!persisted) return null;

  if (!isExpired(persisted)) return persisted;

  try {
    return await refreshAccessToken(persisted.refreshToken);
  } catch {
    clearPersistedSession();
    return null;
  }
}

export async function signOutAdmin() {
  const session = await getActiveSession();

  if (session) {
    await requestSupabase(
      "/auth/v1/logout",
      {
        method: "POST",
      },
      session.accessToken,
    ).catch(() => undefined);
  }

  clearPersistedSession();
}

export async function fetchCmsPageContent(slug: string) {
  const response = await requestSupabase(
    `/rest/v1/cms_pages?slug=eq.${encodeURIComponent(slug)}&select=content`,
    { method: "GET" },
  );

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as unknown;
    throw new Error(parseErrorMessage(payload, "Falha ao carregar conteudo no Supabase."));
  }

  const rows = (await response.json()) as Array<{ content: unknown }>;
  return rows[0]?.content ?? null;
}

export async function upsertCmsPageContent(slug: string, content: unknown, accessToken: string) {
  const response = await requestSupabase(
    "/rest/v1/cms_pages?on_conflict=slug",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        slug,
        content,
        updated_at: new Date().toISOString(),
      }),
    },
    accessToken,
  );

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as unknown;
    throw new Error(parseErrorMessage(payload, "Falha ao salvar conteudo no Supabase."));
  }
}

function sanitizeFilenamePart(value: string) {
  return value
    .normalize("NFD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function sanitizeFolderPath(value: string) {
  return value
    .split("/")
    .map((segment) => sanitizeFilenamePart(segment))
    .filter(Boolean)
    .join("/");
}

function normalizeImageExtension(extension: string) {
  const trimmed = extension.trim().replace(/^\./, "").toLowerCase();
  if (!trimmed) return "jpg";
  if (trimmed === "jpeg") return "jpg";
  return trimmed;
}

function getExtensionFromMime(mimeType: string) {
  const trimmed = mimeType.trim().toLowerCase();
  if (trimmed === "image/jpeg") return "jpg";
  if (trimmed === "image/jpg") return "jpg";
  if (trimmed === "image/png") return "png";
  if (trimmed === "image/webp") return "webp";
  if (trimmed === "image/gif") return "gif";
  if (trimmed === "image/avif") return "avif";
  return "jpg";
}

function buildUniqueFilename(rawFilename: string, mimeType: string) {
  const sanitized = sanitizeFilenamePart(rawFilename || "img");
  const dotIndex = sanitized.lastIndexOf(".");
  const baseRaw = dotIndex > 0 ? sanitized.slice(0, dotIndex) : sanitized;
  const extensionRaw = dotIndex > 0 ? sanitized.slice(dotIndex + 1) : "";
  const base = baseRaw || "img";
  const extension = normalizeImageExtension(extensionRaw || getExtensionFromMime(mimeType));
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${base}-${suffix}.${extension}`;
}

function getStorageBucketCandidates() {
  return [...new Set([configuredStorageBucket, "cms-images", "images"].filter(Boolean) as string[])];
}

function buildPublicObjectUrl(bucket: string, objectPath: string) {
  const encodedPath = objectPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodedPath}`;
}

export async function uploadCmsImage(
  accessToken: string,
  file: Blob,
  options?: { folder?: string; filename?: string },
) {
  ensureSupabaseConfig();

  const folder = options?.folder ? sanitizeFolderPath(options.folder) : "home-v2";
  const filename = buildUniqueFilename(options?.filename ?? "img", file.type || "image/jpeg");
  const objectPath = folder ? `${folder}/${filename}` : filename;
  const buckets = getStorageBucketCandidates();
  const attemptErrors: string[] = [];

  for (const bucket of buckets) {
    const response = await requestSupabase(
      `/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`,
      {
        method: "POST",
        headers: {
          "Content-Type": file.type || "image/jpeg",
        },
        body: file,
      },
      accessToken,
    );

    if (response.ok) {
      return buildPublicObjectUrl(bucket, objectPath);
    }

    const payload = (await response.json().catch(() => null)) as unknown;
    const message = parseErrorMessage(payload, "Falha ao enviar imagem para o Storage.");
    attemptErrors.push(`${bucket}: ${message}`);

    if (response.status === 401 || response.status === 403) {
      throw new Error(message);
    }
  }

  throw new Error(`Falha ao enviar imagem. ${attemptErrors.join(" | ")}`);
}
