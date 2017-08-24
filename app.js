$(document).ready(function() {

    let characters = [
        {
            name: "Koolaid",
            speed: 1,
            sprite: "images/koolaid.gif"
        },
        {
            name: "Homer",
            speed: 2,
            sprite: "images/homer.gif"
        },
        {
            name: "Pokemon",
            speed: 3,
            sprite: "images/pokemon.gif"
        },
        {
            name: "Patrick",
            speed: 4,
            sprite: "images/patrickstar.gif"
        },
        {
            name: "Kirby",
            speed: 5,
            sprite: "images/kirby.gif"
        },
        {
            name: "Mario",
            speed: 6,
            sprite: "images/mario.gif"
        },
        {
            name: "Charizard",
            speed: 7,
            sprite: "images/charizard.gif"
        },
        {
            name: "Sonic",
            speed: 8,
            sprite: "images/sonic.gif"
        }
    ];

    let imageWidths = 500;
    let userOne = {name:"", speed: 1, sprite:""}
    let userTwo = {};
    let userThree = {};
    let userOneMath;
    let userTwoMath;
    let userThreeMath;
    let level = 1;

    //Adding the character select screen by appending mapping through the character arrays and appending the string result to the body
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

    //Remembering the user's character and selecting the level 1 characters
    $('.start-user0, .start-user1, .start-user2, .start-user3, ' +
        '.start-user4, .start-user5, .start-user6, .start-user7').on("click", function() {
        for (let i = 0; i < characters.length; i++) {
            if (characters[i].sprite === $(this).attr("src")) {
                userOne = characters[i]
                console.log(userOne);
            }
        }
        userTwo = characters[0]
        userThree = characters[1]

        //Creating the race screen
        $('body').html(
            `<div class="row">
            <h1 class="announce col-sm-12">Racing Game</h1>
        </div>
        <div class="row">
            <div class="col-sm-12 text-center button-parent">
            <button type="button" class="btn btn-primary start">Start</button>
        </div>
        </div>
        <div class="row lanes">
            <img class = "user1 starting-position img-size col-sm-12" src="${userOne.sprite}">
            </div>
            <div class="row">
            <img class = "user2 starting-position img-size row col-sm-12" src="${userTwo.sprite}">
            </div>
            <div class="row">
            <img class = "user3 starting-position img-size row col-sm-12" src="${userThree.sprite}">
            </div>`
        );
    });

    //Setting the page for the next level of characters
    let nextLevel = function() {
        if (level > 7) {
            $('body').html(`<h1>Wow you beat this game!</h1>`)
        }

        else {

        }
    }

    //Checks for winner, adjusts level accordingly
    let checkWinner = function() {
        if ($(".user1").position().left > $(window).width() - imageWidths) {
            $(".announce").html(`${userOne.name} has won!`);
            level+= 1
            return true
        }

        if ($(".user2").position().left > $(window).width() - imageWidths) {
            $(".announce").html(`${userTwo.name} has won!`);
            level = 1;
            return true
        }

        if ($(".user3").position().left > $(window).width() - imageWidths) {
            $(".announce").html(`${userThree.name} has won!`);
            level = 1
            return true
        }
        return false
    };

    //movement for the characters
    let movement = function() {
        if (userOneMath > userTwoMath && userOneMath > userThreeMath) {
            $(".user1").animate({left: "+=" + userOne.speed + "%"}, 1);
        }


        if (userTwoMath > userOneMath && userTwoMath > userThreeMath) {
            $(".user2").animate({left: "+=" + userTwo.speed + "%"}, 1)
        }


        if (userThreeMath > userTwoMath && userThreeMath > userTwoMath) {
            $(".user3").animate({left: "+=" + userThree.speed + "%"}, 1)
        };
    }

    //logic for the game
    let game_logic = function() {
        var gameInterval = setInterval(function () {
            $(".booster").on("click", function() {
                console.log('h')
                cheating();
            })
            $(document).on("click", ".injure", function() {
                injuring();
            })
            userOneMath = Math.random();
            userTwoMath = Math.random();
            userThreeMath = Math.random();
            if (checkWinner() === true) {
                clearInterval(gameInterval);
                nextLevel();
            };
            movement();


        }, 500);
    };

    let cheating = function() {
        let cheatRandom = Math.random();
        if (cheatRandom > .4) {
            userOne.speed += 3
        }
        else {
            alert("Cheating is not allowed, you will need to restart at level 1!")
            location.reload()
        }
    }

    let injuring = function() {
        let cheatRandom = Math.random();
        console.log(userOne.speed)
        if (cheatRandom > .5) {
            userTwo.speed -= 1;
            userThree.speed -= 1;
            if (userTwo.speed < 1) {
                userTwo.speed = 1
            }
            if (userThree.speed < 1) {
                userThree.speed = 1
            }
        }
        else {
            alert("You were roughed up, -2 speed")
            userOne.speed -= 2;
            if (userOne.speed <1) {
                userOne.speed = 1
            }
        }
    }


    $(document).on("click", ".start", function() {
        $('.button-parent').html(`<button type="button" class="btn btn-primary booster">Steroids +3 Speed</button>
<button type="button" class="btn btn-primary injure">Injure Opponent -1 Speed</button>`)

        game_logic();

    });

});