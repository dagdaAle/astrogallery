# CLAUDE.md — astrogallery

Piattaforma di astrofotografia: galleria in stile Pinterest/masonry, estetica
terminal retro, con schede astronomiche dettagliate per ogni immagine. Monorepo
**React + Vite** (frontend) e **Node/Express** (backend), un'unica immagine Docker
in cui Express serve anche il frontend compilato.

Funzionalità e architettura: `README.md`.

## ⚠️ Repo pubblica

Nessuna chiave, nessuna password, nessun URL di database reale in questa repo.

**Nota su `backend/.env.save`**: è tracciato in git e i nomi delle variabili
spaventano (`DB_PASSWORD`, `JWT_SECRET`), ma i valori sono **placeholder**
(`tua-…`, `your…`) — verificato il 18/09/2026. Non è una fuga di credenziali.
Resta comunque un file da rimuovere: esiste solo per confondere chi lo trova,
e il riferimento buono è già nei `RAILWAY_ENV_TEMPLATE.md`.

## Da non toccare

| Elemento | Regola | Perché |
|---|---|---|
| Il percorso del frontend nel Dockerfile | Express cerca il frontend in `../../frontend/dist` rispetto a `src/` | È il motivo per cui il Dockerfile copia in `/app/frontend/dist` mentre lavora in `/app/backend`. Cambiare una delle due parti senza l'altra dà una pagina bianca senza errori nei log. |
| I dati astronomici delle immagini | Sono contenuto, non schema | Coordinate, massa, temperatura, composizione: sono stati inseriti a mano o assistiti dall'AI. Non rigenerarli in massa, non sono verificabili automaticamente. |
| `railway.json` e i `RAILWAY_*.md` | Residui di Railway | Restano per storia. Modificarli non cambia niente: il deploy oggi passa dal `Dockerfile` (commit "Aggiunge Dockerfile per il deploy su Coolify"). |
| Credenziali Cloudinary e JWT | Solo variabili d'ambiente | Le immagini sono su Cloudinary: una chiave esposta in una repo pubblica è un bucket a disposizione di chiunque. |

## Comandi

```bash
npm run install:all      # radice + frontend + backend
npm run dev              # frontend e backend insieme (concurrently)
npm run build            # build di entrambi
npm start                # solo backend (serve anche il frontend compilato)

docker build -t astrogallery . && docker run -p 3000:3000 astrogallery
```

## Regole operative

- Commit in italiano, indicativo presente: "Aggiunge Dockerfile per il deploy su Coolify".
- **Troppi documenti in radice** (12 file `.md`, gran parte su Railway che non si usa
  più). Se lavori qui, consolidarli vale più di una funzionalità: oggi è difficile
  capire quale sia il documento vero. Non aggiungerne altri.
- L'estetica terminal retro (monospace, nero, minimale) è una scelta di progetto
  deliberata: non "modernizzarla" senza chiederlo.

## Cosa non fare

- **Non committare mai un `.env` reale** — anche in un file dal nome innocuo come
  `.env.save`. È una repo pubblica.
- **Non committare immagini di astrofotografia nella repo**: vanno su Cloudinary.
  È un progetto di immagini pesanti, ed è così che una repo diventa ingestibile.
- **Non inventare dati astronomici** per riempire una scheda: meglio un campo vuoto
  di una massa stellare sbagliata pubblicata come vera.
- Non presumere Postgres: il `README.md` dice PostgreSQL ma ci sono anche
  `MYSQL_SETUP.md` e `RAILWAY_MYSQL_GUIDE.md`. **Verificare** cosa usa davvero
  l'ambiente su cui stai lavorando prima di scrivere una query.

## Riferimenti

- `README.md` — funzionalità e architettura monorepo
- `ADMIN_GUIDE.md`, `AI_AUTO_FILL_GUIDE.md` — uso dell'area amministrativa
