# Contributing to pokemon-ev-spreads-vgc

Thank you for helping keep this dataset accurate and up-to-date. This guide explains how to contribute spreads, fix errors, and participate in Regulation updates.

---

## Ways to Contribute

### 1. Add a new EV spread for an existing Pokémon

Open `data/ev-spreads.json`, find the Pokémon's entry, and add a new object to the `spreads` array following the schema below.

**Required fields:**
- `id` — unique kebab-case identifier (e.g., `incin-av-max-spd`)
- `label` — human-readable name for the spread
- `nature` — nature name (English)
- `evs` — object with keys: `hp`, `atk`, `def`, `spa`, `spd`, `spe` (values 0–252)
- `item` — held item name
- `usage_tier` — `"S"`, `"A"`, or `"B"`
- `notes` — 1–3 sentences explaining the rationale for this exact spread

**Recommended fields:**
- `moves` — array of 4 move names
- `tera_type` — recommended Tera type
- `benchmarks` — array of strings, each describing one damage calc (e.g., `"Survives Modest Kyogre Origin Pulse from full HP"`)

### 2. Add a new Pokémon

Add a new object to the `pokemon` array in `data/ev-spreads.json`. The Pokémon must:
- Be usable in VGC Regulation F (or the current active Regulation)
- Have at least 2 documented spreads
- Include accurate `base_stats`

### 3. Fix an inaccurate spread or benchmark

Open an Issue describing:
- The specific spread ID that is wrong
- What the correct value should be
- Source (team report URL, tournament result, or damage calc)

### 4. Update for a new Regulation

When a new Regulation becomes active:
1. Update `meta.regulation` and `meta.last_updated` in `ev-spreads.json`
2. Mark outdated spreads with `"regulation_note": "Deprecated in Reg X"` rather than deleting them
3. Add new spreads for newly relevant Pokémon
4. Open a PR with title: `data: update to Regulation [X]`

---

## Validation Rules

Before submitting a PR, verify:

- [ ] EVs in each spread sum to ≤ 508
- [ ] Each individual EV value is a multiple of 4 (except when a non-multiple is intentionally used for a benchmark — must be noted)
- [ ] IVs are all 31 unless a 0 IV is intentional (e.g., 0 Spe for Trick Room — must be noted)
- [ ] All spread `id` values are unique across the entire file
- [ ] No trailing commas (valid JSON)
- [ ] `usage_tier` is exactly `"S"`, `"A"`, or `"B"` (uppercase)

Quick JSON validation:
```bash
node -e "JSON.parse(require('fs').readFileSync('data/ev-spreads.json','utf8')); console.log('Valid JSON')"
```

---

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
data: add Roaring Moon Protosynthesis spread
data: fix Incineroar AV benchmark (Origin Pulse calc was wrong)
feat: add CLI filter by usage tier
docs: update schema documentation
```

---

## Code of Conduct

- Be accurate. Only submit spreads you can verify with a damage calculator.
- Cite sources when possible (team report, tournament stream, usage data).
- Don't submit spreads for formats other than VGC doubles (Smogon Singles spreads are different).

---

Questions? Open an Issue and tag it `question`.
