const $ = (selection) => document.querySelector(selection);
const $$ = (selection) => document.querySelectorAll(selection);
const $$$ = (selection) => document.createElement(selection);

let images_list = $("#user-choices-container");
let choice = $$(".choice");
let user_modal = $("#user-modal");
let game_modal = $("#game-modal");
let game_over_modal = $("#game-over-modal")
let user_choiced_container = $("#user-choiced-container");
let computer_random_container = $("#computer-random-container")
let footer_text = $("#footer-text");
let score_board_container = $("#score-board")
let choose_again_button = $("#choose-again");
let reset_button = $("#reset");
let restart_button = $("#game-over-button")

const audio = new Audio('click_sound_2.wav');
audio.playbackRate = 2.0;
const victory_sound = new Audio("win_sound_1.mp3");
const loose_sound = new Audio("loose_sound.mp3");
const draw_sound = new Audio("draw_sound.wav");

let modal_switch = false;
let diable_selection = false;

let timeoutid;
let random_generated_hand_id;
let html_for_computer;
let html_for_user;
let user_picked;

let array_of_hands = ["rock", "paper", "scissors"];

let image_generated_node;
let user_picked_node;


let won = 0;
let loose = 0;
let draw = 0;


images_list.addEventListener("click", (e) => {

    //disable all selection if clicked on any image
    if (!diable_selection) {
        images_list.style.pointerEvents = "none";
        diable_selection = true;
    }


    if (!e.target) {
        return

    } else {
        modal_switch = true;

        if (modal_switch) {
            let src_attributeName = e.target.getAttribute("src") //storing the src of the image user clicked

            if (src_attributeName === "./assets/rock_hand.png") {
                footer_text.innerText = `You Choosed: Rock`;
                audio.play();
                user_picked = "rock";

            } else if (src_attributeName === "./assets/paper_hand.png") {
                footer_text.innerText = `You Choosed: Paper`;
                audio.play();
                user_picked = "paper";

            } else if (src_attributeName === "./assets/scissors_hand.png") {
                footer_text.innerText = `You Choosed: Scissor`;
                audio.play();
                user_picked = "scissor";
            }

            user_picked_hand()
            let picked_node = $("#user-choiced")
            user_picked_node = picked_node.childNodes[3].getAttribute("src")

            timeoutid = setTimeout(() => {
                user_modal.style.display = "none";
                game_modal.style.display = "flex";
                modal_switch = false;
                // console.log(picked_node.childNodes[3])

            }, 2000);

            // picked_node.childNodes[3].classList.add("annimation")
        }
    }


    random_generated_hand_id = setTimeout(() => {
        random_generated_hand();
        let generated_node = $("#computer-choiced")
        image_generated_node = generated_node.childNodes[3].getAttribute("src")
        // console.log(generated_node.childNodes[3])
        game_logic()
        render_score()
    }, 3000);

    // game_over_modal_logic()
})

choose_again_button.addEventListener("click", (e) => {
    e.preventDefault()
    clearTimeout(timeoutid)
    clearTimeout(random_generated_hand_id)

    //switches to user-modal
    if (modal_switch === false) {
        footer_text.innerText = "Choose Your Move";
        user_modal.style.display = ""
        game_modal.style.display = "none";
        computer_random_container.innerHTML = "";
        user_choiced_container.innerHTML = "";

    }

    //re-enable all selection if clicked on choose again button
    if (diable_selection) {
        images_list.style.pointerEvents = "auto";
        diable_selection = false;

    }


})

reset_button.addEventListener("click", () => {
    won = 0
    loose = 0
    draw = 0
    render_score()

})


// restart_button.addEventListener("click", () => {
//     user_modal.style.display = "flex"
//     game_over_modal.display = "none"

// })


function random_generated_hand() {
    let random_generated_number = Math.floor(Math.random() * array_of_hands.length);
    let hand_pick = array_of_hands[random_generated_number];
    let src_generated = "./assets/" + hand_pick + "_hand.png"

    html_for_computer = `<div id="computer-choiced">
                    <label id="username">Computer</label>
                    <img id="computer-choiced-image" src="${src_generated}">
            </div>`;

    computer_random_container.innerHTML = html_for_computer;

}

function user_picked_hand() {

    if (user_picked === "rock") {
        html_for_user = `<div id="user-choiced">
                    <label id="username">You</label>
                    <img id="user-choiced-image" src="./assets/rock_hand.png">
            </div>`;

        user_choiced_container.innerHTML = html_for_user

    } else if (user_picked === "paper") {
        html_for_user = `<div id="user-choiced">
                    <label id="username">You</label>
                    <img id="user-choiced-image" src="./assets/paper_hand.png">
            </div>`;
        user_choiced_container.innerHTML = html_for_user

    } else if (user_picked === "scissor") {
        html_for_user = `<div id="user-choiced">
                    <label id="username">You</label>
                    <img id="user-choiced-image" src="./assets/scissors_hand.png">
            </div>`;
        user_choiced_container.innerHTML = html_for_user

    }

}

function game_logic() {

    if (image_generated_node === user_picked_node) {
        draw_sound.play();
        draw += 1

    } else if (image_generated_node === "./assets/rock_hand.png" && user_picked_node === "./assets/paper_hand.png") {
        victory_sound.play()
        won += 1

    } else if (image_generated_node === "./assets/scissors_hand.png" && user_picked_node === "./assets/rock_hand.png") {
        victory_sound.play()
        won += 1

    } else if (image_generated_node === "./assets/paper_hand.png" && user_picked_node === "./assets/scissors_hand.png") {
        victory_sound.play()
        won += 1

    } else if (image_generated_node === "./assets/rock_hand.png" && user_picked_node === "./assets/scissors_hand.png") {
        loose_sound.play()
        loose += 1

    } else if (image_generated_node === "/assets/scissors_hand.png" && user_picked_node === "./assets/paper_hand.png") {
        loose_sound.play()
        loose += 1

    } else if (image_generated_node === "./assets/paper_hand.png" && user_picked_node === "./assets/rock_hand.png") {
        loose_sound.play()
        loose += 1

    }
}

function render_score() {
    score_board_container.childNodes[1].childNodes[1].innerText = `Won: ${won}`
    score_board_container.childNodes[3].childNodes[1].innerText = `Loose: ${loose}`
    score_board_container.childNodes[5].childNodes[1].innerText = `Draw: ${draw}`

}

function game_over_modal_logic() {
    if (won === 3) {
        console.log("won")
        user_modal.style.display = "none"
        game_modal.style.display = "none";
        game_over_modal.style.display = "flex"
    } else if (loose === 3) {
        user_modal.style.display = "none"
        game_modal.style.display = "none";
        game_over_modal.style.display = "flex"
    } else if (draw === 3) {
        user_modal.style.display = "none"
        game_modal.style.display = "none";
        game_over_modal.style.display = "flex"
    }
}