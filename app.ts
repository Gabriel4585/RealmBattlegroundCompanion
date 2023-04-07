// // Get references to the relevant HTML elements
// const netStrengthParagraph = document.getElementById('net-strength')!;
// const attackerCheckboxes = document.querySelectorAll<HTMLInputElement>('.attacker input[type="checkbox"]');
// const defenderCheckboxes = document.querySelectorAll<HTMLInputElement>('.defender input[type="checkbox"]');

// // Initialize the net strength to 0
// let netStrength = 0;
// netStrengthParagraph.textContent = netStrength.toString();

// // Add event listeners to the attacker checkboxes
// attackerCheckboxes.forEach(function(checkbox) {
//   checkbox.addEventListener('change', function() {
//     if (checkbox.checked) {
//       netStrength += 1;
//     } else {
//       netStrength -= 1;
//     }
//     netStrengthParagraph.textContent = netStrength.toString();
//   });
// });

// // Add event listeners to the defender checkboxes
// defenderCheckboxes.forEach(function(checkbox) {
//   checkbox.addEventListener('change', function() {
//     if (checkbox.checked) {
//       netStrength -= 1;
//     } else {
//       netStrength += 1;
//     }
//     netStrengthParagraph.textContent = netStrength.toString();
//   });
// });
document.addEventListener('DOMContentLoaded', () => {
    const netStrengthParagraph = document.getElementById('net-strength');
  
    const attackerCheckboxes = document.querySelectorAll('.attacker input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const defenderCheckboxes = document.querySelectorAll('.defender input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
  
    function updateNetStrength() {
      let netStrength = 0;
      attackerCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          netStrength += 1;
        }
      });
      defenderCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          netStrength -= 1;
        }
      });
      netStrengthParagraph!.textContent = netStrength.toString();
    }
  
    attackerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', updateNetStrength);
    });
  
    defenderCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', updateNetStrength);
    });
  });
  