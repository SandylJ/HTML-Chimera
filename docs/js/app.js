document.addEventListener('DOMContentLoaded', () => {
    const META_SKILLS = { STRENGTH: 'Strength', INTELLECT: 'Intellect', STEWARDSHIP: 'Stewardship', RESILIENCE: 'Resilience', ARTISTRY: 'Artistry' };
    const TASK_CATEGORIES = { FITNESS: META_SKILLS.STRENGTH, STUDY: META_SKILLS.INTELLECT, CHORES: META_SKILLS.STEWARDSHIP, SELF_CARE: META_SKILLS.RESILIENCE, CREATIVE: META_SKILLS.ARTISTRY };

    const GAME_DATA = {
        SKILLS: {
            woodcutting: { name: 'Woodcutting', type: 'gathering', icon: 'fa-tree', theme: 'woodcutting' },
            mining: { name: 'Mining', type: 'gathering', icon: 'fa-gem', theme: 'mining' },
            fishing: { name: 'Fishing', type: 'gathering', icon: 'fa-fish', theme: 'fishing' },
            farming: { name: 'Farming', type: 'gathering', icon: 'fa-seedling', theme: 'farming' },
            hunter: { name: 'Hunter', type: 'gathering', icon: 'fa-paw', theme: 'hunter' },
            archaeology: { name: 'Archaeology', type: 'gathering', icon: 'fa-brush', theme: 'archaeology' },
            divination: { name: 'Divination', type: 'gathering', icon: 'fa-sparkles', theme: 'divination' },
            firemaking: { name: 'Firemaking', type: 'artisan', icon: 'fa-fire', theme: 'firemaking' },
            smithing: { name: 'Smithing', type: 'artisan', icon: 'fa-hammer', theme: 'smithing' },
            cooking: { name: 'Cooking', type: 'artisan', icon: 'fa-utensils', theme: 'cooking' },
            runecrafting: { name: 'Runecrafting', type: 'artisan', icon: 'fa-circle-nodes', theme: 'smithing' },
        },
        ITEMS: {
            // Core resources
            logs: { name: 'Logs', icon: '🪵' }, oak_logs: { name: 'Oak Logs', icon: '🪵' },
            copper_ore: { name: 'Copper Ore', icon: '🪨' }, tin_ore: { name: 'Tin Ore', icon: '🪨' },
            bronze_bar: { name: 'Bronze Bar', icon: '🟧' }, bronze_dagger: { name: 'Bronze Dagger', icon: '🗡️', damage: 4 },
            raw_shrimp: { name: 'Raw Shrimp', icon: '🦐' }, raw_sardine: { name: 'Raw Sardine', icon: '🐟' },
            shrimp: { name: 'Shrimp', icon: '🍤', heals: 20 }, sardine: { name: 'Sardine', icon: '🐠', heals: 30 },
            bird_nest: { name: 'Bird Nest', icon: '🪺' },

            // Shop & chest items mirrored from native dataset
            seed_vigor: { name: 'Seed of Vigor', icon: '🌱' },
            seed_clarity: { name: 'Seed of Clarity', icon: '🌱' },
            seed_inspiration: { name: 'Seed of Inspiration', icon: '🌱' },
            material_joyful_ember: { name: 'Joyful Ember', icon: '🔥' },
            material_sunstone_shard: { name: 'Sunstone Shard', icon: '🔶' },
            material_essence: { name: 'Raw Essence', icon: '✨' },
            item_ancient_key: { name: 'Ancient Key', icon: '🗝️' },
            tree_ironwood: { name: 'Ironwood Sapling', icon: '🌳' },

            item_elixir_strength: { name: 'Elixir of Strength', icon: '🧪' },
            item_scroll_fortune: { name: 'Scroll of Fortune', icon: '📜' },

            // Runecrafting resources and products
            rune_essence: { name: 'Rune Essence', icon: '✨' },
            air_rune: { name: 'Air Rune', icon: '🌀' },
            mind_rune: { name: 'Mind Rune', icon: '🧠' },
            water_rune: { name: 'Water Rune', icon: '💧' },
            earth_rune: { name: 'Earth Rune', icon: '🌱' },
            fire_rune: { name: 'Fire Rune', icon: '🔥' },
            body_rune: { name: 'Body Rune', icon: '🫀' },
            chaos_rune: { name: 'Chaos Rune', icon: '🧿' },
            nature_rune: { name: 'Nature Rune', icon: '🍃' },
            law_rune: { name: 'Law Rune', icon: '⚖️' },
            blood_rune: { name: 'Blood Rune', icon: '🩸' },
            cosmic_rune: { name: 'Cosmic Rune', icon: '🌌' },
            death_rune: { name: 'Death Rune', icon: '💀' },
            
            // New gathering outputs
            potato: { name: 'Potato', icon: '🥔' },
            wheat: { name: 'Wheat', icon: '🌾' },
            flax: { name: 'Flax', icon: '🪢' },
            raw_bird_meat: { name: 'Raw Bird Meat', icon: '🍖' },
            animal_pelt: { name: 'Animal Pelt', icon: '🦫' },
            artifact_fragment: { name: 'Artifact Fragment', icon: '🗿' },
            ancient_relic: { name: 'Ancient Relic', icon: '🏺' },
            pale_energy: { name: 'Pale Energy', icon: '✨' },
            flickering_energy: { name: 'Flickering Energy', icon: '🔮' },
            feather: { name: 'Feather', icon: '🪶' },

            // Hunter mission rewards
            beast_bone: { name: 'Beast Bone', icon: '🦴' },
            pristine_hide: { name: 'Pristine Hide', icon: '🦬' },
            monster_heart: { name: 'Monster Heart', icon: '❤️‍🔥' },
            dragon_scale: { name: 'Azure Dragon Scale', icon: '🛡️' },
            azure_dragon_eye: { name: 'Azure Dragon Eye', icon: '👁️‍🗨️' },
            legendary_trophy: { name: 'Legendary Trophy', icon: '🏆' },
        },
        ACTIONS: {
            woodcutting: [
                { id: 'normal_tree', name: 'Normal Trees', level: 1, xp: 10, output: { itemId: 'logs', quantity: 1 }, baseTime: 3000, rareDrop: { itemId: 'bird_nest', chance: 1 } },
                { id: 'oak_tree', name: 'Oak Trees', level: 15, xp: 25, output: { itemId: 'oak_logs', quantity: 1 }, baseTime: 5000, rareDrop: { itemId: 'bird_nest', chance: 1.5 } },
            ],
            mining: [
                { id: 'copper_rock', name: 'Copper Rock', level: 1, xp: 12, output: { itemId: 'copper_ore', quantity: 1 }, baseTime: 3500 },
                { id: 'tin_rock', name: 'Tin Rock', level: 1, xp: 12, output: { itemId: 'tin_ore', quantity: 1 }, baseTime: 3500 },
                { id: 'essence_rock', name: 'Rune Essence Rock', level: 1, xp: 6, output: { itemId: 'rune_essence', quantity: 1 }, baseTime: 3000 },
            ],
            farming: [
                { id: 'potato_patch', name: 'Potato Patch', level: 1, xp: 7, output: { itemId: 'potato', quantity: 1 }, baseTime: 4500 },
                { id: 'wheat_field', name: 'Wheat Field', level: 5, xp: 10, output: { itemId: 'wheat', quantity: 1 }, baseTime: 5000 },
                { id: 'flax_field', name: 'Flax Field', level: 10, xp: 14, output: { itemId: 'flax', quantity: 1 }, baseTime: 5200 },
            ],
            hunter: [
                { id: 'bird_snare', name: 'Bird Snaring', level: 1, xp: 9, output: { itemId: 'raw_bird_meat', quantity: 1 }, baseTime: 4200, rareDrop: { itemId: 'feather', chance: 5 } },
                { id: 'rabbit_trap', name: 'Rabbit Trapping', level: 7, xp: 14, output: { itemId: 'animal_pelt', quantity: 1 }, baseTime: 5200 },
            ],
            archaeology: [
                { id: 'surface_excavation', name: 'Surface Excavation', level: 1, xp: 6, output: { itemId: 'artifact_fragment', quantity: 1 }, baseTime: 4800 },
                { id: 'ancient_digsite', name: 'Ancient Digsite', level: 20, xp: 18, output: { itemId: 'ancient_relic', quantity: 1 }, baseTime: 8000 },
            ],
            divination: [
                { id: 'pale_wisp', name: 'Pale Wisp', level: 1, xp: 5, output: { itemId: 'pale_energy', quantity: 1 }, baseTime: 3000 },
                { id: 'flickering_wisp', name: 'Flickering Wisp', level: 10, xp: 8, output: { itemId: 'flickering_energy', quantity: 1 }, baseTime: 3600 },
            ],
            fishing: [
                { id: 'shrimp_spot', name: 'Shrimp Spot', level: 1, xp: 8, output: { itemId: 'raw_shrimp', quantity: 1 }, baseTime: 4000 },
                { id: 'sardine_spot', name: 'Sardine Spot', level: 5, xp: 15, output: { itemId: 'raw_sardine', quantity: 1 }, baseTime: 4500 },
            ],
        },
        RECIPES: {
            smithing: [
                { id: 'bronze_bar', name: 'Bronze Bar', level: 1, xp: 15, input: [{ itemId: 'copper_ore', quantity: 1 }, { itemId: 'tin_ore', quantity: 1 }], output: { itemId: 'bronze_bar', quantity: 1 }, baseTime: 4000 },
                { id: 'bronze_dagger', name: 'Bronze Dagger', level: 5, xp: 25, input: [{ itemId: 'bronze_bar', quantity: 1 }], output: { itemId: 'bronze_dagger', quantity: 1 }, baseTime: 5000 },
            ],
            firemaking: [
                { id: 'bonfire_logs', name: 'Bonfire (Logs)', level: 1, xp: 20, input: [{ itemId: 'logs', quantity: 10 }], output: {}, baseTime: 20000 },
            ],
            cooking: [
                { id: 'cook_shrimp', name: 'Cook Shrimp', level: 1, xp: 10, input: [{ itemId: 'raw_shrimp', quantity: 1 }], output: { itemId: 'shrimp', quantity: 1 }, baseTime: 3000 },
                { id: 'cook_sardine', name: 'Cook Sardine', level: 5, xp: 18, input: [{ itemId: 'raw_sardine', quantity: 1 }], output: { itemId: 'sardine', quantity: 1 }, baseTime: 3500 },
            ],
            runecrafting: [
                { id: 'air_rune', name: 'Air Altar (Air Rune)', level: 1, xp: 5, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'air_rune', quantity: 1 }, baseTime: 2500 },
                { id: 'mind_rune', name: 'Mind Altar (Mind Rune)', level: 2, xp: 5, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'mind_rune', quantity: 1 }, baseTime: 2600 },
                { id: 'water_rune', name: 'Water Altar (Water Rune)', level: 5, xp: 6, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'water_rune', quantity: 1 }, baseTime: 2700 },
                { id: 'earth_rune', name: 'Earth Altar (Earth Rune)', level: 9, xp: 6, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'earth_rune', quantity: 1 }, baseTime: 2800 },
                { id: 'fire_rune', name: 'Fire Altar (Fire Rune)', level: 14, xp: 7, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'fire_rune', quantity: 1 }, baseTime: 2900 },
                { id: 'body_rune', name: 'Body Altar (Body Rune)', level: 20, xp: 7, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'body_rune', quantity: 1 }, baseTime: 3000 },
                { id: 'cosmic_rune', name: 'Cosmic Altar (Cosmic Rune)', level: 27, xp: 8, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'cosmic_rune', quantity: 1 }, baseTime: 3200 },
                { id: 'chaos_rune', name: 'Chaos Altar (Chaos Rune)', level: 35, xp: 9, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'chaos_rune', quantity: 1 }, baseTime: 3400 },
                { id: 'nature_rune', name: 'Nature Altar (Nature Rune)', level: 44, xp: 10, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'nature_rune', quantity: 1 }, baseTime: 3600 },
                { id: 'law_rune', name: 'Law Altar (Law Rune)', level: 54, xp: 11, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'law_rune', quantity: 1 }, baseTime: 3800 },
                { id: 'death_rune', name: 'Death Altar (Death Rune)', level: 65, xp: 12, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'death_rune', quantity: 1 }, baseTime: 4000 },
                { id: 'blood_rune', name: 'Blood Altar (Blood Rune)', level: 77, xp: 13, input: [{ itemId: 'rune_essence', quantity: 1 }], output: { itemId: 'blood_rune', quantity: 1 }, baseTime: 4200 },
            ],
            alchemy: [ // from native dataset
                { id: 'elixir_strength', name: 'Elixir of Strength', level: 1, xp: 25, input: [{ itemId: 'material_sunstone_shard', quantity: 1 }, { itemId: 'material_joyful_ember', quantity: 2 }], output: { itemId: 'item_elixir_strength', quantity: 1 }, baseTime: 5000 },
                { id: 'scroll_fortune', name: 'Scroll of Fortune', level: 1, xp: 30, input: [{ itemId: 'material_joyful_ember', quantity: 5 }, { itemId: 'material_essence', quantity: 2 }], output: { itemId: 'item_scroll_fortune', quantity: 1 }, baseTime: 6000 },
            ]
        },
        SPELLS: [ // mirrored subset
            { id: 'spell_double_xp', name: 'Double XP', description: 'Earn double XP for a short time', requiredLevel: 1, runeCost: 1, effect: 'doubleXP', durationMs: 10 * 60 * 1000 },
            { id: 'spell_double_gold', name: 'Double Gold', description: 'Earn double gold for a short time', requiredLevel: 1, runeCost: 1, effect: 'doubleGold', durationMs: 10 * 60 * 1000 },
            { id: 'spell_golden_harvest', name: 'Golden Harvest', description: '+25% gold for 10m', requiredLevel: 7, runeCost: 3, effect: 'goldBoost', magnitude: 0.25, durationMs: 10 * 60 * 1000 },
        ],
        CHESTS: [
            { id: 'chest_common', name: 'Common Chest', description: 'Contains a few simple rewards.', cost: 250, keyItemID: null, rarity: 'common', icon: 'shippingbox', lootTable: [ {type:'currency', amount:100}, {type:'item', id:'seed_vigor', qty:1}, {type:'item', id:'material_joyful_ember', qty:2} ], rewardCount: [1,2] },
            { id: 'chest_rare', name: 'Rare Chest', description: 'Valuable materials and chance for rare seeds.', cost: 1000, keyItemID: null, rarity: 'rare', icon: 'archivebox', lootTable: [ {type:'currency', amount:500}, {type:'item', id:'seed_clarity', qty:1}, {type:'item', id:'material_sunstone_shard', qty:1}, {type:'runes', amount:1} ], rewardCount: [2,3] },
            { id: 'chest_ancient', name: 'Ancient Chest', description: 'A locked chest from a forgotten era.', cost: 0, keyItemID: 'item_ancient_key', rarity: 'epic', icon: 'treasurechest', lootTable: [ {type:'currency', amount:2000}, {type:'item', id:'seed_inspiration', qty:1}, {type:'item', id:'tree_ironwood', qty:1}, {type:'runes', amount:5} ], rewardCount: [3,4] },
        ],
        COMBAT: {
            ENEMIES: [
                { id: 'goblin', name: 'Goblin', level: 2, hp: 30, maxHp: 30, attack: 4, defense: 1, gold: [5, 10], drops: [ {id:'copper_ore', qty:[1,2], chance:50}, {id:'tin_ore', qty:[1,2], chance:50} ], attackSpeedMs: 2000 },
                { id: 'wolf', name: 'Wolf', level: 5, hp: 60, maxHp: 60, attack: 7, defense: 2, gold: [12, 25], drops: [ {id:'raw_shrimp', qty:[1,1], chance:30} ], attackSpeedMs: 1800 },
                { id: 'skeleton', name: 'Skeleton', level: 10, hp: 120, maxHp: 120, attack: 12, defense: 4, gold: [30, 60], drops: [ {id:'bronze_bar', qty:[1,2], chance:35} ], attackSpeedMs: 1700 },
                { id: 'troll', name: 'Troll', level: 20, hp: 300, maxHp: 300, attack: 20, defense: 8, gold: [80, 150], drops: [ {id:'item_ancient_key', qty:[1,1], chance:10} ], attackSpeedMs: 1600 },
            ]
        },
        ARMY_CLASSES: {
            knight: { id: 'knight', name: 'Knight', emoji: '🛡️', role: 'Defender', description: 'Armored vanguard that holds the line.', baseCost: 150, costGrowth: 1.22, dps: 3, hps: 0.0, foodPerMin: 0.6 },
            wizard: { id: 'wizard', name: 'Wizard', emoji: '🪄', role: 'Caster', description: 'Arcane glass cannon raining destruction.', baseCost: 220, costGrowth: 1.24, dps: 5, hps: 0.0, foodPerMin: 0.5 },
            warlock: { id: 'warlock', name: 'Warlock', emoji: '☯️', role: 'Hexer', description: 'Curses enemies and siphons life.', baseCost: 260, costGrowth: 1.26, dps: 3.5, hps: 0.5, foodPerMin: 0.6 },
            cleric: { id: 'cleric', name: 'Cleric', emoji: '⛪', role: 'Healer', description: 'Faithful healer mending wounds.', baseCost: 200, costGrowth: 1.22, dps: 1, hps: 2.5, foodPerMin: 0.7 },
            druid: { id: 'druid', name: 'Druid', emoji: '🌿', role: 'Support', description: "Nature's embrace with heals and thorns.", baseCost: 240, costGrowth: 1.25, dps: 2, hps: 1.5, foodPerMin: 0.6 },
            goblin_merc: { id: 'goblin_merc', name: 'Goblin Merc', emoji: '🗡️', role: 'Rogue', description: 'Cheap hire, rowdy appetite.', baseCost: 100, costGrowth: 1.30, dps: 2, hps: 0, foodPerMin: 0.8 }
        },
        MERCHANTS: {
            bazaar: {
                name: 'Grand Bazaar',
                stalls: [
                    { id: 'weapons', name: "Blacksmith's Forge", emoji: '⚒️', desc: 'Finely wrought blades and blunt instruments.', theme: 'smithing', stock: [
                        { itemId: 'bronze_dagger', buy: 50, sell: 15 }
                    ] },
                    { id: 'armour', name: 'Shield & Mail', emoji: '🛡️', desc: 'Keep your hide intact with sturdy armour.', theme: 'smithing', stock: [
                        { itemId: 'dragon_scale', buy: 1200, sell: 250 }
                    ] },
                    { id: 'potions', name: "Alchemist's Nook", emoji: '🧪', desc: 'Brews, elixirs, and curious tonics.', theme: 'cooking', stock: [
                        { itemId: 'item_elixir_strength', buy: 220, sell: 60 },
                        { itemId: 'item_scroll_fortune', buy: 300, sell: 85 }
                    ] },
                    { id: 'food', name: 'Cookfire Cantina', emoji: '🍖', desc: 'Freshly cooked bites to restore vigor.', theme: 'cooking', stock: [
                        { itemId: 'shrimp', buy: 15, sell: 4 },
                        { itemId: 'sardine', buy: 22, sell: 6 }
                    ] },
                    { id: 'general', name: 'General Wares', emoji: '📦', desc: 'Odds, ends, and adventuring essentials.', theme: 'farming', stock: [
                        { itemId: 'feather', buy: 5, sell: 1 },
                        { itemId: 'bronze_bar', buy: 40, sell: 10 }
                    ] },
                    { id: 'runes', name: 'Regent of Runes', emoji: '🔮', desc: 'Arcane currencies and sigils.', theme: 'divination', stock: [
                        { itemId: 'air_rune', buy: 8, sell: 2 },
                        { itemId: 'mind_rune', buy: 10, sell: 3 },
                        { itemId: 'water_rune', buy: 12, sell: 3 },
                        { itemId: 'earth_rune', buy: 12, sell: 3 },
                        { itemId: 'fire_rune', buy: 14, sell: 4 }
                    ] }
                ]
            }
        }
    };
    
    // Medieval Empire Units dataset
    const EMPIRE_UNITS = {
        gold_miner: { id: 'gold_miner', name: 'Gold Miner', emoji: '⛏️', description: 'Mines gold from the mountain.', baseCost: 100, costGrowth: 1.18, goldPerSec: 1 },
        prospector: { id: 'prospector', name: 'Dwarven Prospector', emoji: '⛏️✨', description: 'Veteran miner with a nose for veins.', baseCost: 450, costGrowth: 1.20, goldPerSec: 3 },
        alchemist: { id: 'alchemist', name: 'Guild Alchemist', emoji: '⚗️', description: 'Brews tonics and sells them to nobles.', baseCost: 800, costGrowth: 1.22, goldPerSec: 2, runesPerSec: 0.02 },
        rune_scribe: { id: 'rune_scribe', name: 'Rune Scribe', emoji: '📜', description: 'Inscribes raw essence into runes slowly.', baseCost: 1200, costGrowth: 1.25, essencePerSec: 0.1 }
    };
    GAME_DATA.UNITS = EMPIRE_UNITS;

    // Hunter specialists and missions
    GAME_DATA.HUNTERS = {
        tracker: { id: 'tracker', name: 'Tracker', emoji: '🦊', description: 'Keen senses, excels at tracking elusive prey.', baseCost: 250, successBonus: 0.05, speedBonus: 0.06 },
        sharpshooter: { id: 'sharpshooter', name: 'Sharpshooter', emoji: '🏹', description: 'Long-range expert. Critical finishes.', baseCost: 400, successBonus: 0.08, speedBonus: 0.02 },
        beastmaster: { id: 'beastmaster', name: 'Beastmaster', emoji: '🐺', description: 'Commands tamed beasts to corner quarry.', baseCost: 600, successBonus: 0.1, speedBonus: 0.0 },
        dragonstalker: { id: 'dragonstalker', name: 'Dragonstalker', emoji: '🐉', description: 'Elite slayer specialized in apex prey.', baseCost: 1200, successBonus: 0.18, speedBonus: -0.02 }
    };
    GAME_DATA.HUNTER_MISSIONS = [
        { id: 'mission_wyvern_track', name: 'Trace the Frost Wyvern', level: 8, durationMs: 30*60*1000, huntersNeeded: 1, baseSuccess: 0.7, icon: '❄️', rewards: [ {type:'item', id:'beast_bone', min:2, max:4, chance:1}, {type:'gold', min:120, max:220, chance:1}, {type:'item', id:'pristine_hide', min:1, max:2, chance:0.35} ] },
        { id: 'mission_alpha_stag', name: 'Cull the Alpha Stag', level: 12, durationMs: 45*60*1000, huntersNeeded: 2, baseSuccess: 0.62, icon: '🦌', rewards: [ {type:'item', id:'pristine_hide', min:2, max:3, chance:1}, {type:'gold', min:220, max:400, chance:1}, {type:'item', id:'monster_heart', min:1, max:1, chance:0.25} ] },
        { id: 'mission_chimera', name: 'Hunt a Chimera', level: 18, durationMs: 60*60*1000, huntersNeeded: 2, baseSuccess: 0.56, icon: '🦁', rewards: [ {type:'item', id:'beast_bone', min:3, max:6, chance:1}, {type:'item', id:'monster_heart', min:1, max:2, chance:0.35}, {type:'gold', min:350, max:650, chance:1} ] },
        { id: 'mission_azure_tyrant', name: 'Legendary: Azure Sky Tyrant', level: 25, durationMs: 120*60*1000, huntersNeeded: 3, baseSuccess: 0.4, icon: '🐲', rewards: [ {type:'item', id:'dragon_scale', min:1, max:3, chance:0.9}, {type:'item', id:'azure_dragon_eye', min:1, max:1, chance:0.3}, {type:'gold', min:1200, max:2200, chance:1}, {type:'item', id:'legendary_trophy', min:1, max:1, chance:0.1} ] }
    ];

    class Skill {
        constructor(id, name) { this.id = id; this.name = name; this.level = 1; this.currentXP = 0; this.xpToNextLevel = 100; }
        addXP(amount, game) {
            if (this.level >= 99) return;
            const intellectBonus = (this.name === META_SKILLS.INTELLECT) ? 0 : (game.state.player.meta_skills[META_SKILLS.INTELLECT].level - 1) * 0.02;
            let bonusAmount = amount * (1 + (game.state.bonfire.active ? game.state.bonfire.xpBoost : 0));
            bonusAmount *= (1 + intellectBonus) * (game.hasBuff('doubleXP') ? 2 : 1);
            this.currentXP += bonusAmount;
            while (this.currentXP >= this.xpToNextLevel) {
                if (this.level >= 99) { this.currentXP = 0; break; }
                this.level++; this.currentXP -= this.xpToNextLevel; this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.15);
                game.uiManager.showFloatingText(`${this.name} Level Up!`, 'text-green-400');
            }
        }
    }

    class Mastery {
        constructor() { this.level = 0; this.currentXP = 0; this.xpToNextLevel = 50; }
        addXP(amount) { if (this.level >= 99) return; this.currentXP += amount; while (this.currentXP >= this.xpToNextLevel) { if (this.level >= 99) { this.currentXP = 0; break; } this.level++; this.currentXP -= this.xpToNextLevel; this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.08); } }
    }

    class GameState {
        constructor() {
            this.player = {
                gold: 100,
                runes: 5,
                stamina: 100,
                staminaMax: 100,
                hp: 100,
                hpMax: 100,
                weapon: null,
                skills: {},
                meta_skills: {},
                mastery: {},
                activeBuffs: {}, // { effectKey: expiryTimestamp }
            };
            this.bank = {};
            this.activeAction = null; // gathering/artisan action
            this.bonfire = { active: false, expiry: 0, xpBoost: 0 };
            this.lastUpdate = Date.now();

            // Combat state
            this.combat = { inCombat: false, enemy: null, lastPlayerAttack: 0, lastEnemyAttack: 0, playerAttackSpeedMs: 1600 };

            // Clicker state
            this.clicker = { goldPerClick: 1, autoClickers: 0, autoRateMs: 1000, lastAutoTick: Date.now(), upgrades: { clickPowerLevel: 0, autoClickerLevel: 0, multiplierLevel: 0 } };

            // Empire/Army systems (ensure present for new games)
            this.empire = {
                units: {},
                lastTick: Date.now(),
                production: { goldPerSec: 0, runesPerSec: 0, essencePerSec: 0 },
                buffers: { gold: 0, runes: 0, essence: 0 }
            };
            Object.keys(GAME_DATA.UNITS || {}).forEach(id => { this.empire.units[id] = 0; });

            this.army = {
                units: {},
                lastTick: Date.now(),
                production: { dps: 0, hps: 0, hungry: false },
                upkeep: { foodBuffer: 0, hungry: false },
                fly: { accumDmg: 0, accumHeal: 0, lastFlush: Date.now() },
                upgrades: { offenseLevel: 0, supportLevel: 0, logisticsLevel: 0 },
                stance: 'balanced'
            };
            Object.keys(GAME_DATA.ARMY_CLASSES || {}).forEach(id => { this.army.units[id] = 0; });

            Object.keys(GAME_DATA.SKILLS).forEach(id => {
                this.player.skills[id] = new Skill(id, GAME_DATA.SKILLS[id].name);
                this.player.mastery[id] = {};
            });
            Object.values(META_SKILLS).forEach(name => { this.player.meta_skills[name] = new Skill(name, name); });

            // Worker systems: Mining Overseer, Fishing Harbor, Farming Estate
            this.workers = {
                woodcutting: {
                    total: 0,
                    upgrades: { speedLevel: 0, yieldLevel: 0 },
                    assigned: {},
                    progress: {}
                },
                mining: {
                    total: 0,
                    upgrades: { speedLevel: 0, yieldLevel: 0, depthLevel: 0, cartLevel: 0 },
                    assigned: {},
                    progress: {}
                },
                fishing: {
                    total: 0,
                    boats: 0,
                    upgrades: { netLevel: 0, baitLevel: 0, boatLevel: 0 },
                    assigned: {},
                    progress: {}
                },
                farming: {
                    total: 0,
                    upgrades: { irrigationLevel: 0, toolsLevel: 0, compostLevel: 0, tractorLevel: 0 },
                    assigned: {},
                    progress: {}
                },
                hunter: {
                    total: 0,
                    upgrades: { speedLevel: 0, yieldLevel: 0 },
                    assigned: {},
                    progress: {}
                },
                archaeology: {
                    total: 0,
                    upgrades: { speedLevel: 0, yieldLevel: 0 },
                    assigned: {},
                    progress: {}
                },
                divination: {
                    total: 0,
                    upgrades: { speedLevel: 0, yieldLevel: 0 },
                    assigned: {},
                    progress: {}
                }
            };
            // Seed worker action keys
            (GAME_DATA.ACTIONS.woodcutting || []).forEach(a => { this.workers.woodcutting.assigned[a.id] = 0; this.workers.woodcutting.progress[a.id] = 0; });
            (GAME_DATA.ACTIONS.mining || []).forEach(a => { this.workers.mining.assigned[a.id] = 0; this.workers.mining.progress[a.id] = 0; });
            (GAME_DATA.ACTIONS.fishing || []).forEach(a => { this.workers.fishing.assigned[a.id] = 0; this.workers.fishing.progress[a.id] = 0; });
            (GAME_DATA.ACTIONS.farming || []).forEach(a => { this.workers.farming.assigned[a.id] = 0; this.workers.farming.progress[a.id] = 0; });
            (GAME_DATA.ACTIONS.hunter || []).forEach(a => { this.workers.hunter.assigned[a.id] = 0; this.workers.hunter.progress[a.id] = 0; });
            (GAME_DATA.ACTIONS.archaeology || []).forEach(a => { this.workers.archaeology.assigned[a.id] = 0; this.workers.archaeology.progress[a.id] = 0; });
            (GAME_DATA.ACTIONS.divination || []).forEach(a => { this.workers.divination.assigned[a.id] = 0; this.workers.divination.progress[a.id] = 0; });

            // Hunter missions subsystem
            this.hunter = { roster: [], missions: [], nextHunterId: 1 };

            // Merchant state (future expansions like dynamic prices)
            this.merchant = { selectedStallId: 'weapons' };
        }
    }

    class GameManager {
        constructor() { this.state = new GameState(); this.uiManager = new UIManager(this); this.gameLoop = null; }
        init() { this.loadGame(); this.uiManager.init(); this.gameLoop = setInterval(() => this.update(), 100); setInterval(() => this.saveGame(), 10000); window.addEventListener('beforeunload', () => this.saveGame()); }

        hasBuff(effectKey) { const exp = this.state.player.activeBuffs[effectKey]; return exp && Date.now() < exp; }

        goldMultiplier() { let mult = 1; if (this.hasBuff('doubleGold')) mult *= 2; const gh = GAME_DATA.SPELLS.find(s => s.effect === 'goldBoost'); if (this.hasBuff('goldBoost')) mult *= (1 + (gh?.magnitude || 0)); const artistry = 1 + (this.state.player.meta_skills[META_SKILLS.ARTISTRY].level - 1) * 0.02; return mult * artistry; }

        update() {
            const now = Date.now(); const delta = (now - this.state.lastUpdate); this.state.lastUpdate = now;

            // Stamina regen
            const resilienceBonus = 1 + (this.state.player.meta_skills[META_SKILLS.RESILIENCE].level - 1) * 0.05;
            const regenPerSecond = (10 / 60) * resilienceBonus;
            this.state.player.stamina = Math.min(this.state.player.staminaMax, this.state.player.stamina + (regenPerSecond * (delta / 1000)));

            // Bonfire expiry
            if (this.state.bonfire.active && now > this.state.bonfire.expiry) { this.state.bonfire.active = false; this.state.bonfire.xpBoost = 0; this.uiManager.renderView(); }

            // Gathering/Artisan action loop
            if (this.state.activeAction) {
                const action = this.state.activeAction; action.progress += delta; const actionTime = this.calculateActionTime(action);
                if (action.progress >= actionTime) { const loops = Math.floor(action.progress / actionTime); this.gainActionRewards(action, loops); action.progress %= actionTime; }
                if (action.endTime && now >= action.endTime) { this.stopAction(); }
            }

            // Worker processing (all gathering skills)
            this.processWorkers(delta);

            // Combat loop
            if (this.state.combat.inCombat && this.state.combat.enemy) {
                // Army upkeep and contributions
                const armyDeltaSec = (now - this.state.army.lastTick) / 1000;
                if (armyDeltaSec > 0.1) {
                    this.state.army.lastTick = now;
                    const upkeep = this.consumeArmyUpkeep(armyDeltaSec);
                    const base = this.calculateArmyOutputPerSecond();
                    const hungryPenalty = upkeep.hungry ? 0.5 : 1.0;
                    const rallyMult = this.hasBuff('armyRally') ? 2 : 1;
                    const dps = base.dps * hungryPenalty * rallyMult;
                    const hps = base.hps * hungryPenalty * rallyMult;
                    this.state.army.production = { dps, hps, hungry: upkeep.hungry };
                    // Apply damage to enemy and heals to player
                    const dmg = dps * armyDeltaSec;
                    const heal = hps * armyDeltaSec;
                    if (dmg > 0) {
                        this.state.combat.enemy.hp = Math.max(0, this.state.combat.enemy.hp - dmg);
                        this.state.army.fly.accumDmg += dmg;
                        if (this.state.combat.enemy.hp <= 0) { this.handleEnemyDefeat(this.state.combat.enemy); }
                    }
                    if (heal > 0 && this.state.player.hp > 0) {
                        this.state.player.hp = Math.min(this.state.player.hpMax, this.state.player.hp + heal);
                        this.state.army.fly.accumHeal += heal;
                    }
                    // Flush flytext every ~700ms
                    if (now - this.state.army.fly.lastFlush > 700) {
                        if (this.state.army.fly.accumDmg > 0.9) { this.uiManager.showFloatingText(`-${Math.floor(this.state.army.fly.accumDmg)} Allies`, 'text-red-300'); this.state.army.fly.accumDmg = 0; }
                        if (this.state.army.fly.accumHeal > 0.9) { this.uiManager.showFloatingText(`+${Math.floor(this.state.army.fly.accumHeal)} HP`, 'text-green-300'); this.state.army.fly.accumHeal = 0; }
                        this.state.army.fly.lastFlush = now;
                    }
                }
                const e = this.state.combat.enemy;
                // Player attack
                if (now - this.state.combat.lastPlayerAttack >= this.state.combat.playerAttackSpeedMs) {
                    this.state.combat.lastPlayerAttack = now; const dmg = this.calculatePlayerDamage(e);
                    e.hp = Math.max(0, e.hp - dmg); this.uiManager.showFloatingText(`-${dmg} ${e.name}`, 'text-red-400');
                    if (e.hp <= 0) { this.handleEnemyDefeat(e); }
                }
                // Enemy attack
                if (now - this.state.combat.lastEnemyAttack >= e.attackSpeedMs) {
                    this.state.combat.lastEnemyAttack = now; const enemyDmg = Math.max(0, Math.floor(e.attack - (this.state.player.meta_skills[META_SKILLS.RESILIENCE].level - 1) * 0.5));
                    this.state.player.hp = Math.max(0, this.state.player.hp - enemyDmg); this.uiManager.showFloatingText(`-${enemyDmg} HP`, 'text-yellow-400');
                    if (this.state.player.hp <= 0) { this.endCombat(false); }
                }
            }

            // Clicker auto
            if (now - this.state.clicker.lastAutoTick >= this.state.clicker.autoRateMs) {
                this.state.clicker.lastAutoTick = now;
                const gps = this.state.clicker.autoClickers * this.state.clicker.goldPerClick;
                if (gps > 0) this.addGold(gps);
            }

            // Empire production
            const empireDeltaSec = (now - this.state.empire.lastTick) / 1000;
            if (empireDeltaSec > 0.1) {
                this.state.empire.lastTick = now;
                const totals = this.calculateEmpireProductionPerSecond();
                // Fractional buffers for smooth accrual
                this.state.empire.buffers.gold += totals.goldPerSec * empireDeltaSec;
                const goldWhole = Math.floor(this.state.empire.buffers.gold);
                if (goldWhole > 0) { this.addGold(goldWhole); this.state.empire.buffers.gold -= goldWhole; }
                this.state.empire.buffers.runes += (totals.runesPerSec || 0) * empireDeltaSec;
                const runeWhole = Math.floor(this.state.empire.buffers.runes);
                if (runeWhole > 0) { this.state.player.runes += runeWhole; this.state.empire.buffers.runes -= runeWhole; }
                this.state.empire.buffers.essence += (totals.essencePerSec || 0) * empireDeltaSec;
                const essWhole = Math.floor(this.state.empire.buffers.essence);
                if (essWhole > 0) { this.addToBank('rune_essence', essWhole); this.state.empire.buffers.essence -= essWhole; }
                this.state.empire.production = totals;
            }

            // Hunter mission loop
            this.processHunterMissions(delta);

            this.uiManager.updateDynamicElements();
        }

        calculateActionTime(action) {
            let time = action.baseTime;
            const stewardshipBonus = 1 - (this.state.player.meta_skills[META_SKILLS.STEWARDSHIP].level - 1) * 0.01; time *= stewardshipBonus;
            const mastery = this.getMastery(action.skillId, action.id); const masteryBonus = 1 - (mastery.level * 0.002); time *= masteryBonus;
            return time;
        }
        
        // Worker helpers
        getWorkerSpeedMultiplier(skillId, action) {
            const ws = this.state.workers?.[skillId]; if (!ws) return 1;
            const speedLevel = ws.upgrades.speedLevel || 0;
            // 8% faster per level multiplicative
            return Math.pow(0.92, speedLevel);
        }
        getWorkerYieldMultiplier(skillId, action) {
            const ws = this.state.workers?.[skillId]; if (!ws) return 1;
            const yieldLevel = ws.upgrades.yieldLevel || 0;
            // 10% more per level
            return 1 + (0.10 * yieldLevel);
        }
        
        processWorkers(deltaMs) {
            const workerSkills = Object.keys(this.state.workers || {});
            for (const skillId of workerSkills) {
                const ws = this.state.workers[skillId];
                const actions = GAME_DATA.ACTIONS[skillId] || [];
                for (const action of actions) {
                    const assigned = ws.assigned[action.id] || 0; if (assigned <= 0) continue;
                    const perCycleTime = this.calculateActionTime({ ...action, skillId }) * this.getWorkerSpeedMultiplier(skillId, action);
                    ws.progress[action.id] += deltaMs * assigned;
                    const cycles = Math.floor(ws.progress[action.id] / perCycleTime);
                    if (cycles > 0) {
                        ws.progress[action.id] %= perCycleTime;
                        const totalQty = (action.output?.quantity || 0) * cycles * this.getWorkerYieldMultiplier(skillId, action);
                        if (action.output?.itemId && totalQty > 0) {
                            this.addToBank(action.output.itemId, Math.floor(totalQty));
                            // Worker XP to player skill, reduced rate (50%)
                            const xpGain = (action.xp || 0) * cycles * 0.5;
                            this.state.player.skills[skillId].addXP(xpGain, this);
                        }
                        // Rare drops (each cycle independently, reduced chance)
                        if (action.rareDrop) {
                            const chance = action.rareDrop.chance || 0; // as percent
                            for (let i = 0; i < cycles; i++) {
                                if (Math.random() * 100 < chance * 0.5) { this.addToBank(action.rareDrop.itemId, 1); }
                            }
                        }
                    }
                }
            }
        }

        // Hunter Missions Processing
        processHunterMissions(deltaMs) {
            if (!this.state.hunter) return;
            let changed = false;
            for (const mission of this.state.hunter.missions) {
                if (mission.status !== 'active') continue;
                mission.remainingMs = Math.max(0, (mission.remainingMs || mission.durationMs) - deltaMs);
                if (mission.remainingMs <= 0) {
                    mission.status = 'complete';
                    changed = true;
                    this.resolveHunterMission(mission);
                }
            }
            if (changed) this.uiManager.renderView();
        }
        resolveHunterMission(mission) {
            // Compute success chance
            const metaBonus = 0.01 * (this.state.player.meta_skills[META_SKILLS.STEWARDSHIP].level - 1);
            const team = mission.hunters.map(id => this.state.hunter.roster.find(h => h.instanceId === id)).filter(Boolean);
            const teamSuccess = team.reduce((acc, h) => acc + (GAME_DATA.HUNTERS[h.classId]?.successBonus || 0), 0);
            const base = mission.baseSuccess || 0.5;
            const chance = Math.max(0.05, Math.min(0.95, base + teamSuccess + metaBonus));
            const success = Math.random() < chance;

            if (success) {
                const rewards = [];
                (mission.rewards || []).forEach(r => {
                    if (Math.random() <= (r.chance || 1)) {
                        if (r.type === 'gold') {
                            const amt = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
                            this.addGold(amt);
                            rewards.push(`+${amt} Gold`);
                        } else if (r.type === 'item') {
                            const qty = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
                            this.addToBank(r.id, qty);
                            rewards.push(`+${qty} ${GAME_DATA.ITEMS[r.id]?.name || r.id}`);
                        }
                    }
                });
                this.uiManager.showFloatingText('Hunt Successful!', 'text-green-300');
                this.uiManager.showModal('Mission Complete', `<p class="text-sm mb-2">${mission.name} succeeded.</p><div class="space-y-1">${rewards.map(r=>`<p>${r}</p>`).join('')}</div>`);
            } else {
                this.uiManager.showFloatingText('Hunt Failed', 'text-red-300');
                if (Math.random() < 0.25) { this.addToBank('beast_bone', 1); }
            }
            mission.hunters.forEach(id => { const h = this.state.hunter.roster.find(x => x.instanceId === id); if (h) h.busy = false; });
        }
        hireSpecialHunter(classId) {
            const def = GAME_DATA.HUNTERS[classId]; if (!def) return;
            const ownedOfClass = (this.state.hunter?.roster || []).filter(h => h.classId === classId).length;
            const cost = Math.floor(def.baseCost * Math.pow(1.22, ownedOfClass));
            if (!this.spendGold(cost)) { this.uiManager.showModal('Insufficient Gold', `<p>You need ${cost} gold to hire a ${def.name}.</p>`); return; }
            const instanceId = `H${this.state.hunter.nextHunterId++}`;
            const hunter = { instanceId, classId, name: `${def.name} #${ownedOfClass+1}`, busy: false };
            this.state.hunter.roster.push(hunter);
            this.uiManager.playSound('hire');
            this.uiManager.showFloatingText(`+1 ${def.name}`, 'text-green-300');
            this.uiManager.renderView();
        }
        startHunterMission(missionId, hunterIds) {
            const def = (GAME_DATA.HUNTER_MISSIONS || []).find(m => m.id === missionId); if (!def) return;
            if (!this.state.hunter) this.state.hunter = { roster: [], missions: [], nextHunterId: 1 };
            const needed = def.huntersNeeded || 1;
            if (!hunterIds || hunterIds.length < needed) { this.uiManager.showModal('Invalid Team', `<p>Select ${needed} hunter${needed>1?'s':''} for this mission.</p>`); return; }
            const allAvailable = hunterIds.every(id => { const h = this.state.hunter.roster.find(x => x.instanceId === id); return h && !h.busy; });
            if (!allAvailable) { this.uiManager.showModal('Hunters Busy', '<p>One or more selected hunters are already on a mission.</p>'); return; }
            const team = hunterIds.map(id => this.state.hunter.roster.find(h => h.instanceId === id));
            team.forEach(h => h.busy = true);
            const speedMult = team.reduce((acc, h) => acc * (1 - (GAME_DATA.HUNTERS[h.classId]?.speedBonus || 0)), 1);
            const duration = Math.max(10*1000, Math.floor((def.durationMs || 600000) * speedMult));
            const mission = { ...def, startMs: Date.now(), durationMs: duration, remainingMs: duration, hunters: [...hunterIds], status: 'active' };
            this.state.hunter.missions.push(mission);
            this.uiManager.showFloatingText('Hunters Deployed!', 'text-yellow-300');
            this.uiManager.renderView();
        }

        getMastery(skillId, actionId) { if (!this.state.player.mastery[skillId][actionId]) { this.state.player.mastery[skillId][actionId] = new Mastery(); } return this.state.player.mastery[skillId][actionId]; }

        gainActionRewards(action, loops) {
            const skill = this.state.player.skills[action.skillId]; skill.addXP(action.xp * loops, this);
            const mastery = this.getMastery(action.skillId, action.id); mastery.addXP(action.baseTime / 1000 * loops);
            if (action.output && action.output.itemId) {
                this.addToBank(action.output.itemId, action.output.quantity * loops);
                this.uiManager.showFloatingText(`+${action.output.quantity * loops} ${GAME_DATA.ITEMS[action.output.itemId].name}`, 'text-white');
            }
            if (action.rareDrop) {
                for (let i = 0; i < loops; i++) {
                    if (Math.random() * 100 < action.rareDrop.chance) {
                        this.addToBank(action.rareDrop.itemId, 1);
                        this.uiManager.showFloatingText(`+1 ${GAME_DATA.ITEMS[action.rareDrop.itemId].name}!`, 'text-yellow-400');
                    }
                }
            }
        }

        startAction(skillId, actionId) {
            if (this.state.activeAction) return;
            let actionData;
            if (GAME_DATA.ACTIONS[skillId]) actionData = GAME_DATA.ACTIONS[skillId].find(a => a.id === actionId);
            if (GAME_DATA.RECIPES[skillId]) actionData = GAME_DATA.RECIPES[skillId].find(a => a.id === actionId);
            this.state.activeAction = { ...actionData, skillId: skillId, startTime: Date.now(), endTime: null, progress: 0 };
            this.uiManager.render();
        }
        stopAction() {
            if (!this.state.activeAction) return; const action = this.state.activeAction; const actionTime = this.calculateActionTime(action);
            const loops = Math.floor(action.progress / actionTime); if (loops > 0) { this.gainActionRewards(action, loops); }
            this.state.activeAction = null; this.uiManager.render();
        }

        craftItem(skillId, recipeId, quantity) {
            const recipe = GAME_DATA.RECIPES[skillId].find(r => r.id === recipeId); if (!recipe) return;
            const canCraft = recipe.input.every(inp => (this.state.bank[inp.itemId] || 0) >= inp.quantity * quantity); if (!canCraft) return;
            recipe.input.forEach(inp => this.removeFromBank(inp.itemId, inp.quantity * quantity));
            if (recipe.output && recipe.output.itemId) {
                let totalOut = recipe.output.quantity * quantity;
                if (skillId === 'runecrafting') {
                    const lvl = this.state.player.skills[skillId].level;
                    const mult = Math.max(1, 1 + Math.floor((lvl - recipe.level) / 11));
                    totalOut *= mult;
                }
                this.addToBank(recipe.output.itemId, totalOut);
                this.uiManager.showFloatingText(`Crafted ${totalOut} ${GAME_DATA.ITEMS[recipe.output.itemId].name}`, 'text-green-400');
            }
            const skill = this.state.player.skills[skillId]; skill.addXP(recipe.xp * quantity, this);
            // Mastery progress for artisan recipes
            const mastery = this.getMastery(skillId, recipe.id);
            mastery.addXP((recipe.baseTime || 1000) / 1000 * quantity);
            if (skillId === 'firemaking') { this.state.bonfire.active = true; this.state.bonfire.expiry = Date.now() + 2 * 60 * 60 * 1000; this.state.bonfire.xpBoost = 0.05; }
            this.uiManager.renderView();
        }

        // Economy helpers
        addGold(amount) { const final = Math.floor(amount * this.goldMultiplier()); this.state.player.gold += final; if (final > 0) this.uiManager.notifyResource('gold', final); }
        spendGold(amount) { if (this.state.player.gold < amount) return false; this.state.player.gold -= amount; return true; }

        addToBank(itemId, quantity) { this.state.bank[itemId] = (this.state.bank[itemId] || 0) + quantity; if (quantity > 0) this.uiManager.notifyItem(itemId, quantity); }
        removeFromBank(itemId, quantity) { this.state.bank[itemId] -= quantity; if (this.state.bank[itemId] <= 0) { delete this.state.bank[itemId]; } }

        // Worker economy
        getHireCost(skillId) {
            const ws = this.state.workers?.[skillId]; const owned = ws?.total || 0;
            const base = 100; const growth = 1.18;
            return Math.floor(base * Math.pow(growth, owned));
        }
        getUpgradeCost(skillId, type) {
            const ws = this.state.workers?.[skillId]; const lvl = (ws?.upgrades?.[`${type}Level`]) || 0;
            const baseMap = { speed: 150, yield: 160, depth: 220, cart: 240, irrigation: 200, tools: 180, compost: 160, tractor: 500 };
            const growth = 1.32; const base = baseMap[type] || 200;
            return Math.floor(base * Math.pow(growth, lvl));
        }
        hireWorker(skillId) {
            this.ensureWorkerState();
            const cost = this.getHireCost(skillId);
            if (!this.spendGold(cost)) { this.uiManager.showModal('Insufficient Gold', `<p>You need ${cost} gold to hire a worker.</p>`); return; }
            this.state.workers[skillId].total = (this.state.workers[skillId].total || 0) + 1;
            this.uiManager.playSound('hire');
            this.uiManager.showFloatingText(`+1 ${GAME_DATA.SKILLS[skillId]?.name || 'Worker'}`, 'text-green-300');
            this.uiManager.renderView();
        }
        upgradeWorkers(skillId, type) {
            this.ensureWorkerState();
            const cost = this.getUpgradeCost(skillId, type);
            if (!this.spendGold(cost)) { this.uiManager.showModal('Insufficient Gold', `<p>You need ${cost} gold to upgrade.</p>`); return; }
            const key = `${type}Level`;
            const ws = this.state.workers[skillId]; if (typeof ws.upgrades[key] !== 'number') ws.upgrades[key] = 0;
            ws.upgrades[key] += 1;
            this.uiManager.playSound('upgrade');
            this.uiManager.renderView();
        }

        // Empire helpers (clicker)
        getEmpireUnitCost(id) {
            const def = GAME_DATA.UNITS[id]; const owned = this.state.empire.units[id] || 0;
            return Math.floor(def.baseCost * Math.pow(def.costGrowth, owned));
        }
        hireEmpireUnit(id) {
            const cost = this.getEmpireUnitCost(id);
            if (!this.spendGold(cost)) { this.uiManager.showModal('Insufficient Gold', `<p>You need ${cost} gold to hire a ${GAME_DATA.UNITS[id].name}.</p>`); return; }
            this.state.empire.units[id] = (this.state.empire.units[id] || 0) + 1;
            this.uiManager.playSound('hire');
            this.uiManager.renderView();
        }
        calculateEmpireProductionPerSecond() {
            const units = this.state.empire.units || {};
            let goldPerSec = 0, runesPerSec = 0, essencePerSec = 0;
            Object.keys(GAME_DATA.UNITS).forEach(id => {
                const def = GAME_DATA.UNITS[id]; const count = units[id] || 0; if (count <= 0) return;
                if (def.goldPerSec) goldPerSec += def.goldPerSec * count;
                if (def.runesPerSec) runesPerSec += def.runesPerSec * count;
                if (def.essencePerSec) essencePerSec += def.essencePerSec * count;
            });
            return { goldPerSec, runesPerSec, essencePerSec };
        }

        // Worker systems
        ensureWorkerState() {
            if (!this.state.workers) {
                this.state.workers = {
                    woodcutting: { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0 }, assigned: {}, progress: {} },
                    mining: { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0, depthLevel: 0, cartLevel: 0 }, assigned: {}, progress: {} },
                    fishing: { total: 0, boats: 0, upgrades: { netLevel: 0, baitLevel: 0, boatLevel: 0 }, assigned: {}, progress: {} },
                    farming: { total: 0, upgrades: { irrigationLevel: 0, toolsLevel: 0, compostLevel: 0, tractorLevel: 0 }, assigned: {}, progress: {} },
                    hunter: { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0 }, assigned: {}, progress: {} },
                    archaeology: { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0 }, assigned: {}, progress: {} },
                    divination: { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0 }, assigned: {}, progress: {} },
                };
            }
            if (!this.state.workers.woodcutting) this.state.workers.woodcutting = { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0 }, assigned: {}, progress: {} };
            if (!this.state.workers.mining) this.state.workers.mining = { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0, depthLevel: 0, cartLevel: 0 }, assigned: {}, progress: {} };
            if (!this.state.workers.fishing) this.state.workers.fishing = { total: 0, boats: 0, upgrades: { netLevel: 0, baitLevel: 0, boatLevel: 0 }, assigned: {}, progress: {} };
            if (!this.state.workers.farming) this.state.workers.farming = { total: 0, upgrades: { irrigationLevel: 0, toolsLevel: 0, compostLevel: 0, tractorLevel: 0 }, assigned: {}, progress: {} };
            if (!this.state.workers.hunter) this.state.workers.hunter = { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0 }, assigned: {}, progress: {} };
            if (!this.state.workers.archaeology) this.state.workers.archaeology = { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0 }, assigned: {}, progress: {} };
            if (!this.state.workers.divination) this.state.workers.divination = { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0 }, assigned: {}, progress: {} };
            (GAME_DATA.ACTIONS.mining || []).forEach(a => {
                if (typeof this.state.workers.mining.assigned[a.id] !== 'number') this.state.workers.mining.assigned[a.id] = 0;
                if (typeof this.state.workers.mining.progress[a.id] !== 'number') this.state.workers.mining.progress[a.id] = 0;
            });
            (GAME_DATA.ACTIONS.fishing || []).forEach(a => {
                if (typeof this.state.workers.fishing.assigned[a.id] !== 'number') this.state.workers.fishing.assigned[a.id] = 0;
                if (typeof this.state.workers.fishing.progress[a.id] !== 'number') this.state.workers.fishing.progress[a.id] = 0;
            });
            (GAME_DATA.ACTIONS.farming || []).forEach(a => {
                if (typeof this.state.workers.farming.assigned[a.id] !== 'number') this.state.workers.farming.assigned[a.id] = 0;
                if (typeof this.state.workers.farming.progress[a.id] !== 'number') this.state.workers.farming.progress[a.id] = 0;
            });
            (GAME_DATA.ACTIONS.hunter || []).forEach(a => {
                if (typeof this.state.workers.hunter.assigned[a.id] !== 'number') this.state.workers.hunter.assigned[a.id] = 0;
                if (typeof this.state.workers.hunter.progress[a.id] !== 'number') this.state.workers.hunter.progress[a.id] = 0;
            });
            (GAME_DATA.ACTIONS.archaeology || []).forEach(a => {
                if (typeof this.state.workers.archaeology.assigned[a.id] !== 'number') this.state.workers.archaeology.assigned[a.id] = 0;
                if (typeof this.state.workers.archaeology.progress[a.id] !== 'number') this.state.workers.archaeology.progress[a.id] = 0;
            });
            (GAME_DATA.ACTIONS.divination || []).forEach(a => {
                if (typeof this.state.workers.divination.assigned[a.id] !== 'number') this.state.workers.divination.assigned[a.id] = 0;
                if (typeof this.state.workers.divination.progress[a.id] !== 'number') this.state.workers.divination.progress[a.id] = 0;
            });
        }

        activateAllWorkers() {
            this.ensureWorkerState();
            const gatheringSkillIds = Object.keys(GAME_DATA.SKILLS).filter(id => GAME_DATA.SKILLS[id].type === 'gathering');
            let newlyAssigned = 0;
            for (const skillId of gatheringSkillIds) {
                const ws = this.state.workers[skillId];
                const actions = (GAME_DATA.ACTIONS[skillId] || []).filter(a => a && a.id);
                if (!ws || !actions.length) continue;
                const sumAssigned = Object.values(ws.assigned || {}).reduce((a, b) => a + (b || 0), 0);
                const free = Math.max(0, (ws.total || 0) - sumAssigned);
                for (let i = 0; i < free; i++) {
                    const pick = actions[Math.floor(Math.random() * actions.length)];
                    ws.assigned[pick.id] = (ws.assigned[pick.id] || 0) + 1;
                    if (typeof ws.progress[pick.id] !== 'number') ws.progress[pick.id] = 0;
                    newlyAssigned++;
                }
            }
            if (newlyAssigned > 0) {
                this.uiManager.playSound('upgrade');
                this.uiManager.showFloatingText(`All systems go! +${newlyAssigned} deployed`, 'text-yellow-300');
                this.uiManager.renderView();
            } else {
                this.uiManager.showFloatingText('All workers already deployed', 'text-secondary');
            }
        }

        // Rune helpers
        getRuneItemIds() { return Object.keys(GAME_DATA.ITEMS).filter(id => id.endsWith('_rune')); }
        getTotalRuneItemCount() { return this.getRuneItemIds().reduce((sum, id) => sum + (this.state.bank[id] || 0), 0); }
        consumeRuneItems(amount) {
            let remaining = amount;
            const ids = this.getRuneItemIds();
            for (const id of ids) {
                const have = this.state.bank[id] || 0; if (have <= 0) continue;
                const take = Math.min(have, remaining);
                this.removeFromBank(id, take);
                remaining -= take;
                if (remaining <= 0) break;
            }
        }

        // Real-life task completion -> stamina + meta XP
        completeRealLifeTask(metaSkillCategory, difficulty) {
            const difficultyMultipliers = { small: 1, medium: 1.5, large: 2.5 }; const multiplier = difficultyMultipliers[difficulty];
            const staminaGained = Math.floor(10 * multiplier); this.state.player.stamina = Math.min(this.state.player.staminaMax, this.state.player.stamina + staminaGained); this.uiManager.showFloatingText(`+${staminaGained} Stamina`, 'text-green-400'); this.uiManager.notifyResource('stamina', staminaGained);
            const xpGained = Math.floor(20 * multiplier); const metaSkill = this.state.player.meta_skills[metaSkillCategory]; if (metaSkill) { metaSkill.addXP(xpGained, this); }
            this.uiManager.render();
        }

        // Spells
        castSpell(spellId) {
            const spell = GAME_DATA.SPELLS.find(s => s.id === spellId); if (!spell) return;
            const availableRunes = this.state.player.runes + this.getTotalRuneItemCount();
            if (availableRunes < spell.runeCost) { this.uiManager.showModal('Not Enough Runes', '<p>You lack the runes to cast this spell.</p>'); return; }
            // Spend generic runes first, then consume crafted rune items from bank
            const spendFromGeneric = Math.min(this.state.player.runes, spell.runeCost);
            this.state.player.runes -= spendFromGeneric;
            const remaining = spell.runeCost - spendFromGeneric;
            if (remaining > 0) this.consumeRuneItems(remaining);
            this.state.player.activeBuffs[spell.effect] = Date.now() + spell.durationMs;
            this.uiManager.showFloatingText(`${spell.name} activated!`, 'text-purple-300');
            this.uiManager.renderView();
        }

        // Chests
        buyChest(chestId) {
            const chest = GAME_DATA.CHESTS.find(c => c.id === chestId); if (!chest) return;
            if (chest.keyItemID && !(this.state.bank[chest.keyItemID] > 0)) { this.uiManager.showModal('Locked Chest', '<p>You need a special key to open this chest.</p>'); return; }
            const price = chest.cost; if (price > 0 && !this.spendGold(price)) { this.uiManager.showModal('Not Enough Gold', '<p>You cannot afford this chest.</p>'); return; }
            if (chest.keyItemID) this.removeFromBank(chest.keyItemID, 1);
            const [minR, maxR] = chest.rewardCount; const rolls = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
            const rewards = [];
            for (let i = 0; i < rolls; i++) {
                const pick = chest.lootTable[Math.floor(Math.random() * chest.lootTable.length)];
                if (pick.type === 'currency') { const amt = pick.amount; this.addGold(amt); rewards.push(`+${amt} Gold`); }
                if (pick.type === 'item') { const q = Array.isArray(pick.qty) ? (Math.floor(Math.random() * (pick.qty[1] - pick.qty[0] + 1)) + pick.qty[0]) : (pick.qty || 1); this.addToBank(pick.id, q); rewards.push(`+${q} ${GAME_DATA.ITEMS[pick.id]?.name || pick.id}`); }
                if (pick.type === 'runes') { const amt = pick.amount; this.state.player.runes += amt; this.uiManager.notifyResource('runes', amt); rewards.push(`+${amt} Runes`); }
            }
            this.uiManager.showModal('Chest Opened!', `<div class="space-y-1">${rewards.map(r => `<p>${r}</p>`).join('')}</div>`);
            this.uiManager.renderView();
        }

        // Combat
        startCombat(enemyId) {
            if (this.state.combat.inCombat) return; const e = JSON.parse(JSON.stringify(GAME_DATA.COMBAT.ENEMIES.find(x => x.id === enemyId))); if (!e) return;
            this.state.combat.inCombat = true; this.state.combat.enemy = e; this.state.player.hp = Math.min(this.state.player.hp, this.state.player.hpMax);
            this.state.combat.lastPlayerAttack = 0; this.state.combat.lastEnemyAttack = 0; this.uiManager.renderView();
        }
        endCombat(victory) {
            if (!this.state.combat.inCombat) return; if (!victory) { this.uiManager.showModal('Defeated', '<p>You were defeated. Rest to recover HP.</p>'); }
            this.state.combat.inCombat = false; this.state.combat.enemy = null; this.uiManager.renderView();
        }
        handleEnemyDefeat(enemy) {
            // Gold
            const g = Math.floor(Math.random() * (enemy.gold[1] - enemy.gold[0] + 1)) + enemy.gold[0]; this.addGold(g);
            // Drops
            (enemy.drops || []).forEach(drop => { if (Math.random() * 100 < drop.chance) { const q = Math.floor(Math.random() * (drop.qty[1] - drop.qty[0] + 1)) + drop.qty[0]; this.addToBank(drop.id, q); } });
            // XP to Strength
            this.state.player.meta_skills[META_SKILLS.STRENGTH].addXP(15 + enemy.level * 2, this);
            this.uiManager.showFloatingText(`${enemy.name} defeated!`, 'text-green-400');
            this.endCombat(true);
        }
        calculatePlayerDamage(enemy) {
            let base = 5; if (this.state.player.weapon && GAME_DATA.ITEMS[this.state.player.weapon]?.damage) base += GAME_DATA.ITEMS[this.state.player.weapon].damage;
            const strBonus = 1 + (this.state.player.meta_skills[META_SKILLS.STRENGTH].level - 1) * 0.03; const dmg = Math.max(1, Math.floor((base * strBonus) - enemy.defense * 0.5));
            return dmg;
        }
        eatFood(itemId) { const item = GAME_DATA.ITEMS[itemId]; if (!item || !item.heals) return; if ((this.state.bank[itemId] || 0) <= 0) return; this.removeFromBank(itemId, 1); this.state.player.hp = Math.min(this.state.player.hpMax, this.state.player.hp + item.heals); this.uiManager.showFloatingText(`+${item.heals} HP`, 'text-green-300'); this.uiManager.renderView(); }
        equipWeapon(itemId) { if (!GAME_DATA.ITEMS[itemId]) return; if ((this.state.bank[itemId] || 0) <= 0) return; this.state.player.weapon = itemId; this.uiManager.renderView(); }

        saveGame() { try { localStorage.setItem('chimeraSaveData_web_v1', JSON.stringify(this.state)); } catch (e) { console.error('Failed to save game:', e); } }
        loadGame() {
            const savedData = localStorage.getItem('chimeraSaveData_web_v1');
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    Object.assign(this.state, parsedData);
                    // Ensure hunter state exists
                    if (!this.state.hunter) this.state.hunter = { roster: [], missions: [], nextHunterId: 1 };
                    if (!Array.isArray(this.state.hunter.roster)) this.state.hunter.roster = [];
                    if (!Array.isArray(this.state.hunter.missions)) this.state.hunter.missions = [];
                    if (typeof this.state.hunter.nextHunterId !== 'number') this.state.hunter.nextHunterId = 1;
                    // Rehydrate skill objects
                    Object.keys(GAME_DATA.SKILLS).forEach(id => { const skill = new Skill(id, GAME_DATA.SKILLS[id].name); if (parsedData.player.skills?.[id]) Object.assign(skill, parsedData.player.skills[id]); this.state.player.skills[id] = skill; });
                    Object.values(META_SKILLS).forEach(name => { const skill = new Skill(name, name); if (parsedData.player.meta_skills?.[name]) Object.assign(skill, parsedData.player.meta_skills[name]); this.state.player.meta_skills[name] = skill; });
                    // Rehydrate mastery
                    Object.keys(parsedData.player.mastery || {}).forEach(skillId => {
                        if (!this.state.player.mastery[skillId]) this.state.player.mastery[skillId] = {};
                        Object.keys(parsedData.player.mastery[skillId]).forEach(actionId => { const mastery = new Mastery(); Object.assign(mastery, parsedData.player.mastery[skillId][actionId]); this.state.player.mastery[skillId][actionId] = mastery; });
                    });
                    this.state.lastUpdate = Date.now();
                    // Backfill worker system defaults if missing
                    if (!this.state.workers) {
                        this.state.workers = {};
                    }
                    Object.keys(GAME_DATA.SKILLS)
                        .filter(id => GAME_DATA.SKILLS[id].type === 'gathering')
                        .forEach(skillId => {
                            if (!this.state.workers[skillId]) { this.state.workers[skillId] = { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0 }, assigned: {}, progress: {} }; }
                            (GAME_DATA.ACTIONS[skillId] || []).forEach(a => {
                                if (typeof this.state.workers[skillId].assigned[a.id] !== 'number') this.state.workers[skillId].assigned[a.id] = 0;
                                if (typeof this.state.workers[skillId].progress[a.id] !== 'number') this.state.workers[skillId].progress[a.id] = 0;
                            });
                        });
                    // Backfill empire system defaults if missing
                    if (!this.state.empire) { this.state.empire = { units: {}, lastTick: Date.now(), production: { goldPerSec: 0, runesPerSec: 0, essencePerSec: 0 }, buffers: { gold: 0, runes: 0, essence: 0 } }; }
                    if (!this.state.empire.units) this.state.empire.units = {};
                    Object.keys(GAME_DATA.UNITS).forEach(id => { if (typeof this.state.empire.units[id] !== 'number') this.state.empire.units[id] = 0; });
                    // Backfill army system defaults if missing
                    if (!this.state.army) { this.state.army = { units: {}, lastTick: Date.now(), production: { dps: 0, hps: 0, hungry: false }, upkeep: { foodBuffer: 0, hungry: false }, fly: { accumDmg: 0, accumHeal: 0, lastFlush: Date.now() }, upgrades: { offenseLevel: 0, supportLevel: 0, logisticsLevel: 0 }, stance: 'balanced' }; }
                    if (!this.state.army.units) this.state.army.units = {};
                    Object.keys(GAME_DATA.ARMY_CLASSES).forEach(id => { if (typeof this.state.army.units[id] !== 'number') this.state.army.units[id] = 0; });
                 } catch (e) { console.error('Failed to load game, starting new.', e); this.state = new GameState(); }
             }
         }

        // Army helpers
        getArmyUnitCost(id) { const data = GAME_DATA.ARMY_CLASSES[id]; const owned = this.state.army.units[id] || 0; return Math.floor(data.baseCost * Math.pow(data.costGrowth, owned)); }
        hireArmyUnit(id) { const cost = this.getArmyUnitCost(id); if (!this.spendGold(cost)) { this.uiManager.showModal('Insufficient Gold', `<p>You need ${cost} gold to hire a ${GAME_DATA.ARMY_CLASSES[id].name}.</p>`); return; } this.state.army.units[id] = (this.state.army.units[id] || 0) + 1; this.uiManager.showFloatingText(`+1 ${GAME_DATA.ARMY_CLASSES[id].name}`, 'text-green-300'); this.uiManager.renderView(); }
        calculateArmyOutputPerSecond() {
            const units = this.state.army.units || {};
            let dps = 0, hps = 0, foodPerMin = 0;
            for (const id of Object.keys(GAME_DATA.ARMY_CLASSES)) {
                const def = GAME_DATA.ARMY_CLASSES[id];
                const count = units[id] || 0;
                if (count <= 0) continue;
                dps += (def.dps || 0) * count;
                hps += (def.hps || 0) * count;
                foodPerMin += (def.foodPerMin || 0) * count;
            }
            // Apply upgrades and stance
            const up = this.state.army.upgrades || {};
            dps *= (1 + 0.08 * (up.offenseLevel || 0));
            hps *= (1 + 0.08 * (up.supportLevel || 0));
            foodPerMin *= Math.pow(0.94, (up.logisticsLevel || 0));
            const stance = this.state.army.stance || 'balanced';
            if (stance === 'aggressive') { dps *= 1.25; hps *= 0.8; }
            if (stance === 'defensive') { dps *= 0.8; hps *= 1.25; }
            return { dps, hps, foodPerMin };
        }
        consumeArmyUpkeep(deltaSec) {
            // Use cooked foods first; each food heals value ~ treat 1 HP heal as 1 food unit
            const foodIds = Object.keys(this.state.bank).filter(id => GAME_DATA.ITEMS[id]?.heals).sort((a,b) => (GAME_DATA.ITEMS[a].heals||0)-(GAME_DATA.ITEMS[b].heals||0));
            const out = this.calculateArmyOutputPerSecond();
            const requiredFoodUnits = (out.foodPerMin / 60) * deltaSec; // food units per sec
            this.state.army.upkeep.foodBuffer += requiredFoodUnits;
            let needed = Math.floor(this.state.army.upkeep.foodBuffer);
            if (needed > 0) {
                for (const fid of foodIds) {
                    if (needed <= 0) break;
                    let have = this.state.bank[fid] || 0;
                    if (have <= 0) continue;
                    const take = Math.min(have, needed);
                    this.removeFromBank(fid, take);
                    needed -= take;
                }
                this.state.army.upkeep.foodBuffer -= Math.floor(this.state.army.upkeep.foodBuffer);
            }
            const hungry = needed > 0; // unmet demand
            this.state.army.upkeep.hungry = hungry;
            return { hungry, out };
        }
        rallyArmy(durationMs = 60000, runeCost = 2) {
            const availableRunes = this.state.player.runes + this.getTotalRuneItemCount();
            if (availableRunes < runeCost) { this.uiManager.showModal('Not Enough Runes', '<p>You lack the runes to rally your troops.</p>'); return; }
            const spendFromGeneric = Math.min(this.state.player.runes, runeCost);
            this.state.player.runes -= spendFromGeneric;
            const remaining = runeCost - spendFromGeneric;
            if (remaining > 0) this.consumeRuneItems(remaining);
            this.state.player.activeBuffs['armyRally'] = Date.now() + durationMs;
            this.uiManager.showFloatingText('Rallying Cry!', 'text-purple-300');
            this.uiManager.playSound('upgrade');
            this.uiManager.renderView();
        }
        getArmyUpgradeCost(type) {
            const lvl = (this.state.army?.upgrades?.[`${type}Level`]) || 0;
            const baseMap = { offense: 300, support: 300, logistics: 320 };
            const growth = 1.45; const base = baseMap[type] || 300;
            return Math.floor(base * Math.pow(growth, lvl));
        }
        upgradeArmy(type) {
            if (!this.state.army.upgrades) this.state.army.upgrades = { offenseLevel: 0, supportLevel: 0, logisticsLevel: 0 };
            const key = `${type}Level`;
            const cost = this.getArmyUpgradeCost(type);
            if (!this.spendGold(cost)) { this.uiManager.showModal('Insufficient Gold', `<p>You need ${cost} gold for this upgrade.</p>`); return; }
            if (typeof this.state.army.upgrades[key] !== 'number') this.state.army.upgrades[key] = 0;
            this.state.army.upgrades[key] += 1;
            this.uiManager.playSound('upgrade');
            this.uiManager.renderView();
        }
        setArmyStance(stance) {
            if (!['balanced','aggressive','defensive'].includes(stance)) return;
            this.state.army.stance = stance;
            this.uiManager.renderView();
        }

        // Merchant helpers
        getMerchant() { return GAME_DATA.MERCHANTS.bazaar; }
        getStallById(stallId) { const m = this.getMerchant(); return (m.stalls || []).find(s => s.id === stallId) || m.stalls?.[0]; }
        getItemPrice(itemId, type = 'buy') {
            const m = this.getMerchant();
            for (const s of (m.stalls || [])) {
                const e = (s.stock || []).find(x => x.itemId === itemId);
                if (e) return e[type];
            }
            return null;
        }
        buyItem(itemId, qty = 1) {
            const price = this.getItemPrice(itemId, 'buy');
            if (price == null) return false;
            const total = Math.max(0, Math.floor(price * qty));
            if (!this.spendGold(total)) { this.uiManager.showModal('Not Enough Gold', `<p>You need ${total} gold to buy this.</p>`); return false; }
            this.addToBank(itemId, qty);
            this.uiManager.showFloatingText(`+${qty} ${GAME_DATA.ITEMS[itemId]?.name || itemId}`, 'text-yellow-300');
            this.uiManager.playSound('upgrade');
            this.uiManager.renderView();
            return true;
        }
        sellItem(itemId, qty = 1) {
            const have = this.state.bank[itemId] || 0; if (have <= 0) return false;
            const sellable = Math.min(qty, have);
            const price = this.getItemPrice(itemId, 'sell'); if (price == null) return false;
            const total = Math.max(0, Math.floor(price * sellable));
            this.removeFromBank(itemId, sellable);
            this.addGold(total);
            this.uiManager.showFloatingText(`+${total}g`, 'text-yellow-300');
            this.uiManager.playSound('hire');
            this.uiManager.renderView();
            return true;
        }
    }

    class UIManager {
        constructor(game) {
            this.game = game; this.mainContent = document.getElementById('main-content'); this.modalBackdrop = document.getElementById('modal-backdrop'); this.modalContent = document.getElementById('modal-content'); this.floatingTextContainer = document.getElementById('floating-text-container'); this.currentView = 'dashboard';
        }
        init() {
            this.renderSidebar(); this.attachSidebarEventListeners(); this.render();
        }
        render() {
            this.renderView(); this.updateSidebarActive(); this.updateHeaderBars(); this.attachViewEventListeners(); this.updateMasteryBar(); if (this.currentView === 'combat') this.renderCombatFooter();
        }
        renderSidebar() {
            const createLink = (skillId, skill) => `<a href="#" class="sidebar-link flex items-center p-3" data-view="${skillId}"><i class="fas ${skill.icon} w-6 text-center"></i><div class="flex-grow"><span>${skill.name}</span><div class="w-full xp-bar-bg rounded-full h-1.5 mt-1"><div id="sidebar-xp-${skillId}" class="xp-bar-fill h-1.5 rounded-full"></div></div></div></a>`;
            const gatheringHtml = Object.keys(GAME_DATA.SKILLS).filter(id => GAME_DATA.SKILLS[id].type === 'gathering').map(id => createLink(id, GAME_DATA.SKILLS[id])).join(''); document.getElementById('gathering-skills-nav').innerHTML = gatheringHtml;
            const artisanHtml = Object.keys(GAME_DATA.SKILLS).filter(id => GAME_DATA.SKILLS[id].type === 'artisan').map(id => createLink(id, GAME_DATA.SKILLS[id])).join(''); document.getElementById('artisan-skills-nav').innerHTML = artisanHtml;
        }
        attachSidebarEventListeners() { document.querySelectorAll('.sidebar-link').forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); this.currentView = link.dataset.view; this.render(); }); }); }

        updateHeaderBars() {
            const goldDisplay = document.getElementById('gold-display'); if (goldDisplay) goldDisplay.textContent = Math.floor(this.game.state.player.gold).toLocaleString();
            const runesDisplay = document.getElementById('runes-display'); if (runesDisplay) runesDisplay.textContent = Math.floor(this.game.state.player.runes).toLocaleString();
            const staminaFill = document.getElementById('stamina-bar-fill'); const staminaValue = document.getElementById('stamina-value'); if (staminaFill && staminaValue) { const s = this.game.state.player; staminaFill.style.width = `${(s.stamina / s.staminaMax) * 100}%`; staminaValue.textContent = `${Math.floor(s.stamina)}/${s.staminaMax}`; }
        }
        updateSidebarActive() { document.querySelectorAll('.sidebar-link').forEach(link => { link.classList.toggle('active', link.dataset.view === this.currentView); }); }

        updateDynamicElements() {
            document.getElementById('gold-display').textContent = Math.floor(this.game.state.player.gold).toLocaleString();
            const gps = this.game.state.empire?.production?.goldPerSec || 0;
            const gpsEl = document.getElementById('gps-display'); if (gpsEl) gpsEl.textContent = `(+${gps.toFixed(1)}/s)`;
            const runesEl = document.getElementById('runes-display'); if (runesEl) { const totalRunes = (this.game.state.player.runes || 0) + this.game.getTotalRuneItemCount(); runesEl.textContent = totalRunes.toLocaleString(); }
            const stamina = this.game.state.player.stamina; const staminaMax = this.game.state.player.staminaMax;
            document.getElementById('stamina-value').textContent = `${Math.floor(stamina)}/${staminaMax}`; document.getElementById('stamina-bar-fill').style.width = `${(stamina / staminaMax) * 100}%`;
            // If in combat, show Ally badge refresh
            if (this.currentView === 'combat') this.renderCombatFooter();
            Object.keys(this.game.state.player.skills).forEach(id => { const skill = this.game.state.player.skills[id]; const xpBar = document.getElementById(`sidebar-xp-${id}`); if (xpBar) xpBar.style.width = `${(skill.currentXP / skill.xpToNextLevel) * 100}%`; });
            this.updateMasteryBar();
            // If in combat, update view footer elements
            if (this.currentView === 'combat') this.renderCombatFooter();
        }

        updateMasteryBar() {
            const container = document.getElementById('mastery-progress-bar'); const action = this.game.state.activeAction; const inCombat = this.game.state.combat.inCombat; if (!action && !inCombat) { container.innerHTML = ''; return; }
            if (inCombat) {
                const e = this.game.state.combat.enemy; if (!e) { container.innerHTML = ''; return; }
                const playerHpPct = (this.game.state.player.hp / this.game.state.player.hpMax) * 100;
                const enemyHpPct = (e.hp / e.maxHp) * 100;
                container.innerHTML = `<div class="block p-2 h-full grid grid-cols-2 gap-2 items-center">
                    <div class="flex items-center space-x-2"><i class="fas fa-user-shield text-xl"></i><div class="w-full xp-bar-bg rounded-full h-2.5"><div class="xp-bar-fill h-2.5 rounded-full" style="width:${playerHpPct}%"></div></div><span class="text-xs font-mono">${Math.max(0, Math.floor(this.game.state.player.hp))}/${this.game.state.player.hpMax}</span></div>
                    <div class="flex items-center space-x-2"><i class="fas fa-skull text-xl"></i><div class="w-full xp-bar-bg rounded-full h-2.5"><div class="mastery-bar-fill h-2.5 rounded-full" style="width:${enemyHpPct}%"></div></div><span class="text-xs font-mono">${Math.max(0, Math.floor(e.hp))}/${e.maxHp}</span></div>
                </div>`;
                return;
            }
            const actionTime = this.game.calculateActionTime(action); const percentComplete = Math.min(100, (action.progress / actionTime) * 100);
            const skillData = GAME_DATA.SKILLS[action.skillId]; const xpPerHour = (3600000 / actionTime) * action.xp;
            container.innerHTML = `<div class="block p-2 h-full flex items-center space-x-4"><i class="fas ${skillData.icon} text-xl"></i><div class="flex-grow"><div class="flex justify-between text-xs"><span>${action.name}</span><span class="font-mono">${xpPerHour.toFixed(0)} XP/hr</span></div><div class="w-full xp-bar-bg rounded-full h-2.5 mt-1"><div class="xp-bar-fill h-2.5 rounded-full" style="width: ${percentComplete}%"></div></div></div><button id="stop-action-btn" class="chimera-button rounded-full w-8 h-8 flex items-center justify-center"><i class="fas fa-stop"></i></button></div>`;
            const stop = document.getElementById('stop-action-btn'); if (stop) stop.onclick = () => this.game.stopAction();
        }

        renderView() {
            let html = '';
            if (GAME_DATA.SKILLS[this.currentView]) { html = this.renderSkillView(this.currentView); }
            else {
                switch (this.currentView) {
                    case 'dashboard': html = this.renderDashboardView(); break;
                    case 'bank': html = this.renderBankView(); break;
                    case 'meta_skills': html = this.renderMetaSkillsView(); break;
                    case 'combat': html = this.renderCombatView(); break;
                    case 'army': html = this.renderArmyView(); break;
                    case 'clicker': html = this.renderClickerView(); break;
                    case 'workforce': html = this.renderWorkforceView(); break;
                    case 'spellbook': html = this.renderSpellbookView(); break;
                    case 'shop': html = this.renderShopView(); break;
                    case 'merchant': html = this.renderMerchantView(); break;
                }
            }
            this.mainContent.innerHTML = html; this.attachViewEventListeners();
        }

        renderDashboardView() {
            const prod = this.game.state.empire.production || { goldPerSec: 0, runesPerSec: 0, essencePerSec: 0 };
            const units = this.game.state.empire.units || {};
            const unitList = Object.keys(GAME_DATA.UNITS).map(id => {
                const u = GAME_DATA.UNITS[id];
                const qty = units[id] || 0;
                return `<div class="flex items-center justify-between"><span>${u.emoji} ${u.name}</span><span class="font-mono text-white">${qty}</span></div>`;
            }).join('');
            const wc = this.game.state.workers.woodcutting;
            const wcAssigned = Object.values(wc.assigned || {}).reduce((a,b)=>a+b,0);
            return `
                <h1 class="text-2xl font-semibold text-white mb-4">Dashboard</h1>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div class="block p-4">
                        <h2 class="text-lg font-bold">Getting Started</h2>
                        <p class="text-secondary text-sm">Use Stamina to perform actions. Train Meta Skills to speed up and boost your economy.</p>
                        <ol class="text-secondary list-decimal list-inside space-y-1">
                            <li>Complete real-life tasks here to earn <strong>Stamina</strong>.</li>
                            <li>Use Gathering to gain resources; Artisan to craft gear and boosts.</li>
                            <li>Fight in <strong>Combat</strong> using your crafted gear and food.</li>
                            <li>Click in <strong>Clicker</strong> to generate Gold and unlock upgrades.</li>
                        </ol>
                    </div>
                </div>
            `;
        }

        renderSkillView(skillId) {
            const skillData = GAME_DATA.SKILLS[skillId]; const playerSkill = this.game.state.player.skills[skillId]; let contentHtml = ''; let actionType = '';
            if (skillId === 'hunter') {
                const lodge = this.renderHunterLodge();
                actionType = 'Start';
                contentHtml = lodge + (GAME_DATA.ACTIONS[skillId]||[]).map(action => this.renderActionCard(skillId, action, actionType)).join('');
            } else if (skillData.type === 'gathering') { actionType = 'Start'; contentHtml = (GAME_DATA.ACTIONS[skillId]||[]).map(action => this.renderActionCard(skillId, action, actionType)).join(''); }
            else if (skillData.type === 'artisan') {
                actionType = 'Craft'; if (skillId === 'firemaking') { contentHtml = this.renderFiremakingView(); }
                else if (skillId === 'runecrafting') { contentHtml = this.renderRunecraftingView(); }
                else { contentHtml = (GAME_DATA.RECIPES[skillId]||[]).map(recipe => this.renderActionCard(skillId, recipe, actionType)).join(''); }
            }
            const workerPanel = (skillData.type === 'gathering' && this.game.state.workers[skillId]) ? this.renderWorkerPanel(skillId) : '';
            return `<h1 class="text-2xl font-semibold text-white mb-4">${skillData.name} <span class="text-base text-secondary">(Level ${playerSkill.level})</span></h1>${workerPanel}<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">${contentHtml}</div>`;
        }

        renderActionCard(skillId, action, actionType) {
            const playerSkill = this.game.state.player.skills[skillId]; const hasLevel = playerSkill.level >= action.level; let canAfford = true;
            if (action.input) { canAfford = action.input.every(inp => (this.game.state.bank[inp.itemId] || 0) >= inp.quantity); }
            const mastery = this.game.getMastery(skillId, action.id);
            const actionDesc = action.output ? `${GAME_DATA.ITEMS[action.output.itemId]?.name || 'Product'} x${action.output.quantity}` : 'Special';
            return `
                <div class="block p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-bold">${action.name}</h3>
                            <p class="text-secondary text-sm">Lvl ${action.level} • ${actionDesc}</p>
                        </div>
                        <span class="badge"><i class="fas fa-star"></i> ${action.xp} XP</span>
                    </div>
                    <div class="mt-2">
                        <p class="text-xs text-secondary">Time: ${(this.game.calculateActionTime({ ...action, skillId }) / 1000).toFixed(1)}s</p>
                        <div class="w-full xp-bar-bg rounded-full h-2 my-1"><div class="mastery-bar-fill h-2 rounded-full" style="width:${(mastery.currentXP / mastery.xpToNextLevel) * 100}%"></div></div>
                        <p class="text-xs text-secondary text-right">${Math.floor(mastery.currentXP)} / ${mastery.xpToNextLevel} XP</p>
                    </div>
                    ${(GAME_DATA.SKILLS[skillId].type === 'gathering' && this.game.state.workers[skillId]) ? this.renderWorkerAssign(skillId, action) : ''}
                    ${actionType === 'Start' ? `<div class="mt-3 flex items-center gap-2"><label class="text-xs text-secondary">Duration</label><select class="action-duration-select chimera-button px-2 py-1 rounded" data-skill-id="${skillId}" data-action-id="${action.id}"><option value="5">5m</option><option value="15" selected>15m</option><option value="30">30m</option><option value="60">60m</option></select></div>` : ''}
                    <button class="${actionType.toLowerCase()}-action-btn chimera-button px-4 py-2 rounded-md mt-4" data-skill-id="${skillId}" data-action-id="${action.id}" ${!hasLevel || !canAfford || this.game.state.activeAction ? 'disabled' : ''}>${actionType}</button>
                </div>
            `;
        }

        renderMiningPanel() {
            const wm = this.game.state.workers.mining; const hireCost = this.game.getHireCost('mining');
            const speedCost = this.game.getUpgradeCost('mining', 'speed'); const yieldCost = this.game.getUpgradeCost('mining', 'yield');
            const depthCost = this.game.getUpgradeCost('mining', 'depth'); const cartCost = this.game.getUpgradeCost('mining', 'cart');
            return `
                <div class="block p-4 mb-4 border border-mining">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <h2 class="text-lg font-bold">Mine Overseer</h2>
                            <p class="text-secondary text-sm">Assign Miners to rock veins. Upgrade depth, carts and tools for efficiency.</p>
                            <p class="text-white text-sm mt-1">Miners: <span class="font-bold">${wm.total}</span></p>
                            <p class="text-secondary text-xs">Depth L${wm.upgrades.depthLevel} • Carts L${wm.upgrades.cartLevel}</p>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-2">
                            <button id="hire-miner" class="chimera-button px-3 py-2 rounded-md">Hire Miner — Cost: ${hireCost} gold</button>
                            <button id="upgrade-mining-speed" class="chimera-button px-3 py-2 rounded-md">Sharper Picks (Speed L${wm.upgrades.speedLevel}) — Cost: ${speedCost} gold</button>
                            <button id="upgrade-mining-yield" class="chimera-button px-3 py-2 rounded-md">Ore Sacks (Yield L${wm.upgrades.yieldLevel}) — Cost: ${yieldCost} gold</button>
                            <button id="upgrade-mining-depth" class="chimera-button px-3 py-2 rounded-md">Deeper Shafts (L${wm.upgrades.depthLevel}) — Cost: ${depthCost} gold</button>
                            <button id="upgrade-mining-cart" class="chimera-button px-3 py-2 rounded-md">Mine Carts (L${wm.upgrades.cartLevel}) — Cost: ${cartCost} gold</button>
                        </div>
                    </div>
                </div>
            `;
        }

        renderFarmingPanel() {
            const wf = this.game.state.workers.farming; const hireCost = this.game.getHireCost('farming');
            const irrCost = this.game.getUpgradeCost('farming', 'irrigation');
            const toolsCost = this.game.getUpgradeCost('farming', 'tools');
            const compCost = this.game.getUpgradeCost('farming', 'compost');
            const tractCost = this.game.getUpgradeCost('farming', 'tractor');
            return `
                <div class="block p-4 mb-4 border border-farming">
                    <div class="farming-hero rounded-md p-3 mb-3 flex items-center gap-3">
                        <span class="text-2xl">🌱</span>
                        <div>
                            <div class="text-white font-bold">Verdant Fields</div>
                            <div class="text-secondary text-xs">Grow bountiful crops with style.</div>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <h2 class="text-lg font-bold">Farming Estate</h2>
                            <p class="text-secondary text-sm">Hire Farmhands. Irrigation and tractors speed growth; tools and compost increase yields.</p>
                            <p class="text-white text-sm mt-1">Farmhands: <span class="font-bold">${wf.total}</span></p>
                            <p class="text-secondary text-xs">Irrigation L${wf.upgrades.irrigationLevel} • Tools L${wf.upgrades.toolsLevel} • Compost L${wf.upgrades.compostLevel} • Tractor L${wf.upgrades.tractorLevel}</p>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-2">
                            <button id="hire-farmhand" class="chimera-button px-3 py-2 rounded-md">Hire Farmhand — Cost: ${hireCost} gold</button>
                            <button id="upgrade-farming-irrigation" class="chimera-button px-3 py-2 rounded-md">Irrigation (L${wf.upgrades.irrigationLevel}) — Cost: ${irrCost} gold</button>
                            <button id="upgrade-farming-tools" class="chimera-button px-3 py-2 rounded-md">Steel Tools (L${wf.upgrades.toolsLevel}) — Cost: ${toolsCost} gold</button>
                            <button id="upgrade-farming-compost" class="chimera-button px-3 py-2 rounded-md">Compost Bins (L${wf.upgrades.compostLevel}) — Cost: ${compCost} gold</button>
                            <button id="upgrade-farming-tractor" class="chimera-button px-3 py-2 rounded-md">Tractor (L${wf.upgrades.tractorLevel}) — Cost: ${tractCost} gold</button>
                        </div>
                    </div>
                </div>
            `;
        }
        renderFarmingAssign(action) {
            const wf = this.game.state.workers.farming; const assigned = wf.assigned[action.id] || 0; const total = wf.total; const sumAssigned = Object.values(wf.assigned).reduce((a,b)=>a+b,0); const free = Math.max(0, total - sumAssigned);
            const speedMult = this.game.getWorkerSpeedMultiplier('farming', action); const yieldMult = this.game.getWorkerYieldMultiplier('farming', action);
            return `
                <div class="mt-3 p-2 rounded-md bg-black/30 border border-border-color">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-secondary">Farmhands Assigned: <span class="text-white font-mono">${assigned}</span> / Free: <span class="text-white font-mono">${free}</span></span>
                        <div class="space-x-1">
                            <button class="assign-farming-worker-btn chimera-button px-2 py-1 rounded" data-action-id="${action.id}" data-dir="-1">-</button>
                            <button class="assign-farming-worker-btn chimera-button px-2 py-1 rounded" data-action-id="${action.id}" data-dir="+1">+</button>
                        </div>
                    </div>
                    <p class="text-[11px] text-secondary mt-1">Eff: x${yieldMult.toFixed(2)} yield, ${Math.round(100 - speedMult*100)}% faster</p>
                </div>
            `;
        }

        renderFiremakingView() {
            const bonfireAction = GAME_DATA.RECIPES.firemaking[0]; const bonfireCard = this.renderActionCard('firemaking', bonfireAction, 'Light');
            const bonfireStatus = this.game.state.bonfire.active ? `<p class="text-green-400">Bonfire is active! +${this.game.state.bonfire.xpBoost * 100}% Global Skill XP.</p><p class="text-xs text-secondary">Expires in: ${Math.ceil((this.game.state.bonfire.expiry - Date.now())/60000)} minutes.</p>` : '<p class="text-red-400">Bonfire is not active.</p>';
            return `<div class="col-span-1 md:col-span-2 xl:col-span-3"><div class="block p-4 mb-4"><h2 class="text-lg font-bold text-white mb-2">Bonfire Status</h2>${bonfireStatus}</div></div>${bonfireCard}`;
        }

        renderRunecraftingView() {
            const playerSkill = this.game.state.player.skills['runecrafting'];
            const recipes = GAME_DATA.RECIPES['runecrafting'] || [];
            const essenceId = 'rune_essence';
            const haveEss = this.game.state.bank[essenceId] || 0;
            const recipeCards = recipes.map((r) => {
                const locked = playerSkill.level < r.level;
                const mult = Math.max(1, 1 + Math.floor((playerSkill.level - r.level) / 11));
                const canAfford = haveEss >= (r.input?.[0]?.quantity || 1);
                return `
                    <div class="rc-altar-card ${locked ? 'rc-locked' : ''}" data-rc-recipe-id="${r.id}">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-white font-semibold">${r.name}</h3>
                                <p class="text-xs text-secondary">Req Lv ${r.level} • XP ${r.xp}</p>
                            </div>
                            <span class="rune-output-badge text-xs"><span>${GAME_DATA.ITEMS[r.output.itemId].icon || '✨'}</span> x${(r.output.quantity * mult)}</span>
                        </div>
                        <div class="text-xs text-secondary">Yield at Lv ${playerSkill.level}: x${mult} per essence</div>
                        <button class="chimera-button px-3 py-1 rounded-md w-full mt-2 quick-craft-btn" data-recipe-id="${r.id}" ${locked || !canAfford ? 'disabled' : ''}>Quick Craft</button>
                    </div>
                `;
            }).join('');

            const altar = `
                <div class="block p-4 col-span-1 md:col-span-1">
                    <h2 class="text-lg font-bold mb-2">Runic Altar</h2>
                    <div class="altar-zone" id="altar-dropzone">
                        <div class="altar-glow"></div>
                        <div class="altar-core"></div>
                        <div class="altar-sigil">🔷</div>
                    </div>
                    <div class="mt-3 flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2 flex-wrap">
                            <div class="rune-essence-token" draggable="true" id="essence-token"><span>✨</span><span class="text-xs">Rune Essence</span><span class="font-mono ml-1">x${haveEss}</span></div>
                            <div class="flex items-center gap-2 text-xs">
                                <button class="chimera-button px-2 py-1 rounded-md" id="rc-minus">-10</button>
                                <input id="rc-qty" type="number" min="1" value="${Math.min(25, haveEss)}" class="w-20 p-1 bg-primary border border-border-color rounded-md text-center" />
                                <button class="chimera-button px-2 py-1 rounded-md" id="rc-plus">+10</button>
                            </div>
                        </div>
                        <button class="chimera-button px-3 py-2 rounded-md" id="rc-craft-btn" disabled>Channel Altar</button>
                    </div>
                </div>
            `;

            const recipeList = `
                <div class="block p-4 col-span-1 md:col-span-2">
                    <h2 class="text-lg font-bold mb-2">Altars</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">${recipeCards}</div>
                </div>
            `;

            return `<div class=\"grid grid-cols-1 md:grid-cols-3 gap-4\">${altar}${recipeList}</div>`;
        }

        // Hunter Lodge (missions + roster)
        renderHunterLodge() {
            const roster = this.game.state.hunter?.roster || [];
            const missions = this.game.state.hunter?.missions || [];
            const classes = GAME_DATA.HUNTERS || {};
            const hireCards = Object.keys(classes).map(id => {
                const c = classes[id];
                const owned = roster.filter(h => h.classId === id).length;
                const cost = Math.floor(c.baseCost * Math.pow(1.22, owned));
                return `
                    <div class=\"block p-4 flex flex-col justify-between\">
                        <div>
                            <h3 class=\"text-lg font-bold\">${c.emoji} ${c.name}</h3>
                            <p class=\"text-secondary text-xs\">${c.description}</p>
                            <p class=\"text-secondary text-xs mt-1\">Success +${Math.round((c.successBonus||0)*100)}% • Speed ${Math.round((c.speedBonus||0)*100)}%</p>
                            <p class=\"text-white text-sm mt-2\">Owned: <span class=\"font-mono\">${owned}</span></p>
                        </div>
                        <button class=\"hire-hunter-class-btn chimera-button px-3 py-2 rounded-md mt-3\" data-class-id=\"${id}\">Hire — Cost: ${cost} gold</button>
                    </div>
                `;
            }).join('');

            const missionCards = (GAME_DATA.HUNTER_MISSIONS || []).map(m => {
                const active = missions.find(x => x.id === m.id && x.status === 'active');
                const req = m.huntersNeeded || 1;
                const rosterAvail = roster.filter(h => !h.busy);
                const canSelect = rosterAvail.length >= req;
                const pickers = rosterAvail.map(h => `<label class=\"flex items-center gap-2 text-xs\"><input type=\"checkbox\" class=\"hl-pick\" data-mission-id=\"${m.id}\" value=\"${h.instanceId}\"><span>${GAME_DATA.HUNTERS[h.classId].emoji} ${h.name}</span></label>`).join('');
                const timeMins = Math.round((m.durationMs || 0)/60000);
                const basePct = Math.round((m.baseSuccess || 0.5) * 100);
                return `
                    <div class=\"block p-4\">
                        <div class=\"flex items-center justify-between\"> 
                            <div>
                                <h3 class=\"text-lg font-bold\">${m.icon||'🪤'} ${m.name}</h3>
                                <p class=\"text-secondary text-xs\">Req Lv ${m.level} • Team ${req} • Base ${basePct}% • ${timeMins}m</p>
                            </div>
                            ${active ? `<span class=\"badge\"><i class=\"fas fa-hourglass-half\"></i> In Progress</span>` : ''}
                        </div>
                        ${active ? `<p class=\"text-secondary text-xs mt-2\">Time Left: ${Math.ceil((active.remainingMs||0)/60000)}m</p>` : `
                        <div class=\"mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2\">${canSelect ? pickers : '<span class=\\"text-secondary text-xs\\">No available hunters</span>'}</div>
                        <button class=\"start-hunter-mission-btn chimera-button px-3 py-2 rounded-md mt-3\" data-mission-id=\"${m.id}\" ${canSelect? '' : 'disabled'}>Send Team</button>
                        `}
                    </div>
                `;
            }).join('');

            return `
                <div class=\"block p-4 mb-4 border border-hunter medieval-glow\">
                    <div class=\"flex items-center justify-between mb-3\">
                        <div class=\"flex items-center gap-3\">
                            <div class=\"text-2xl\">🪤</div>
                            <div>
                                <h2 class=\"text-xl font-extrabold tracking-wide\">Hunter's Lodge</h2>
                                <p class=\"text-secondary text-sm\">Hire specialists and send them on daring hunts.</p>
                            </div>
                        </div>
                        <div class=\"text-xs text-secondary\">Roster: <span class=\"text-white font-mono\">${roster.length}</span> • Available: <span class=\"text-green-300 font-mono\">${roster.filter(h=>!h.busy).length}</span></div>
                    </div>
                    <div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4\">${hireCards}</div>
                    <h3 class=\"text-lg font-bold mb-2\">Mission Board</h3>
                    <div class=\"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4\">${missionCards}</div>
                </div>
            `;
        }

        renderBankView() {
            let itemsHtml = Object.entries(this.game.state.bank).map(([itemId, quantity]) => { const itemData = GAME_DATA.ITEMS[itemId]; if (!itemData) return ''; return `<div class="block p-2 flex flex-col items-center justify-center text-center tooltip"><span class="tooltiptext">${itemData.name}</span><span class="text-3xl">${itemData.icon || '❔'}</span><span class="font-mono text-white mt-1">${quantity.toLocaleString()}</span></div>`; }).join('');
            if (itemsHtml === '') { itemsHtml = `<p class="text-secondary col-span-full text-center">Your bank is empty. Gather some resources!</p>`; }
            return `<h1 class="text-2xl font-semibold text-white mb-4">Bank</h1><div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">${itemsHtml}</div>`;
        }

        renderMetaSkillsView() {
            const skillsHtml = Object.values(this.game.state.player.meta_skills).map(skill => {
                let bonusText = '';
                switch (skill.name) {
                    case META_SKILLS.STRENGTH: bonusText = `Increases combat damage.`; break;
                    case META_SKILLS.INTELLECT: bonusText = `Increases Artisan skill XP gain.`; break;
                    case META_SKILLS.STEWARDSHIP: bonusText = `- ${(skill.level - 1).toFixed(1)}% Gathering action time.`; break;
                    case META_SKILLS.RESILIENCE: bonusText = `+${((skill.level - 1) * 5).toFixed(1)}% Stamina regeneration.`; break;
                    case META_SKILLS.ARTISTRY: bonusText = `Increases Gold from all sources.`; break;
                }
                return `<div class="block p-4"><h3 class="text-lg font-bold text-white">${skill.name} - Level ${skill.level}</h3><div class="w-full xp-bar-bg rounded-full h-2 my-2"><div class="xp-bar-fill h-2 rounded-full" style="width:${(skill.currentXP / skill.xpToNextLevel) * 100}%"></div></div><p class="text-xs text-secondary text-right">${Math.floor(skill.currentXP)} / ${skill.xpToNextLevel} XP</p><p class="text-sm text-accent-blue mt-2">${bonusText}</p></div>`;
            }).join('');
            return `<h1 class="text-2xl font-semibold text-white mb-4">Meta Skills</h1><p class="text-secondary mb-4">These skills are leveled up by completing real-life tasks. They provide passive bonuses to your in-game actions.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${skillsHtml}</div>`;
        }

        renderCombatView() {
            const eList = GAME_DATA.COMBAT.ENEMIES.map(e => `<button class="start-combat-btn chimera-button px-3 py-2 rounded-md" data-enemy-id="${e.id}"><i class="fas fa-skull"></i> ${e.name} (Lv ${e.level})</button>`).join(' ');
            const equipped = this.game.state.player.weapon ? GAME_DATA.ITEMS[this.game.state.player.weapon].name : 'None';
            const foodList = Object.entries(this.game.state.bank).filter(([id, q]) => GAME_DATA.ITEMS[id]?.heals).map(([id, q]) => `<button class="eat-food-btn chimera-button px-2 py-1 rounded-md" data-item-id="${id}">${GAME_DATA.ITEMS[id].name} x${q}</button>`).join(' ');
            const weapons = Object.entries(this.game.state.bank).filter(([id, q]) => GAME_DATA.ITEMS[id]?.damage).map(([id, q]) => `<button class="equip-weapon-btn chimera-button px-2 py-1 rounded-md" data-item-id="${id}">${GAME_DATA.ITEMS[id].name}</button>`).join(' ');
            const combatStatus = this.game.state.combat.inCombat && this.game.state.combat.enemy ? `<p class="text-secondary">Fighting: <span class="text-white font-bold">${this.game.state.combat.enemy.name}</span></p>` : '<p class="text-secondary">Not in combat.</p>';
            return `
                <h1 class="text-2xl font-semibold text-white mb-4">Combat</h1>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div class="block p-4 space-y-3">
                        <h2 class="text-lg font-bold">Enemies</h2>
                        <div class="space-x-2">${eList}</div>
                    </div>
                    <div class="block p-4 space-y-2">
                        <h2 class="text-lg font-bold">Status</h2>
                        ${combatStatus}
                        <p class="text-secondary">HP: <span class="font-mono">${Math.floor(this.game.state.player.hp)}/${this.game.state.player.hpMax}</span></p>
                        <div class="mt-2">
                            <span class="badge"><i class="fas fa-users"></i> Allies: DPS ${Math.max(0,(this.game.state.army.production?.dps||0)).toFixed(1)} • HPS ${Math.max(0,(this.game.state.army.production?.hps||0)).toFixed(1)} ${this.game.state.army.upkeep?.hungry ? '<span class="text-red-400 ml-1">Hungry</span>' : ''}</span>
                        </div>
                        <button id="end-combat-btn" class="chimera-button px-3 py-2 rounded-md" ${this.game.state.combat.inCombat ? '' : 'disabled'}>Retreat</button>
                    </div>
                    <div class="block p-4 space-y-3">
                        <h2 class="text-lg font-bold">Equipment & Food</h2>
                        <p class="text-secondary">Weapon: <span class="text-white">${equipped}</span></p>
                        <div class="space-x-2">${weapons || '<span class="text-secondary">Craft a weapon in Smithing.</span>'}</div>
                        <div class="space-x-2">${foodList || '<span class="text-secondary">Cook food to heal.</span>'}</div>
                    </div>
                </div>
            `;
        }
        renderCombatFooter() { /* placeholder for potential dynamic footer updates */ }

        renderClickerView() {
            const units = GAME_DATA.UNITS;
            const owned = this.game.state.empire.units;
            const prod = this.game.calculateEmpireProductionPerSecond();
            const cards = Object.keys(units).map(id => {
                const u = units[id];
                const qty = owned[id] || 0;
                const cost = this.game.getEmpireUnitCost(id);
                const lines = [];
                if (u.goldPerSec) lines.push(`Gold: +${u.goldPerSec}/s each`);
                if (u.runesPerSec) lines.push(`Runes: +${u.runesPerSec}/s each`);
                if (u.essencePerSec) lines.push(`Essence: +${u.essencePerSec}/s each`);
                return `
                    <div class="block p-4 flex flex-col justify-between">
                        <div>
                            <h3 class="text-lg font-bold">${u.emoji} ${u.name}</h3>
                            <p class="text-secondary text-xs">${u.description}</p>
                            <p class="text-secondary text-xs mt-1">${lines.join(' • ')}</p>
                            <p class="text-white text-sm mt-2">Owned: <span class="font-mono">${qty}</span></p>
                        </div>
                        <button class="hire-unit-btn chimera-button px-3 py-2 rounded-md mt-3" data-unit-id="${id}">Hire — Cost: ${cost} gold</button>
                    </div>
                `;
            }).join('');
            // Workforce summary
            this.game.ensureWorkerState();
            const gIds = Object.keys(GAME_DATA.SKILLS).filter(id => GAME_DATA.SKILLS[id].type === 'gathering');
            const totals = gIds.reduce((acc, id) => { const ws = this.game.state.workers[id]; const assigned = Object.values(ws.assigned||{}).reduce((a,b)=>a+b,0); acc.total += (ws.total||0); acc.assigned += assigned; return acc; }, { total: 0, assigned: 0 });
            const free = Math.max(0, totals.total - totals.assigned);
            return `
                <h1 class="text-2xl font-semibold text-white mb-4">Empire Command</h1>
                <div class="block p-4 mb-4">
                    <h2 class="text-lg font-bold">Production</h2>
                    <p class="text-secondary text-sm">Gold: <span class="text-white">+${prod.goldPerSec.toFixed(1)}/s</span> • Runes: <span class="text-white">+${(prod.runesPerSec||0).toFixed(2)}/s</span> • Essence: <span class="text-white">+${(prod.essencePerSec||0).toFixed(2)}/s</span></p>
                </div>
                <div class="block p-4 mb-4 medieval-glow gradient-workforce">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <h2 class="text-lg font-bold">Workforce Overview</h2>
                            <p class="text-secondary text-sm">Workers: <span class="text-white font-mono">${totals.total}</span> • Assigned: <span class="text-white font-mono">${totals.assigned}</span> • Free: <span class="text-green-300 font-mono">${free}</span></p>
                        </div>
                        <button id="goto-workforce" class="chimera-button juicy-button px-3 py-2 rounded-md"><i class="fas fa-people-group"></i> Manage Workforce</button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${cards}</div>
            `;
        }

        renderSpellbookView() {
            const buffs = this.game.state.player.activeBuffs || {};
            const cards = GAME_DATA.SPELLS.map(s => {
                const active = buffs[s.effect] && Date.now() < buffs[s.effect];
                const remaining = active ? Math.ceil((buffs[s.effect] - Date.now()) / 1000) : 0;
                return `
                    <div class="block p-4 flex flex-col justify-between ${active ? 'ring-1 ring-purple-400' : ''}">
                        <div>
                            <h3 class="text-lg font-bold">${s.name}</h3>
                            <p class="text-secondary text-xs">${s.description}</p>
                            <p class="text-secondary text-xs">Rune Cost: ${s.runeCost}</p>
                            ${active ? `<p class="text-purple-300 text-xs">Active • ${remaining}s left</p>` : ''}
                        </div>
                        <button class="cast-spell-btn chimera-button px-3 py-2 rounded-md mt-3" data-spell-id="${s.id}" ${active ? 'disabled' : ''}>Cast</button>
                    </div>
                `;
            }).join('');
            return `<h1 class="text-2xl font-semibold text-white mb-4">Spellbook</h1><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${cards}</div>`;
        }

        renderShopView() {
            const chestCards = GAME_DATA.CHESTS.map(c => `
                <div class="block p-4 flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg font-bold">${c.name}</h3>
                        <p class="text-secondary text-xs">${c.description}</p>
                        <p class="text-secondary text-xs">${c.keyItemID ? 'Requires Key' : 'Cost: ' + c.cost + ' gold'}</p>
                    </div>
                    <button class="buy-chest-btn chimera-button px-3 py-2 rounded-md mt-3" data-chest-id="${c.id}">${c.keyItemID ? 'Open' : 'Buy & Open'}</button>
                </div>
            `).join('');
            return `<h1 class="text-2xl font-semibold text-white mb-4">Shop</h1><div class="grid grid-cols-1 md:grid-cols-3 gap-4">${chestCards}</div>`;
        }

        renderWorkforceView() {
            this.game.ensureWorkerState();
            const gatheringSkillIds = Object.keys(GAME_DATA.SKILLS).filter(id => GAME_DATA.SKILLS[id].type === 'gathering');
            const hero = `
                <div class="block p-5 mb-5 medieval-glow gradient-workforce">
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-3">
                            <div class="text-2xl">🏗️</div>
                            <div>
                                <h1 class="text-xl font-extrabold tracking-wide">Workforce Command</h1>
                                <p class="text-secondary text-sm">Hire, upgrade, and deploy your labor across all camps.</p>
                            </div>
                        </div>
                        <button id="all-systems-go" class="chimera-button juicy-button imperial-button px-4 py-3 rounded-md font-extrabold tracking-wide">
                            <span class="mr-2">🛡️⚔️</span> ALL SYSTEMS GO
                        </button>
                    </div>
                </div>`;

            const cards = gatheringSkillIds.map(skillId => {
                const skill = GAME_DATA.SKILLS[skillId];
                const ws = this.game.state.workers[skillId];
                const assigned = Object.values(ws.assigned || {}).reduce((a,b)=>a+b,0);
                const free = Math.max(0, (ws.total||0) - assigned);
                const hireCost = this.game.getHireCost(skillId);
                const speedCost = this.game.getUpgradeCost(skillId, 'speed');
                const yieldCost = this.game.getUpgradeCost(skillId, 'yield');
                const speedLvl = ws.upgrades.speedLevel || 0;
                const yieldLvl = ws.upgrades.yieldLevel || 0;
                const icon = skill.icon;
                const theme = skill.theme;
                const metaMap = {
                    woodcutting: { title: 'Timber Lodge', worker: 'Timberhand', emoji: '🪓' },
                    mining: { title: 'Mining Camp', worker: 'Miner', emoji: '⛏️' },
                    fishing: { title: 'Fishing Harbor', worker: 'Angler', emoji: '🎣' },
                    farming: { title: 'Farming Estate', worker: 'Farmhand', emoji: '🚜' },
                    hunter: { title: "Trapper's Outpost", worker: 'Trapper', emoji: '🪤' },
                    archaeology: { title: 'Ancient Digsite', worker: 'Excavator', emoji: '🏺' },
                    divination: { title: "Diviner's Grove", worker: 'Diviner', emoji: '🔮' },
                };
                const meta = metaMap[skillId] || { title: `${skill.name} Camp`, worker: 'Worker', emoji: '🏕️' };
                const title = meta.title;
                const workerName = meta.worker;
                const headerEmoji = meta.emoji;

                return `
                    <div class="block p-0 border border-${theme} overflow-hidden medieval-glow ${skillId==='woodcutting'?'gradient-wood':'gradient-workforce'}">
                        <div class="relative p-5 pb-4">
                            <div class="absolute right-4 -top-3 text-4xl opacity-20 select-none">${headerEmoji}</div>
                            <div class="flex items-center gap-3">
                                <div class="text-2xl"><i class="fas ${icon}"></i></div>
                                <div>
                                    <h2 class="text-lg font-extrabold tracking-wide">${title}</h2>
                                    <p class="text-secondary text-sm">Manage ${workerName}${workerName.endsWith('s')?'':'s'}. Assign, upgrade, and prosper.</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-3 mt-4">
                                <div class="glass-card rounded-md p-3 text-center shine">
                                    <div class="text-[11px] text-secondary uppercase tracking-wider">Workers</div>
                                    <div class="text-2xl font-mono text-white">${ws.total}</div>
                                </div>
                                <div class="glass-card rounded-md p-3 text-center">
                                    <div class="text-[11px] text-secondary uppercase tracking-wider">Assigned</div>
                                    <div class="text-xl font-mono text-white">${assigned}</div>
                                </div>
                                <div class="glass-card rounded-md p-3 text-center">
                                    <div class="text-[11px] text-secondary uppercase tracking-wider">Free</div>
                                    <div class="text-xl font-mono text-green-300">${free}</div>
                                </div>
                            </div>
                            <div class="flex flex-col sm:flex-row gap-2 mt-4">
                                <button class="hire-worker-btn chimera-button juicy-button px-3 py-3 rounded-md font-semibold" data-skill-id="${skillId}"><span class="mr-1">${skillId==='woodcutting'?'🪵':headerEmoji}</span> Hire ${workerName} — <span class="text-yellow-300 font-mono">${hireCost}g</span></button>
                                <button class="upgrade-worker-btn chimera-button juicy-button px-3 py-3 rounded-md font-semibold" data-skill-id="${skillId}" data-type="speed"><span class="mr-1">⚙️</span> Speed <span class="text-secondary ml-1">(L${speedLvl})</span> — <span class="text-yellow-300 font-mono">${speedCost}g</span></button>
                                <button class="upgrade-worker-btn chimera-button juicy-button px-3 py-3 rounded-md font-semibold" data-skill-id="${skillId}" data-type="yield"><span class="mr-1">📦</span> Yield <span class="text-secondary ml-1">(L${yieldLvl})</span> — <span class="text-yellow-300 font-mono">${yieldCost}g</span></button>
                            </div>
                            <p class="text-[11px] text-secondary mt-2">Current bonuses: <span class="text-green-300">+${(yieldLvl*10).toFixed(0)}% yield</span> • <span class="text-blue-300">${Math.round(100 - (Math.pow(0.92, speedLvl)*100))}% faster</span></p>
                        </div>
                    </div>
                `;
            }).join('');

            // Emperor decree: assignments happen automatically via All Systems Go
            return `${hero}<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">${cards}</div>`;
        }

        renderMerchantView() {
            const bazaar = this.game.getMerchant();
            const selected = this.game.state.merchant?.selectedStallId || (bazaar.stalls?.[0]?.id);
            const nav = (bazaar.stalls || []).map(s => `<button class="merchant-tab ${selected===s.id?'active':''}" data-stall-id="${s.id}">${s.emoji} ${s.name}</button>`).join('');
            const stall = this.game.getStallById(selected);
            const cards = (stall?.stock || []).map(entry => {
                const item = GAME_DATA.ITEMS[entry.itemId];
                const have = this.game.state.bank[entry.itemId] || 0;
                return `
                    <div class="merchant-card block p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-bold">${item?.icon || '❔'} ${item?.name || entry.itemId}</h3>
                                <p class="text-secondary text-xs">Buy ${entry.buy}g • Sell ${entry.sell}g</p>
                                <p class="text-secondary text-xs">Owned: <span class="text-white font-mono">${have}</span></p>
                            </div>
                            <span class="badge"><i class="fas fa-sack-dollar"></i> ${stall.name}</span>
                        </div>
                        <div class="mt-3 grid grid-cols-2 gap-2">
                            <button class="merchant-buy-btn chimera-button juicy-button px-3 py-2 rounded-md" data-item-id="${entry.itemId}">Buy</button>
                            <button class="merchant-sell-btn chimera-button px-3 py-2 rounded-md" data-item-id="${entry.itemId}" ${have<=0?'disabled':''}>Sell</button>
                        </div>
                    </div>`;
            }).join('');
            const hero = `
                <div class="block p-5 mb-5 medieval-glow gradient-merchant">
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-3">
                            <div class="text-2xl">🏛️</div>
                            <div>
                                <h1 class="text-xl font-extrabold tracking-wide">${bazaar.name}</h1>
                                <p class="text-secondary text-sm">Haggle, barter, and browse the finest wares.</p>
                            </div>
                        </div>
                        <div class="merchant-nav flex flex-wrap gap-2">${nav}</div>
                    </div>
                </div>`;
            return `<h1 class="text-2xl font-semibold text-white mb-4">Merchant</h1>${hero}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${cards}</div>`;
        }

        attachViewEventListeners() {
            const addTaskBtn = document.getElementById('add-task-btn'); if (addTaskBtn) { addTaskBtn.addEventListener('click', () => { const category = document.getElementById('task-category-select').value; const difficulty = document.getElementById('task-difficulty-select').value; this.game.completeRealLifeTask(category, difficulty); const n = document.getElementById('task-name-input'); if (n) n.value = ''; }); }
            const ge = document.getElementById('goto-empire'); if (ge) ge.addEventListener('click', () => { this.currentView = 'clicker'; this.render(); });
            const gw = document.getElementById('goto-woodcutting'); if (gw) gw.addEventListener('click', () => { this.currentView = 'woodcutting'; this.render(); });
            const gr = document.getElementById('goto-runecrafting'); if (gr) gr.addEventListener('click', () => { this.currentView = 'runecrafting'; this.render(); });
            const gc = document.getElementById('goto-combat'); if (gc) gc.addEventListener('click', () => { this.currentView = 'combat'; this.render(); });
            const gs = document.getElementById('goto-shop'); if (gs) gs.addEventListener('click', () => { this.currentView = 'shop'; this.render(); });
            const gwf = document.getElementById('goto-workforce'); if (gwf) gwf.addEventListener('click', () => { this.currentView = 'workforce'; this.render(); });
            const asg = document.getElementById('all-systems-go'); if (asg) asg.addEventListener('click', (e) => { const rect = e.currentTarget.getBoundingClientRect(); this.juiceBurst('upgrade', rect.left + rect.width/2, rect.top + rect.height/2); this.pulseAt(e.currentTarget); this.game.activateAllWorkers(); });
            document.querySelectorAll('.start-action-btn').forEach(btn => { btn.addEventListener('click', () => { const sel = this.mainContent.querySelector(`.action-duration-select[data-skill-id="${btn.dataset.skillId}"][data-action-id="${btn.dataset.actionId}"]`); const duration = sel ? parseInt(sel.value, 10) : 15; if (isNaN(duration) || duration <= 0) return; this.game.startAction(btn.dataset.skillId, btn.dataset.actionId, duration); }); });
            document.querySelectorAll('.craft-action-btn, .light-action-btn').forEach(btn => { btn.addEventListener('click', () => {
                const s = btn.dataset.skillId; const a = btn.dataset.actionId;
                if (s === 'runecrafting') {
                    const recipe = (GAME_DATA.RECIPES[s] || []).find(r => r.id === a);
                    const essenceId = (recipe && recipe.input && recipe.input[0]) ? recipe.input[0].itemId : 'rune_essence';
                    const essencePer = (recipe && recipe.input && recipe.input[0]) ? recipe.input[0].quantity : 1;
                    const haveEss = this.game.state.bank[essenceId] || 0;
                    const maxQty = Math.floor(haveEss / essencePer);
                    if (maxQty <= 0) return;
                    const qty = parseInt(prompt(`How many essences to craft? (Max ${maxQty})`, `${Math.min(25, maxQty)}`), 10);
                    if (isNaN(qty) || qty <= 0) return;
                    this.game.craftItem(s, a, Math.min(qty, maxQty));
                } else {
                    this.game.craftItem(s, a, 1);
                }
            }); });

            // Combat
            document.querySelectorAll('.start-combat-btn').forEach(btn => { btn.addEventListener('click', () => { this.game.startCombat(btn.dataset.enemyId); this.currentView = 'combat'; this.render(); }); });
            const endBtn = document.getElementById('end-combat-btn'); if (endBtn) endBtn.addEventListener('click', () => this.game.endCombat(false));
            document.querySelectorAll('.eat-food-btn').forEach(btn => { btn.addEventListener('click', () => this.game.eatFood(btn.dataset.itemId)); });
            document.querySelectorAll('.equip-weapon-btn').forEach(btn => { btn.addEventListener('click', () => this.game.equipWeapon(btn.dataset.itemId)); });

            // Empire hiring events
            document.querySelectorAll('.hire-unit-btn').forEach(btn => { btn.addEventListener('click', () => { this.game.hireEmpireUnit(btn.dataset.unitId); this.pulseAt(btn); this.game.uiManager.playSound('hire'); }); });

            // Spells
            document.querySelectorAll('.cast-spell-btn').forEach(btn => { btn.addEventListener('click', () => this.game.castSpell(btn.dataset.spellId)); });
            // Shop
            document.querySelectorAll('.buy-chest-btn').forEach(btn => { btn.addEventListener('click', () => this.game.buyChest(btn.dataset.chestId)); });

            // Workers - generic
            document.querySelectorAll('.hire-worker-btn').forEach(btn => { btn.addEventListener('click', () => { this.game.hireWorker(btn.dataset.skillId); this.pulseAt(btn); this.game.uiManager.playSound('hire'); }); });
            document.querySelectorAll('.upgrade-worker-btn').forEach(btn => { btn.addEventListener('click', () => { this.game.upgradeWorkers(btn.dataset.skillId, btn.dataset.type); this.pulseAt(btn); this.game.uiManager.playSound('upgrade'); }); });
            document.querySelectorAll('.assign-worker-btn').forEach(btn => { btn.addEventListener('click', () => {
                const id = btn.dataset.actionId; const dir = btn.dataset.dir; const skill = btn.dataset.skillId; const ws = this.game.state.workers[skill]; const sumAssigned = Object.values(ws.assigned).reduce((a,b)=>a+b,0); if (dir === '+1') { if (sumAssigned < ws.total) ws.assigned[id] = (ws.assigned[id]||0)+1; } else { ws.assigned[id] = Math.max(0,(ws.assigned[id]||0)-1); } this.render();
            }); });

            // Farming estate
            const hireFarm = document.getElementById('hire-farmhand'); if (hireFarm) hireFarm.addEventListener('click', () => this.game.hireWorker('farming'));
            const upFI = document.getElementById('upgrade-farming-irrigation'); if (upFI) upFI.addEventListener('click', () => this.game.upgradeWorkers('farming', 'irrigation'));
            const upFT = document.getElementById('upgrade-farming-tools'); if (upFT) upFT.addEventListener('click', () => this.game.upgradeWorkers('farming', 'tools'));
            const upFC = document.getElementById('upgrade-farming-compost'); if (upFC) upFC.addEventListener('click', () => this.game.upgradeWorkers('farming', 'compost'));
            const upFR = document.getElementById('upgrade-farming-tractor'); if (upFR) upFR.addEventListener('click', () => this.game.upgradeWorkers('farming', 'tractor'));
            document.querySelectorAll('.assign-farming-worker-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.actionId; const dir = btn.dataset.dir === '+1' ? 1 : -1; const wfarm = this.game.state.workers.farming;
                    const sumAssigned = Object.values(wfarm.assigned).reduce((a,b)=>a+b,0);
                    const free = Math.max(0, wfarm.total - sumAssigned);
                    if (dir === 1 && free <= 0) return; if (dir === -1 && (wfarm.assigned[id] || 0) <= 0) return;
                    wfarm.assigned[id] = Math.max(0, (wfarm.assigned[id] || 0) + dir);
                    this.renderView();
                });
            });

            // Runecrafting interactive altar handlers
            const altar = document.getElementById('altar-dropzone');
            const essenceToken = document.getElementById('essence-token');
            const qtyInput = document.getElementById('rc-qty');
            const btnMinus = document.getElementById('rc-minus');
            const btnPlus = document.getElementById('rc-plus');
            const craftBtn = document.getElementById('rc-craft-btn');
            const haveEss = (this.game.state.bank['rune_essence'] || 0);
            const selectRecipe = (id) => { document.querySelectorAll('.rc-altar-card').forEach(c => c.classList.toggle('rc-selected', c.dataset.rcRecipeId === id)); if (craftBtn) { craftBtn.dataset.recipeId = id || ''; craftBtn.disabled = !id; } };
            document.querySelectorAll('.rc-altar-card').forEach(card => { card.addEventListener('click', () => selectRecipe(card.dataset.rcRecipeId)); });
            document.querySelectorAll('.quick-craft-btn').forEach(btn => { btn.addEventListener('click', (e) => { e.stopPropagation(); const id = btn.dataset.recipeId; const r = (GAME_DATA.RECIPES.runecrafting || []).find(x => x.id === id); if (!r) return; const per = (r.input?.[0]?.quantity || 1); const maxQty = Math.floor((this.game.state.bank['rune_essence'] || 0) / per); if (maxQty <= 0) return; this.game.craftItem('runecrafting', id, Math.min(1, maxQty)); this.render(); }); });
            if (btnMinus) btnMinus.addEventListener('click', () => { const v = Math.max(1, (parseInt(qtyInput.value || '1', 10) - 10)); qtyInput.value = v; });
            if (btnPlus) btnPlus.addEventListener('click', () => { const v = Math.min(haveEss, (parseInt(qtyInput.value || '1', 10) + 10)); qtyInput.value = v; });
            if (qtyInput) qtyInput.addEventListener('change', () => { let v = parseInt(qtyInput.value || '1', 10); if (isNaN(v) || v <= 0) v = 1; v = Math.min(v, haveEss); qtyInput.value = v; });
            if (craftBtn) craftBtn.addEventListener('click', () => { const id = craftBtn.dataset.recipeId; if (!id) return; const r = (GAME_DATA.RECIPES.runecrafting || []).find(x => x.id === id); if (!r) return; const per = (r.input?.[0]?.quantity || 1); const maxQty = Math.floor((this.game.state.bank['rune_essence'] || 0) / per); const want = Math.min(maxQty, Math.max(1, parseInt(qtyInput.value || '1', 10))); if (want <= 0) return; this.game.craftItem('runecrafting', id, want); if (altar) { for (let i = 0; i < Math.min(10, want); i++) { const spark = document.createElement('div'); spark.className = 'rune-spark'; spark.style.setProperty('--sx', `${(Math.random() - 0.5) * 120}px`); spark.style.setProperty('--sy', `${(Math.random() - 0.2) * 40}px`); spark.style.setProperty('--tx', `${(Math.random() - 0.5) * 40}px`); spark.style.setProperty('--ty', `${-140 - Math.random() * 40}px`); altar.appendChild(spark); setTimeout(() => spark.remove(), 950); } } this.render(); });
            if (altar) { altar.addEventListener('dragover', (e) => { e.preventDefault(); altar.style.borderColor = 'rgba(88,166,255,0.6)'; }); altar.addEventListener('dragleave', () => { altar.style.borderColor = 'var(--border-color)'; }); altar.addEventListener('drop', (e) => { e.preventDefault(); altar.style.borderColor = 'var(--border-color)'; const sel = document.querySelector('.rc-altar-card.rc-selected'); if (!sel) { this.game.uiManager.showFloatingText('Select an altar first', 'text-yellow-300'); return; } const id = sel.dataset.rcRecipeId; const r = (GAME_DATA.RECIPES.runecrafting || []).find(x => x.id === id); if (!r) return; const per = (r.input?.[0]?.quantity || 1); const have = (this.game.state.bank['rune_essence'] || 0); const maxQty = Math.floor(have / per); const want = Math.min(maxQty, Math.max(1, parseInt(qtyInput?.value || '1', 10))); if (want <= 0) return; this.game.craftItem('runecrafting', id, want); for (let i = 0; i < Math.min(10, want); i++) { const spark = document.createElement('div'); spark.className = 'rune-spark'; spark.style.setProperty('--sx', `${(Math.random() - 0.5) * 120}px`); spark.style.setProperty('--sy', `${(Math.random() - 0.2) * 40}px`); spark.style.setProperty('--tx', `${(Math.random() - 0.5) * 40}px`); spark.style.setProperty('--ty', `${-140 - Math.random() * 40}px`); altar.appendChild(spark); setTimeout(() => spark.remove(), 950); } this.render(); }); }
            if (essenceToken) { essenceToken.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', 'essence'); }); }

            // Hunter lodge events
            document.querySelectorAll('.hire-hunter-class-btn').forEach(btn => { btn.addEventListener('click', () => { this.game.hireSpecialHunter(btn.dataset.classId); }); });
            document.querySelectorAll('.start-hunter-mission-btn').forEach(btn => { btn.addEventListener('click', () => {
                const missionId = btn.dataset.missionId;
                const picks = Array.from(this.mainContent.querySelectorAll(`.hl-pick[data-mission-id="${missionId}"]`)).filter(ch => ch.checked).map(ch => ch.value);
                this.game.startHunterMission(missionId, picks);
            }); });

            // Army
            document.querySelectorAll('.hire-army-btn').forEach(btn => { btn.addEventListener('click', () => this.game.hireArmyUnit(btn.dataset.unitId)); });
            const ar = document.getElementById('army-rally'); if (ar) ar.addEventListener('click', (e) => { const r = this.game.state.player.activeBuffs?.['armyRally']; if (!r || Date.now() >= r) { const rect = e.currentTarget.getBoundingClientRect(); this.juiceBurst('upgrade', rect.left + rect.width/2, rect.top + rect.height/2); } this.game.rallyArmy(); });
            document.querySelectorAll('.army-upgrade-btn').forEach(btn => { btn.addEventListener('click', () => this.game.upgradeArmy(btn.dataset.type)); });
            document.querySelectorAll('input[name="army-stance"]').forEach(r => { r.addEventListener('change', () => this.game.setArmyStance(r.value)); });

            // Merchant
            document.querySelectorAll('.merchant-tab').forEach(btn => { btn.addEventListener('click', () => { this.game.state.merchant.selectedStallId = btn.dataset.stallId; this.renderView(); }); });
            document.querySelectorAll('.merchant-buy-btn').forEach(btn => { btn.addEventListener('click', (e) => {
                const rect = e.currentTarget.getBoundingClientRect(); this.juiceBurst('upgrade', rect.left + rect.width/2, rect.top + rect.height/2);
                this.game.buyItem(btn.dataset.itemId, 1);
            }); });
            document.querySelectorAll('.merchant-sell-btn').forEach(btn => { btn.addEventListener('click', () => this.game.sellItem(btn.dataset.itemId, 1)); });
        }

        showModal(title, content) {
            this.initNotify();
            const html = `<h3 class=\"text-xl font-bold text-white\">${title}</h3><div class=\"text-secondary my-4\">${content}</div><div class=\"text-right mt-6\"><button class=\"close-btn chimera-button px-4 py-2 rounded-md\">Close</button></div>`;
            this.modalContent.innerHTML = html; this.modalContent.querySelector('.close-btn').addEventListener('click', () => this.hideModal()); this.modalBackdrop.classList.remove('hidden');
        }
        hideModal() { this.modalBackdrop.classList.add('hidden'); }

        showFloatingText(text, className, options = {}) {
            if (!this._fly) { this._fly = { nextLane: 0, maxLanes: 12, laneHeight: 28 }; }
            const detectType = (t, cls = '') => {
                const lower = (t || '').toLowerCase(); const c = cls || '';
                if (lower.includes('level up')) return 'fly-level';
                if (lower.includes('activated')) return 'fly-buff';
                if (lower.includes('stamina') || lower.includes('hp') || c.includes('green')) return 'fly-heal';
                if (lower.startsWith('-') || c.includes('red')) return 'fly-damage';
                if (lower.includes('crafted') || lower.includes('+1 ') || c.includes('yellow')) return 'fly-loot';
                if (lower.includes('xp')) return 'fly-xp';
                return '';
            };
            const typeClass = detectType(text, className);

            const floatText = document.createElement('div');
            floatText.className = `floating-text ${typeClass} ${className || ''}`.trim();
            floatText.textContent = text;

            const gameRect = this.floatingTextContainer.getBoundingClientRect();
            const baseX = gameRect.width / 2;
            const baseY = gameRect.height / 3;

            const lane = this._fly.nextLane; this._fly.nextLane = (this._fly.nextLane + 1) % this._fly.maxLanes;
            const jitterX = (Math.random() - 0.5) * 80; // -40..+40
            const y = baseY - lane * this._fly.laneHeight;

            floatText.style.left = `${baseX + jitterX}px`;
            floatText.style.top = `${y}px`;

            this.floatingTextContainer.appendChild(floatText);
            const duration = typeClass === 'fly-crit' || typeClass === 'fly-level' ? 1900 : (typeClass === 'fly-loot' ? 1800 : 1600);
            setTimeout(() => floatText.remove(), duration);
        }

        // Dopamine helpers
        pulseAt(el) {
            if (!el) return; el.classList.remove('pulse-pop'); void el.offsetWidth; el.classList.add('pulse-pop');
            setTimeout(() => el && el.classList && el.classList.remove('pulse-pop'), 260);
        }
        _ensureAudio() {
            if (!this._audioCtx) {
                const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; this._audioCtx = new AC();
            }
            return this._audioCtx;
        }
        playSound(type) {
            const ctx = this._ensureAudio(); if (!ctx) return;
            const now = ctx.currentTime; const osc = ctx.createOscillator(); const gain = ctx.createGain();
            osc.type = 'triangle';
            if (type === 'hire') { osc.frequency.setValueAtTime(740, now); osc.frequency.exponentialRampToValueAtTime(1180, now + 0.18); }
            else if (type === 'upgrade') { osc.frequency.setValueAtTime(520, now); osc.frequency.exponentialRampToValueAtTime(1040, now + 0.22); }
            else { osc.frequency.setValueAtTime(660, now); osc.frequency.exponentialRampToValueAtTime(770, now + 0.08); }
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(now); osc.stop(now + 0.26);
        }
        juiceBurst(kind, clientX, clientY) {
            const containerRect = this.floatingTextContainer.getBoundingClientRect();
            const x = clientX - containerRect.left; const y = clientY - containerRect.top;
            const colors = kind === 'upgrade' ? ['#ffd166','#fca311','#ffe08a','#fff3c4'] : (kind === 'wood' ? ['#b08968','#7f5539','#ddb892','#e6ccb2'] : ['#ffd166','#ffd700','#fff3b0','#f1fa8c']);
            const count = kind === 'upgrade' ? 24 : 18;
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div'); p.className = 'confetti-piece'; p.style.left = `${x}px`; p.style.top = `${y}px`;
                p.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
                const dx = (Math.random() - 0.5) * 180; const dy = - (Math.random() * 160 + 80); const rot = (Math.random() - 0.5) * 260;
                p.style.opacity = '1'; p.style.transform = `translate3d(-50%, -50%, 0) rotate(${rot}deg)`;
                this.floatingTextContainer.appendChild(p);
                requestAnimationFrame(() => { p.style.transition = 'transform 900ms cubic-bezier(.15,.55,.2,1), opacity 900ms ease'; p.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${rot+180}deg)`; p.style.opacity = '0'; });
                setTimeout(() => p.remove(), 950);
            }
            for (let i = 0; i < 6; i++) {
                const c = document.createElement('div'); c.className = 'coin-piece'; c.textContent = kind === 'wood' ? '🪵' : '💰'; c.style.left = `${x}px`; c.style.top = `${y}px`;
                this.floatingTextContainer.appendChild(c);
                const dx = (Math.random() - 0.5) * 120; const dy = - (Math.random() * 120 + 40);
                requestAnimationFrame(() => { c.style.transition = 'transform 800ms cubic-bezier(.17,.67,.32,1.31), opacity 800ms ease'; c.style.opacity = '1'; c.style.transform = `translate(${dx}px, ${dy}px) scale(0.9)`; });
                setTimeout(() => { c.style.opacity = '0'; }, 620); setTimeout(() => c.remove(), 900);
            }
        }

        renderWorkerPanel(skillId) {
            const ws = this.game.state.workers[skillId]; const hireCost = this.game.getHireCost(skillId); const speedCost = this.game.getUpgradeCost(skillId, 'speed'); const yieldCost = this.game.getUpgradeCost(skillId, 'yield'); const speedLvl = ws.upgrades.speedLevel; const yieldLvl = ws.upgrades.yieldLevel; const theme = GAME_DATA.SKILLS[skillId].theme;
            if (skillId === 'woodcutting') {
                const assigned = Object.values(ws.assigned || {}).reduce((a,b)=>a+b,0); const free = Math.max(0, (ws.total||0) - assigned);
                return `
                    <div class="block p-0 mb-5 border border-woodcutting overflow-hidden medieval-glow gradient-wood">
                        <div class="relative p-5 pb-4">
                            <div class="absolute right-4 -top-3 text-4xl opacity-20 select-none">🪓</div>
                            <div class="flex items-center gap-3">
                                <div class="text-2xl">🏕️</div>
                                <div>
                                    <h2 class="text-xl font-extrabold tracking-wide">Timber Lodge</h2>
                                    <p class="text-secondary text-sm">Command your timberhands. Assign, upgrade, and prosper.</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-3 mt-4">
                                <div class="glass-card rounded-md p-3 text-center shine">
                                    <div class="text-[11px] text-secondary uppercase tracking-wider">Workers</div>
                                    <div class="text-2xl font-mono text-white">${ws.total}</div>
                                </div>
                                <div class="glass-card rounded-md p-3 text-center">
                                    <div class="text-[11px] text-secondary uppercase tracking-wider">Assigned</div>
                                    <div class="text-xl font-mono text-white">${assigned}</div>
                                </div>
                                <div class="glass-card rounded-md p-3 text-center">
                                    <div class="text-[11px] text-secondary uppercase tracking-wider">Free</div>
                                    <div class="text-xl font-mono text-green-300">${free}</div>
                                </div>
                            </div>
                            <div class="flex flex-col sm:flex-row gap-2 mt-4">
                                <button class="hire-worker-btn chimera-button juicy-button px-3 py-3 rounded-md font-semibold" data-skill-id="woodcutting"><span class="mr-1">🪵</span> Hire Timberhand — <span class="text-yellow-300 font-mono">${hireCost}g</span></button>
                                <button class="upgrade-worker-btn chimera-button juicy-button px-3 py-3 rounded-md font-semibold" data-skill-id="woodcutting" data-type="speed"><span class="mr-1">🪓</span> Upgrade Axes <span class="text-secondary ml-1">(L${speedLvl})</span> — <span class="text-yellow-300 font-mono">${speedCost}g</span></button>
                                <button class="upgrade-worker-btn chimera-button juicy-button px-3 py-3 rounded-md font-semibold" data-skill-id="woodcutting" data-type="yield"><span class="mr-1">🛷</span> Lumber Sleds <span class="text-secondary ml-1">(L${yieldLvl})</span> — <span class="text-yellow-300 font-mono">${yieldCost}g</span></button>
                            </div>
                            <p class="text-[11px] text-secondary mt-2">Current bonuses: <span class="text-green-300">+${(yieldLvl*10).toFixed(0)}% yield</span> • <span class="text-blue-300">${Math.round(100 - (Math.pow(0.92, speedLvl)*100))}% faster</span></p>
                        </div>
                    </div>
                `;
            }
            // Themed panels for other gathering skills
            const skill = GAME_DATA.SKILLS[skillId];
            const assigned = Object.values(ws.assigned || {}).reduce((a,b)=>a+b,0);
            const free = Math.max(0, (ws.total||0) - assigned);
            const icon = skill.icon;
            const headerMeta = {
                mining: { title: 'Mining Camp', emoji: '⛏️', worker: 'Miner' },
                fishing: { title: 'Fishing Harbor', emoji: '🎣', worker: 'Angler' },
                farming: { title: 'Farming Estate', emoji: '🚜', worker: 'Farmhand' },
                hunter: { title: "Trapper's Outpost", emoji: '🪤', worker: 'Trapper' },
                archaeology: { title: 'Ancient Digsite', emoji: '🏺', worker: 'Excavator' },
                divination: { title: "Diviner's Grove", emoji: '🔮', worker: 'Diviner' },
            };
            if (headerMeta[skillId]) {
                const meta = headerMeta[skillId];
                return `
                    <div class="block p-0 mb-5 border border-${theme} overflow-hidden medieval-glow gradient-workforce">
                        <div class="relative p-5 pb-4">
                            <div class="absolute right-4 -top-3 text-4xl opacity-20 select-none">${meta.emoji}</div>
                            <div class="flex items-center gap-3">
                                <div class="text-2xl"><i class="fas ${icon}"></i></div>
                                <div>
                                    <h2 class="text-xl font-extrabold tracking-wide">${meta.title}</h2>
                                    <p class="text-secondary text-sm">Command your ${meta.worker.toLowerCase()}s. Assign, upgrade, and prosper.</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-3 mt-4">
                                <div class="glass-card rounded-md p-3 text-center shine">
                                    <div class="text-[11px] text-secondary uppercase tracking-wider">Workers</div>
                                    <div class="text-2xl font-mono text-white">${ws.total}</div>
                                </div>
                                <div class="glass-card rounded-md p-3 text-center">
                                    <div class="text-[11px] text-secondary uppercase tracking-wider">Assigned</div>
                                    <div class="text-xl font-mono text-white">${assigned}</div>
                                </div>
                                <div class="glass-card rounded-md p-3 text-center">
                                    <div class="text-[11px] text-secondary uppercase tracking-wider">Free</div>
                                    <div class="text-xl font-mono text-green-300">${free}</div>
                                </div>
                            </div>
                            <div class="flex flex-col sm:flex-row gap-2 mt-4">
                                <button class="hire-worker-btn chimera-button juicy-button px-3 py-3 rounded-md font-semibold" data-skill-id="${skillId}"><span class="mr-1">👷</span> Hire ${meta.worker} — <span class="text-yellow-300 font-mono">${hireCost}g</span></button>
                                <button class="upgrade-worker-btn chimera-button juicy-button px-3 py-3 rounded-md font-semibold" data-skill-id="${skillId}" data-type="speed"><span class="mr-1">⚙️</span> Speed <span class="text-secondary ml-1">(L${speedLvl||0})</span> — <span class="text-yellow-300 font-mono">${speedCost}g</span></button>
                                <button class="upgrade-worker-btn chimera-button juicy-button px-3 py-3 rounded-md font-semibold" data-skill-id="${skillId}" data-type="yield"><span class="mr-1">📦</span> Yield <span class="text-secondary ml-1">(L${yieldLvl||0})</span> — <span class="text-yellow-300 font-mono">${yieldCost}g</span></button>
                            </div>
                            <p class="text-[11px] text-secondary mt-2">Current bonuses: <span class="text-green-300">+${((yieldLvl||0)*10).toFixed(0)}% yield</span> • <span class="text-blue-300">${Math.round(100 - (Math.pow(0.92, (speedLvl||0))*100))}% faster</span></p>
                        </div>
                    </div>
                `;
            }
            // Fallback generic panel for other gathering skills
            return `
                <div class="block p-4 mb-4 border border-${theme}">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <h2 class="text-lg font-bold">Work Camp</h2>
                            <p class="text-secondary text-sm">Workers operate in the background. Assign them to tasks.</p>
                            <p class="text-white text-sm mt-1">Workers: <span class="font-bold">${ws.total}</span></p>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-2">
                            <button class="hire-worker-btn chimera-button px-3 py-2 rounded-md" data-skill-id="${skillId}">Hire Worker — Cost: ${hireCost} gold</button>
                            <button class="upgrade-worker-btn chimera-button px-3 py-2 rounded-md" data-skill-id="${skillId}" data-type="speed">Upgrade Tools (Speed L${speedLvl}) — Cost: ${speedCost} gold</button>
                            <button class="upgrade-worker-btn chimera-button px-3 py-2 rounded-md" data-skill-id="${skillId}" data-type="yield">Logistics (Yield L${yieldLvl}) — Cost: ${yieldCost} gold</button>
                        </div>
                    </div>
                </div>
            `;
        }

        renderWorkerAssign(skillId, action) {
            const ws = this.game.state.workers[skillId]; const assigned = ws.assigned[action.id] || 0; const total = ws.total; const sumAssigned = Object.values(ws.assigned).reduce((a,b)=>a+b,0); const free = Math.max(0, total - sumAssigned); const speedMult = this.game.getWorkerSpeedMultiplier(skillId, action); const yieldMult = this.game.getWorkerYieldMultiplier(skillId, action);
            const NAMES = { woodcutting: { worker: 'Timberhands' }, mining: { worker: 'Miners' }, fishing: { worker: 'Anglers' }, farming: { worker: 'Farmhands' }, hunter: { worker: 'Trappers' }, archaeology: { worker: 'Excavators' }, divination: { worker: 'Diviners' }, };
            const workerName = (NAMES[skillId] || { worker: 'Workers' }).worker;
            return `
                <div class="mt-3 p-2 rounded-md bg-black/30 border border-border-color">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-secondary">${workerName} Assigned: <span class="text-white font-mono">${assigned}</span> / Free: <span class="text-white font-mono">${free}</span></span>
                        <div class="space-x-1">
                            <button class="assign-worker-btn chimera-button juicy-button px-2 py-1 rounded" data-skill-id="${skillId}" data-action-id="${action.id}" data-dir="-1">-</button>
                            <button class="assign-worker-btn chimera-button juicy-button px-2 py-1 rounded" data-skill-id="${skillId}" data-action-id="${action.id}" data-dir="+1">+</button>
                        </div>
                    </div>
                    <p class="text-[11px] text-secondary mt-1">Eff: x${yieldMult.toFixed(2)} yield, ${Math.round(100 - speedMult*100)}% faster</p>
                </div>
            `;
        }

        // Notification stack (top-right)
        initNotify() {
            if (this._notify) return; this._notify = { map: {}, timers: {} };
            this._notify.stack = document.getElementById('top-notification-stack');
        }
        createOrUpdateNotification(key, options) {
            this.initNotify();
            const stack = this._notify.stack; if (!stack) return;
            const ttlMs = 2600;
            const existing = this._notify.map[key];
            if (existing) {
                existing.total += options.increment || 0;
                const countEl = existing.el.querySelector('.count');
                if (countEl) countEl.textContent = `+${existing.total.toLocaleString()}`;
                existing.el.classList.remove('notify-pulse');
                void existing.el.offsetWidth;
                existing.el.classList.add('notify-pulse');
                clearTimeout(this._notify.timers[key]);
                this._notify.timers[key] = setTimeout(() => this.removeNotification(key), ttlMs);
                return existing.el;
            }
            const card = document.createElement('div');
            card.className = `notify-card ${options.kind || ''}`.trim();
            const icon = document.createElement('div'); icon.className = 'notify-icon'; icon.innerHTML = options.icon || '';
            const count = document.createElement('div'); count.className = 'count'; count.textContent = `+${(options.increment||0).toLocaleString()}`;
            const label = document.createElement('div'); label.className = 'label'; label.innerHTML = options.label || '';
            card.appendChild(icon); card.appendChild(count); card.appendChild(label);
            stack.prepend(card);
            this._notify.map[key] = { el: card, total: options.increment || 0 };
            this._notify.timers[key] = setTimeout(() => this.removeNotification(key), ttlMs);
            return card;
        }
        removeNotification(key) {
            if (!this._notify || !this._notify.map[key]) return;
            const el = this._notify.map[key].el; el.classList.add('notify-out');
            setTimeout(() => { el.remove(); }, 220);
            clearTimeout(this._notify.timers[key]);
            delete this._notify.timers[key];
            delete this._notify.map[key];
        }
        notifyResource(type, amount) {
            if (!amount || amount <= 0) return;
            const icons = { gold: '<i class="fas fa-coins text-yellow-300"></i>', runes: '<i class="fas fa-gem text-purple-300"></i>', stamina: '<i class="fas fa-bolt text-green-400"></i>' };
            const labels = { gold: 'Gold', runes: 'Runes', stamina: 'Stamina' };
            const key = `res:${type}`;
            this.createOrUpdateNotification(key, { increment: amount, icon: icons[type] || '', label: labels[type] || type, kind: type });
        }
        notifyItem(itemId, qty) {
            if (!qty || qty <= 0) return;
            const item = GAME_DATA.ITEMS[itemId];
            const name = item?.name || itemId; const icon = item?.icon || '❔';
            const key = `item:${itemId}`;
            this.createOrUpdateNotification(key, { increment: qty, icon: icon, label: name, kind: 'item' });
        }
        renderArmyView() {
            const prod = this.game.calculateArmyOutputPerSecond();
            const hungry = this.game.state.army.upkeep?.hungry;
            const buffs = this.game.state.player.activeBuffs || {};
            const rallyActive = buffs['armyRally'] && Date.now() < buffs['armyRally'];
            const rallyRemaining = rallyActive ? Math.ceil((buffs['armyRally'] - Date.now())/1000) : 0;
            const edible = Object.entries(this.game.state.bank).filter(([id,q]) => GAME_DATA.ITEMS[id]?.heals).reduce((a,[,q])=>a+q,0);
            const foodPerMin = prod.foodPerMin || 0;
            const minutesLeft = foodPerMin > 0 ? Math.floor(edible / foodPerMin) : '∞';
            const stance = this.game.state.army.stance || 'balanced';
            const up = this.game.state.army.upgrades || { offenseLevel:0, supportLevel:0, logisticsLevel:0 };
            const offenseCost = this.game.getArmyUpgradeCost('offense');
            const supportCost = this.game.getArmyUpgradeCost('support');
            const logisticsCost = this.game.getArmyUpgradeCost('logistics');
            const unitCards = Object.keys(GAME_DATA.ARMY_CLASSES).map(id => {
                const def = GAME_DATA.ARMY_CLASSES[id];
                const owned = this.game.state.army.units[id] || 0;
                const cost = this.game.getArmyUnitCost(id);
                const lines = [];
                if (def.dps) lines.push(`DPS +${def.dps}`);
                if (def.hps) lines.push(`HPS +${def.hps}`);
                if (def.foodPerMin) lines.push(`Upkeep ${def.foodPerMin}/m`);
                return `
                    <div class="block p-4 flex flex-col justify-between">
                        <div>
                            <h3 class="text-lg font-bold">${def.emoji} ${def.name} <span class="text-xs text-secondary">(${def.role})</span></h3>
                            <p class="text-secondary text-xs">${def.description}</p>
                            <p class="text-secondary text-xs mt-1">${lines.join(' • ')}</p>
                            <p class="text-white text-sm mt-2">Owned: <span class="font-mono">${owned}</span></p>
                        </div>
                        <button class="hire-army-btn chimera-button juicy-button px-3 py-2 rounded-md mt-3" data-unit-id="${id}">Recruit — ${cost}g</button>
                    </div>
                `;
            }).join('');
            const hero = `
                <div class="block p-5 mb-5 medieval-glow gradient-army">
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-3">
                            <div class="text-2xl">🛡️⚔️</div>
                            <div>
                                <h1 class="text-xl font-extrabold tracking-wide">War Council</h1>
                                <p class="text-secondary text-sm">Command your forces. Train, rally, and conquer.</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="army-rally" class="chimera-button juicy-button imperial-button px-4 py-3 rounded-md font-extrabold tracking-wide">${rallyActive ? `Rally Active • ${rallyRemaining}s` : 'Rally Troops'}</button>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        <div class="glass-card rounded-md p-3 text-center shine"><div class="text-[11px] text-secondary uppercase tracking-wider">DPS</div><div class="text-2xl font-mono text-white">${prod.dps.toFixed(1)}</div></div>
                        <div class="glass-card rounded-md p-3 text-center"><div class="text-[11px] text-secondary uppercase tracking-wider">HPS</div><div class="text-2xl font-mono text-white">${prod.hps.toFixed(1)}</div></div>
                        <div class="glass-card rounded-md p-3 text-center"><div class="text-[11px] text-secondary uppercase tracking-wider">Upkeep</div><div class="text-xl font-mono text-white">${foodPerMin.toFixed(1)}/m ${hungry ? '<span class="text-red-400 text-xs ml-1">Hungry</span>' : ''}</div></div>
                        <div class="glass-card rounded-md p-3 text-center"><div class="text-[11px] text-secondary uppercase tracking-wider">Rations</div><div class="text-xl font-mono text-white">${edible} items • ${minutesLeft}m</div></div>
                    </div>
                </div>`;
            const upgrades = `
                <div class="block p-5 mb-5">
                    <h2 class="text-lg font-bold mb-2">Doctrine & Upgrades</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div class="block p-3 flex flex-col">
                            <div class="flex items-center justify-between"><div class="font-semibold">Offense Drills</div><div class="text-xs text-secondary">L${up.offenseLevel||0}</div></div>
                            <p class="text-xs text-secondary mt-1">+8% Army DPS per level.</p>
                            <button class="army-upgrade-btn chimera-button juicy-button px-3 py-2 rounded-md mt-2" data-type="offense">Upgrade — ${offenseCost}g</button>
                        </div>
                        <div class="block p-3 flex flex-col">
                            <div class="flex items-center justify-between"><div class="font-semibold">Field Medics</div><div class="text-xs text-secondary">L${up.supportLevel||0}</div></div>
                            <p class="text-xs text-secondary mt-1">+8% Army HPS per level.</p>
                            <button class="army-upgrade-btn chimera-button juicy-button px-3 py-2 rounded-md mt-2" data-type="support">Upgrade — ${supportCost}g</button>
                        </div>
                        <div class="block p-3 flex flex-col">
                            <div class="flex items-center justify-between"><div class="font-semibold">Supply Lines</div><div class="text-xs text-secondary">L${up.logisticsLevel||0}</div></div>
                            <p class="text-xs text-secondary mt-1">-6% Upkeep per level.</p>
                            <button class="army-upgrade-btn chimera-button juicy-button px-3 py-2 rounded-md mt-2" data-type="logistics">Upgrade — ${logisticsCost}g</button>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="text-xs text-secondary mb-1">Formations</div>
                        <div class="flex items-center gap-2">
                            <label class="text-xs flex items-center gap-1"><input type="radio" name="army-stance" value="balanced" ${stance==='balanced'?'checked':''}/> Balanced</label>
                            <label class="text-xs flex items-center gap-1"><input type="radio" name="army-stance" value="aggressive" ${stance==='aggressive'?'checked':''}/> Aggressive</label>
                            <label class="text-xs flex items-center gap-1"><input type="radio" name="army-stance" value="defensive" ${stance==='defensive'?'checked':''}/> Defensive</label>
                        </div>
                    </div>
                </div>`;
            const recruits = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${unitCards}</div>`;
            return `<h1 class="text-2xl font-semibold text-white mb-4">Army</h1>${hero}${upgrades}${recruits}`;
        }
        renderCombatFooter() { /* placeholder for potential dynamic footer updates */ }
    }

    const game = new GameManager(); game.init(); window.chimeraGame = game;
});