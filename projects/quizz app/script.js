document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const questionList = document.getElementById("choices-list");
  const questonText = document.getElementById("question-text");
  const resultConainer = document.getElementById("result-container");
  const ScoreDisplay = document.getElementById("score");
  const NxtBtn = document.getElementById("next-btn");
  const RestartBtn = document.getElementById("restart-btn");
  const StartBtn = document.getElementById("start-btn");
  
  const questions = [
    {
      type: "singleSelect",
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      answer: 'Mars',
      explanation:
        "Mars is called the Red Planet due to its iron oxide-rich soil giving it a reddish appearance.",
      hint: "It’s the fourth planet from the Sun.",
    },
    {
      type: "singleSelect",
      question: "What is the capital city of Japan?",
      options: ["Kyoto", "Tokyo", "Nagoya", "Osaka"],
      answer: "Tokyo",
      explanation:
        "Tokyo is the capital of Japan and one of the largest metropolitan areas in the world.",
      hint: "It’s the most populous city in Japan.",
    },
    {
      type: "singleSelect",
      question: "Which gas do humans primarily exhale?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: [1],
      explanation:
        "Humans inhale oxygen and exhale carbon dioxide as a byproduct of cellular respiration.",
      hint: "It’s a greenhouse gas produced during respiration.",
    },
    {
      type: "singleSelect",
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "Mark Twain",
        "Jane Austen",
        "William Shakespeare",
      ],
      answer: [3],
      explanation:
        "William Shakespeare authored 'Romeo and Juliet', one of his most famous tragedies.",
      hint: "He is often called England’s national poet.",
    },
    {
      type: "singleSelect",
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Pb", "Ag", "Fe"],
      answer: [0],
      explanation:
        "The chemical symbol for gold is Au, derived from the Latin word 'Aurum'.",
      hint: "It comes from the Latin word 'Aurum'.",
    },
  ];

  let currentIndex = 0;
  let socre = 0;
  StartBtn.addEventListener("click", startQuiz);

  function startQuiz() {
    StartBtn.classList.add("hidden");
    resultConainer.classList.add('hidden')
    questionContainer.classList.remove('hidden')
    showQuestion();
  }

  function showQuestion(){
    NxtBtn.classList.add('hidden')
    questonText.innerText = questions[currentIndex].question
  }

});