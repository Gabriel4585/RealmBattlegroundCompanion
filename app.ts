/* declare constants at top for easy future balencing updates */
const Helmet_Attack_Value = 1;
const Helmet_Defense_Value = 2;
const Spear_Attack_Value = 1;
const Spear_Defense_Value = 3;
const Spear_Bonus_Against_Mounted = 3;
const Mounted_Attack_Value = 4;
const Mounted_Defense_Value = 4;

/*----------------- Bonus Calculations----------------- */
document.addEventListener('DOMContentLoaded', () => {
    const netStrengthParagraph = document.getElementById('net-strength');
    const totalAttackBonus = document.getElementById('attacker-total-strength');
    const totalDefenseBonus = document.getElementById('defender-total-strength');
  
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
            }else if(checkbox.id === 'defenseMounted'){
                defenderStrength += Mounted_Defense_Value;
            }
        }
      });
        netStrength = attackerStrength - defenderStrength;
        netStrengthParagraph!.textContent = netStrength.toString();
        totalAttackBonus!.textContent = attackerStrength.toString();
        totalDefenseBonus!.textContent = defenderStrength.toString();
    }
  
    attackerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', updateNetStrength);
    });
  
    defenderCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', updateNetStrength);
    });
  });


/* ----------------------Reapearing Elements------------------------------- */
const rangedCheckbox = document.getElementById("attackRanged") as HTMLInputElement;

const smallRangedCheckbox = document.getElementById("attackSmallGun") as HTMLInputElement;
smallRangedCheckbox.style.display = "none"; /*hide the small ranged checkbox by default */
const smallRangedLabel = document.querySelector('label[for="attackSmallGun"]') as HTMLLabelElement;
smallRangedLabel.style.display = "none"; /*hide the small ranged label by default */
const mediumRangedCheckbox = document.getElementById("attackMediumGun") as HTMLInputElement;
mediumRangedCheckbox.style.display = "none"; /*hide the medium ranged checkbox by default */
const mediumRangedLabel = document.querySelector('label[for="attackMediumGun"]') as HTMLLabelElement;
mediumRangedLabel.style.display = "none"; /*hide the medium ranged label by default */
  
rangedCheckbox.addEventListener("change", function() {  /*triggered when the ranged checkbox is changed(clicked) */
  if (this.checked) {
    smallRangedCheckbox.style.display = "inline-block";
    smallRangedCheckbox.checked = false;
    smallRangedLabel.style.display = "inline-block";
    mediumRangedCheckbox.style.display = "inline-block";
    mediumRangedCheckbox.checked = false;
    mediumRangedLabel.style.display = "inline-block";
  } else {
    smallRangedCheckbox.style.display = "none";
    smallRangedCheckbox.checked = false;
    smallRangedLabel.style.display = "none";
    mediumRangedCheckbox.style.display = "none";
    mediumRangedCheckbox.checked = false;
    mediumRangedLabel.style.display = "none";
  }
});
  