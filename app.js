/*FIXME buttons not recognizing the activity*/
var buttons = document.querySelectorAll('.button');
var pressedButtonName = document.getElementById('Button-pressed1');
var middleSection = document.getElementById('middle-section');
// Add click event listener to each button
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        var buttonText = button.textContent;
        pressedButtonName.textContent = "You clicked ".concat(buttonText);
    });
});
