#!/usr/bin/env node
/**
 * pokemon-ev-spreads-vgc — CLI Lookup Tool
 * Usage: node scripts/lookup.js <pokemon-name> [spread-id]
 * Example: node scripts/lookup.js incineroar
 *          node scripts/lookup.js koraidon koraidon-cb-max
 */

const fs = require('fs')
const path = require('path')

const DATA_FILE = path.join(__dirname, '../data/ev-spreads.json')

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
  } catch (e) {
    console.error('Error loading ev-spreads.json:', e.message)
    process.exit(1)
  }
}

function formatEVs(evs) {
  const parts = []
  const order = ['hp', 'atk', 'def', 'spa', 'spd', 'spe']
  const labels = { hp: 'HP', atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe' }
  for (const key of order) {
    if (evs[key] > 0) parts.push(`${evs[key]} ${labels[key]}`)
  }
  return parts.join(' / ') || 'No EVs'
}

function printSpread(pokemon, spread) {
  const divider = '─'.repeat(60)
  console.log(`\n${divider}`)
  console.log(`  ${pokemon.name} ${pokemon.form ? `(${pokemon.form}) ` : ''}— ${spread.label}`)
  console.log(divider)
  console.log(`  Nature : ${spread.nature}`)
  console.log(`  EVs    : ${formatEVs(spread.evs)}`)
  console.log(`  Item   : ${spread.item}`)
  console.log(`  Tera   : ${spread.tera_type}`)
  console.log(`  Tier   : ${spread.usage_tier}`)
  if (spread.moves && spread.moves.length) {
    console.log(`  Moves  : ${spread.moves.join(' / ')}`)
  }
  console.log(`\n  Notes  : ${spread.notes}`)
  if (spread.benchmarks && spread.benchmarks.length) {
    console.log('\n  Benchmarks:')
    for (const b of spread.benchmarks) {
      console.log(`    • ${b}`)
    }
  }
  console.log(divider)
}

function listAll(data) {
  console.log('\n  Available Pokémon (Regulation F)')
  console.log('  ─'.repeat(30))
  for (const p of data.pokemon) {
    const spreadIds = p.spreads.map(s => s.id).join(', ')
    console.log(`  ${p.name.padEnd(20)} [${spreadIds}]`)
  }
  console.log()
}

function main() {
  const data = loadData()
  const args = process.argv.slice(2)

  if (args.length === 0 || args[0] === '--list' || args[0] === '-l') {
    console.log(`\n  pokemon-ev-spreads-vgc v${data.meta.version}`)
    console.log(`  Regulation ${data.meta.regulation} | Updated: ${data.meta.last_updated}`)
    listAll(data)
    return
  }

  const query = args[0].toLowerCase()
  const spreadId = args[1]

  const pokemon = data.pokemon.find(p =>
    p.name.toLowerCase() === query ||
    p.name.toLowerCase().replace(/[^a-z]/g, '') === query.replace(/[^a-z]/g, '')
  )

  if (!pokemon) {
    console.error(`\n  Pokémon "${args[0]}" not found. Run with --list to see all available entries.\n`)
    process.exit(1)
  }

  if (spreadId) {
    const spread = pokemon.spreads.find(s => s.id === spreadId)
    if (!spread) {
      console.error(`\n  Spread ID "${spreadId}" not found for ${pokemon.name}.`)
      console.error(`  Available: ${pokemon.spreads.map(s => s.id).join(', ')}\n`)
      process.exit(1)
    }
    printSpread(pokemon, spread)
  } else {
    // Print all spreads for the Pokémon
    console.log(`\n  ${pokemon.name} — ${pokemon.spreads.length} spread(s) | Role: ${pokemon.role}`)
    for (const spread of pokemon.spreads) {
      printSpread(pokemon, spread)
    }
  }
}

main()
