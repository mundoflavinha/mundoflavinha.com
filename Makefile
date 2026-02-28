.PHONY: help build up down restart logs shell bash status clean \
	dev install lint typecheck build-app preview

COMPOSE ?= docker compose
SERVICE ?= mundo_flavinha

help: ## Mostra esta mensagem de ajuda
	@echo "Comandos disponiveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Constroi a imagem Docker
	$(COMPOSE) build $(SERVICE)

up: ## Sobe o projeto em modo desenvolvimento
	$(COMPOSE) up $(SERVICE)

dev: ## Alias para subir o projeto em modo desenvolvimento
	$(MAKE) up

down: ## Para e remove os containers
	$(COMPOSE) down

restart: ## Reinicia o servico
	$(COMPOSE) restart $(SERVICE)

logs: ## Exibe os logs do servico
	$(COMPOSE) logs -f $(SERVICE)

shell: ## Abre um shell no container em exec ou run
	@if $(COMPOSE) ps --status running --services | grep -q "^$(SERVICE)$$"; then \
		$(COMPOSE) exec $(SERVICE) sh; \
	else \
		$(COMPOSE) run --rm $(SERVICE) sh; \
	fi

bash: ## Abre bash no container em exec ou run
	@if $(COMPOSE) ps --status running --services | grep -q "^$(SERVICE)$$"; then \
		$(COMPOSE) exec $(SERVICE) bash; \
	else \
		$(COMPOSE) run --rm $(SERVICE) bash; \
	fi

status: ## Mostra o status dos containers
	$(COMPOSE) ps

clean: ## Remove containers e volumes do projeto
	$(COMPOSE) down -v

install: ## Instala dependencias via pnpm dentro do container
	$(COMPOSE) run --rm $(SERVICE) install

lint: ## Executa lint dentro do container
	$(COMPOSE) run --rm $(SERVICE) lint

typecheck: ## Executa typecheck dentro do container
	$(COMPOSE) run --rm $(SERVICE) typecheck

build-app: ## Gera o build de producao dentro do container
	$(COMPOSE) run --rm $(SERVICE) build

preview: ## Roda preview do build dentro do container
	$(COMPOSE) run --rm --service-ports $(SERVICE) preview
