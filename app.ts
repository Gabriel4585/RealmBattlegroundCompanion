/* declare constants at top for easy future balencing updates */
const Helmet_Attack_Value = 1;
const Helmet_Defense_Value = 2;
const Spear_Attack_Value = 1;
const Spear_Defense_Value = 3;
const Spear_Bonus_Against_Mounted = 3;
const Mounted_Attack_Value = 4;
const Mounted_Melee_Defense_Value = 4;
const Mounted_Ranged_Defense_Value = 2;
const Small_Ranged_Attack_Value = 3;
const Small_Ranged_Defense_Value = -1;
const Small_Ranged_Free = 1;
const Medium_Ranged_Attack_Value = 4;
const Medium_Ranged_Defense_Value = -4;
const Medium_Ranged_Free = 1;

/*----------------- Bonus Calculations----------------- */
/* Interactions calculated on the attacker portion */
document.addEventListener('DOMContentLoaded', () => {
    const netStrengthParagraph = document.getElementById('net-strength');
    const totalAttackBonus = document.getElementById('attacker-total-strength');
    const totalDefenseBonus = document.getElementById('defender-total-strength');
    const rangeActual = document.getElementById('rangeActual') as HTMLInputElement;
  
    const attackerCheckboxes = document.querySelectorAll('.attacker input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const defenderCheckboxes = document.querySelectorAll('.defender input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
  
    function updateNetStrength() {
      let netStrength = 0;
      let attackerStrength = 0;
      let defenderStrength = 0;
      let range = Number(rangeActual.value);
      attackerCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            if(checkbox.id === 'attackHelmet'){
                attackerStrength += Helmet_Attack_Value;
            }else if(checkbox.id === 'attackSpear'){ /*melee weapon */
                attackerStrength += Spear_Attack_Value;
                const defenseMountedCheckbox = document.getElementById('defenseMounted') as HTMLInputElement;
                if(defenseMountedCheckbox.checked){ /*checks if the opposing mounted is already checked */
                  attackerStrength += Spear_Bonus_Against_Mounted;
                }
                const defenseSmallRangedCheckbox = document.getElementById('defenseSmallGun') as HTMLInputElement;
                const defenseMediumRangedCheckbox = document.getElementById('defenseMediumGun') as HTMLInputElement;
                if(defenseSmallRangedCheckbox.checked){ /*checks if the opposing small ranged is already checked */
                  defenderStrength += Small_Ranged_Defense_Value;
                }
                if(defenseMediumRangedCheckbox.checked){ /*checks if the opposing medium ranged is already checked */
                  defenderStrength += Medium_Ranged_Defense_Value;
                }
            }else if(checkbox.id === 'attackMounted'){
                attackerStrength += Mounted_Attack_Value;
                const defenseSpearCheckbox = document.getElementById('defenseSpear') as HTMLInputElement;
                if(defenseSpearCheckbox.checked){   /*checks if the opposing spear is already checked */
                    defenderStrength += Spear_Bonus_Against_Mounted;
                }
            }else if(checkbox.id === 'attackSmallGun'){ /*ranged weapon */
              if(range <= Small_Ranged_Free){
                attackerStrength += Small_Ranged_Attack_Value;
              }else{
                attackerStrength += (Small_Ranged_Attack_Value - (range-Small_Ranged_Free));
              }
            }else if(checkbox.id === 'attackMediumGun'){  /*ranged weapon */
              if(range <= Medium_Ranged_Free){
                attackerStrength += Medium_Ranged_Attack_Value;
              }else{
                attackerStrength += (Medium_Ranged_Attack_Value - (range-Medium_Ranged_Free));
              }

            }
        }
      });

      /* All special button interactions handled in attacker section*/
      defenderCheckboxes.forEach((checkbox) => {
        const attackSpearCheckbox = document.getElementById('attackSpear') as HTMLInputElement;
        if (checkbox.checked) {
            if(checkbox.id === 'defenseHelmet'){
                defenderStrength += Helmet_Defense_Value;
            }else if(checkbox.id === 'defenseSpear'){
              if(attackSpearCheckbox.checked){ /*Should only get defense value if in melee combat */
                defenderStrength += Spear_Defense_Value;
              }
            }else if(checkbox.id === 'defenseMounted'){
              if(attackSpearCheckbox.checked){ /*defensive bonus different if in melee combat */
                defenderStrength += Mounted_Melee_Defense_Value;
              }else{
                defenderStrength += Mounted_Ranged_Defense_Value;
              }
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

    rangeActual.addEventListener('input', updateNetStrength);

  });



/* ----------------------Reapearing Elements------------------------------- */
const attackRangedCheckbox = document.getElementById("attackRanged") as HTMLInputElement;
const defenseRangedCheckbox = document.getElementById("defenseRanged") as HTMLInputElement;

const attackSmallRangedCheckbox = document.getElementById("attackSmallGun") as HTMLInputElement;
attackSmallRangedCheckbox.style.display = "none"; /*hide the small ranged checkbox by default */
const AttackSmallRangedLabel = document.querySelector('label[for="attackSmallGun"]') as HTMLLabelElement;
AttackSmallRangedLabel.style.display = "none"; /*hide the small ranged label by default */
const attackMediumRangedCheckbox = document.getElementById("attackMediumGun") as HTMLInputElement;
attackMediumRangedCheckbox.style.display = "none"; /*hide the medium ranged checkbox by default */
const attackMediumRangedLabel = document.querySelector('label[for="attackMediumGun"]') as HTMLLabelElement;
attackMediumRangedLabel.style.display = "none"; /*hide the medium ranged label by default */

const defenseSmallRangedCheckbox = document.getElementById("defenseSmallGun") as HTMLInputElement;
defenseSmallRangedCheckbox.style.display = "none"; /*hide the small ranged checkbox by default */
const defenseSmallRangedLabel = document.querySelector('label[for="defenseSmallGun"]') as HTMLLabelElement;
defenseSmallRangedLabel.style.display = "none"; /*hide the small ranged label by default */
const defenseMediumRangedCheckbox = document.getElementById("defenseMediumGun") as HTMLInputElement;
defenseMediumRangedCheckbox.style.display = "none"; /*hide the medium ranged checkbox by default */
const defenseMediumRangedLabel = document.querySelector('label[for="defenseMediumGun"]') as HTMLLabelElement;
defenseMediumRangedLabel.style.display = "none"; /*hide the medium ranged label by default */

  
attackRangedCheckbox.addEventListener("change", function() {  /*triggered when the ranged checkbox is changed(clicked) */
  if (this.checked) {
    attackSmallRangedCheckbox.style.display = "inline-block";
    attackSmallRangedCheckbox.checked = false;
    AttackSmallRangedLabel.style.display = "inline-block";
    attackMediumRangedCheckbox.style.display = "inline-block";
    attackMediumRangedCheckbox.checked = false;
    attackMediumRangedLabel.style.display = "inline-block";
  } else {
    attackSmallRangedCheckbox.style.display = "none";
    attackSmallRangedCheckbox.checked = false;
    AttackSmallRangedLabel.style.display = "none";
    attackMediumRangedCheckbox.style.display = "none";
    attackMediumRangedCheckbox.checked = false;
    attackMediumRangedLabel.style.display = "none";
  }
});

defenseRangedCheckbox.addEventListener("change", function() {  /*triggered when the ranged checkbox is changed(clicked) */
  if (this.checked) {
    defenseSmallRangedCheckbox.style.display = "inline-block";
    defenseSmallRangedCheckbox.checked = false;
    defenseSmallRangedLabel.style.display = "inline-block";
    defenseMediumRangedCheckbox.style.display = "inline-block";
    defenseMediumRangedCheckbox.checked = false;
    defenseMediumRangedLabel.style.display = "inline-block";
  } else {
    defenseSmallRangedCheckbox.style.display = "none";
    defenseSmallRangedCheckbox.checked = false;
    defenseSmallRangedLabel.style.display = "none";
    defenseMediumRangedCheckbox.style.display = "none";
    defenseMediumRangedCheckbox.checked = false;
    defenseMediumRangedLabel.style.display = "none";
  }
});
  