const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 10;

const select = [0, 0, 0, 0];

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector(".aBox");
    var answer = document.createElement('button'); // 새로운 요소 생성

    answer.classList.add("answerList");
    answer.classList.add("my-5");
    answer.classList.add("py-3");
    answer.classList.add("mx-auto");
    
    answer.classList.add("fadeIn");
    a.appendChild(answer); // Abox에 answer 버튼 추가
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll(".answerList");
        for(let i=0; i < children.length; i++){
            children[i].disabled = true; // 버튼 비활성화

            children[i].style.WebkitAnimation = "fadeOut 0.5s"; // 버튼 안보이게
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            var target = qnaList[qIdx].a[idx].type; // 선택되면 현재 인덱스의 정보 읽어옴
            
            for(let i=0;i<target.length;i++){
                select[target[i]] += 1; // 해당하는 인덱스 값 갱신
            }

            for(let i=0; i<children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx); // 다음 질문으로 넘어가기
        }, 450);
    }, false)
}

function calResult(){
    var result = select.indexOf(Math.max(...select));
    return result;
}

function setResult(){
    let point = calResult();

    const resultNameIntro = document.querySelector(".resultIntro");
    resultNameIntro.innerHTML = infoList[point].nameIntro;

    const resultName = document.querySelector(".resultName");
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement("img");
    const imgDiv = document.querySelector("#resultImg");
    var imgURL = "img/image-" + point + ".png";
    
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add("img-fluid"); // 동적 이미지
    imgDiv.appendChild(resultImg);
    

    const resultDescTitle1 = document.querySelector(".resultDescTitle1");
    const resultDesc1 = document.querySelector(".resultDesc1");
    resultDescTitle1.innerHTML = infoList[point].descTitle1;
    resultDesc1.innerHTML = infoList[point].desc1;

    const resultDescTitle2 = document.querySelector(".resultDescTitle2");
    const resultDesc2 = document.querySelector(".resultDesc2");
    resultDescTitle2.innerHTML = infoList[point].descTitle2;
    resultDesc2.innerHTML = infoList[point].desc2;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block";
        }, 450);
    }, 450);

    setResult();
}

function goNext(qIdx){
    if (qIdx === endPoint){
        goResult();
        return; // 함수 종료
    }

    var q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q; // qIdx번째 질문을 디스플레이
    
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var countStatusNum = document.querySelector(".countStatus");
    countStatusNum.innerHTML = (qIdx+1) + "/" + endPoint; // 문제 번호

    var status = document.querySelector(".statusBar");
    status.style.width = (100/endPoint)*(qIdx+1)+"%"; // 10% -> 20% -> ...
}

function start(){
    /*먼저 fadeOut -> 좀 있다가 fadeIn -> 속성 변경*/ 
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);
        let qIdx = 0; // 질문 인덱스 값
        goNext(qIdx);
    }, 450);

}


