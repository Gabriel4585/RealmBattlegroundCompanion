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
                    // const defenseMountedCheckbox = document.getElementById('attackMounted') as HTMLInputElement;
                    // if(defenseMountedCheckbox.checked){ /*checks if the attack is mounted is already checked */
                    //     defenderStrength += Spear_Bonus_Against_Mounted;
                    // }
                }
                else if (checkbox.id === 'defenseMounted') {
                    defenderStrength += Mounted_Defense_Value;
                    // const defenseSpearCheckbox = document.getElementById('attackSpear') as HTMLInputElement;
                    // if(defenseSpearCheckbox.checked){   /*checks if the opposing spear is already checked */
                    //     attackerStrength += Spear_Bonus_Against_Mounted;
                    // }
                }
            }
        });
        netStrength = attackerStrength - defenderStrength;
        netStrengthParagraph.textContent = netStrength.toString();
    }
    attackerCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', updateNetStrength);
    });
    defenderCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', updateNetStrength);
    });
});
