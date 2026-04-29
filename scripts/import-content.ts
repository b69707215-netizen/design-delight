import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

type ReportItem = {
  file: string;
  message: string;
};

const root = process.cwd();
const contentRoot = path.join(root, "content");
const programsManifest = path.join(contentRoot, "programs.json");
const programsDir = path.join(contentRoot, "programs");
const cardsManifest = path.join(contentRoot, "cards.json");
const cardsDir = path.join(contentRoot, "cards");

const localizedTextSchema = z.object({
  uk: z.string().min(1),
  en: z.string().min(1),
});

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const dateTimeSchema = z.string().datetime();

const programSchema = z.object({
  mark: z.string().min(1).max(8),
  slug: slugSchema,
  amount: z.number().int().min(0),
  currency: z.string().min(3).max(3).default("UAH"),
  lessonsCount: z.number().int().min(0),
  title: localizedTextSchema,
  lessons: localizedTextSchema,
  price: localizedTextSchema,
  text: localizedTextSchema,
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

const programsManifestSchema = z.object({
  $schema: z.string().optional(),
  version: z.number().int().min(1),
  updatedAt: dateTimeSchema,
  programs: z.array(programSchema).min(1),
});

const cardTypeSchema = z.enum(["article", "lesson", "news", "guide", "event"]);

const cardSchema = z.object({
  slug: slugSchema,
  type: cardTypeSchema,
  title: localizedTextSchema,
  summary: localizedTextSchema,
  mdxPath: z.string().regex(/^content\/cards\/[a-z0-9-]+\.mdx$/).optional(),
  imageAlt: localizedTextSchema.optional(),
  programSlug: slugSchema.optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  publishedAt: dateTimeSchema.optional(),
});

const cardsManifestSchema = z.object({
  $schema: z.string().optional(),
  version: z.number().int().min(1),
  updatedAt: dateTimeSchema,
  cards: z.array(cardSchema),
});

const mdxFrontmatterSchema = z.object({
  slug: slugSchema,
  type: cardTypeSchema,
  programSlug: slugSchema.optional(),
  publishedAt: dateTimeSchema.optional(),
});

const successes: ReportItem[] = [];
const warnings: ReportItem[] = [];
const errors: ReportItem[] = [];
const programSlugs = new Set<string>();
const cardSlugs = new Set<string>();
const manifestCards = new Map<string, z.infer<typeof cardSchema>>();

function relative(filePath: string) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function addSuccess(file: string, message: string) {
  successes.push({ file: relative(file), message });
}

function addWarning(file: string, message: string) {
  warnings.push({ file: relative(file), message });
}

function addError(file: string, message: string) {
  errors.push({ file: relative(file), message });
}

function readJson(filePath: string) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    addError(filePath, `JSON не прочитан: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

function formatZodError(error: z.ZodError) {
  return error.issues.map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`).join("; ");
}

function jsonFilesFromDirectory(dirPath: string) {
  if (!existsSync(dirPath)) {
    addWarning(dirPath, "директория не найдена, используется manifest-файл при наличии");
    return [];
  }

  return readdirSync(dirPath)
    .map((entry) => path.join(dirPath, entry))
    .filter((filePath) => statSync(filePath).isFile() && filePath.endsWith(".json"))
    .sort();
}

function validateProgramFile(filePath: string) {
  const json = readJson(filePath);
  if (!json) return;

  const parsed = programSchema.safeParse(json);
  if (!parsed.success) {
    addError(filePath, `программа не прошла валидацию: ${formatZodError(parsed.error)}`);
    return;
  }

  if (programSlugs.has(parsed.data.slug)) {
    addError(filePath, `дублирующийся program slug: ${parsed.data.slug}`);
    return;
  }

  programSlugs.add(parsed.data.slug);
  addSuccess(filePath, `программа импортирована: ${parsed.data.slug}`);
}

function validateProgramsManifest() {
  if (!existsSync(programsManifest)) {
    addWarning(programsManifest, "manifest не найден");
    return;
  }

  const json = readJson(programsManifest);
  if (!json) return;

  const parsed = programsManifestSchema.safeParse(json);
  if (!parsed.success) {
    addError(programsManifest, `manifest программ не прошёл валидацию: ${formatZodError(parsed.error)}`);
    return;
  }

  for (const program of parsed.data.programs) {
    if (programSlugs.has(program.slug)) {
      addError(programsManifest, `дублирующийся program slug: ${program.slug}`);
      continue;
    }

    programSlugs.add(program.slug);
  }

  addSuccess(programsManifest, `программ импортировано: ${parsed.data.programs.length}`);
}

function validateCardsManifest() {
  if (!existsSync(cardsManifest)) {
    addWarning(cardsManifest, "manifest не найден");
    return;
  }

  const json = readJson(cardsManifest);
  if (!json) return;

  const parsed = cardsManifestSchema.safeParse(json);
  if (!parsed.success) {
    addError(cardsManifest, `manifest карточек не прошёл валидацию: ${formatZodError(parsed.error)}`);
    return;
  }

  for (const card of parsed.data.cards) {
    if (cardSlugs.has(card.slug)) {
      addError(cardsManifest, `дублирующийся card slug: ${card.slug}`);
      continue;
    }

    if (card.programSlug && !programSlugs.has(card.programSlug)) {
      addError(cardsManifest, `карточка ${card.slug} ссылается на неизвестную программу: ${card.programSlug}`);
      continue;
    }

    if (card.mdxPath && !existsSync(path.join(root, card.mdxPath))) {
      addError(cardsManifest, `карточка ${card.slug} ссылается на отсутствующий MDX: ${card.mdxPath}`);
      continue;
    }

    cardSlugs.add(card.slug);
    manifestCards.set(card.slug, card);
  }

  addSuccess(cardsManifest, `карточек импортировано: ${parsed.data.cards.length}`);
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;

  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(":");
        return [line.slice(0, separatorIndex).trim(), line.slice(separatorIndex + 1).trim()];
      }),
  );
}

