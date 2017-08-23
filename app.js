$(document).ready(function() {

    let characters = [
        {
            name: "Mario",
            speed: 6,
            sprite: "images/mario.gif"
        },
        {
            name: "Pokemon",
            speed: 5,
            sprite: "images/pokemon.gif"
        },
        {
            name: "Sonic",
            speed: 7,
            sprite: "images/sonic.gif"
        },
        {
            name: "Homer",
            speed: 3,
            sprite: "images/homer.gif"
        },
        {
            name: "Koolaid",
            speed: 2,
            sprite: "images/koolaid.gif"
        },
        {
            name: "Patrick",
            speed: 4,
            sprite: "images/patrickstar.gif"
        },
        {
            name: "Kirby",
            speed: 4,
            sprite: "images/kirby.gif"
        }
    ];

    let imageWidths = 500;
    let userOnePer = 5;
    let userTwoPer = 5;
    let userThreePer = 5;
    let counter = 0;
    let randomInterval1 = Math.ceil(Math.random()*10);
    let randomInterval2 = Math.ceil(Math.random()*10);
    let gameStarted = false;

    function getImgHTML(character, index) {
        return `<img class = "start-user${index} img-size col-sm-4" src="${characters[index].sprite}">`
    };

    let charsHTML = characters.map(getImgHTML).join("")

    $('body').append(`
        <div class="row">
            <h1 class=" start-screen col-sm-12">Select your character!</h1>
        </div>
        <div class="row">
            ${charsHTML}
        </div>`
    )

    $('.start-user0, .start-user1, .start-user2, .start-user3, ' +
        '.start-user4, .start-user5, .start-user6').on("click", function() {
        $('body').html(

        `<div class="row">
            <h1 class="announce col-sm-12">Racing Game</h1>
        </div>
        <div class="row">
            <div class="col-sm-12 text-center">
            <button type="button" class="btn btn-primary start">Start</button>
        </div>
        </div>
        <div class="row">
            <img class = "user1 starting-position img-size col-sm-12" src="images/sonic.gif">
            </div>
            <!--<div class = "w-100"></div>-->
            <div class="row">
            <img class = "user2 starting-position img-size row col-sm-12" src="images/pokemon.gif">
            </div>
            <div class="row">
            <img class = "user3 starting-position img-size row col-sm-12" src="images/mario.gif">
            </div>`

        )
    });

    let game_logic = function() {

        setInterval(function () {
                counter += 1;
                let userOneMath = Math.random();
                let userTwoMath = Math.random();
                let userThreeMath = Math.random();

                if ($(".user1").position().left > $(window).width() - imageWidths) {
                    $(".announce").html("Sonic has won!");
                    clearInterval(game_logic);
                }

                if ($(".user2").position().left > $(window).width() - imageWidths) {
                    $(".announce").html("Blue has won!");
                    clearInterval(game_logic);
                }

                if ($(".user3").position().left > $(window).width() - imageWidths) {
                    $(".announce").html("Mario has won!");
                    clearInterval(game_logic);
                }

                if (userOneMath > userTwoMath && userOneMath > userThreeMath) {
                    $(".user1").animate({left: "+=" + userOnePer + "%"}, 1);
                }


                if (userTwoMath > userOneMath && userTwoMath > userThreeMath) {
                    $(".user2").animate({left: "+=" + userTwoPer + "%"}, 1)
                }


                if (userThreeMath > userTwoMath && userThreeMath > userTwoMath) {
                    $(".user3").animate({left: "+=" + userThreePer + "%"}, 1)
                }

            else {
                console.log('else');
                clearInterval(game_logic);
            }
        }, 500);
    };


    $(document).on("click", ".start", function() {
        game_logic();
        console.log("hello");
    });

});