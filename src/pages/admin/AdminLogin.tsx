import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useAdminPageSeo } from "../../hooks/useAdminPageSeo";
import {
  SUPABASE_ENV_HINT,
  getActiveSession,
  hasSupabaseConfig,
  signInWithPassword,
} from "../../lib/supabase";

const inputClassName =
  "h-11 w-full rounded-xl border border-[#ded6cf] bg-white px-3 text-sm text-[#231814] outline-none transition focus:border-[#eb7a91] focus:ring-2 focus:ring-[#eb7a91]/20";

const AdminLogin = () => {
  useAdminPageSeo("Admin | Login | Mundo Flavinha");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function verifyCurrentSession() {
      if (!hasSupabaseConfig()) {
        if (!isMounted) return;
        setErrorMessage(SUPABASE_ENV_HINT);
        setIsCheckingSession(false);
        return;
      }

      const session = await getActiveSession();
      if (!isMounted) return;

      if (session) {
        navigate("/admin/home-v2", { replace: true });
        return;
      }

      setIsCheckingSession(false);
    }

    verifyCurrentSession();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      await signInWithPassword(email.trim(), password);
      navigate("/admin/home-v2", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao entrar no admin.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f0eb] px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-[#e6ddd5] bg-white p-7 shadow-[0_20px_55px_-40px_rgba(30,20,16,0.35)] sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8b665d]">Admin</p>
          <h1 className="mt-3 font-display text-4xl leading-none text-[#231814]">Mundo Flavinha</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Acesso exclusivo para editar o conteudo da Home V2.
          </p>

          <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
                Email
              </span>
              <input
                autoComplete="email"
                className={inputClassName}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seu-email@exemplo.com"
                required
                type="email"
                value={email}
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
                Senha
              </span>
              <input
                autoComplete="current-password"
                className={inputClassName}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                required
                type="password"
                value={password}
              />
            </label>

            {errorMessage ? (
              <p className="rounded-xl border border-[#f2c7cf] bg-[#fff3f6] px-3 py-2 text-sm text-[#9f2146]">
                {errorMessage}
              </p>
            ) : null}

            <Button
              className="h-11 w-full rounded-full bg-[#eb7a91] text-sm font-semibold text-white hover:bg-[#df6d86]"
              disabled={isLoading || isCheckingSession}
              type="submit"
            >
              {isLoading || isCheckingSession ? "Entrando..." : "Entrar no admin"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
