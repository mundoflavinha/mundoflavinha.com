import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_HOME_V2_CONTENT,
  cloneHomeV2Content,
  type HomeV2Content,
  validateHomeV2Content,
} from "../../content/homeV2";
import { loadHomeV2Content, saveHomeV2Content } from "../../lib/homeV2ContentStore";
import {
  SUPABASE_ENV_HINT,
  getActiveSession,
  hasSupabaseConfig,
  signOutAdmin,
} from "../../lib/supabase";

export function useAdminHomeV2Editor() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [content, setContent] = useState<HomeV2Content>(() =>
    cloneHomeV2Content(DEFAULT_HOME_V2_CONTENT),
  );
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      if (!hasSupabaseConfig()) {
        if (!isMounted) return;
        setErrorMessage(SUPABASE_ENV_HINT);
        setIsBootstrapping(false);
        return;
      }

      const session = await getActiveSession();
      if (!isMounted) return;

      if (!session) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setAccessToken(session.accessToken);

      const loadedContent = await loadHomeV2Content();
      if (!isMounted) return;

      setContent(loadedContent);
      setIsBootstrapping(false);
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const patchContent = useCallback((updater: (draft: HomeV2Content) => void) => {
    setContent((current) => {
      const draft = cloneHomeV2Content(current);
      updater(draft);
      return draft;
    });
  }, []);

  const persistContent = useCallback(
    async (nextContent?: HomeV2Content) => {
      if (!accessToken) {
        setErrorMessage("Sessao expirada. Faca login novamente.");
        navigate("/admin/login", { replace: true });
        return false;
      }

      setIsSaving(true);
      setErrorMessage("");
      setStatusMessage("");

      try {
        const validated = validateHomeV2Content(nextContent ?? content);
        await saveHomeV2Content(validated, accessToken);
        setContent(validated);
        setStatusMessage("Conteudo salvo com sucesso.");
        return true;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Falha ao salvar o conteudo.";
        setErrorMessage(message);
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [accessToken, content, navigate],
  );

  const handleSignOut = useCallback(async () => {
    await signOutAdmin();
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  const clearFeedback = useCallback(() => {
    setErrorMessage("");
    setStatusMessage("");
  }, []);

  return {
    accessToken,
    content,
    setContent,
    patchContent,
    persistContent,
    isBootstrapping,
    isSaving,
    errorMessage,
    statusMessage,
    setErrorMessage,
    setStatusMessage,
    clearFeedback,
    handleSignOut,
  };
}
