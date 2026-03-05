import { type ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ImageCropUploader from "../../components/admin/ImageCropUploader";
import { Button } from "../../components/ui/button";
import {
  cloneHomeV2Content,
  type HomeV2Action,
  type HomeV2AuthoredProduct,
  type HomeV2Product,
  type HomeV2Testimonial,
} from "../../content/homeV2";
import { useAdminPageSeo } from "../../hooks/useAdminPageSeo";
import { useAdminHomeV2Editor } from "./useAdminHomeV2Editor";

type AdminSection =
  | "menu"
  | "hero"
  | "channels"
  | "authored"
  | "products"
  | "testimonials"
  | "finalCta"
  | "footer";

type EditorMode = "view" | "edit" | "create";

interface CrudEditorState<T> {
  mode: EditorMode | null;
  index: number | null;
  draft: T | null;
}

interface SuggestionEditorItem extends HomeV2Product {
  isFeatured: boolean;
}

const panelClass =
  "rounded-3xl border border-[#e7ded6] bg-white p-5 shadow-[0_18px_45px_-36px_rgba(30,20,16,0.35)]";
const inputClass =
  "h-10 w-full rounded-xl border border-[#ddd4cc] bg-white px-3 text-sm text-[#231814] outline-none transition focus:border-[#eb7a91] focus:ring-2 focus:ring-[#eb7a91]/20";
const textareaClass =
  "w-full rounded-xl border border-[#ddd4cc] bg-white px-3 py-2 text-sm text-[#231814] outline-none transition focus:border-[#eb7a91] focus:ring-2 focus:ring-[#eb7a91]/20";

const sectionItems: Array<{ id: AdminSection; label: string }> = [
  { id: "menu", label: "Menu" },
  { id: "hero", label: "Hero" },
  { id: "channels", label: "Meus Canais" },
  { id: "authored", label: "Materiais autorais" },
  { id: "products", label: "Produtos" },
  { id: "testimonials", label: "Depoimentos" },
  { id: "finalCta", label: "Menos Tela, Mais Presenca" },
  { id: "footer", label: "Footer" },
];

const createAuthoredProduct = (): HomeV2AuthoredProduct => ({
  name: "Novo material",
  description: "Descreva o material.",
  image: "",
  price: "R$ 0,00",
  href: "#",
  cta: "Ver material",
});

const createSuggestion = (): SuggestionEditorItem => ({
  name: "Novo produto",
  description: "Descreva o produto.",
  image: "",
  href: "#",
  cta: "Ver sugestao",
  isFeatured: false,
});

const createTestimonial = (): HomeV2Testimonial => ({
  name: "Novo depoimento",
  role: "Mae / Pai",
  content: "Escreva o depoimento aqui.",
  image: "",
});

function reorderArray<T>(items: T[], fromIndex: number, toIndex: number) {
  const cloned = [...items];
  const [moved] = cloned.splice(fromIndex, 1);
  if (typeof moved === "undefined") return cloned;
  cloned.splice(toIndex, 0, moved);
  return cloned;
}

function combineSuggestions(highlighted: HomeV2Product[], additional: HomeV2Product[]) {
  return [
    ...highlighted.map((item) => ({ ...item, isFeatured: true })),
    ...additional.map((item) => ({ ...item, isFeatured: false })),
  ];
}

function splitSuggestions(items: SuggestionEditorItem[]) {
  return {
    highlighted: items
      .filter((item) => item.isFeatured)
      .map((item) => ({
        name: item.name,
        description: item.description,
        image: item.image,
        href: item.href,
        cta: item.cta,
      })),
    additional: items
      .filter((item) => !item.isFeatured)
      .map((item) => ({
        name: item.name,
        description: item.description,
        image: item.image,
        href: item.href,
        cta: item.cta,
      })),
  };
}

function toProjectProductsPath(uploadedUrl: string) {
  const withoutQuery = uploadedUrl.split("?")[0] ?? uploadedUrl;
  const parts = withoutQuery.split("/");
  const filename = decodeURIComponent(parts[parts.length - 1] ?? "");
  if (!filename) return uploadedUrl;
  return `/images/products/${filename}`;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputField = ({ label, value, onChange, placeholder }: InputFieldProps) => (
  <label className="block space-y-1.5">
    <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8b665d]">
      {label}
    </span>
    <input
      className={inputClass}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      value={value}
    />
  </label>
);

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

const TextareaField = ({ label, value, onChange, rows = 4 }: TextareaFieldProps) => (
  <label className="block space-y-1.5">
    <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8b665d]">
      {label}
    </span>
    <textarea
      className={textareaClass}
      onChange={(event) => onChange(event.target.value)}
      rows={rows}
      value={value}
    />
  </label>
);

interface SectionVisibilityToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
}

const SectionVisibilityToggle = ({ checked, onChange }: SectionVisibilityToggleProps) => (
  <label className="inline-flex h-10 items-center gap-2 rounded-full border border-[#d7cec6] bg-white px-4 text-sm text-[#231814]">
    <input
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      type="checkbox"
    />
    Mostrar secao
  </label>
);

interface ItemListProps {
  title: string;
  helperText: string;
  children: ReactNode;
}

