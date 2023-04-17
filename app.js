/* declare constants at top for easy future balencing updates */
var Helmet_Attack_Value = 1;
var Helmet_Defense_Value = 2;
var Spear_Attack_Value = 1;
var Spear_Defense_Value = 3;
var Spear_Bonus_Against_Mounted = 3;
var Mounted_Attack_Value = 4;
var Mounted_Melee_Defense_Value = 4;
var Mounted_Ranged_Defense_Value = 2;
var Small_Ranged_Attack_Value = 3;
var Small_Ranged_Defense_Value = -1;
var Small_Ranged_Free = 1;
var Medium_Ranged_Attack_Value = 4;
var Medium_Ranged_Defense_Value = -4;
var Medium_Ranged_Free = 1;
/*----------------- Bonus Calculations----------------- */
/* Interactions calculated on the attacker portion */
document.addEventListener('DOMContentLoaded', function () {
    var netStrengthParagraph = document.getElementById('net-strength');
    var totalAttackBonus = document.getElementById('attacker-total-strength');
    var totalDefenseBonus = document.getElementById('defender-total-strength');
    var rangeActual = document.getElementById('rangeActual');
    var attackerCheckboxes = document.querySelectorAll('.attacker input[type="checkbox"]');
    var defenderCheckboxes = document.querySelectorAll('.defender input[type="checkbox"]');
    function updateNetStrength() {
        var netStrength = 0;
        var attackerStrength = 0;
        var defenderStrength = 0;
        var range = Number(rangeActual.value);
        attackerCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                if (checkbox.id === 'attackHelmet') {
                    attackerStrength += Helmet_Attack_Value;
                }
                else if (checkbox.id === 'attackSpear') { /*melee weapon */
                    attackerStrength += Spear_Attack_Value;
                    var defenseMountedCheckbox = document.getElementById('defenseMounted');
                    if (defenseMountedCheckbox.checked) { /*checks if the opposing mounted is already checked */
                        attackerStrength += Spear_Bonus_Against_Mounted;
                    }
                    var defenseSmallRangedCheckbox_1 = document.getElementById('defenseSmallGun');
                    var defenseMediumRangedCheckbox_1 = document.getElementById('defenseMediumGun');
                    if (defenseSmallRangedCheckbox_1.checked) { /*checks if the opposing small ranged is already checked */
                        defenderStrength += Small_Ranged_Defense_Value;
                    }
                    if (defenseMediumRangedCheckbox_1.checked) { /*checks if the opposing medium ranged is already checked */
                        defenderStrength += Medium_Ranged_Defense_Value;
                    }
                }
                else if (checkbox.id === 'attackMounted') {
                    attackerStrength += Mounted_Attack_Value;
                    var defenseSpearCheckbox = document.getElementById('defenseSpear');
                    if (defenseSpearCheckbox.checked) { /*checks if the opposing spear is already checked */
                        defenderStrength += Spear_Bonus_Against_Mounted;
                    }
                }
                else if (checkbox.id === 'attackSmallGun') { /*ranged weapon */
                    if (range <= Small_Ranged_Free) {
                        attackerStrength += Small_Ranged_Attack_Value;
                    }
                    else {
                        attackerStrength += (Small_Ranged_Attack_Value - (range - Small_Ranged_Free));
                    }
                }
                else if (checkbox.id === 'attackMediumGun') { /*ranged weapon */
                    if (range <= Medium_Ranged_Free) {
                        attackerStrength += Medium_Ranged_Attack_Value;
                    }
                    else {
                        attackerStrength += (Medium_Ranged_Attack_Value - (range - Medium_Ranged_Free));
                    }
                }
            }
        });
        /* All special button interactions handled in attacker section*/
        defenderCheckboxes.forEach(function (checkbox) {
            var attackSpearCheckbox = document.getElementById('attackSpear');
            if (checkbox.checked) {
                if (checkbox.id === 'defenseHelmet') {
                    defenderStrength += Helmet_Defense_Value;
                }
                else if (checkbox.id === 'defenseSpear') {
                    if (attackSpearCheckbox.checked) { /*Should only get defense value if in melee combat */
                        defenderStrength += Spear_Defense_Value;
                    }
                }
                else if (checkbox.id === 'defenseMounted') {
                    if (attackSpearCheckbox.checked) { /*defensive bonus different if in melee combat */
                        defenderStrength += Mounted_Melee_Defense_Value;
                    }
                    else {
                        defenderStrength += Mounted_Ranged_Defense_Value;
                    }
                }
            }
        });
        netStrength = attackerStrength - defenderStrength;
        netStrengthParagraph.textContent = netStrength.toString();
        totalAttackBonus.textContent = attackerStrength.toString();
        totalDefenseBonus.textContent = defenderStrength.toString();
    }
    attackerCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', updateNetStrength);
    });
    defenderCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', updateNetStrength);
    });
    rangeActual.addEventListener('input', updateNetStrength);
});
/* ----------------------Reapearing Elements------------------------------- */
var attackRangedCheckbox = document.getElementById("attackRanged");
var defenseRangedCheckbox = document.getElementById("defenseRanged");
var attackSmallRangedCheckbox = document.getElementById("attackSmallGun");
attackSmallRangedCheckbox.style.display = "none"; /*hide the small ranged checkbox by default */
var AttackSmallRangedLabel = document.querySelector('label[for="attackSmallGun"]');
AttackSmallRangedLabel.style.display = "none"; /*hide the small ranged label by default */
var attackMediumRangedCheckbox = document.getElementById("attackMediumGun");
attackMediumRangedCheckbox.style.display = "none"; /*hide the medium ranged checkbox by default */
var attackMediumRangedLabel = document.querySelector('label[for="attackMediumGun"]');
attackMediumRangedLabel.style.display = "none"; /*hide the medium ranged label by default */
var defenseSmallRangedCheckbox = document.getElementById("defenseSmallGun");
defenseSmallRangedCheckbox.style.display = "none"; /*hide the small ranged checkbox by default */
var defenseSmallRangedLabel = document.querySelector('label[for="defenseSmallGun"]');
defenseSmallRangedLabel.style.display = "none"; /*hide the small ranged label by default */
var defenseMediumRangedCheckbox = document.getElementById("defenseMediumGun");
defenseMediumRangedCheckbox.style.display = "none"; /*hide the medium ranged checkbox by default */
var defenseMediumRangedLabel = document.querySelector('label[for="defenseMediumGun"]');
defenseMediumRangedLabel.style.display = "none"; /*hide the medium ranged label by default */
attackRangedCheckbox.addEventListener("change", function () {
    if (this.checked) {
        attackSmallRangedCheckbox.style.display = "inline-block";
        attackSmallRangedCheckbox.checked = false;
        AttackSmallRangedLabel.style.display = "inline-block";
        attackMediumRangedCheckbox.style.display = "inline-block";
        attackMediumRangedCheckbox.checked = false;
        attackMediumRangedLabel.style.display = "inline-block";
    }
    else {
        attackSmallRangedCheckbox.style.display = "none";
        attackSmallRangedCheckbox.checked = false;
        AttackSmallRangedLabel.style.display = "none";
        attackMediumRangedCheckbox.style.display = "none";
        attackMediumRangedCheckbox.checked = false;
        attackMediumRangedLabel.style.display = "none";
    }
});
defenseRangedCheckbox.addEventListener("change", function () {
    if (this.checked) {
        defenseSmallRangedCheckbox.style.display = "inline-block";
        defenseSmallRangedCheckbox.checked = false;
        defenseSmallRangedLabel.style.display = "inline-block";
        defenseMediumRangedCheckbox.style.display = "inline-block";
        defenseMediumRangedCheckbox.checked = false;
        defenseMediumRangedLabel.style.display = "inline-block";
    }
    else {
        defenseSmallRangedCheckbox.style.display = "none";
        defenseSmallRangedCheckbox.checked = false;
        defenseSmallRangedLabel.style.display = "none";
        defenseMediumRangedCheckbox.style.display = "none";
        defenseMediumRangedCheckbox.checked = false;
        defenseMediumRangedLabel.style.display = "none";
    }
});
