/* declare constants at top for easy future balencing updates */
const Helmet_Attack_Value = 1;
const Helmet_Defense_Value = 2;
const Spear_Attack_Value = 1;
const Spear_Defense_Value = 3;
const Spear_Bonus_Against_Mounted = 3;
const Mounted_Attack_Value = 4;
const Mounted_Defense_Value = 4;


document.addEventListener('DOMContentLoaded', () => {
    const netStrengthParagraph = document.getElementById('net-strength');
  
    const attackerCheckboxes = document.querySelectorAll('.attacker input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const defenderCheckboxes = document.querySelectorAll('.defender input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
  
    function updateNetStrength() {
      let netStrength = 0;
      let attackerStrength = 0;
      let defenderStrength = 0;
      attackerCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            if(checkbox.id === 'attackHelmet'){
                attackerStrength += Helmet_Attack_Value;
            }else if(checkbox.id === 'attackSpear'){
                attackerStrength += Spear_Attack_Value;
                const defenseMountedCheckbox = document.getElementById('defenseMounted') as HTMLInputElement;
                if(defenseMountedCheckbox.checked){ /*checks if the opposing mounted is already checked */
                    attackerStrength += Spear_Bonus_Against_Mounted;
                }
            }else if(checkbox.id === 'attackMounted'){
                attackerStrength += Mounted_Attack_Value;
                const defenseSpearCheckbox = document.getElementById('defenseSpear') as HTMLInputElement;
                if(defenseSpearCheckbox.checked){   /*checks if the opposing spear is already checked */
                    defenderStrength += Spear_Bonus_Against_Mounted;
                }
            }
        }
      });

      /* All special button interactions handled in attacker section*/
      defenderCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            if(checkbox.id === 'defenseHelmet'){
                defenderStrength += Helmet_Defense_Value;
            }else if(checkbox.id === 'defenseSpear'){
                defenderStrength += Spear_Defense_Value;
                // const defenseMountedCheckbox = document.getElementById('attackMounted') as HTMLInputElement;
                // if(defenseMountedCheckbox.checked){ /*checks if the attack is mounted is already checked */
                //     defenderStrength += Spear_Bonus_Against_Mounted;
                // }
            }else if(checkbox.id === 'defenseMounted'){
                defenderStrength += Mounted_Defense_Value;
                // const defenseSpearCheckbox = document.getElementById('attackSpear') as HTMLInputElement;
                // if(defenseSpearCheckbox.checked){   /*checks if the opposing spear is already checked */
                //     attackerStrength += Spear_Bonus_Against_Mounted;
                // }
            }
        }
      });
      netStrength = attackerStrength - defenderStrength;
      netStrengthParagraph!.textContent = netStrength.toString();
    }
  
    attackerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', updateNetStrength);
    });
  
    defenderCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', updateNetStrength);
    });
  });
  