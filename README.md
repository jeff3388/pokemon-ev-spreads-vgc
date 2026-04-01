# pokemon-ev-spreads-vgc

> Community-maintained VGC EV spreads database for Regulation F — JSON data, CLI lookup tool, and benchmark notes for every major competitive Pokémon.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Regulation](https://img.shields.io/badge/Regulation-F-blue)](https://www.pokemon.com/us/strategy/vgc-2024-regulation-f-details/)
[![Pokémon Count](https://img.shields.io/badge/Pok%C3%A9mon-20%2B-green)](#data-coverage)
[![Spreads](https://img.shields.io/badge/Spreads-50%2B-orange)](#data-coverage)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## What's Inside

A structured, tournament-validated dataset of **EV spreads for VGC doubles** (Level 50 format), covering every high-usage Pokémon in Regulation F. Each entry includes:

- Nature, EV distribution, and recommended item
- Tera type recommendation
- Usage tier (S / A / B)
- Benchmark notes — specific damage calculations that justify the spread
- CLI lookup tool for instant terminal access

This dataset targets players who want **precise investment reasons**, not just numbers.

---

## Quick Start

```bash
git clone https://github.com/twjojo/pokemon-ev-spreads-vgc.git
cd pokemon-ev-spreads-vgc

# List all available Pokémon
node scripts/lookup.js --list

# Look up all spreads for a Pokémon
node scripts/lookup.js incineroar

# Look up a specific spread by ID
node scripts/lookup.js koraidon koraidon-cb-max
```

**No dependencies required** — Node.js only, uses the built-in `fs` module.

---

## Example Output

```
────────────────────────────────────────────────────────────
  Incineroar — Assault Vest Max Special Bulk
────────────────────────────────────────────────────────────
  Nature : Careful
  EVs    : 252 HP / 4 Def / 252 SpD
  Item   : Assault Vest
  Tera   : Fire
  Tier   : S
  Moves  : Fake Out / Parting Shot / Knock Off / Flare Blitz

  Notes  : Standard. Maximizes SpDef to survive Kyogre Origin
           Pulse and Flutter Mane Moonblast.

  Benchmarks:
    • Survives Modest Kyogre Origin Pulse from full HP
    • Survives Timid Flutter Mane Moonblast in Sunlight
    • Survives Modest Miraidon Dazzling Gleam
────────────────────────────────────────────────────────────
```

---

## Data Coverage

### Regulation F — Pokémon Included

| Pokémon | Role | Spreads |
|---------|------|---------|
| Incineroar | Support | 3 |
| Koraidon | Restricted Attacker | 3 |
| Miraidon | Restricted Attacker | 2 |
| Kyogre | Restricted Attacker | 3 |
| Calyrex-Shadow | Restricted Attacker | 2 |
| Calyrex-Ice | TR Restricted Attacker | 2 |
| Flutter Mane | Special Attacker | 3 |
| Iron Hands | Trick Room Attacker | 2 |
| Tornadus | Prankster Support | 2 |
| Amoonguss | Redirect Support | 2 |
| Gholdengo | Special Attacker | 2 |
| Cresselia | TR Setter / Support | 2 |
| Porygon2 | TR Setter | 2 |
| Rillaboom | Grassy Terrain Control | 2 |
| Chien-Pao | Physical Attacker | 2 |
| Chi-Yu | Special Attacker | 2 |
| Kingambit | Late Game Sweeper | 2 |
| Great Tusk | Physical Attacker | 2 |
| Urshifu (Rapid Strike) | Physical Attacker | 2 |

**Total: 19 Pokémon, 46 spreads** — updated for current Regulation F meta.

---

## JSON Schema

Each Pokémon entry follows this structure:

```json
{
  "name": "Incineroar",
  "dex": 727,
  "type": ["Fire", "Dark"],
  "role": "Support",
  "base_stats": { "hp": 95, "atk": 115, "def": 90, "spa": 65, "spd": 90, "spe": 60 },
  "spreads": [
    {
      "id": "incin-av-max-spd",
      "label": "Assault Vest Max Special Bulk",
      "nature": "Careful",
      "evs": { "hp": 252, "atk": 0, "def": 4, "spa": 0, "spd": 252, "spe": 0 },
      "ivs": { "hp": 31, "atk": 31, "def": 31, "spa": 31, "spd": 31, "spe": 31 },
      "item": "Assault Vest",
      "moves": ["Fake Out", "Parting Shot", "Knock Off", "Flare Blitz"],
      "tera_type": "Fire",
      "usage_tier": "S",
      "notes": "Rationale text...",
      "benchmarks": ["Survives X from full HP", "OHKOs Y with Z"]
    }
  ]
}
```

---

## EV Training Fundamentals

### Why Benchmarks Matter

Arbitrary max-EV spreads waste EVs that could go into another stat. The goal is to hit the **minimum investment** that achieves a specific benchmark:

- **Defensive benchmark**: survive a common threat's attack
- **Offensive benchmark**: OHKO or 2HKO a specific target
- **Speed benchmark**: outspeed or underspeed a specific tier

For complete EV calculation tools and VGC speed tier references, see the [pokestats.cc IV/EV Calculator](https://pokestats.cc/pokedex/iv-calculator) — the fastest way to verify these benchmarks at Level 50.

### Regulation F Meta Tier Summary

| Tier | Description |
|------|-------------|
| S | Appears in the majority of top-cut teams |
| A | Viable and commonly seen in tournament play |
| B | Situational; strong in specific archetypes |

---

## Related Resources

- [VGC EV Training Guide on pokestats.cc](https://pokestats.cc/guides/vgc-ev-training-guide) — complete breakdown of Level 50 EV math, bulk thresholds, and stat benchmarks
- [Smogon VGC forums](https://www.smogon.com/forums/forums/vgc.27/) — team report source for spread validation
- [Pokémon Global Link usage stats](https://www.pokemon.co.jp/ex/pjcs2024/)

---

## Contributing

Spreads are only as good as the community keeping them current. See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- How to add a new Pokémon or spread
- JSON validation requirements
- Benchmark documentation standards
- Regulation update process

---

## License

[MIT License](LICENSE) — free to use, modify, and distribute with attribution.

Data sourced from public tournament team reports and VGC community resources.
