/*FIXME buttons not recognizing the activity*/
const buttons = document.querySelectorAll('.button');
const pressedButtonName = document.getElementById('Button-pressed1');
const middleSection = document.getElementById('middle-section');

// Add click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    console.log("button clicked")
    const buttonText = button.textContent;
    pressedButtonName.textContent = "You clicked ${buttonText}";
  });
});
