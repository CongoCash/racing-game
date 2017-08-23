$(document).ready(function() {
    // $(document).keyup(function(event) {
    //     if (event.keyCode === 70) {
    //         $(".starting-position").animate({left: "+=24%"}, 1);
    //     }
    // });
    let imageWidths = 150
    // $(".user1").animate({left: "+=24%"}, 1);
    // console.log($(".user1").position().left+imageWidths);
    // console.log($(window).width());
    while ($(".starting-position").position().left+imageWidths < $(window).width()) {
        let userOneMath = Math.random();
        console.log(userOneMath);
        let userTwoMath = Math.random();
        console.log(userTwoMath);
        let userThreeMath = Math.random();
        console.log(userThreeMath);
        if (userOneMath > userTwoMath && userOneMath > userThreeMath) {
            console.log("h");
            $(".user1").animate({left: "+=24%"}, 1)
        };
        if (userTwoMath > userOneMath && userTwoMath > userThreeMath) {
            console.log("j");
            $(".user2").animate({left: "+=24%"}, 1)
        };
        if (userThreeMath > userTwoMath && userThreeMath > userTwoMath) {
            console.log("k");
            $(".user3").animate({left: "+=24%"}, 1)
        };
    }
});