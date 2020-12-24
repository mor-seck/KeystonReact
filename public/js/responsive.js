/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
console.log("fichier js chargé");
$(".burger").click(function () {
    // eslint-disable-next-line no-undef
    console.log("fonction appelé click burger");
    $(".menu-header").slideToggle("slow", function () {
        // Animation complete.
    });
});


