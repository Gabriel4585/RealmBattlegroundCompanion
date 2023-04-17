/* declare constants at top for easy future balencing updates */
var Helmet_Attack_Value = 1;
var Helmet_Defense_Value = 2;
var Spear_Attack_Value = 1;
var Spear_Defense_Value = 3;
var Spear_Bonus_Against_Mounted = 3;
var Mounted_Attack_Value = 4;
var Mounted_Defense_Value = 4;
document.addEventListener('DOMContentLoaded', function () {
    var netStrengthParagraph = document.getElementById('net-strength');
    var totalAttackBonus = document.getElementById('attacker-total-strength');
    var totalDefenseBonus = document.getElementById('defender-total-strength');
    var attackerCheckboxes = document.querySelectorAll('.attacker input[type="checkbox"]');
    var defenderCheckboxes = document.querySelectorAll('.defender input[type="checkbox"]');
    function updateNetStrength() {
        var netStrength = 0;
        var attackerStrength = 0;
        var defenderStrength = 0;
        attackerCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                if (checkbox.id === 'attackHelmet') {
                    attackerStrength += Helmet_Attack_Value;
                }
                else if (checkbox.id === 'attackSpear') {
                    attackerStrength += Spear_Attack_Value;
                    var defenseMountedCheckbox = document.getElementById('defenseMounted');
                    if (defenseMountedCheckbox.checked) { /*checks if the opposing mounted is already checked */
                        attackerStrength += Spear_Bonus_Against_Mounted;
                    }
                }
                else if (checkbox.id === 'attackMounted') {
                    attackerStrength += Mounted_Attack_Value;
                    var defenseSpearCheckbox = document.getElementById('defenseSpear');
                    if (defenseSpearCheckbox.checked) { /*checks if the opposing spear is already checked */
                        defenderStrength += Spear_Bonus_Against_Mounted;
                    }
                }
            }
        });
        /* All special button interactions handled in attacker section*/
        defenderCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                if (checkbox.id === 'defenseHelmet') {
                    defenderStrength += Helmet_Defense_Value;
                }
                else if (checkbox.id === 'defenseSpear') {
                    defenderStrength += Spear_Defense_Value;
                }
                else if (checkbox.id === 'defenseMounted') {
                    defenderStrength += Mounted_Defense_Value;
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
});
var rangedCheckbox = document.getElementById("attackRanged");
var smallRangedCheckbox = document.getElementById("attackSmallGun");
smallRangedCheckbox.style.display = "none"; /*hide the small ranged checkbox by default */
var smallRangedLabel = document.querySelector('label[for="attackSmallGun"]');
smallRangedLabel.style.display = "none"; /*hide the small ranged label by default */
var mediumRangedCheckbox = document.getElementById("attackMediumGun");
mediumRangedCheckbox.style.display = "none"; /*hide the medium ranged checkbox by default */
var mediumRangedLabel = document.querySelector('label[for="attackMediumGun"]');
mediumRangedLabel.style.display = "none"; /*hide the medium ranged label by default */
rangedCheckbox.addEventListener("change", function () {
    if (this.checked) {
        smallRangedCheckbox.style.display = "inline-block";
        smallRangedCheckbox.checked = false;
        smallRangedLabel.style.display = "inline-block";
        mediumRangedCheckbox.style.display = "inline-block";
        mediumRangedCheckbox.checked = false;
        mediumRangedLabel.style.display = "inline-block";
    }
    else {
        smallRangedCheckbox.style.display = "none";
        smallRangedCheckbox.checked = false;
        smallRangedLabel.style.display = "none";
        mediumRangedCheckbox.style.display = "none";
        mediumRangedCheckbox.checked = false;
        mediumRangedLabel.style.display = "none";
    }
});
