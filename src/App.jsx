import React, { useEffect, useState } from "react";

function App() {
  const [langs, setLangs] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/bayrog/bayroglar")
      .then((response) => response.json())
      .then((data) => {
        const questions = data.data;

        for (let i = questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [questions[i], questions[j]] = [questions[j], questions[i]];
        }

        setLangs(questions);
        setCurrentQuestion(questions[0]);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleSubmit = (ans) => {
    if (!isAnswered) {
      setSelectedAnswer(ans);
      setIsAnswered(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);

    // Savolni yangilash
    const nextIndex = Math.floor(Math.random() * langs.length);
    setCurrentQuestion(langs[nextIndex]);
  };

  return (
    <div className="p-10 flex flex-col mx-auto mt-40  rounded-lg bg-natural h-[400px] w-[800px]">
      <h1 className="absolute text-3xl">Where does this flag belong ?</h1>
      {currentQuestion && (
        <div className="flex my-auto w-full gap-[100px]">
          <div className="w-[400px] h-full rounded-lg overflow-hidden mt-12 max-h-[300px]">
            <img src={currentQuestion.question} alt="flag" />
          </div>
          <div className="flex gap-12 flex-col">
            {currentQuestion.options.map((answ, index) => (
              <button
                onClick={() => handleSubmit(answ)}
                className={`text-xl h-10 border rounded-lg w-[250px] ${
                  selectedAnswer === answ
                    ? answ === currentQuestion.answer
                      ? "bg-green-500 "
                      : "bg-red-500 "
                    : "bg-yellow-300 "
                }`}
                key={index}
              >
                {answ}
              </button>
            ))}
          </div>
        </div>
      )}
      {!currentQuestion && (
        <div>
          <h2 className="h-56 w-full flex justify-center items-center font-bold text-3xl">Loading....</h2>
        </div>
      )}
      <button
        onClick={handleReset}
        className="border text-lg font-semibold tracking-[4px] bg-[#222] text-white border-black mt-5 py-3"
      >
        Next
      </button>
    </div>
  );
}

export default App;