const ItemList = ({ title, helperText, children }: ItemListProps) => (
  <div className="space-y-3">
    <div className="flex items-end justify-between gap-3">
      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">{title}</h3>
      <p className="text-xs text-slate-500">{helperText}</p>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const AdminHomeV2 = () => {
  useAdminPageSeo("Admin | Home V2 | Mundo Flavinha");

  const {
    accessToken,
    content,
    setContent,
    patchContent,
    persistContent,
    isBootstrapping,
    isSaving,
    errorMessage,
    statusMessage,
    clearFeedback,
    handleSignOut,
  } = useAdminHomeV2Editor();

  const [activeSection, setActiveSection] = useState<AdminSection>("menu");

  const [authoredEditor, setAuthoredEditor] = useState<CrudEditorState<HomeV2AuthoredProduct>>({
    mode: null,
    index: null,
    draft: null,
  });
  const [suggestionEditor, setSuggestionEditor] = useState<CrudEditorState<SuggestionEditorItem>>({
    mode: null,
    index: null,
    draft: null,
  });
  const [testimonialEditor, setTestimonialEditor] = useState<CrudEditorState<HomeV2Testimonial>>({
    mode: null,
    index: null,
    draft: null,
  });

  const [dragMenuIndex, setDragMenuIndex] = useState<number | null>(null);
  const [dragAuthoredIndex, setDragAuthoredIndex] = useState<number | null>(null);
  const [dragProductIndex, setDragProductIndex] = useState<number | null>(null);
  const [dragTestimonialIndex, setDragTestimonialIndex] = useState<number | null>(null);

  const suggestionItems = useMemo(
    () => combineSuggestions(content.suggestions.highlighted, content.suggestions.additional),
    [content.suggestions.additional, content.suggestions.highlighted],
  );
  const featuredSuggestionEntries = useMemo(
    () =>
      suggestionItems
        .map((item, index) => ({ item, index }))
        .filter((entry) => entry.item.isFeatured),
    [suggestionItems],
  );
  const additionalSuggestionEntries = useMemo(
    () =>
      suggestionItems
        .map((item, index) => ({ item, index }))
        .filter((entry) => !entry.item.isFeatured),
    [suggestionItems],
  );

  const changeSection = (section: AdminSection) => {
    setActiveSection(section);
    setAuthoredEditor({ mode: null, index: null, draft: null });
    setSuggestionEditor({ mode: null, index: null, draft: null });
    setTestimonialEditor({ mode: null, index: null, draft: null });
    clearFeedback();
  };

  const patchSuggestionItems = (updater: (items: SuggestionEditorItem[]) => void) => {
    patchContent((draft) => {
      const items = combineSuggestions(draft.suggestions.highlighted, draft.suggestions.additional);
      updater(items);
      const split = splitSuggestions(items);
      draft.suggestions.highlighted = split.highlighted;
      draft.suggestions.additional = split.additional;
    });
  };

  const openAuthoredEditor = (mode: EditorMode, index: number | null = null) => {
    if (mode === "create") {
      setAuthoredEditor({ mode, index: null, draft: createAuthoredProduct() });
      return;
    }
    if (index === null) return;
    const item = content.authored.products[index];
    if (!item) return;
    setAuthoredEditor({ mode, index, draft: { ...item } });
  };

  const openSuggestionEditor = (
    mode: EditorMode,
    index: number | null = null,
    defaults?: Partial<SuggestionEditorItem>,
  ) => {
    if (mode === "create") {
      setSuggestionEditor({ mode, index: null, draft: { ...createSuggestion(), ...defaults } });
      return;
    }
    if (index === null) return;
    const item = suggestionItems[index];
    if (!item) return;
    setSuggestionEditor({ mode, index, draft: { ...item } });
  };

  const openTestimonialEditor = (mode: EditorMode, index: number | null = null) => {
    if (mode === "create") {
      setTestimonialEditor({ mode, index: null, draft: createTestimonial() });
      return;
    }
    if (index === null) return;
    const item = content.testimonials.items[index];
    if (!item) return;
    setTestimonialEditor({ mode, index, draft: { ...item } });
  };

  const applyAuthoredEditor = () => {
    if (!authoredEditor.draft) return Promise.resolve();

    const mode = authoredEditor.mode;
    const index = authoredEditor.index;
    const draftItem = { ...authoredEditor.draft } as HomeV2AuthoredProduct;

    const nextContent = cloneHomeV2Content(content);
    if (mode === "create") {
      nextContent.authored.products.push(draftItem);
    } else if (index !== null) {
      nextContent.authored.products[index] = draftItem;
    }

    setContent(nextContent);
    return persistContent(nextContent).then((saved) => {
      if (saved) {
        setAuthoredEditor({ mode: null, index: null, draft: null });
      }
    });
  };

  const applySuggestionEditor = () => {
    if (!suggestionEditor.draft) return Promise.resolve();

    const mode = suggestionEditor.mode;
    const index = suggestionEditor.index;
    const draftItem = { ...suggestionEditor.draft } as SuggestionEditorItem;

    const nextContent = cloneHomeV2Content(content);
    const items = combineSuggestions(
      nextContent.suggestions.highlighted,
      nextContent.suggestions.additional,
    );

    if (mode === "create") {
      items.push(draftItem);
    } else if (index !== null) {
      items[index] = draftItem;
    }

    const split = splitSuggestions(items);
    nextContent.suggestions.highlighted = split.highlighted;
    nextContent.suggestions.additional = split.additional;

    setContent(nextContent);
    return persistContent(nextContent).then((saved) => {
      if (saved) {
        setSuggestionEditor({ mode: null, index: null, draft: null });
      }
    });
  };

  const applyTestimonialEditor = () => {
    if (!testimonialEditor.draft) return Promise.resolve();

    const mode = testimonialEditor.mode;
    const index = testimonialEditor.index;
    const draftItem = { ...testimonialEditor.draft } as HomeV2Testimonial;

    const nextContent = cloneHomeV2Content(content);
    if (mode === "create") {
      nextContent.testimonials.items.push(draftItem);
    } else if (index !== null) {
      nextContent.testimonials.items[index] = draftItem;
    }

    setContent(nextContent);
    return persistContent(nextContent).then((saved) => {
      if (saved) {
        setTestimonialEditor({ mode: null, index: null, draft: null });
      }
    });
  };

  const renderSaveSectionButton = () => (
    <Button
      className="h-10 rounded-full bg-[#eb7a91] px-5 text-white hover:bg-[#df6d86]"
      disabled={isSaving}
      onClick={() => void persistContent()}
      type="button"
    >
      {isSaving ? "Salvando..." : "Salvar alteracoes"}
    </Button>
  );

  const renderMenuSection = () => (
    <div className="space-y-4">
      <div className={panelClass}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl leading-none text-[#231814]">Menu</h2>
            <p className="mt-2 text-sm text-slate-600">Campos para editar os links de navegacao.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {renderSaveSectionButton()}
            <Button
              className="h-10 rounded-full bg-[#eb7a91] px-5 text-white hover:bg-[#df6d86]"
              onClick={() =>
                patchContent((draft) => {
                  draft.navigationItems.push({ href: "#nova-secao", label: "Novo item" });
                })
              }
              type="button"
            >
              Incluir item
            </Button>
          </div>
        </div>

        <ItemList helperText="Arraste para ordenar" title="Itens do menu">
          {content.navigationItems.map((item, index) => (
            <article
              className="rounded-2xl border border-[#ece3db] bg-[#fbf9f6] p-3"
              draggable
              key={`${item.href}-${index}`}
              onDragEnd={() => setDragMenuIndex(null)}
              onDragOver={(event) => event.preventDefault()}
              onDragStart={() => setDragMenuIndex(index)}
              onDrop={() => {
                if (dragMenuIndex === null || dragMenuIndex === index) return;
                patchContent((draft) => {
                  draft.navigationItems = reorderArray(draft.navigationItems, dragMenuIndex, index);
                });
                setDragMenuIndex(null);
              }}
            >
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                <InputField
                  label={`Item ${index + 1} - Texto`}
                  onChange={(value) =>
                    patchContent((draft) => {
                      draft.navigationItems[index].label = value;
                    })
                  }
                  value={item.label}
                />
                <InputField
                  label={`Item ${index + 1} - Link`}
                  onChange={(value) =>
                    patchContent((draft) => {
                      draft.navigationItems[index].href = value;
                    })
                  }
                  value={item.href}
                />
                <div className="flex items-end justify-end gap-2">
                  <Button
                    className="h-10 rounded-full border border-[#e5c6ce] bg-[#fff3f6] px-4 text-[#9f2146] hover:bg-[#ffe9ef]"
                    disabled={content.navigationItems.length <= 1}
                    onClick={() =>
                      patchContent((draft) => {
                        if (draft.navigationItems.length <= 1) return;
                        draft.navigationItems.splice(index, 1);
                      })
                    }
                    type="button"
                    variant="outline"
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </ItemList>
      </div>
    </div>
  );

  const renderHeroSection = () => (
    <div className={panelClass}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl leading-none text-[#231814]">Hero</h2>
          <p className="mt-2 text-sm text-slate-600">
            Formulario com os itens para editar as informacoes do hero.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SectionVisibilityToggle
            checked={content.hero.enabled}
            onChange={(next) =>
              patchContent((draft) => {
                draft.hero.enabled = next;
              })
            }
          />
          {renderSaveSectionButton()}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <InputField
          label="Texto inicial"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.introText = value;
            })
          }
          value={content.hero.introText}
        />
        <InputField
          label="Nome destaque"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.name = value;
            })
          }
          value={content.hero.name}
        />
      </div>

      <div className="mt-3">
        <TextareaField
          label="Titulo principal"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.headline = value;
            })
          }
          value={content.hero.headline}
        />
      </div>
      <div className="mt-3">
        <TextareaField
          label="Descricao"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.description = value;
            })
          }
          value={content.hero.description}
        />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <InputField
          label="CTA principal - texto"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.primaryAction.label = value;
            })
          }
          value={content.hero.primaryAction.label}
        />
        <InputField
          label="CTA principal - link"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.primaryAction.href = value;
            })
          }
          value={content.hero.primaryAction.href}
        />
        <InputField
          label="CTA secundario - texto"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.secondaryAction.label = value;
            })
          }
          value={content.hero.secondaryAction.label}
        />
        <InputField
          label="CTA secundario - link"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.secondaryAction.href = value;
            })
          }
          value={content.hero.secondaryAction.href}
        />
      </div>

      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        <InputField
          label="Imagem (URL)"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.imageSrc = value;
            })
          }
          value={content.hero.imageSrc}
        />
        <InputField
          label="Imagem (ALT)"
          onChange={(value) =>
            patchContent((draft) => {
              draft.hero.imageAlt = value;
            })
          }
          value={content.hero.imageAlt}
        />
      </div>

      <div className="mt-3">
        <ImageCropUploader
          accessToken={accessToken}
          aspectRatio={1}
          currentUrl={content.hero.imageSrc}
          folder="hero"
          onUploaded={(url) =>
            patchContent((draft) => {
              draft.hero.imageSrc = url;
            })
          }
          recommendedSize="1000x1000"
        />
      </div>
    </div>
  );

  const renderChannelsSection = () => (
    <div className="space-y-4">
      <div className={panelClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl leading-none text-[#231814]">Meus Canais</h2>
            <p className="mt-2 text-sm text-slate-600">
              Formulario com os itens para editar as informacoes dos canais.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <SectionVisibilityToggle
              checked={content.channels.enabled}
              onChange={(next) =>
                patchContent((draft) => {
                  draft.channels.enabled = next;
                })
              }
            />
            {renderSaveSectionButton()}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <InputField
            label="Eyebrow"
            onChange={(value) =>
              patchContent((draft) => {
                draft.channels.heading.eyebrow = value;
              })
            }
            value={content.channels.heading.eyebrow}
          />
          <InputField
            label="Titulo"
            onChange={(value) =>
              patchContent((draft) => {
                draft.channels.heading.title = value;
              })
            }
            value={content.channels.heading.title}
          />
        </div>
        <div className="mt-3">
          <TextareaField
            label="Descricao"
            onChange={(value) =>
              patchContent((draft) => {
                draft.channels.heading.description = value;
              })
            }
            value={content.channels.heading.description}
          />
        </div>
      </div>

      {content.channels.cards.map((card, index) => (
        <article className={panelClass} key={`${card.title}-${index}`}>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
            Canal {index + 1}
          </h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <InputField
              label="Titulo"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.channels.cards[index].title = value;
                })
              }
              value={card.title}
            />
            <label className="block space-y-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8b665d]">
                Plataforma
              </span>
              <select
                className={inputClass}
                onChange={(event) =>
                  patchContent((draft) => {
                    draft.channels.cards[index].logo = event.target.value as
                      | "instagram"
                      | "tiktok"
                      | "youtube";
                  })
                }
                value={card.logo}
              >
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
              </select>
            </label>
            <InputField
              label="CTA texto"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.channels.cards[index].cta = value;
                })
              }
              value={card.cta}
            />
            <InputField
              label="Link"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.channels.cards[index].href = value;
                })
              }
              value={card.href}
            />
          </div>
          <div className="mt-3">
            <TextareaField
              label="Descricao"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.channels.cards[index].description = value;
                })
              }
              value={card.description}
            />
          </div>
        </article>
      ))}
    </div>
  );

  const renderAuthoredEditorPage = () => {
    if (!authoredEditor.mode || !authoredEditor.draft) return null;

    return (
      <div className={panelClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
            {authoredEditor.mode === "create"
              ? "Novo material"
              : authoredEditor.mode === "edit"
                ? "Editar material"
                : "Visualizar material"}
          </h3>
          <Button
            className="h-10 rounded-full border border-[#d7cec6] bg-white px-5 text-[#231814] hover:bg-[#f7f4f1]"
            onClick={() => setAuthoredEditor({ mode: null, index: null, draft: null })}
            type="button"
            variant="outline"
          >
            Voltar para lista
          </Button>
        </div>

        <fieldset className="space-y-0" disabled={authoredEditor.mode === "view"}>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <InputField
              label="Nome"
              onChange={(value) =>
                setAuthoredEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, name: value } } : current,
                )
              }
              value={authoredEditor.draft.name}
            />
            <InputField
              label="Preco"
              onChange={(value) =>
                setAuthoredEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, price: value } } : current,
                )
              }
              value={authoredEditor.draft.price}
            />
            <InputField
              label="CTA texto"
              onChange={(value) =>
                setAuthoredEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, cta: value } } : current,
                )
              }
              value={authoredEditor.draft.cta}
            />
            <InputField
              label="CTA link"
              onChange={(value) =>
                setAuthoredEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, href: value } } : current,
                )
              }
              value={authoredEditor.draft.href}
            />
          </div>
          <div className="mt-3">
            <TextareaField
              label="Descricao"
              onChange={(value) =>
                setAuthoredEditor((current) =>
                  current.draft
                    ? { ...current, draft: { ...current.draft, description: value } }
                    : current,
                )
              }
              value={authoredEditor.draft.description}
            />
          </div>

          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <InputField
              label="Imagem (URL)"
              onChange={(value) =>
                setAuthoredEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, image: value } } : current,
                )
              }
              value={authoredEditor.draft.image}
            />
            <ImageCropUploader
              accessToken={accessToken}
              aspectRatio={420 / 320}
              currentUrl={authoredEditor.draft.image}
              folder="materiais-autorais"
              onUploaded={(url) =>
                setAuthoredEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, image: url } } : current,
                )
              }
              recommendedSize="1200x914"
            />
          </div>
        </fieldset>

        <div className="mt-4 flex flex-wrap gap-2">
          {authoredEditor.mode !== "view" ? (
            <Button
              className="h-10 rounded-full bg-[#eb7a91] px-5 text-white hover:bg-[#df6d86]"
              disabled={isSaving}
              onClick={() => void applyAuthoredEditor()}
              type="button"
            >
              {isSaving ? "Salvando..." : "Salvar alteracoes"}
            </Button>
          ) : null}
          <Button
            className="h-10 rounded-full border border-[#d7cec6] bg-white px-5 text-[#231814] hover:bg-[#f7f4f1]"
            onClick={() => setAuthoredEditor({ mode: null, index: null, draft: null })}
            type="button"
            variant="outline"
          >
            Fechar
          </Button>
        </div>
      </div>
    );
  };

  const renderAuthoredSection = () => {
    if (authoredEditor.mode && authoredEditor.draft) {
      return renderAuthoredEditorPage();
    }

    return (
      <div className="space-y-4">
        <div className={panelClass}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl leading-none text-[#231814]">Materiais autorais</h2>
              <p className="mt-2 text-sm text-slate-600">
                Infos gerais da secao e CRUD com ordenacao por drag and drop.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <SectionVisibilityToggle
                checked={content.authored.enabled}
                onChange={(next) =>
                  patchContent((draft) => {
                    draft.authored.enabled = next;
                  })
                }
              />
              {renderSaveSectionButton()}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InputField
              label="Eyebrow"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.authored.heading.eyebrow = value;
                })
              }
              value={content.authored.heading.eyebrow}
            />
            <InputField
              label="Titulo"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.authored.heading.title = value;
                })
              }
              value={content.authored.heading.title}
            />
            <InputField
              label="Badge dos cards"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.authored.badgeLabel = value;
                })
              }
              value={content.authored.badgeLabel}
            />
          </div>
          <div className="mt-3">
            <TextareaField
              label="Descricao"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.authored.heading.description = value;
                })
              }
              value={content.authored.heading.description}
            />
          </div>
        </div>

        <div className={panelClass}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
              Lista de materiais
            </h3>
            <Button
              className="h-10 rounded-full bg-[#eb7a91] px-5 text-white hover:bg-[#df6d86]"
              onClick={() => openAuthoredEditor("create")}
              type="button"
            >
              Incluir novo item
            </Button>
          </div>

          <ItemList helperText="Arraste para ordenar a posicao no frontend" title="CRUD">
            {content.authored.products.map((item, index) => (
              <article
                className="flex flex-col gap-3 rounded-2xl border border-[#ece3db] bg-[#fbf9f6] p-3 md:flex-row md:items-center md:justify-between"
                draggable
                key={`${item.name}-${index}`}
                onDragEnd={() => setDragAuthoredIndex(null)}
                onDragOver={(event) => event.preventDefault()}
                onDragStart={() => setDragAuthoredIndex(index)}
                onDrop={() => {
                  if (dragAuthoredIndex === null || dragAuthoredIndex === index) return;
                  patchContent((draft) => {
                    draft.authored.products = reorderArray(
                      draft.authored.products,
                      dragAuthoredIndex,
                      index,
                    );
                  });
                  setDragAuthoredIndex(null);
                }}
              >
                <div>
                  <p className="text-sm font-semibold text-[#231814]">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.price}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="h-9 rounded-full border border-[#d7cec6] bg-white px-4 text-[#231814] hover:bg-[#f7f4f1]"
                    onClick={() => openAuthoredEditor("view", index)}
                    type="button"
                    variant="outline"
                  >
                    Visualizar
                  </Button>
                  <Button
                    className="h-9 rounded-full border border-[#d7cec6] bg-white px-4 text-[#231814] hover:bg-[#f7f4f1]"
                    onClick={() => openAuthoredEditor("edit", index)}
                    type="button"
                    variant="outline"
                  >
                    Editar
                  </Button>
                  <Button
                    className="h-9 rounded-full border border-[#e5c6ce] bg-[#fff3f6] px-4 text-[#9f2146] hover:bg-[#ffe9ef]"
                    disabled={content.authored.products.length <= 1}
                    onClick={() =>
                      patchContent((draft) => {
                        if (draft.authored.products.length <= 1) return;
                        draft.authored.products.splice(index, 1);
                      })
                    }
                    type="button"
                    variant="outline"
                  >
                    Excluir
                  </Button>
                </div>
              </article>
            ))}
          </ItemList>
        </div>
      </div>
    );
  };

  const renderProductsEditorPage = () => {
    if (!suggestionEditor.mode || !suggestionEditor.draft) return null;

    return (
      <div className={panelClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
            {suggestionEditor.mode === "create"
              ? "Novo produto"
              : suggestionEditor.mode === "edit"
                ? "Editar produto"
                : "Visualizar produto"}
          </h3>
          <Button
            className="h-10 rounded-full border border-[#d7cec6] bg-white px-5 text-[#231814] hover:bg-[#f7f4f1]"
            onClick={() => setSuggestionEditor({ mode: null, index: null, draft: null })}
            type="button"
            variant="outline"
          >
            Voltar para lista
          </Button>
        </div>

        <fieldset className="space-y-0" disabled={suggestionEditor.mode === "view"}>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <InputField
              label="Nome"
              onChange={(value) =>
                setSuggestionEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, name: value } } : current,
                )
              }
              value={suggestionEditor.draft.name}
            />
            <label className="flex items-center gap-2 pt-7 text-sm text-[#231814]">
              <input
                checked={suggestionEditor.draft.isFeatured}
                onChange={(event) =>
                  setSuggestionEditor((current) =>
                    current.draft
                      ? { ...current, draft: { ...current.draft, isFeatured: event.target.checked } }
                      : current,
                  )
                }
                type="checkbox"
              />
              Produto em destaque (Selecoes da Flavinha)
            </label>
            <InputField
              label="CTA texto"
              onChange={(value) =>
                setSuggestionEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, cta: value } } : current,
                )
              }
              value={suggestionEditor.draft.cta}
            />
            <InputField
              label="CTA link"
              onChange={(value) =>
                setSuggestionEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, href: value } } : current,
                )
              }
              value={suggestionEditor.draft.href}
            />
          </div>
          <div className="mt-3">
            <TextareaField
              label="Descricao"
              onChange={(value) =>
                setSuggestionEditor((current) =>
                  current.draft
                    ? { ...current, draft: { ...current.draft, description: value } }
                    : current,
                )
              }
              value={suggestionEditor.draft.description}
            />
          </div>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <InputField
              label="Imagem (URL)"
              onChange={(value) =>
                setSuggestionEditor((current) =>
                  current.draft ? { ...current, draft: { ...current.draft, image: value } } : current,
                )
              }
              value={suggestionEditor.draft.image}
            />
            <ImageCropUploader
              accessToken={accessToken}
              aspectRatio={suggestionEditor.draft.isFeatured ? 333 / 224 : 250 / 176}
              currentUrl={suggestionEditor.draft.image}
              folder="products"
              onUploaded={(url) =>
                setSuggestionEditor((current) =>
                  current.draft
                    ? { ...current, draft: { ...current.draft, image: toProjectProductsPath(url) } }
                    : current,
                )
              }
              recommendedSize={suggestionEditor.draft.isFeatured ? "333x224" : "250x176"}
            />
          </div>
        </fieldset>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggestionEditor.mode !== "view" ? (
            <Button
              className="h-10 rounded-full bg-[#eb7a91] px-5 text-white hover:bg-[#df6d86]"
              disabled={isSaving}
              onClick={() => void applySuggestionEditor()}
              type="button"
            >
              {isSaving ? "Salvando..." : "Salvar alteracoes"}
            </Button>
          ) : null}
          <Button
            className="h-10 rounded-full border border-[#d7cec6] bg-white px-5 text-[#231814] hover:bg-[#f7f4f1]"
            onClick={() => setSuggestionEditor({ mode: null, index: null, draft: null })}
            type="button"
            variant="outline"
          >
            Fechar
          </Button>
        </div>
      </div>
    );
  };

  const renderProductRow = (item: SuggestionEditorItem, index: number) => (
    <article
      className="flex flex-col gap-3 rounded-2xl border border-[#ece3db] bg-[#fbf9f6] p-3 md:flex-row md:items-center md:justify-between"
      draggable
      key={`${item.name}-${index}`}
      onDragEnd={() => setDragProductIndex(null)}
      onDragOver={(event) => event.preventDefault()}
      onDragStart={() => setDragProductIndex(index)}
      onDrop={() => {
        if (dragProductIndex === null || dragProductIndex === index) return;
        const dragged = suggestionItems[dragProductIndex];
        if (!dragged || dragged.isFeatured !== item.isFeatured) return;
        patchSuggestionItems((items) => {
          const ordered = reorderArray(items, dragProductIndex, index);
          items.splice(0, items.length, ...ordered);
        });
        setDragProductIndex(null);
      }}
    >
      <div>
        <p className="text-sm font-semibold text-[#231814]">{item.name}</p>
        <p className="text-xs text-slate-500">
          {item.isFeatured ? "Selecoes da Flavinha (destaque)" : "Sugestao"}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          className="h-9 rounded-full border border-[#d7cec6] bg-white px-4 text-[#231814] hover:bg-[#f7f4f1]"
          onClick={() => openSuggestionEditor("view", index)}
          type="button"
          variant="outline"
        >
          Visualizar
        </Button>
        <Button
          className="h-9 rounded-full border border-[#d7cec6] bg-white px-4 text-[#231814] hover:bg-[#f7f4f1]"
          onClick={() => openSuggestionEditor("edit", index)}
          type="button"
          variant="outline"
        >
          Editar
        </Button>
        <Button
          className="h-9 rounded-full border border-[#e5c6ce] bg-[#fff3f6] px-4 text-[#9f2146] hover:bg-[#ffe9ef]"
          disabled={suggestionItems.length <= 1}
          onClick={() =>
            patchSuggestionItems((items) => {
              if (items.length <= 1) return;
              items.splice(index, 1);
            })
          }
          type="button"
          variant="outline"
        >
          Excluir
        </Button>
      </div>
    </article>
  );

  const renderProductsSection = () => {
    if (suggestionEditor.mode && suggestionEditor.draft) {
      return renderProductsEditorPage();
    }

    return (
      <div className="space-y-4">
        <div className={panelClass}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl leading-none text-[#231814]">Produtos</h2>
              <p className="mt-2 text-sm text-slate-600">
                Infos gerais e CRUD com destaque, sugestao, drag and drop e crop por proporcao.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <SectionVisibilityToggle
                checked={content.suggestions.enabled}
                onChange={(next) =>
                  patchContent((draft) => {
                    draft.suggestions.enabled = next;
                  })
                }
              />
              {renderSaveSectionButton()}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InputField
              label="Eyebrow"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.suggestions.heading.eyebrow = value;
                })
              }
              value={content.suggestions.heading.eyebrow}
            />
            <InputField
              label="Titulo"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.suggestions.heading.title = value;
                })
              }
              value={content.suggestions.heading.title}
            />
          </div>
          <div className="mt-3">
            <TextareaField
              label="Descricao"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.suggestions.heading.description = value;
                })
              }
              value={content.suggestions.heading.description}
            />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <InputField
              label='Titulo faixa "Selecoes da Flavinha"'
              onChange={(value) =>
                patchContent((draft) => {
                  draft.suggestions.highlightedLabel = value;
                })
              }
              value={content.suggestions.highlightedLabel}
            />
            <InputField
              label='Badge cards "Selecoes"'
              onChange={(value) =>
                patchContent((draft) => {
                  draft.suggestions.highlightedBadgeLabel = value;
                })
              }
              value={content.suggestions.highlightedBadgeLabel}
            />
            <InputField
              label='Titulo faixa "Sugestao"'
              onChange={(value) =>
                patchContent((draft) => {
                  draft.suggestions.additionalLabel = value;
                })
              }
              value={content.suggestions.additionalLabel}
            />
            <InputField
              label='Badge cards "Sugestao"'
              onChange={(value) =>
                patchContent((draft) => {
                  draft.suggestions.additionalBadgeLabel = value;
                })
              }
              value={content.suggestions.additionalBadgeLabel}
            />
          </div>
        </div>

        <div className={panelClass}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
              Lista de produtos
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                className="h-10 rounded-full bg-[#eb7a91] px-5 text-white hover:bg-[#df6d86]"
                onClick={() => openSuggestionEditor("create", null, { isFeatured: true })}
                type="button"
              >
                Novo destaque
              </Button>
              <Button
                className="h-10 rounded-full border border-[#d7cec6] bg-white px-5 text-[#231814] hover:bg-[#f7f4f1]"
                onClick={() => openSuggestionEditor("create", null, { isFeatured: false })}
                type="button"
                variant="outline"
              >
                Nova sugestao
              </Button>
            </div>
          </div>

          <div className="mt-3 space-y-4">
            <ItemList
              helperText="Arraste para ordenar a posicao dos destaques no frontend"
              title="Selecoes da Flavinha"
            >
              {featuredSuggestionEntries.length ? (
                featuredSuggestionEntries.map((entry) => renderProductRow(entry.item, entry.index))
              ) : (
                <p className="rounded-2xl border border-dashed border-[#e5ddd6] bg-[#fbf9f6] px-3 py-4 text-sm text-slate-500">
                  Nenhum destaque cadastrado.
                </p>
              )}
            </ItemList>

            <ItemList
              helperText="Arraste para ordenar a posicao das sugestoes no frontend"
              title="Sugestoes"
            >
              {additionalSuggestionEntries.length ? (
                additionalSuggestionEntries.map((entry) => renderProductRow(entry.item, entry.index))
              ) : (
                <p className="rounded-2xl border border-dashed border-[#e5ddd6] bg-[#fbf9f6] px-3 py-4 text-sm text-slate-500">
                  Nenhuma sugestao cadastrada.
                </p>
              )}
            </ItemList>
          </div>
        </div>
      </div>
    );
  };

  const renderTestimonialsEditorPage = () => {
    if (!testimonialEditor.mode || !testimonialEditor.draft) return null;

    return (
      <div className={panelClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
            {testimonialEditor.mode === "create"
              ? "Novo depoimento"
              : testimonialEditor.mode === "edit"
                ? "Editar depoimento"
                : "Visualizar depoimento"}
          </h3>
          <Button
            className="h-10 rounded-full border border-[#d7cec6] bg-white px-5 text-[#231814] hover:bg-[#f7f4f1]"
            onClick={() => setTestimonialEditor({ mode: null, index: null, draft: null })}
            type="button"
            variant="outline"
          >
            Voltar para lista
          </Button>
        </div>

        <fieldset className="space-y-0" disabled={testimonialEditor.mode === "view"}>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <InputField
              label="Nome"
              onChange={(value) =>
                setTestimonialEditor((current) =>
                  current.draft
                    ? { ...current, draft: { ...current.draft, name: value } }
                    : current,
                )
              }
              value={testimonialEditor.draft.name}
            />
            <InputField
              label="Cargo / contexto"
              onChange={(value) =>
                setTestimonialEditor((current) =>
                  current.draft
                    ? { ...current, draft: { ...current.draft, role: value } }
                    : current,
                )
              }
              value={testimonialEditor.draft.role}
            />
          </div>
          <div className="mt-3">
            <TextareaField
              label="Depoimento"
              onChange={(value) =>
                setTestimonialEditor((current) =>
                  current.draft
                    ? { ...current, draft: { ...current.draft, content: value } }
                    : current,
                )
              }
              rows={5}
              value={testimonialEditor.draft.content}
            />
          </div>

          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <InputField
              label="Imagem (URL)"
              onChange={(value) =>
                setTestimonialEditor((current) =>
                  current.draft
                    ? { ...current, draft: { ...current.draft, image: value } }
                    : current,
                )
              }
              value={testimonialEditor.draft.image}
            />
            <ImageCropUploader
              accessToken={accessToken}
              aspectRatio={1}
              currentUrl={testimonialEditor.draft.image}
              folder="depoimentos"
              onUploaded={(url) =>
                setTestimonialEditor((current) =>
                  current.draft
                    ? { ...current, draft: { ...current.draft, image: url } }
                    : current,
                )
              }
              recommendedSize="800x800"
            />
          </div>
        </fieldset>

        <div className="mt-4 flex flex-wrap gap-2">
          {testimonialEditor.mode !== "view" ? (
            <Button
              className="h-10 rounded-full bg-[#eb7a91] px-5 text-white hover:bg-[#df6d86]"
              disabled={isSaving}
              onClick={() => void applyTestimonialEditor()}
              type="button"
            >
              {isSaving ? "Salvando..." : "Salvar alteracoes"}
            </Button>
          ) : null}
          <Button
            className="h-10 rounded-full border border-[#d7cec6] bg-white px-5 text-[#231814] hover:bg-[#f7f4f1]"
            onClick={() => setTestimonialEditor({ mode: null, index: null, draft: null })}
            type="button"
            variant="outline"
          >
            Fechar
          </Button>
        </div>
      </div>
    );
  };

  const renderTestimonialsSection = () => {
    if (testimonialEditor.mode && testimonialEditor.draft) {
      return renderTestimonialsEditorPage();
    }

    return (
      <div className="space-y-4">
        <div className={panelClass}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl leading-none text-[#231814]">Depoimentos</h2>
              <p className="mt-2 text-sm text-slate-600">
                CRUD com ordenacao por drag and drop e reflexo direto no frontend.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <SectionVisibilityToggle
                checked={content.testimonials.enabled}
                onChange={(next) =>
                  patchContent((draft) => {
                    draft.testimonials.enabled = next;
                  })
                }
              />
              {renderSaveSectionButton()}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InputField
              label="Eyebrow"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.testimonials.heading.eyebrow = value;
                })
              }
              value={content.testimonials.heading.eyebrow}
            />
            <InputField
              label="Titulo"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.testimonials.heading.title = value;
                })
              }
              value={content.testimonials.heading.title}
            />
          </div>
          <div className="mt-3">
            <TextareaField
              label="Descricao"
              onChange={(value) =>
                patchContent((draft) => {
                  draft.testimonials.heading.description = value;
                })
              }
              value={content.testimonials.heading.description}
            />
          </div>
        </div>

        <div className={panelClass}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
              Lista de depoimentos
            </h3>
            <Button
              className="h-10 rounded-full bg-[#eb7a91] px-5 text-white hover:bg-[#df6d86]"
              onClick={() => openTestimonialEditor("create")}
              type="button"
            >
              Incluir novo item
            </Button>
          </div>

          <ItemList helperText="Arraste para ordenar a posicao no frontend" title="CRUD">
            {content.testimonials.items.map((item, index) => (
              <article
                className="flex flex-col gap-3 rounded-2xl border border-[#ece3db] bg-[#fbf9f6] p-3 md:flex-row md:items-center md:justify-between"
                draggable
                key={`${item.name}-${index}`}
                onDragEnd={() => setDragTestimonialIndex(null)}
                onDragOver={(event) => event.preventDefault()}
                onDragStart={() => setDragTestimonialIndex(index)}
                onDrop={() => {
                  if (dragTestimonialIndex === null || dragTestimonialIndex === index) return;
                  patchContent((draft) => {
                    draft.testimonials.items = reorderArray(
                      draft.testimonials.items,
                      dragTestimonialIndex,
                      index,
                    );
                  });
                  setDragTestimonialIndex(null);
                }}
              >
                <div>
                  <p className="text-sm font-semibold text-[#231814]">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="h-9 rounded-full border border-[#d7cec6] bg-white px-4 text-[#231814] hover:bg-[#f7f4f1]"
                    onClick={() => openTestimonialEditor("view", index)}
                    type="button"
                    variant="outline"
                  >
                    Visualizar
                  </Button>
                  <Button
                    className="h-9 rounded-full border border-[#d7cec6] bg-white px-4 text-[#231814] hover:bg-[#f7f4f1]"
                    onClick={() => openTestimonialEditor("edit", index)}
                    type="button"
                    variant="outline"
                  >
                    Editar
                  </Button>
                  <Button
                    className="h-9 rounded-full border border-[#e5c6ce] bg-[#fff3f6] px-4 text-[#9f2146] hover:bg-[#ffe9ef]"
                    disabled={content.testimonials.items.length <= 1}
                    onClick={() =>
                      patchContent((draft) => {
                        if (draft.testimonials.items.length <= 1) return;
                        draft.testimonials.items.splice(index, 1);
                      })
                    }
                    type="button"
                    variant="outline"
                  >
                    Excluir
                  </Button>
                </div>
              </article>
            ))}
          </ItemList>
        </div>
      </div>
    );
  };

  const renderFinalCtaSection = () => (
    <div className={panelClass}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl leading-none text-[#231814]">Menos Tela, Mais Presenca</h2>
          <p className="mt-2 text-sm text-slate-600">Campos para editar as informacoes da faixa final.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SectionVisibilityToggle
            checked={content.finalCta.enabled}
            onChange={(next) =>
              patchContent((draft) => {
                draft.finalCta.enabled = next;
              })
            }
          />
          {renderSaveSectionButton()}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <InputField
          label="Eyebrow"
          onChange={(value) =>
            patchContent((draft) => {
              draft.finalCta.eyebrow = value;
            })
          }
          value={content.finalCta.eyebrow}
        />
        <InputField
          label="Titulo"
          onChange={(value) =>
            patchContent((draft) => {
              draft.finalCta.title = value;
            })
          }
          value={content.finalCta.title}
        />
      </div>
      <div className="mt-3">
        <TextareaField
          label="Descricao"
          onChange={(value) =>
            patchContent((draft) => {
              draft.finalCta.description = value;
            })
          }
          value={content.finalCta.description}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">CTA principal</h3>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <InputField
            label="Texto"
            onChange={(value) =>
              patchContent((draft) => {
                draft.finalCta.primaryAction.label = value;
              })
            }
            value={content.finalCta.primaryAction.label}
          />
          <InputField
            label="Link"
            onChange={(value) =>
              patchContent((draft) => {
                draft.finalCta.primaryAction.href = value;
              })
            }
            value={content.finalCta.primaryAction.href}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
            CTAs secundarios
          </h3>
          <Button
            className="h-9 rounded-full bg-[#eb7a91] px-4 text-white hover:bg-[#df6d86]"
            onClick={() =>
              patchContent((draft) => {
                draft.finalCta.secondaryActions.push({
                  label: "Novo canal",
                  href: "#",
                } satisfies HomeV2Action);
              })
            }
            type="button"
          >
            Incluir CTA
          </Button>
        </div>

        <div className="mt-2 space-y-2">
          {content.finalCta.secondaryActions.map((action, index) => (
            <article
              className="grid gap-3 rounded-2xl border border-[#ece3db] bg-[#fbf9f6] p-3 md:grid-cols-[1fr_1fr_auto]"
              key={`${action.label}-${index}`}
            >
              <InputField
                label="Texto"
                onChange={(value) =>
                  patchContent((draft) => {
                    draft.finalCta.secondaryActions[index].label = value;
                  })
                }
                value={action.label}
              />
              <InputField
                label="Link"
                onChange={(value) =>
                  patchContent((draft) => {
                    draft.finalCta.secondaryActions[index].href = value;
                  })
                }
                value={action.href}
              />
              <div className="flex items-end justify-end">
                <Button
                  className="h-10 rounded-full border border-[#e5c6ce] bg-[#fff3f6] px-4 text-[#9f2146] hover:bg-[#ffe9ef]"
                  disabled={content.finalCta.secondaryActions.length <= 1}
                  onClick={() =>
                    patchContent((draft) => {
                      if (draft.finalCta.secondaryActions.length <= 1) return;
                      draft.finalCta.secondaryActions.splice(index, 1);
                    })
                  }
                  type="button"
                  variant="outline"
                >
                  Excluir
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFooterSection = () => (
    <div className="space-y-4">
      <div className={panelClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl leading-none text-[#231814]">Footer</h2>
            <p className="mt-2 text-sm text-slate-600">Campos para editar as informacoes do rodape.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <SectionVisibilityToggle
              checked={content.footer.enabled}
              onChange={(next) =>
                patchContent((draft) => {
                  draft.footer.enabled = next;
                })
              }
            />
            {renderSaveSectionButton()}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <InputField
            label="Email"
            onChange={(value) =>
              patchContent((draft) => {
                draft.footer.email = value;
              })
            }
            value={content.footer.email}
          />
        </div>
        <div className="mt-3">
          <TextareaField
            label="Descricao"
            onChange={(value) =>
              patchContent((draft) => {
                draft.footer.description = value;
              })
            }
            value={content.footer.description}
          />
        </div>
      </div>

      <div className={panelClass}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
            Links sociais
          </h3>
          <Button
            className="h-9 rounded-full bg-[#eb7a91] px-4 text-white hover:bg-[#df6d86]"
            onClick={() =>
              patchContent((draft) => {
                draft.footer.socialLinks.push({
                  label: "Novo canal",
                  href: "#",
                  platform: "instagram",
                });
              })
            }
            type="button"
          >
            Incluir link
          </Button>
        </div>
        <div className="mt-2 space-y-2">
          {content.footer.socialLinks.map((link, index) => (
            <article
              className="grid gap-3 rounded-2xl border border-[#ece3db] bg-[#fbf9f6] p-3 md:grid-cols-[1fr_1fr_180px_auto]"
              key={`${link.label}-${index}`}
            >
              <InputField
                label="Texto"
                onChange={(value) =>
                  patchContent((draft) => {
                    draft.footer.socialLinks[index].label = value;
                  })
                }
                value={link.label}
              />
              <InputField
                label="Link"
                onChange={(value) =>
                  patchContent((draft) => {
                    draft.footer.socialLinks[index].href = value;
                  })
                }
                value={link.href}
              />
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8b665d]">
                  Plataforma
                </span>
                <select
                  className={inputClass}
                  onChange={(event) =>
                    patchContent((draft) => {
                      draft.footer.socialLinks[index].platform = event.target.value as
                        | "instagram"
                        | "tiktok"
                        | "youtube";
                    })
                  }
                  value={link.platform}
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                </select>
              </label>
              <div className="flex items-end justify-end">
                <Button
                  className="h-10 rounded-full border border-[#e5c6ce] bg-[#fff3f6] px-4 text-[#9f2146] hover:bg-[#ffe9ef]"
                  disabled={content.footer.socialLinks.length <= 1}
                  onClick={() =>
                    patchContent((draft) => {
                      if (draft.footer.socialLinks.length <= 1) return;
                      draft.footer.socialLinks.splice(index, 1);
                    })
                  }
                  type="button"
                  variant="outline"
                >
                  Excluir
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={panelClass}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b665d]">
            Links legais
          </h3>
          <Button
            className="h-9 rounded-full bg-[#eb7a91] px-4 text-white hover:bg-[#df6d86]"
            onClick={() =>
              patchContent((draft) => {
                draft.footer.legalLinks.push({
                  label: "Novo link",
                  href: "/",
                });
              })
            }
            type="button"
          >
            Incluir link
          </Button>
        </div>
        <div className="mt-2 space-y-2">
          {content.footer.legalLinks.map((link, index) => (
            <article
              className="grid gap-3 rounded-2xl border border-[#ece3db] bg-[#fbf9f6] p-3 md:grid-cols-[1fr_1fr_auto]"
              key={`${link.label}-${index}`}
            >
              <InputField
                label="Texto"
                onChange={(value) =>
                  patchContent((draft) => {
                    draft.footer.legalLinks[index].label = value;
                  })
                }
                value={link.label}
              />
              <InputField
                label="Link"
                onChange={(value) =>
                  patchContent((draft) => {
                    draft.footer.legalLinks[index].href = value;
                  })
                }
                value={link.href}
              />
              <div className="flex items-end justify-end">
                <Button
                  className="h-10 rounded-full border border-[#e5c6ce] bg-[#fff3f6] px-4 text-[#9f2146] hover:bg-[#ffe9ef]"
                  disabled={content.footer.legalLinks.length <= 1}
                  onClick={() =>
                    patchContent((draft) => {
                      if (draft.footer.legalLinks.length <= 1) return;
                      draft.footer.legalLinks.splice(index, 1);
                    })
                  }
                  type="button"
                  variant="outline"
                >
                  Excluir
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    if (activeSection === "menu") return renderMenuSection();
    if (activeSection === "hero") return renderHeroSection();
    if (activeSection === "channels") return renderChannelsSection();
    if (activeSection === "authored") return renderAuthoredSection();
    if (activeSection === "products") return renderProductsSection();
    if (activeSection === "testimonials") return renderTestimonialsSection();
    if (activeSection === "finalCta") return renderFinalCtaSection();
    return renderFooterSection();
  };

  if (isBootstrapping) {
    return (
      <main className="min-h-screen bg-[#f4f0eb] px-5 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[#e7ded6] bg-white p-8 text-sm text-slate-600">
          Carregando admin...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f0eb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1320px] space-y-6">
        <header className="rounded-3xl border border-[#e7ded6] bg-white p-6 shadow-[0_20px_55px_-40px_rgba(30,20,16,0.35)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8b665d]">
                Admin
              </p>
              <h1 className="mt-2 font-display text-4xl leading-none text-[#231814]">
                Mundo Flavinha
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                className="h-10 rounded-full border border-[#d7cec6] bg-white px-5 text-[#231814] hover:bg-[#f7f4f1]"
                variant="outline"
              >
                <Link to="/" target="_blank">
                  Abrir home
                </Link>
              </Button>
              <Button
                className="h-10 rounded-full border border-[#d7cec6] bg-white px-5 text-[#231814] hover:bg-[#f7f4f1]"
                onClick={() => void handleSignOut()}
                type="button"
                variant="outline"
              >
                Sair
              </Button>
            </div>
          </div>

          {statusMessage ? (
            <p className="mt-4 rounded-xl border border-[#bde5cc] bg-[#ecfff2] px-3 py-2 text-sm text-[#1c7a44]">
              {statusMessage}
            </p>
          ) : null}
          {errorMessage ? (
            <p className="mt-4 rounded-xl border border-[#f0c6cf] bg-[#fff3f6] px-3 py-2 text-sm text-[#9f2146]">
              {errorMessage}
            </p>
          ) : null}
        </header>

        <div className="grid gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className={`${panelClass} h-fit`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b665d]">
              Secoes do menu
            </p>
            <nav className="mt-4 space-y-2" aria-label="Secoes do admin">
              {sectionItems.map((section) => (
                <button
                  className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    activeSection === section.id
                      ? "bg-[#eb7a91] text-white shadow-sm"
                      : "bg-[#faf7f3] text-[#231814] hover:bg-[#f3ede6]"
                  }`}
                  key={section.id}
                  onClick={() => changeSection(section.id)}
                  type="button"
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="min-w-0">{renderSection()}</section>
        </div>
      </div>
    </main>
  );
};

export default AdminHomeV2;
