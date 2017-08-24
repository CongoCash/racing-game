$(document).ready(function() {

    let characters = [
        {
            name: "Koolaid",
            speed: 10,
            sprite: "images/koolaid.gif"
        },
        {
            name: "Homer",
            speed: 11,
            sprite: "images/homer.gif"
        },
        {
            name: "Pokemon",
            speed: 12,
            sprite: "images/pokemon.gif"
        },
        {
            name: "Patrick",
            speed: 13,
            sprite: "images/patrickstar.gif"
        },
        {
            name: "Kirby",
            speed: 14,
            sprite: "images/kirby.gif"
        },
        {
            name: "Mario",
            speed: 15,
            sprite: "images/mario.gif"
        },
        {
            name: "Charizard",
            speed: 16,
            sprite: "images/charizard.gif"
        },
        {
            name: "Sonic",
            speed: 20,
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
    let characterSelect = function() {
        $('.start-user0, .start-user1, .start-user2, .start-user3, ' +
            '.start-user4, .start-user5, .start-user6').on("click", function() {
            for (let i = 0; i < characters.length; i++) {
                if (characters[i].sprite === $(this).attr("src")) {
                    userOne = characters[i]
                    console.log(userOne);
                }
            }
            userTwo = characters[level - 1];
            userThree = characters[level];
            raceScreen(userOne, userTwo, userThree);
        })
    };

                //Creating the race screen
    let raceScreen = function(userOne, userTwo, userThree) {
        $('body').html(
            `<div class="row">
                <h1 class="announce col-sm-12">Racing Game</h1>
            </div>
            <div class="row button-parent">
                    <button type="button" class="btn btn-primary booster col-sm-4">Steroids +3 Speed</button>
                    <button type="button" class="btn btn-primary start col-sm-4">Start</button>
                    <button type="button" class="btn btn-primary injure col-sm-4">Injure Opponent -1 Speed</button>
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
    }

    let cheating = function() {
        let cheatRandom = Math.random();
        console.log("cheat")
        if (cheatRandom > .4) {
            userOne.speed += 3
        }
        else if (cheatRandom < .1) {
            alert("Cheating is not allowed, you must start from the beginning!");
            location.reload()
        }
        else {
            userTwo.speed += 1;
            userThree.speed += 1;
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
            console.log('h')
            userOne.speed -= 1;
            if (userOne.speed <1) {
                userOne.speed = 1
            }
        }
    }

    //Setting the page for the next level of characters
    let nextLevel = function() {
        if (level > 7) {
            $('body').html(`<h1>Wow you beat this game!</h1>`)
        }

        else {
            userTwo = characters[level-1];
            userThree = characters[level];
            raceScreen(userOne, userTwo, userThree)
        }
    }

    //Checks for winner, adjusts level accordingly
    let checkWinner = function() {
        if ($(".user1").position().left > $(window).width() - imageWidths) {
            if(userOne.name === "Koolaid") {
                $("body").css("background-image", "url('images/Kool-aid-man-family-guy.gif')")
            }
            alert("You have won!")
            level+= 1
            return true
        }
    };

    //movement for the characters
    let movement = function() {
        if (userOneMath > userTwoMath && userOneMath > userThreeMath) {
            $(".user1").animate({left: "+=" + userOne.speed + "%"}, 1000, "linear");
        }


        if (userTwoMath > userOneMath && userTwoMath > userThreeMath) {
            $(".user2").animate({left: "+=" + userTwo.speed + "%"}, 1000, "linear")
        }


        if (userThreeMath > userTwoMath && userThreeMath > userTwoMath) {
            $(".user3").animate({left: "+=" + userThree.speed + "%"}, 1000, "linear")
        };
    }
    characterSelect();
    $(document).on("click", ".injure", function() {
        injuring();
    });
    $(document).on("click", ".booster", function() {
        cheating();
    });
    //logic for the game
    let game_logic = function() {
        var gameInterval = setInterval(function () {
            userOneMath = Math.random();
            userTwoMath = Math.random();
            userThreeMath = Math.random();
            if (checkWinner() === true) {
                clearInterval(gameInterval);
                nextLevel();
            }
            else if ($(".user2").position().left > $(window).width() - imageWidths ||
            $(".user3").position().left > $(window).width() - imageWidths) {
                level = 1;
                clearInterval(gameInterval);
                alert("You have lost, you will need to restart at level 1!");
                location.reload();
            }

            else {
                movement();
            }


        }, 50);
    };

    $(document).on("click", ".start", function() {
        $(".button-parent").html(`
            <ul>
                <li class="col-sm-4 speed-style">${userOne.name}'s speed: ${Math.ceil(userOne.speed)}</li>
                <li class="col-sm-4 speed-style">${userTwo.name}'s speed: ${Math.ceil(userTwo.speed)}</li>
                <li class="col-sm-4 speed-style">${userThree.name}'s speed: ${Math.ceil(userThree.speed)}</li>
            </ul>`

    )
        game_logic();
    });

});