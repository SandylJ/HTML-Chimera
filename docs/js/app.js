document.addEventListener('DOMContentLoaded', () => {
    const META_SKILLS = { STRENGTH: 'Strength', INTELLECT: 'Intellect', STEWARDSHIP: 'Stewardship', RESILIENCE: 'Resilience', ARTISTRY: 'Artistry' };
    const TASK_CATEGORIES = { FITNESS: META_SKILLS.STRENGTH, STUDY: META_SKILLS.INTELLECT, CHORES: META_SKILLS.STEWARDSHIP, SELF_CARE: META_SKILLS.RESILIENCE, CREATIVE: META_SKILLS.ARTISTRY };

    const GAME_DATA = {
        SKILLS: {
            woodcutting: { name: 'Woodcutting', type: 'gathering', icon: 'fa-tree', theme: 'woodcutting' },
            mining: { name: 'Mining', type: 'gathering', icon: 'fa-gem', theme: 'mining' },
            fishing: { name: 'Fishing', type: 'gathering', icon: 'fa-fish', theme: 'fishing' },
            farming: { name: 'Farming', type: 'gathering', icon: 'fa-seedling', theme: 'farming' },
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
            earth_rune: { name: 'Earth Rune', icon: '🪨' },
            fire_rune: { name: 'Fire Rune', icon: '🔥' },
            body_rune: { name: 'Body Rune', icon: '🏋️' },
            cosmic_rune: { name: 'Cosmic Rune', icon: '🌌' },
            chaos_rune: { name: 'Chaos Rune', icon: '☄️' },
            nature_rune: { name: 'Nature Rune', icon: '🍃' },
            law_rune: { name: 'Law Rune', icon: '⚖️' },
            death_rune: { name: 'Death Rune', icon: '💀' },
            blood_rune: { name: 'Blood Rune', icon: '🩸' },

            // Farming resources
            potato: { name: 'Potato', icon: '🥔' },
            wheat: { name: 'Wheat', icon: '🌾' },
            flax: { name: 'Flax', icon: '🪢' },
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
            fishing: [
                { id: 'shrimp_spot', name: 'Shrimp Spot', level: 1, xp: 8, output: { itemId: 'raw_shrimp', quantity: 1 }, baseTime: 4000 },
                { id: 'sardine_spot', name: 'Sardine Spot', level: 5, xp: 15, output: { itemId: 'raw_sardine', quantity: 1 }, baseTime: 4500 },
            ],
            farming: [
                { id: 'potato_patch', name: 'Potato Patch', level: 1, xp: 7, output: { itemId: 'potato', quantity: 1 }, baseTime: 4500 },
                { id: 'wheat_field', name: 'Wheat Field', level: 5, xp: 10, output: { itemId: 'wheat', quantity: 1 }, baseTime: 5000 },
                { id: 'flax_plot', name: 'Flax Plot', level: 10, xp: 13, output: { itemId: 'flax', quantity: 1 }, baseTime: 5200 },
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
        }
    };

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

            Object.keys(GAME_DATA.SKILLS).forEach(id => {
                this.player.skills[id] = new Skill(id, GAME_DATA.SKILLS[id].name);
                this.player.mastery[id] = {};
            });
            Object.values(META_SKILLS).forEach(name => { this.player.meta_skills[name] = new Skill(name, name); });

            // Worker systems: Mining Overseer, Fishing Harbor, Farming Estate
            this.workers = {
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
                }
            };
            // Seed worker action keys
            (GAME_DATA.ACTIONS.mining || []).forEach(a => { this.workers.mining.assigned[a.id] = 0; this.workers.mining.progress[a.id] = 0; });
            (GAME_DATA.ACTIONS.fishing || []).forEach(a => { this.workers.fishing.assigned[a.id] = 0; this.workers.fishing.progress[a.id] = 0; });
            (GAME_DATA.ACTIONS.farming || []).forEach(a => { this.workers.farming.assigned[a.id] = 0; this.workers.farming.progress[a.id] = 0; });
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
                if (now >= action.endTime) { this.stopAction(); }
            }

            // Combat loop
            if (this.state.combat.inCombat && this.state.combat.enemy) {
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

            // Passive workers
            this.processWorkers(delta);

            this.uiManager.updateDynamicElements();
        }

        calculateActionTime(action) {
            let time = action.baseTime;
            const stewardshipBonus = 1 - (this.state.player.meta_skills[META_SKILLS.STEWARDSHIP].level - 1) * 0.01; time *= stewardshipBonus;
            const mastery = this.getMastery(action.skillId, action.id); const masteryBonus = 1 - (mastery.level * 0.002); time *= masteryBonus;
            return time;
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

        startAction(skillId, actionId, durationMinutes) {
            if (this.state.activeAction) return;
            const cost = durationMinutes; if (this.state.player.stamina < cost) { this.uiManager.showModal('Not Enough Stamina', "<p>You don't have enough stamina to perform this action for that long.</p>"); return; }
            this.state.player.stamina -= cost;
            let actionData;
            if (GAME_DATA.ACTIONS[skillId]) actionData = GAME_DATA.ACTIONS[skillId].find(a => a.id === actionId);
            if (GAME_DATA.RECIPES[skillId]) actionData = GAME_DATA.RECIPES[skillId].find(a => a.id === actionId);
            this.state.activeAction = { ...actionData, skillId: skillId, startTime: Date.now(), endTime: Date.now() + durationMinutes * 60 * 1000, progress: 0 };
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
        addGold(amount) { const final = Math.floor(amount * this.goldMultiplier()); this.state.player.gold += final; }
        spendGold(amount) { if (this.state.player.gold < amount) return false; this.state.player.gold -= amount; return true; }

        addToBank(itemId, quantity) { this.state.bank[itemId] = (this.state.bank[itemId] || 0) + quantity; }
        removeFromBank(itemId, quantity) { this.state.bank[itemId] -= quantity; if (this.state.bank[itemId] <= 0) { delete this.state.bank[itemId]; } }

        // Worker systems
        ensureWorkerState() {
            if (!this.state.workers) {
                this.state.workers = {
                    mining: { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0, depthLevel: 0, cartLevel: 0 }, assigned: {}, progress: {} },
                    fishing: { total: 0, boats: 0, upgrades: { netLevel: 0, baitLevel: 0, boatLevel: 0 }, assigned: {}, progress: {} },
                    farming: { total: 0, upgrades: { irrigationLevel: 0, toolsLevel: 0, compostLevel: 0, tractorLevel: 0 }, assigned: {}, progress: {} },
                };
            }
            if (!this.state.workers.mining) this.state.workers.mining = { total: 0, upgrades: { speedLevel: 0, yieldLevel: 0, depthLevel: 0, cartLevel: 0 }, assigned: {}, progress: {} };
            if (!this.state.workers.fishing) this.state.workers.fishing = { total: 0, boats: 0, upgrades: { netLevel: 0, baitLevel: 0, boatLevel: 0 }, assigned: {}, progress: {} };
            if (!this.state.workers.farming) this.state.workers.farming = { total: 0, upgrades: { irrigationLevel: 0, toolsLevel: 0, compostLevel: 0, tractorLevel: 0 }, assigned: {}, progress: {} };
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
        }

        getHireCost(skillId) {
            if (skillId === 'mining') {
                const base = 200; const growth = 1.25; const owned = this.state.workers.mining.total || 0; return Math.floor(base * Math.pow(growth, owned));
            }
            if (skillId === 'fishing') {
                const base = 150; const growth = 1.22; const owned = this.state.workers.fishing.total || 0; return Math.floor(base * Math.pow(growth, owned));
            }
            if (skillId === 'farming') {
                const base = 180; const growth = 1.23; const owned = this.state.workers.farming.total || 0; return Math.floor(base * Math.pow(growth, owned));
            }
            return 0;
        }
        getUpgradeCost(skillId, type) {
            if (skillId === 'mining') {
                const w = this.state.workers.mining;
                const level = type === 'speed' ? (w.upgrades.speedLevel || 0) : type === 'yield' ? (w.upgrades.yieldLevel || 0) : type === 'depth' ? (w.upgrades.depthLevel || 0) : (w.upgrades.cartLevel || 0);
                const base = type === 'speed' ? 250 : type === 'yield' ? 250 : type === 'depth' ? 400 : 300;
                const growth = 1.45; return Math.floor(base * Math.pow(growth, level));
            }
            if (skillId === 'fishing') {
                const w = this.state.workers.fishing;
                const level = type === 'net' ? (w.upgrades.netLevel || 0) : type === 'bait' ? (w.upgrades.baitLevel || 0) : (w.upgrades.boatLevel || 0);
                const base = type === 'net' ? 180 : type === 'bait' ? 220 : 260; const growth = 1.4; return Math.floor(base * Math.pow(growth, level));
            }
            if (skillId === 'farming') {
                const w = this.state.workers.farming;
                const level = type === 'irrigation' ? (w.upgrades.irrigationLevel || 0) : type === 'tools' ? (w.upgrades.toolsLevel || 0) : type === 'compost' ? (w.upgrades.compostLevel || 0) : (w.upgrades.tractorLevel || 0);
                const base = type === 'irrigation' ? 220 : type === 'tools' ? 200 : type === 'compost' ? 240 : 320;
                const growth = 1.42; return Math.floor(base * Math.pow(growth, level));
            }
            return 0;
        }
        getBoatCost() {
            const owned = this.state.workers.fishing.boats || 0; return Math.floor(400 * Math.pow(1.35, owned));
        }
        hireWorker(skillId) {
            const cost = this.getHireCost(skillId); if (!this.spendGold(cost)) { this.uiManager.showModal('Not Enough Gold', `<p>You need ${cost} gold to hire.</p>`); return; }
            if (skillId === 'mining') { this.state.workers.mining.total += 1; this.uiManager.showFloatingText('+1 Miner Hired', 'text-green-400'); }
            if (skillId === 'fishing') { this.state.workers.fishing.total += 1; this.uiManager.showFloatingText('+1 Angler Hired', 'text-green-400'); }
            if (skillId === 'farming') { this.state.workers.farming.total += 1; this.uiManager.showFloatingText('+1 Farmhand Hired', 'text-green-400'); }
            this.uiManager.renderView();
        }
        buyBoat() {
            const cost = this.getBoatCost(); if (!this.spendGold(cost)) { this.uiManager.showModal('Not Enough Gold', `<p>You need ${cost} gold to buy a boat.</p>`); return; }
            this.state.workers.fishing.boats += 1; this.uiManager.showFloatingText('+1 Boat Purchased', 'text-blue-300'); this.uiManager.renderView();
        }
        upgradeWorkers(skillId, type) {
            const cost = this.getUpgradeCost(skillId, type); if (!this.spendGold(cost)) { this.uiManager.showModal('Not Enough Gold', `<p>You need ${cost} gold to upgrade.</p>`); return; }
            if (skillId === 'mining') {
                if (type === 'speed') this.state.workers.mining.upgrades.speedLevel += 1;
                if (type === 'yield') this.state.workers.mining.upgrades.yieldLevel += 1;
                if (type === 'depth') this.state.workers.mining.upgrades.depthLevel += 1;
                if (type === 'cart') this.state.workers.mining.upgrades.cartLevel += 1;
                this.uiManager.showFloatingText('Mine Upgraded!', 'text-yellow-300');
            }
            if (skillId === 'fishing') {
                if (type === 'net') this.state.workers.fishing.upgrades.netLevel += 1;
                if (type === 'bait') this.state.workers.fishing.upgrades.baitLevel += 1;
                if (type === 'boat') this.state.workers.fishing.upgrades.boatLevel += 1;
                this.uiManager.showFloatingText('Harbor Upgraded!', 'text-yellow-300');
            }
            if (skillId === 'farming') {
                if (type === 'irrigation') this.state.workers.farming.upgrades.irrigationLevel += 1;
                if (type === 'tools') this.state.workers.farming.upgrades.toolsLevel += 1;
                if (type === 'compost') this.state.workers.farming.upgrades.compostLevel += 1;
                if (type === 'tractor') this.state.workers.farming.upgrades.tractorLevel += 1;
                this.uiManager.showFloatingText('Estate Upgraded!', 'text-yellow-300');
            }
            this.uiManager.renderView();
        }
        getWorkerSpeedMultiplier(skillId, action) {
            if (skillId === 'mining') {
                const s = this.state.workers.mining.upgrades.speedLevel || 0; const d = this.state.workers.mining.upgrades.depthLevel || 0;
                const timeMult = 1 / (1 + s * 0.12 + d * 0.05);
                return Math.max(0.4, timeMult);
            }
            if (skillId === 'fishing') {
                const s = this.state.workers.fishing.upgrades.boatLevel || 0; const boats = this.state.workers.fishing.boats || 0;
                const tide = this.getTideSpeedModifier();
                const timeMult = 1 / (1 + s * 0.1 + boats * 0.04);
                return Math.max(0.5, timeMult * tide);
            }
            if (skillId === 'farming') {
                const irr = this.state.workers.farming.upgrades.irrigationLevel || 0; const tr = this.state.workers.farming.upgrades.tractorLevel || 0;
                const timeMult = 1 / (1 + irr * 0.10 + tr * 0.06);
                return Math.max(0.5, timeMult);
            }
            return 1;
        }
        getWorkerYieldMultiplier(skillId, action) {
            if (skillId === 'mining') {
                const y = this.state.workers.mining.upgrades.yieldLevel || 0; const cart = this.state.workers.mining.upgrades.cartLevel || 0;
                return 1 + y * 0.15 + cart * 0.08;
            }
            if (skillId === 'fishing') {
                const net = this.state.workers.fishing.upgrades.netLevel || 0; const bait = this.state.workers.fishing.upgrades.baitLevel || 0;
                return 1 + net * 0.12 + bait * 0.06;
            }
            if (skillId === 'farming') {
                const tools = this.state.workers.farming.upgrades.toolsLevel || 0; const comp = this.state.workers.farming.upgrades.compostLevel || 0;
                return 1 + tools * 0.10 + comp * 0.08;
            }
            return 1;
        }
        getTideSpeedModifier() {
            const periodMs = 5 * 60 * 1000; // 5-minute tide cycle
            const phase = (Date.now() % periodMs) / periodMs; // 0..1
            const wave = Math.sin(phase * Math.PI * 2); // -1..1
            return 1 - wave * 0.08; // 0.92..1.08 inverted so low time mult at high tide
        }
        processWorkers(deltaMs) {
            // Mining
            const wm = this.state.workers?.mining; if (wm) {
                (GAME_DATA.ACTIONS.mining || []).forEach(action => {
                    const assigned = wm.assigned[action.id] || 0; if (assigned <= 0) return;
                    const perCycleTime = this.calculateActionTime({ ...action, skillId: 'mining' }) * this.getWorkerSpeedMultiplier('mining', action);
                    wm.progress[action.id] = (wm.progress[action.id] || 0) + deltaMs * assigned;
                    if (wm.progress[action.id] >= perCycleTime) {
                        const cycles = Math.floor(wm.progress[action.id] / perCycleTime);
                        wm.progress[action.id] %= perCycleTime;
                        if (action.output && action.output.itemId) {
                            const qty = Math.max(1, Math.floor(action.output.quantity * cycles * this.getWorkerYieldMultiplier('mining', action)));
                            this.addToBank(action.output.itemId, qty);
                            this.state.player.skills.mining.addXP(action.xp * cycles * 0.5, this);
                        }
                        // Rare cart haul: small chance to add extra ores
                        const extraChance = 2 + (this.state.workers.mining.upgrades.depthLevel || 0) * 0.5;
                        for (let i = 0; i < cycles; i++) {
                            if (Math.random() * 100 < extraChance) this.addToBank(action.output.itemId, 1);
                        }
                    }
                });
            }
            // Fishing
            const wf = this.state.workers?.fishing; if (wf) {
                (GAME_DATA.ACTIONS.fishing || []).forEach(action => {
                    const assigned = wf.assigned[action.id] || 0; if (assigned <= 0) return;
                    const perCycleTime = this.calculateActionTime({ ...action, skillId: 'fishing' }) * this.getWorkerSpeedMultiplier('fishing', action);
                    wf.progress[action.id] = (wf.progress[action.id] || 0) + deltaMs * assigned;
                    if (wf.progress[action.id] >= perCycleTime) {
                        const cycles = Math.floor(wf.progress[action.id] / perCycleTime);
                        wf.progress[action.id] %= perCycleTime;
                        if (action.output && action.output.itemId) {
                            const qty = Math.max(1, Math.floor(action.output.quantity * cycles * this.getWorkerYieldMultiplier('fishing', action)));
                            this.addToBank(action.output.itemId, qty);
                            this.state.player.skills.fishing.addXP(action.xp * cycles * 0.5, this);
                        }
                    }
                });
            }
            // Farming
            const wfarm = this.state.workers?.farming; if (wfarm) {
                (GAME_DATA.ACTIONS.farming || []).forEach(action => {
                    const assigned = wfarm.assigned[action.id] || 0; if (assigned <= 0) return;
                    const perCycleTime = this.calculateActionTime({ ...action, skillId: 'farming' }) * this.getWorkerSpeedMultiplier('farming', action);
                    wfarm.progress[action.id] = (wfarm.progress[action.id] || 0) + deltaMs * assigned;
                    if (wfarm.progress[action.id] >= perCycleTime) {
                        const cycles = Math.floor(wfarm.progress[action.id] / perCycleTime);
                        wfarm.progress[action.id] %= perCycleTime;
                        if (action.output && action.output.itemId) {
                            const qty = Math.max(1, Math.floor(action.output.quantity * cycles * this.getWorkerYieldMultiplier('farming', action)));
                            this.addToBank(action.output.itemId, qty);
                            this.state.player.skills.farming.addXP(action.xp * cycles * 0.5, this);
                        }
                    }
                });
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
            const staminaGained = Math.floor(10 * multiplier); this.state.player.stamina = Math.min(this.state.player.staminaMax, this.state.player.stamina + staminaGained); this.uiManager.showFloatingText(`+${staminaGained} Stamina`, 'text-green-400');
            const xpGained = Math.floor(20 * multiplier); const metaSkill = this.state.player.meta_skills[metaSkillCategory]; if (metaSkill) { metaSkill.addXP(xpGained, this); }
            this.uiManager.render();
        }

        // Meta Skill training (interactive)
        trainMetaSkill(skillName, intensity) {
            const intensityMap = {
                spark: { stamina: 5, xp: 15 },
                focus: { stamina: 12, xp: 40 },
                surge: { stamina: 25, xp: 100 },
            };
            const config = intensityMap[intensity];
            if (!config) return;
            if (this.state.player.stamina < config.stamina) {
                this.uiManager.showModal('Not Enough Stamina', '<p>You need more stamina to train this skill.</p>');
                return;
            }
            this.state.player.stamina -= config.stamina;
            const skill = this.state.player.meta_skills[skillName];
            if (!skill) return;
            skill.addXP(config.xp, this);
            this.uiManager.showFloatingText(`${skillName} +${config.xp} XP`, 'text-blue-300');
            this.uiManager.renderView();
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
                if (pick.type === 'runes') { const amt = pick.amount; this.state.player.runes += amt; rewards.push(`+${amt} Runes`); }
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
        eatFood(itemId) {
            const item = GAME_DATA.ITEMS[itemId]; if (!item || !item.heals) return; if ((this.state.bank[itemId] || 0) <= 0) return;
            this.removeFromBank(itemId, 1); this.state.player.hp = Math.min(this.state.player.hpMax, this.state.player.hp + item.heals); this.uiManager.showFloatingText(`+${item.heals} HP`, 'text-green-300'); this.uiManager.renderView();
        }
        equipWeapon(itemId) { if (!GAME_DATA.ITEMS[itemId]) return; if ((this.state.bank[itemId] || 0) <= 0) return; this.state.player.weapon = itemId; this.uiManager.renderView(); }

        saveGame() { try { localStorage.setItem('chimeraSaveData_web_v1', JSON.stringify(this.state)); } catch (e) { console.error('Failed to save game:', e); } }
        loadGame() {
            const savedData = localStorage.getItem('chimeraSaveData_web_v1');
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    Object.assign(this.state, parsedData);
                    // Rehydrate skill objects
                    Object.keys(GAME_DATA.SKILLS).forEach(id => { const skill = new Skill(id, GAME_DATA.SKILLS[id].name); if (parsedData.player.skills?.[id]) Object.assign(skill, parsedData.player.skills[id]); this.state.player.skills[id] = skill; });
                    Object.values(META_SKILLS).forEach(name => { const skill = new Skill(name, name); if (parsedData.player.meta_skills?.[name]) Object.assign(skill, parsedData.player.meta_skills[name]); this.state.player.meta_skills[name] = skill; });
                    // Rehydrate mastery
                    Object.keys(parsedData.player.mastery || {}).forEach(skillId => {
                        if (!this.state.player.mastery[skillId]) this.state.player.mastery[skillId] = {};
                        Object.keys(parsedData.player.mastery[skillId]).forEach(actionId => { const mastery = new Mastery(); Object.assign(mastery, parsedData.player.mastery[skillId][actionId]); this.state.player.mastery[skillId][actionId] = mastery; });
                    });
                    // Ensure worker structures exist
                    this.ensureWorkerState();
                    this.state.lastUpdate = Date.now();
                } catch (e) { console.error('Failed to load game, starting new.', e); this.state = new GameState(); }
            }
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
        attachSidebarEventListeners() { document.querySelectorAll('.sidebar-link, .mobile-nav-link').forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); this.currentView = link.dataset.view; this.render(); if (this._closeMobileSidebar) this._closeMobileSidebar(); }); }); }

        updateHeaderBars() {
            const goldDisplay = document.getElementById('gold-display'); if (goldDisplay) goldDisplay.textContent = Math.floor(this.game.state.player.gold).toLocaleString();
            const runesDisplay = document.getElementById('runes-display'); if (runesDisplay) runesDisplay.textContent = Math.floor(this.game.state.player.runes).toLocaleString();
            const staminaFill = document.getElementById('stamina-bar-fill'); const staminaValue = document.getElementById('stamina-value'); if (staminaFill && staminaValue) { const s = this.game.state.player; staminaFill.style.width = `${(s.stamina / s.staminaMax) * 100}%`; staminaValue.textContent = `${Math.floor(s.stamina)}/${s.staminaMax}`; }
        }
        updateSidebarActive() { document.querySelectorAll('.sidebar-link').forEach(link => { link.classList.toggle('active', link.dataset.view === this.currentView); }); document.querySelectorAll('.mobile-nav-link').forEach(link => { const isActive = link.dataset.view === this.currentView; link.classList.toggle('text-blue-400', isActive); link.classList.toggle('text-secondary', !isActive); }); }

        updateDynamicElements() {
            document.getElementById('gold-display').textContent = Math.floor(this.game.state.player.gold).toLocaleString();
            const runesEl = document.getElementById('runes-display'); if (runesEl) { const totalRunes = (this.game.state.player.runes || 0) + this.game.getTotalRuneItemCount(); runesEl.textContent = totalRunes.toLocaleString(); }
            const stamina = this.game.state.player.stamina; const staminaMax = this.game.state.player.staminaMax;
            document.getElementById('stamina-value').textContent = `${Math.floor(stamina)}/${staminaMax}`; document.getElementById('stamina-bar-fill').style.width = `${(stamina / staminaMax) * 100}%`;
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
            const now = Date.now(); const timeElapsed = now - action.startTime; const totalDuration = action.endTime - action.startTime; const percentComplete = (timeElapsed / totalDuration) * 100;
            const skillData = GAME_DATA.SKILLS[action.skillId]; const actionTime = this.game.calculateActionTime(action); const xpPerHour = (3600000 / actionTime) * action.xp;
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
                    case 'clicker': html = this.renderClickerView(); break;
                    case 'spellbook': html = this.renderSpellbookView(); break;
                    case 'shop': html = this.renderShopView(); break;
                }
            }
            this.mainContent.innerHTML = html; this.attachViewEventListeners();
        }

        renderDashboardView() {
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
            if (skillData.type === 'gathering') { actionType = 'Start'; contentHtml = GAME_DATA.ACTIONS[skillId].map(action => this.renderActionCard(skillId, action, actionType)).join(''); }
            else if (skillData.type === 'artisan') {
                actionType = 'Craft'; if (skillId === 'firemaking') { contentHtml = this.renderFiremakingView(); }
                else { contentHtml = GAME_DATA.RECIPES[skillId].map(recipe => this.renderActionCard(skillId, recipe, actionType)).join(''); }
            }
            const managerPanel = skillId === 'mining' ? this.renderMiningPanel() : (skillId === 'fishing' ? this.renderFishingPanel() : (skillId === 'farming' ? this.renderFarmingPanel() : ''));
            return `<h1 class="text-2xl font-semibold text-white mb-4">${skillData.name} <span class="text-base text-secondary">(Level ${playerSkill.level})</span></h1>${managerPanel}<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">${contentHtml}</div>`;
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
                    ${skillId === 'mining' ? this.renderMiningAssign(action) : ''}
                    ${skillId === 'fishing' ? this.renderFishingAssign(action) : ''}
                    ${skillId === 'farming' ? this.renderFarmingAssign(action) : ''}
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
        renderMiningAssign(action) {
            const wm = this.game.state.workers.mining; const assigned = wm.assigned[action.id] || 0; const total = wm.total; const sumAssigned = Object.values(wm.assigned).reduce((a,b)=>a+b,0); const free = Math.max(0, total - sumAssigned);
            const speedMult = this.game.getWorkerSpeedMultiplier('mining', action); const yieldMult = this.game.getWorkerYieldMultiplier('mining', action);
            return `
                <div class="mt-3 p-2 rounded-md bg-black/30 border border-border-color">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-secondary">Miners Assigned: <span class="text-white font-mono">${assigned}</span> / Free: <span class="text-white font-mono">${free}</span></span>
                        <div class="space-x-1">
                            <button class="assign-mining-worker-btn chimera-button px-2 py-1 rounded" data-action-id="${action.id}" data-dir="-1">-</button>
                            <button class="assign-mining-worker-btn chimera-button px-2 py-1 rounded" data-action-id="${action.id}" data-dir="+1">+</button>
                        </div>
                    </div>
                    <p class="text-[11px] text-secondary mt-1">Eff: x${yieldMult.toFixed(2)} yield, ${Math.round(100 - speedMult*100)}% faster</p>
                </div>
            `;
        }

        renderFishingPanel() {
            const wf = this.game.state.workers.fishing; const hireCost = this.game.getHireCost('fishing'); const boatCost = this.game.getBoatCost();
            const netCost = this.game.getUpgradeCost('fishing', 'net'); const baitCost = this.game.getUpgradeCost('fishing', 'bait'); const boatUpCost = this.game.getUpgradeCost('fishing', 'boat');
            const tideMult = this.game.getTideSpeedModifier(); const tidePct = Math.round((1 / tideMult) * 100) - 100; // higher is better (faster)
            return `
                <div class="block p-4 mb-4 border border-fishing">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <h2 class="text-lg font-bold">Harbor & Fleet</h2>
                            <p class="text-secondary text-sm">Manage Anglers and Boats. Nets and bait boost your catches. Tides affect speed.</p>
                            <p class="text-white text-sm mt-1">Anglers: <span class="font-bold">${wf.total}</span> • Boats: <span class="font-bold">${wf.boats}</span></p>
                            <p class="text-blue-300 text-xs">Tide bonus: ${tidePct >= 0 ? '+' : ''}${tidePct}% speed</p>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-2">
                            <button id="hire-angler" class="chimera-button px-3 py-2 rounded-md">Hire Angler — Cost: ${hireCost} gold</button>
                            <button id="buy-fishing-boat" class="chimera-button px-3 py-2 rounded-md">Buy Boat — Cost: ${boatCost} gold</button>
                            <button id="upgrade-fishing-net" class="chimera-button px-3 py-2 rounded-md">Reinforced Nets (L${wf.upgrades.netLevel}) — Cost: ${netCost} gold</button>
                            <button id="upgrade-fishing-bait" class="chimera-button px-3 py-2 rounded-md">Premium Bait (L${wf.upgrades.baitLevel}) — Cost: ${baitCost} gold</button>
                            <button id="upgrade-fishing-boat" class="chimera-button px-3 py-2 rounded-md">Boat Fittings (L${wf.upgrades.boatLevel}) — Cost: ${boatUpCost} gold</button>
                        </div>
                    </div>
                </div>
            `;
        }
        renderFishingAssign(action) {
            const wf = this.game.state.workers.fishing; const assigned = wf.assigned[action.id] || 0; const total = wf.total; const sumAssigned = Object.values(wf.assigned).reduce((a,b)=>a+b,0); const free = Math.max(0, total - sumAssigned);
            const speedMult = this.game.getWorkerSpeedMultiplier('fishing', action); const yieldMult = this.game.getWorkerYieldMultiplier('fishing', action);
            return `
                <div class="mt-3 p-2 rounded-md bg-black/30 border border-border-color">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-secondary">Anglers Assigned: <span class="text-white font-mono">${assigned}</span> / Free: <span class="text-white font-mono">${free}</span></span>
                        <div class="space-x-1">
                            <button class="assign-fishing-worker-btn chimera-button px-2 py-1 rounded" data-action-id="${action.id}" data-dir="-1">-</button>
                            <button class="assign-fishing-worker-btn chimera-button px-2 py-1 rounded" data-action-id="${action.id}" data-dir="+1">+</button>
                        </div>
                    </div>
                    <p class="text-[11px] text-secondary mt-1">Eff: x${yieldMult.toFixed(2)} yield, ${Math.round(100 - speedMult*100)}% faster</p>
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

        renderBankView() {
            let itemsHtml = Object.entries(this.game.state.bank).map(([itemId, quantity]) => { const itemData = GAME_DATA.ITEMS[itemId]; if (!itemData) return ''; return `<div class="block p-2 flex flex-col items-center justify-center text-center tooltip"><span class="tooltiptext">${itemData.name}</span><span class="text-3xl">${itemData.icon || '❔'}</span><span class="font-mono text-white mt-1">${quantity.toLocaleString()}</span></div>`; }).join('');
            if (itemsHtml === '') { itemsHtml = `<p class="text-secondary col-span-full text-center">Your bank is empty. Gather some resources!</p>`; }
            return `<h1 class="text-2xl font-semibold text-white mb-4">Bank</h1><div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">${itemsHtml}</div>`;
        }

        renderMetaSkillsView() {
            const colorFor = (name) => ({
                [META_SKILLS.STRENGTH]: 'var(--accent-green)',
                [META_SKILLS.INTELLECT]: 'var(--accent-blue)',
                [META_SKILLS.STEWARDSHIP]: '#ffc107',
                [META_SKILLS.RESILIENCE]: '#2dd4bf',
                [META_SKILLS.ARTISTRY]: '#a78bfa',
            })[name] || 'var(--accent-blue)';

            const bonusFor = (skill) => {
                switch (skill.name) {
                    case META_SKILLS.STRENGTH: return 'Increases combat damage';
                    case META_SKILLS.INTELLECT: return 'Boosts Artisan XP gain';
                    case META_SKILLS.STEWARDSHIP: return `-${(skill.level - 1).toFixed(1)}% Gathering time`;
                    case META_SKILLS.RESILIENCE: return `+${((skill.level - 1) * 5).toFixed(1)}% Stamina regen`;
                    case META_SKILLS.ARTISTRY: return 'More Gold from all sources';
                    default: return '';
                }
            };

            const skillsHtml = Object.values(this.game.state.player.meta_skills).map(skill => {
                const pct = skill.xpToNextLevel > 0 ? (skill.currentXP / skill.xpToNextLevel) : 0;
                const ringColor = colorFor(skill.name);
                const bonusText = bonusFor(skill);
                return `
                <div class="block p-4 meskill-card" data-skill-name="${skill.name}">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="text-lg font-bold">${skill.name}</h3>
                        <span class="meskill-badge">Lvl ${skill.level}</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="ring" style="--ring-pct:${pct}; --ring-color:${ringColor}">
                            <div class="ring-center">
                                <div class="text-base font-bold">L${skill.level}</div>
                                <div class="text-[10px] text-secondary">${Math.floor(skill.currentXP)} / ${skill.xpToNextLevel}</div>
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-secondary">${bonusText}</p>
                            <div class="w-full xp-bar-bg rounded-full h-2 my-2"><div class="xp-bar-fill h-2 rounded-full" style="width:${pct * 100}%"></div></div>
                            <div class="mt-2 grid grid-cols-3 gap-2">
                                <button class="meskill-train-btn chimera-button px-2 py-1 rounded-md" data-skill="${skill.name}" data-intensity="spark">Spark</button>
                                <button class="meskill-train-btn chimera-button px-2 py-1 rounded-md" data-skill="${skill.name}" data-intensity="focus">Focus</button>
                                <button class="meskill-train-btn chimera-button px-2 py-1 rounded-md" data-skill="${skill.name}" data-intensity="surge">Surge</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }).join('');

            return `
                <h1 class="text-2xl font-semibold text-white mb-2">Meta Skills</h1>
                <p class="text-secondary mb-4">Complete real-life tasks or spend Stamina to actively train these skills.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${skillsHtml}</div>
            `;
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
            const c = this.game.state.clicker;
            const clickIncome = c.goldPerClick * this.game.goldMultiplier();
            const upgradeCost = (lvl, base) => Math.floor(base * Math.pow(1.35, lvl));
            const clickCost = upgradeCost(c.upgrades.clickPowerLevel, 50);
            const autoCost = upgradeCost(c.upgrades.autoClickerLevel, 100);
            const multCost = upgradeCost(c.upgrades.multiplierLevel, 250);
            return `
                <h1 class="text-2xl font-semibold text-white mb-4">Clicker</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="block p-6 flex flex-col items-center justify-center space-y-4">
                        <button id="big-cookie" class="chimera-button rounded-full w-40 h-40 flex items-center justify-center text-2xl">+${Math.floor(clickIncome)} Gold</button>
                        <p class="text-secondary">Auto: ${c.autoClickers} x/${(1000 / c.autoRateMs).toFixed(1)}s, Power: ${c.goldPerClick}</p>
                    </div>
                    <div class="block p-4 space-y-3">
                        <h2 class="text-lg font-bold">Upgrades</h2>
                        <button id="upgrade-click" class="chimera-button px-3 py-2 rounded-md w-full text-left">Increase Click Power (+1) — Cost: ${clickCost} gold</button>
                        <button id="upgrade-auto" class="chimera-button px-3 py-2 rounded-md w-full text-left">Buy Autoclicker (+1) — Cost: ${autoCost} gold</button>
                        <button id="upgrade-mult" class="chimera-button px-3 py-2 rounded-md w-full text-left">Sharpen Tools (Power x1.2) — Cost: ${multCost} gold</button>
                    </div>
                </div>
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

        attachViewEventListeners() {
            const addTaskBtn = document.getElementById('add-task-btn'); if (addTaskBtn) { addTaskBtn.addEventListener('click', () => { const category = document.getElementById('task-category-select').value; const difficulty = document.getElementById('task-difficulty-select').value; this.game.completeRealLifeTask(category, difficulty); const n = document.getElementById('task-name-input'); if (n) n.value = ''; }); }
            document.querySelectorAll('.start-action-btn').forEach(btn => { btn.addEventListener('click', () => { const duration = parseInt(prompt('Enter duration in minutes:', '15'), 10); if (isNaN(duration) || duration <= 0) return; this.game.startAction(btn.dataset.skillId, btn.dataset.actionId, duration); }); });
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

            // Meta Skills interactions
            document.querySelectorAll('.meskill-train-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.game.trainMetaSkill(btn.dataset.skill, btn.dataset.intensity);
                });
            });

            // 3D tilt on Meta Skill cards
            document.querySelectorAll('.meskill-card').forEach(card => {
                const onMove = (e) => {
                    const r = card.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width;
                    const py = (e.clientY - r.top) / r.height;
                    const rotY = (px - 0.5) * 10;
                    const rotX = (0.5 - py) * 10;
                    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
                };
                card.addEventListener('mousemove', onMove);
                card.addEventListener('mouseleave', () => { card.style.transform = ''; });
            });

            // Combat
            document.querySelectorAll('.start-combat-btn').forEach(btn => { btn.addEventListener('click', () => this.game.startCombat(btn.dataset.enemyId)); });
            const endBtn = document.getElementById('end-combat-btn'); if (endBtn) endBtn.addEventListener('click', () => this.game.endCombat(false));
            document.querySelectorAll('.eat-food-btn').forEach(btn => { btn.addEventListener('click', () => this.game.eatFood(btn.dataset.itemId)); });
            document.querySelectorAll('.equip-weapon-btn').forEach(btn => { btn.addEventListener('click', () => this.game.equipWeapon(btn.dataset.itemId)); });

            // Clicker
            const big = document.getElementById('big-cookie'); if (big) big.addEventListener('click', () => this.game.addGold(this.game.state.clicker.goldPerClick));
            const c = this.game.state.clicker; const upgradeCost = (lvl, base) => Math.floor(base * Math.pow(1.35, lvl));
            const upClick = document.getElementById('upgrade-click'); if (upClick) upClick.addEventListener('click', () => { const cost = upgradeCost(c.upgrades.clickPowerLevel, 50); if (!this.game.spendGold(cost)) return; c.upgrades.clickPowerLevel++; c.goldPerClick += 1; this.renderView(); });
            const upAuto = document.getElementById('upgrade-auto'); if (upAuto) upAuto.addEventListener('click', () => { const cost = upgradeCost(c.upgrades.autoClickerLevel, 100); if (!this.game.spendGold(cost)) return; c.upgrades.autoClickerLevel++; c.autoClickers += 1; this.renderView(); });
            const upMult = document.getElementById('upgrade-mult'); if (upMult) upMult.addEventListener('click', () => { const cost = upgradeCost(c.upgrades.multiplierLevel, 250); if (!this.game.spendGold(cost)) return; c.upgrades.multiplierLevel++; c.goldPerClick = Math.max(1, Math.floor(c.goldPerClick * 1.2)); this.renderView(); });

            // Spells
            document.querySelectorAll('.cast-spell-btn').forEach(btn => { btn.addEventListener('click', () => this.game.castSpell(btn.dataset.spellId)); });
            // Shop
            document.querySelectorAll('.buy-chest-btn').forEach(btn => { btn.addEventListener('click', () => this.game.buyChest(btn.dataset.chestId)); });

            // Mining manager
            const hireMiner = document.getElementById('hire-miner'); if (hireMiner) hireMiner.addEventListener('click', () => this.game.hireWorker('mining'));
            const upMS = document.getElementById('upgrade-mining-speed'); if (upMS) upMS.addEventListener('click', () => this.game.upgradeWorkers('mining', 'speed'));
            const upMY = document.getElementById('upgrade-mining-yield'); if (upMY) upMY.addEventListener('click', () => this.game.upgradeWorkers('mining', 'yield'));
            const upMD = document.getElementById('upgrade-mining-depth'); if (upMD) upMD.addEventListener('click', () => this.game.upgradeWorkers('mining', 'depth'));
            const upMC = document.getElementById('upgrade-mining-cart'); if (upMC) upMC.addEventListener('click', () => this.game.upgradeWorkers('mining', 'cart'));
            document.querySelectorAll('.assign-mining-worker-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.actionId; const dir = btn.dataset.dir === '+1' ? 1 : -1; const wm = this.game.state.workers.mining;
                    const sumAssigned = Object.values(wm.assigned).reduce((a,b)=>a+b,0);
                    const free = Math.max(0, wm.total - sumAssigned);
                    if (dir === 1 && free <= 0) return; if (dir === -1 && (wm.assigned[id] || 0) <= 0) return;
                    wm.assigned[id] = Math.max(0, (wm.assigned[id] || 0) + dir);
                    this.renderView();
                });
            });

            // Fishing harbor
            const hireAngler = document.getElementById('hire-angler'); if (hireAngler) hireAngler.addEventListener('click', () => this.game.hireWorker('fishing'));
            const buyBoat = document.getElementById('buy-fishing-boat'); if (buyBoat) buyBoat.addEventListener('click', () => this.game.buyBoat());
            const upFN = document.getElementById('upgrade-fishing-net'); if (upFN) upFN.addEventListener('click', () => this.game.upgradeWorkers('fishing', 'net'));
            const upFB = document.getElementById('upgrade-fishing-bait'); if (upFB) upFB.addEventListener('click', () => this.game.upgradeWorkers('fishing', 'bait'));
            const upFO = document.getElementById('upgrade-fishing-boat'); if (upFO) upFO.addEventListener('click', () => this.game.upgradeWorkers('fishing', 'boat'));
            document.querySelectorAll('.assign-fishing-worker-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.actionId; const dir = btn.dataset.dir === '+1' ? 1 : -1; const wf = this.game.state.workers.fishing;
                    const sumAssigned = Object.values(wf.assigned).reduce((a,b)=>a+b,0);
                    const free = Math.max(0, wf.total - sumAssigned);
                    if (dir === 1 && free <= 0) return; if (dir === -1 && (wf.assigned[id] || 0) <= 0) return;
                    wf.assigned[id] = Math.max(0, (wf.assigned[id] || 0) + dir);
                    this.renderView();
                });
            });

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
        }

        showModal(title, content) {
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
    }

    const game = new GameManager(); game.init(); window.chimeraGame = game;
});