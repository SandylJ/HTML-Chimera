document.addEventListener('DOMContentLoaded', () => {
    const META_SKILLS = { STRENGTH: 'Strength', INTELLECT: 'Intellect', STEWARDSHIP: 'Stewardship', RESILIENCE: 'Resilience', ARTISTRY: 'Artistry' };
    const TASK_CATEGORIES = { FITNESS: META_SKILLS.STRENGTH, STUDY: META_SKILLS.INTELLECT, CHORES: META_SKILLS.STEWARDSHIP, SELF_CARE: META_SKILLS.RESILIENCE, CREATIVE: META_SKILLS.ARTISTRY };

    const GAME_DATA = {
        SKILLS: {
            woodcutting: { name: 'Woodcutting', type: 'gathering', icon: 'fa-tree', theme: 'woodcutting' },
            mining: { name: 'Mining', type: 'gathering', icon: 'fa-gem', theme: 'mining' },
            fishing: { name: 'Fishing', type: 'gathering', icon: 'fa-fish', theme: 'fishing' },
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
            this.combat = {
                inCombat: false,
                enemy: null,
                lastPlayerAttack: 0,
                lastEnemyAttack: 0,
                playerAttackSpeedMs: 1600,
                comboCount: 0,
                lastComboHit: 0,
                ultimateCharge: 0, // 0..100
                cooldowns: { quickStrike: 0, guard: 0 }
            };

            // Clicker state
            this.clicker = { goldPerClick: 1, autoClickers: 0, autoRateMs: 1000, lastAutoTick: Date.now(), upgrades: { clickPowerLevel: 0, autoClickerLevel: 0, multiplierLevel: 0 } };

            Object.keys(GAME_DATA.SKILLS).forEach(id => {
                this.player.skills[id] = new Skill(id, GAME_DATA.SKILLS[id].name);
                this.player.mastery[id] = {};
            });
            Object.values(META_SKILLS).forEach(name => { this.player.meta_skills[name] = new Skill(name, name); });
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
                    // Crit + combo
                    const crit = this.rollCrit();
                    let finalDmg = dmg * (crit ? 1.75 : 1);
                    finalDmg = Math.floor(finalDmg * this.applyComboMultiplier(now));
                    e.hp = Math.max(0, e.hp - finalDmg);
                    const flyType = crit ? 'fly-crit' : 'fly-damage';
                    this.uiManager.showFloatingText(`-${finalDmg} ${e.name}`, `text-red-400 ${flyType}`);
                    this.uiManager.shakeScreen(crit ? 1 : 0.6);
                    this.incrementCombo(now);
                    this.gainUltimate(finalDmg);
                    this.uiManager.logBattle(crit ? `Critical hit for ${finalDmg}!` : `Hit for ${finalDmg}.`, crit ? 'good' : 'neutral');
                    if (e.hp <= 0) { this.handleEnemyDefeat(e); }
                }
                // Enemy attack
                if (now - this.state.combat.lastEnemyAttack >= e.attackSpeedMs) {
                    this.state.combat.lastEnemyAttack = now; let enemyDmg = Math.max(0, Math.floor(e.attack - (this.state.player.meta_skills[META_SKILLS.RESILIENCE].level - 1) * 0.5));
                    if (this.hasBuff('guard')) { enemyDmg = Math.floor(enemyDmg * 0.5); this.uiManager.logBattle('Guard absorbed part of the damage.', 'neutral'); }
                    this.state.player.hp = Math.max(0, this.state.player.hp - enemyDmg); this.uiManager.showFloatingText(`-${enemyDmg} HP`, 'text-yellow-400 fly-damage'); this.uiManager.shakeScreen(0.5);
                    if (enemyDmg > 0) this.resetCombo();
                    if (this.state.player.hp <= 0) { this.endCombat(false); }
                }
            }

            // Clicker auto
            if (now - this.state.clicker.lastAutoTick >= this.state.clicker.autoRateMs) {
                this.state.clicker.lastAutoTick = now;
                const gps = this.state.clicker.autoClickers * this.state.clicker.goldPerClick;
                if (gps > 0) this.addGold(gps);
            }

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
            this.uiManager.showFloatingText(`${enemy.name} defeated!`, 'text-green-400 fly-level');
            this.uiManager.logBattle(`${enemy.name} defeated! +${g} gold.`, 'good');
            this.resetCombo(); this.state.combat.ultimateCharge = 0;
            this.endCombat(true);
        }
        rollCrit() { const base = 0.12; const artistryBonus = (this.state.player.meta_skills[META_SKILLS.ARTISTRY].level - 1) * 0.002; return Math.random() < (base + artistryBonus); }
        applyComboMultiplier(now) {
            const windowMs = 2200;
            const withinWindow = (now - this.state.combat.lastComboHit) <= windowMs;
            const combo = withinWindow ? this.state.combat.comboCount : 0;
            const mult = 1 + Math.min(0.5, combo * 0.03); // up to +50%
            return mult;
        }
        incrementCombo(now) { if (now - this.state.combat.lastComboHit <= 2200) { this.state.combat.comboCount++; } else { this.state.combat.comboCount = 1; } this.state.combat.lastComboHit = now; }
        resetCombo() { this.state.combat.comboCount = 0; this.state.combat.lastComboHit = 0; }
        gainUltimate(amount) { const gain = Math.max(1, Math.floor(amount * 0.6)); this.state.combat.ultimateCharge = Math.min(100, this.state.combat.ultimateCharge + gain); }

        // Abilities
        canUseQuickStrike() { return Date.now() > this.state.combat.cooldowns.quickStrike; }
        canUseGuard() { return Date.now() > this.state.combat.cooldowns.guard; }
        useQuickStrike() {
            if (!this.state.combat.inCombat || !this.state.combat.enemy) return; if (!this.canUseQuickStrike()) return;
            const e = this.state.combat.enemy; const dmgBase = this.calculatePlayerDamage(e); const dmg = Math.floor(dmgBase * 0.65);
            e.hp = Math.max(0, e.hp - dmg);
            this.state.combat.cooldowns.quickStrike = Date.now() + 4000;
            this.gainUltimate(dmg);
            this.uiManager.showFloatingText(`-${dmg} Quick!`, 'text-red-400 fly-damage'); this.uiManager.shakeScreen(0.6); this.uiManager.logBattle(`Quick Strike hit for ${dmg}.`, 'neutral');
            if (e.hp <= 0) this.handleEnemyDefeat(e); this.uiManager.renderView();
        }
        useGuard() {
            if (!this.state.combat.inCombat) return; if (!this.canUseGuard()) return;
            this.state.player.activeBuffs['guard'] = Date.now() + 5000; // 5s
            this.state.combat.cooldowns.guard = Date.now() + 9000;
            this.uiManager.showFloatingText('Guard Up!', 'text-blue-300 fly-xp'); this.uiManager.logBattle('You brace yourself behind your guard.', 'neutral'); this.uiManager.renderView();
        }
        useFinisher() {
            if (!this.state.combat.inCombat || !this.state.combat.enemy) return; if (this.state.combat.ultimateCharge < 100) return;
            const e = this.state.combat.enemy; const fin = Math.max(20, Math.floor(e.maxHp * 0.28));
            e.hp = Math.max(0, e.hp - fin);
            this.state.combat.ultimateCharge = 0; this.resetCombo();
            this.uiManager.showFloatingText(`-${fin} FINISH!`, 'text-yellow-300 fly-crit'); this.uiManager.shakeScreen(1.2); this.uiManager.logBattle(`Finisher slams for ${fin}!`, 'good');
            if (e.hp <= 0) this.handleEnemyDefeat(e); this.uiManager.renderView();
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
                    this.state.lastUpdate = Date.now();
                } catch (e) { console.error('Failed to load game, starting new.', e); this.state = new GameState(); }
            }
        }
    }

    class UIManager {
        constructor(game) {
            this.game = game; this.mainContent = document.getElementById('main-content'); this.modalBackdrop = document.getElementById('modal-backdrop'); this.modalContent = document.getElementById('modal-content'); this.floatingTextContainer = document.getElementById('floating-text-container'); this.currentView = 'dashboard';
        }
        init() { this.renderSidebar(); this.attachSidebarEventListeners(); this.render(); }
        renderSidebar() {
            const createLink = (skillId, skill) => `<a href="#" class="sidebar-link flex items-center p-3" data-view="${skillId}"><i class="fas ${skill.icon} w-6 text-center"></i><div class="flex-grow"><span>${skill.name}</span><div class="w-full xp-bar-bg rounded-full h-1.5 mt-1"><div id="sidebar-xp-${skillId}" class="xp-bar-fill h-1.5 rounded-full"></div></div></div></a>`;
            const gatheringHtml = Object.keys(GAME_DATA.SKILLS).filter(id => GAME_DATA.SKILLS[id].type === 'gathering').map(id => createLink(id, GAME_DATA.SKILLS[id])).join(''); document.getElementById('gathering-skills-nav').innerHTML = gatheringHtml;
            const artisanHtml = Object.keys(GAME_DATA.SKILLS).filter(id => GAME_DATA.SKILLS[id].type === 'artisan').map(id => createLink(id, GAME_DATA.SKILLS[id])).join(''); document.getElementById('artisan-skills-nav').innerHTML = artisanHtml;
        }
        attachSidebarEventListeners() { document.querySelectorAll('.sidebar-link').forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); this.currentView = link.dataset.view; this.render(); }); }); }
        render() { this.updateSidebarActive(); this.renderView(); }

        updateDynamicElements() {
            document.getElementById('gold-display').textContent = Math.floor(this.game.state.player.gold).toLocaleString();
            const runesEl = document.getElementById('runes-display'); if (runesEl) { const totalRunes = (this.game.state.player.runes || 0) + this.game.getTotalRuneItemCount(); runesEl.textContent = totalRunes.toLocaleString(); }
            const stamina = this.game.state.player.stamina; const staminaMax = this.game.state.player.staminaMax;
            document.getElementById('stamina-value').textContent = `${Math.floor(stamina)}/${staminaMax}`; document.getElementById('stamina-bar-fill').style.width = `${(stamina / staminaMax) * 100}%`;
            Object.keys(this.game.state.player.skills).forEach(id => { const skill = this.game.state.player.skills[id]; const xpBar = document.getElementById(`sidebar-xp-${id}`); if (xpBar) xpBar.style.width = `${(skill.currentXP / skill.xpToNextLevel) * 100}%`; });
            this.updateMasteryBar();
            // If in combat, update view footer elements
            if (this.currentView === 'combat') { this.renderCombatFooter(); this.updateCombatArena(); }
        }
        updateSidebarActive() { document.querySelectorAll('.sidebar-link').forEach(link => { link.classList.toggle('active', link.dataset.view === this.currentView); }); }

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
                <div class="block p-4">
                    <h2 class="text-lg font-bold text-white mb-3">Log Real-Life Task</h2>
                    <div id="add-task-form" class="space-y-3">
                        <input type="text" id="task-name-input" placeholder="e.g., 'Workout for 30 minutes'" class="w-full p-2 bg-primary border border-border-color rounded-md">
                        <div class="grid grid-cols-2 gap-3">
                            <select id="task-category-select" class="w-full p-2 bg-primary border border-border-color rounded-md">
                                ${Object.entries(TASK_CATEGORIES).map(([key, value]) => `<option value="${value}">${key.charAt(0) + key.slice(1).toLowerCase()} (${value})</option>`).join('')}
                            </select>
                            <select id="task-difficulty-select" class="w-full p-2 bg-primary border border-border-color rounded-md">
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                        <button id="add-task-btn" class="chimera-button w-full py-2 rounded-md font-bold">Complete Task & Gain Stamina</button>
                    </div>
                </div>
                <div class="block p-4 mt-4">
                    <h2 class="text-lg font-bold text-white mb-3">How to Play</h2>
                    <ol class="text-secondary list-decimal list-inside space-y-1">
                        <li>Complete real-life tasks here to earn <strong>Stamina</strong>.</li>
                        <li>Use Gathering to gain resources; Artisan to craft gear and boosts.</li>
                        <li>Fight in <strong>Combat</strong> using your crafted gear and food.</li>
                        <li>Click in <strong>Clicker</strong> to generate Gold and unlock upgrades.</li>
                        <li>Cast spells in <strong>Spellbook</strong>, buy and open <strong>Chests</strong> in Shop.</li>
                    </ol>
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
            return `<h1 class="text-2xl font-semibold text-white mb-4">${skillData.name} <span class="text-base text-secondary">(Level ${playerSkill.level})</span></h1><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">${contentHtml}</div>`;
        }

        renderActionCard(skillId, action, actionType) {
            const playerSkill = this.game.state.player.skills[skillId]; const hasLevel = playerSkill.level >= action.level; let canAfford = true;
            if (action.input) { canAfford = action.input.every(inp => (this.game.state.bank[inp.itemId] || 0) >= inp.quantity); }
            const mastery = this.game.getMastery(skillId, action.id);
            let yieldMult = 1;
            if (skillId === 'runecrafting') { yieldMult = Math.max(1, 1 + Math.floor((playerSkill.level - action.level) / 11)); }
            const inputList = action.input ? action.input.map(inp => { const has = (this.game.state.bank[inp.itemId] || 0) >= inp.quantity; return `<span class="${has ? 'text-green-400' : 'text-red-400'}">${inp.quantity}x ${GAME_DATA.ITEMS[inp.itemId].name}</span>`; }).join(', ') : '';
            return `
                <div class="block p-4 flex flex-col justify-between ${!hasLevel ? 'opacity-50' : ''}">
                    <div>
                        <h3 class="text-lg font-bold text-white">${action.name}</h3>
                        <p class="text-secondary text-xs">Requires Level: ${action.level}</p>
                        <p class="text-secondary text-xs">XP: ${action.xp}</p>
                        ${action.input ? `<p class="text-secondary text-xs mt-1">Requires: ${inputList}</p>`: ''}
                        ${skillId === 'runecrafting' ? `<p class="text-blue-300 text-xs mt-1">Yield at Lvl ${playerSkill.level}: x${yieldMult} per essence</p>` : ''}
                        <div class="mt-2">
                            <p class="text-xs text-yellow-400">Mastery Lvl ${mastery.level}</p>
                            <div class="w-full xp-bar-bg rounded-full h-2 my-1"><div class="mastery-bar-fill h-2 rounded-full" style="width:${(mastery.currentXP / mastery.xpToNextLevel) * 100}%"></div></div>
                            <p class="text-xs text-secondary text-right">${Math.floor(mastery.currentXP)} / ${mastery.xpToNextLevel} XP</p>
                        </div>
                    </div>
                    <button class="${actionType.toLowerCase()}-action-btn chimera-button px-4 py-2 rounded-md mt-4" data-skill-id="${skillId}" data-action-id="${action.id}" ${!hasLevel || !canAfford || this.game.state.activeAction ? 'disabled' : ''}>${actionType}</button>
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
            const enemy = this.game.state.combat.enemy;
            const enemyName = enemy ? enemy.name : '—';
            const enemyLevel = enemy ? enemy.level : '—';
            const playerHp = `${Math.max(0, Math.floor(this.game.state.player.hp))}/${this.game.state.player.hpMax}`;
            const enemyHp = enemy ? `${Math.max(0, Math.floor(enemy.hp))}/${enemy.maxHp}` : '—';
            const ult = this.game.state.combat.ultimateCharge;

            return `
                <h1 class="text-2xl font-semibold text-white mb-4">Combat</h1>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div class="block p-4 space-y-3">
                        <h2 class="text-lg font-bold">Enemies</h2>
                        <div class="space-x-2">${eList}</div>
                        <div class="mt-3">${combatStatus}<div class="text-xs text-secondary mt-1">Your HP: <span class="font-mono">${playerHp}</span></div></div>
                        <button id="end-combat-btn" class="chimera-button px-3 py-2 rounded-md" ${this.game.state.combat.inCombat ? '' : 'disabled'}>Retreat</button>
                    </div>

                    <div class="block p-4 space-y-3">
                        <div class="combat-arena">
                            <div class="arena-side">
                                <div class="arena-avatar">🛡️</div>
                                <div>
                                    <div class="flex items-baseline justify-between"><span class="font-bold">You</span><span class="text-xs text-secondary font-mono" id="player-hp-text">${playerHp}</span></div>
                                    <div class="hp-bar mt-1"><div id="player-hp-fill" class="hp-fill" style="width: ${(this.game.state.player.hp/this.game.state.player.hpMax)*100}%"></div></div>
                                    <div class="mt-2 flex items-center justify-between">
                                        <span class="combo-chip" id="combo-chip">Combo x${this.game.state.combat.comboCount || 0}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="arena-center">
                                <div class="versus">⚡</div>
                                <div class="ult-bar mt-2"><div id="ult-fill" class="ult-fill" style="width:${ult}%"></div></div>
                            </div>
                            <div class="arena-side">
                                <div class="arena-avatar">💀</div>
                                <div>
                                    <div class="flex items-baseline justify-between"><span class="font-bold">${enemyName} <span class="text-xs text-secondary">(Lv ${enemyLevel})</span></span><span class="text-xs text-secondary font-mono" id="enemy-hp-text">${enemyHp}</span></div>
                                    <div class="hp-bar mt-1"><div id="enemy-hp-fill" class="hp-fill enemy" style="width: ${enemy ? (enemy.hp/enemy.maxHp)*100 : 0}%"></div></div>
                                </div>
                            </div>
                        </div>
                        <div class="action-bar">
                            <button id="btn-quick" class="chimera-button px-3 py-2 rounded-md">Quick Strike</button>
                            <button id="btn-guard" class="chimera-button px-3 py-2 rounded-md">Guard (5s)</button>
                            <button id="btn-finisher" class="chimera-button px-3 py-2 rounded-md" ${ult >= 100 ? '' : 'disabled'}>Finisher</button>
                        </div>
                    </div>

                    <div class="block p-4 space-y-3">
                        <h2 class="text-lg font-bold">Equipment & Food</h2>
                        <p class="text-secondary">Weapon: <span class="text-white">${equipped}</span></p>
                        <div class="space-x-2">${weapons || '<span class="text-secondary">Craft a weapon in Smithing.</span>'}</div>
                        <div class="space-x-2">${foodList || '<span class="text-secondary">Cook food to heal.</span>'}</div>
                        <div class="mt-4">
                            <h3 class="font-bold mb-1">Battle Commentary</h3>
                            <div id="battle-log" class="battle-log"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        updateCombatArena() {
            const p = this.game.state.player; const c = this.game.state.combat; const e = c.enemy;
            const pFill = document.getElementById('player-hp-fill'); const pTxt = document.getElementById('player-hp-text'); if (pFill) pFill.style.width = `${(p.hp/p.hpMax)*100}%`; if (pTxt) pTxt.textContent = `${Math.max(0, Math.floor(p.hp))}/${p.hpMax}`;
            const eFill = document.getElementById('enemy-hp-fill'); const eTxt = document.getElementById('enemy-hp-text'); if (e && eFill) eFill.style.width = `${(e.hp/e.maxHp)*100}%`; if (e && eTxt) eTxt.textContent = `${Math.max(0, Math.floor(e.hp))}/${e.maxHp}`;
            const ult = document.getElementById('ult-fill'); if (ult) ult.style.width = `${Math.min(100, c.ultimateCharge)}%`;
            const comboChip = document.getElementById('combo-chip'); if (comboChip) comboChip.textContent = `Combo x${c.comboCount || 0}`;
            const fin = document.getElementById('btn-finisher'); if (fin) fin.disabled = !(c.ultimateCharge >= 100);
            const q = document.getElementById('btn-quick'); if (q) q.disabled = !(Date.now() > c.cooldowns.quickStrike);
            const g = document.getElementById('btn-guard'); if (g) g.disabled = !(Date.now() > c.cooldowns.guard);
        }
        renderCombatFooter() { /* placeholder for potential dynamic footer updates */ }
        logBattle(text, mood = 'neutral') {
            const log = document.getElementById('battle-log'); if (!log) return; const row = document.createElement('div'); row.className = `battle-log-entry ${mood}`;
            const icon = document.createElement('span'); icon.className = 'icon'; icon.textContent = mood === 'good' ? '✨' : mood === 'bad' ? '⚠️' : '•';
            const msg = document.createElement('span'); msg.textContent = text; row.appendChild(icon); row.appendChild(msg); log.appendChild(row); log.scrollTop = log.scrollHeight; const max = 60; while (log.children.length > max) log.removeChild(log.firstChild);
        }
        shakeScreen(intensity = 1) { const el = this.mainContent; if (!el) return; el.classList.remove('shake'); void el.offsetWidth; el.style.animationDuration = `${Math.max(120, Math.floor(180 * intensity))}ms`; el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), Math.max(140, Math.floor(220 * intensity))); }

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

            // Combat
            document.querySelectorAll('.start-combat-btn').forEach(btn => { btn.addEventListener('click', () => this.game.startCombat(btn.dataset.enemyId)); });
            const endBtn = document.getElementById('end-combat-btn'); if (endBtn) endBtn.addEventListener('click', () => this.game.endCombat(false));
            document.querySelectorAll('.eat-food-btn').forEach(btn => { btn.addEventListener('click', () => this.game.eatFood(btn.dataset.itemId)); });
            document.querySelectorAll('.equip-weapon-btn').forEach(btn => { btn.addEventListener('click', () => this.game.equipWeapon(btn.dataset.itemId)); });
            const q = document.getElementById('btn-quick'); if (q) q.addEventListener('click', () => this.game.useQuickStrike());
            const g = document.getElementById('btn-guard'); if (g) g.addEventListener('click', () => this.game.useGuard());
            const f = document.getElementById('btn-finisher'); if (f) f.addEventListener('click', () => this.game.useFinisher());

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