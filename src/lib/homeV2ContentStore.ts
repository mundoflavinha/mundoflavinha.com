import {
  DEFAULT_HOME_V2_CONTENT,
  cloneHomeV2Content,
  normalizeHomeV2Content,
  type HomeV2Content,
} from "../content/homeV2";
import { fetchCmsPageContent, hasSupabaseConfig, upsertCmsPageContent } from "./supabase";

const HOME_V2_SLUG = "home-v2";

export async function loadHomeV2Content() {
  if (!hasSupabaseConfig()) {
    return cloneHomeV2Content(DEFAULT_HOME_V2_CONTENT);
  }

  try {
    const payload = await fetchCmsPageContent(HOME_V2_SLUG);
    if (!payload) {
      return cloneHomeV2Content(DEFAULT_HOME_V2_CONTENT);
    }

    return normalizeHomeV2Content(payload);
  } catch (error) {
    console.error("[home-v2] fallback local content", error);
    return cloneHomeV2Content(DEFAULT_HOME_V2_CONTENT);
  }
}

export async function saveHomeV2Content(content: HomeV2Content, accessToken: string) {
  await upsertCmsPageContent(HOME_V2_SLUG, content, accessToken);
}