function validateMdxFile(filePath: string) {
  const source = readFileSync(filePath, "utf8");
  const frontmatter = parseFrontmatter(source);

  if (!frontmatter) {
    addError(filePath, "MDX не содержит frontmatter");
    return;
  }

  const parsed = mdxFrontmatterSchema.safeParse(frontmatter);
  if (!parsed.success) {
    addError(filePath, `frontmatter не прошёл валидацию: ${formatZodError(parsed.error)}`);
    return;
  }

  const expectedMdxPath = `content/cards/${parsed.data.slug}.mdx`;
  if (relative(filePath) !== expectedMdxPath) {
    addError(filePath, `путь MDX должен совпадать со slug: ${expectedMdxPath}`);
    return;
  }

  if (parsed.data.programSlug && !programSlugs.has(parsed.data.programSlug)) {
    addError(filePath, `MDX ссылается на неизвестную программу: ${parsed.data.programSlug}`);
    return;
  }

  const manifestCard = manifestCards.get(parsed.data.slug);
  if (!manifestCard) {
    addWarning(filePath, `MDX ${parsed.data.slug} не описан в content/cards.json`);
  } else if (manifestCard.type !== parsed.data.type) {
    addError(filePath, `type не совпадает с content/cards.json: ${parsed.data.type} !== ${manifestCard.type}`);
    return;
  }

  if (!/^#\s+/m.test(source)) {
    addWarning(filePath, "MDX не содержит H1-заголовок");
  }

  addSuccess(filePath, `MDX импортирован: ${parsed.data.slug}`);
}

validateProgramsManifest();
for (const filePath of jsonFilesFromDirectory(programsDir)) {
  validateProgramFile(filePath);
}

validateCardsManifest();
if (existsSync(cardsDir)) {
  for (const filePath of readdirSync(cardsDir).map((entry) => path.join(cardsDir, entry)).sort()) {
    if (statSync(filePath).isFile() && filePath.endsWith(".mdx")) {
      validateMdxFile(filePath);
    }
  }
} else {
  addWarning(cardsDir, "директория карточек не найдена");
}

function printSection(title: string, items: ReportItem[]) {
  console.log(`\n${title}: ${items.length}`);
  for (const item of items) {
    console.log(`- ${item.file}: ${item.message}`);
  }
}

console.log("Content import report");
console.log(`Programs: ${programSlugs.size}`);
console.log(`Cards: ${cardSlugs.size}`);
printSection("Success", successes);
printSection("Warnings", warnings);
printSection("Errors", errors);

if (errors.length > 0) {
  process.exitCode = 1;
}