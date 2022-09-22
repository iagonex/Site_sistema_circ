//selecionando todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// se o botão startQuiz for clicado
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// se o botão exitQuiz for clicado
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //ocultar caixa de informações
}

// se o botão continueQuiz for clicado
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //ocultar caixa de informações
    quiz_box.classList.add("activeQuiz"); //mostrar caixa de perguntas
    showQuetions(0); //chamando a função showQestions
    queCounter(1); //passando 1 parâmetro para queCounter
    startTimer(30); //chamando a função startTimer
    startTimerLine(0); //chamando a função startTimerLine
}

let timeValue =  30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// se o botão reiniciarQuiz for clicado
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //mostrar caixa de perguntas
    result_box.classList.remove("activeResult"); //ocultar caixa de resultados
    timeValue = 30; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //chamando a função showQestions
    queCounter(que_numb); //passando o valor que_numb para queCounter
    clearInterval(counter); //limpar contador
    clearInterval(counterLine); //limpar contralinha
    startTimer(timeValue); //chamando a função startTimer
    startTimerLine(widthValue); //chamando a função startTimerLine
    timeText.textContent = "Tempo Restante"; //alterar o texto de timeText para Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// se o botão quitQuiz for clicado
quit_quiz.onclick = ()=>{
    window.location.reload(); //recarregar a janela atual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// se o botão NextQuestion clicou
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //se a contagem de perguntas for menor que o comprimento total da pergunta
        que_count++; //incremente o valor que_count
        que_numb++; //incremente o valor que_numb
        showQuetions(que_count); //chamando a função showQestions
        queCounter(que_numb); //passando o valor que_numb para queCounter
        clearInterval(counter); //limpar contador
        clearInterval(counterLine); //limpar contralinha
        startTimer(timeValue); //chamando a função startTimer
        startTimerLine(widthValue); //chamando a função startTimerLine
        timeText.textContent = "Tempo Restante"; //altere o timeText para Time Left
        next_btn.classList.remove("show"); //ocultar o próximo botão
    }else{
        clearInterval(counter); //limpar contador
        clearInterval(counterLine); //limpar contralinha
        showResult(); //chamando a função showResult
    }
}

// obtendo perguntas e opções da matriz
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //criando uma nova tag span e div para pergunta e opção e passando o valor usando o índice da matriz
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adicionando nova tag span dentro de que_tag
    option_list.innerHTML = option_tag; //adicionando nova tag div dentro de option_tag
    
    const option = option_list.querySelectorAll(".option");

    // defina o atributo onclick para todas as opções disponíveis
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// criando as novas tags div que para ícones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//se o usuário clicou na opção
function optionSelected(answer){
    clearInterval(counter); //limpar contador
    clearInterval(counterLine); //limpar contralinha
    let userAns = answer.textContent; //obtendo a opção selecionada pelo usuário
    let correcAns = questions[que_count].answer; //obtendo a resposta correta da matriz
    const allOptions = option_list.children.length; //obtendo todos os itens de opção
    
    if(userAns == correcAns){ //se a opção selecionada pelo usuário for igual à resposta correta do array
        userScore += 1; //atualizando o valor da pontuação com 1
        answer.classList.add("correct"); //adicionando cor verde para corrigir a opção selecionada
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adicionando o ícone de carrapato para corrigir a opção selecionada
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adicionando cor vermelha para corrigir a opção selecionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adicionando ícone de cruz para corrigir a opção selecionada
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //se houver uma opção que corresponda a uma resposta de matriz
                option_list.children[i].setAttribute("class", "option correct"); //adicionando cor verde à opção correspondente
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adicionando o ícone de carrapato à opção correspondente
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //uma vez que o usuário selecione uma opção, desative todas as opções
    }
    next_btn.classList.add("show"); //mostrar o próximo botão se o usuário selecionar qualquer opção
}

function showResult(){
    info_box.classList.remove("activeInfo"); //ocultar caixa de informações
    quiz_box.classList.remove("activeQuiz"); //ocultar caixa de perguntas
    result_box.classList.add("activeResult"); //mostrar caixa de resultado
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // se o usuário marcou mais de 3
        //criando uma nova tag span e passando o número da pontuação do usuário e o número total da pergunta
        let scoreTag = '<span>Parabéns! 🎉, você tem <p>'+ userScore +'</p> fora de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adicionando nova tag span dentro de score_Text
    }
    else if(userScore > 1){ // se o usuário marcou mais de 1
        let scoreTag = '<span>Legal 😎, você tem <p>'+ userScore +'</p> fora de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // se o usuário marcou menos de 1
        let scoreTag = '<span>Desculpe 😐, você só tem <p>'+ userScore +'</p> fora de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //alterando o valor de timeCount com valor de tempo
        time--; //diminuir o valor do tempo
        if(time < 9){ //se o temporizador for inferior a 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //adicione um valor 0 antes do tempo
        }
        if(time < 0){ //se o temporizador for menor que 0
            clearInterval(counter); //limpar contador
            timeText.textContent = "Time Off"; //alterar o texto da hora para folga
            const allOptions = option_list.children.length; //obtendo todos os itens de opção
            let correcAns = questions[que_count].answer; //obtendo a resposta correta da matriz
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //se houver uma opção que corresponda a uma resposta de matriz
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adicionando o ícone de carrapato à opção correspondente
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //uma vez que o usuário selecione uma opção, desative todas as opções
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //atualizando o valor do tempo com 1
        time_line.style.width = time + "px"; //aumentando a largura da time_line com px por valor de tempo
        if(time > 549){ //se o valor do tempo for maior que 549
            clearInterval(counterLine); //limpar contralinha
        }
    }
}

function queCounter(index){
    //criando uma nova tag span e passando o número da pergunta e a pergunta total
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adicionando nova tag span dentro de bottom_ques_counter
}