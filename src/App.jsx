import { useState, useRef, useEffect } from "react";

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const loadScripts = () => {
    return new Promise((resolve, reject) => {
      const scriptsToLoad = [
        {
          id: "papaparse-script",
          src: "https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js",
        },
        {
          id: "xlsx-script",
          src: "https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js",
        },
      ];

      let loadedCount = 0;

      const checkCompletion = () => {
        loadedCount++;
        if (loadedCount === scriptsToLoad.length) {
          resolve();
        }
      };

      scriptsToLoad.forEach((script) => {
        if (!document.getElementById(script.id)) {
          const el = document.createElement("script");
          el.id = script.id;
          el.src = script.src;
          el.onload = checkCompletion;
          el.onerror = () => reject(`Failed to load script: ${script.src}`);
          document.body.appendChild(el);
        } else {
          checkCompletion();
        }
      });
    });
  };

  useEffect(() => {
    loadScripts().catch((err) => {
      setError(
        "Failed to load essential libraries. Please check your network connection."
      );
      console.error(err);
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setError("");

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      let parsedData = [];

      if (file.name.endsWith(".csv")) {
        const results = Papa.parse(data, { header: true, skipEmptyLines: true });
        parsedData = results.data;
      } else if (file.name.endsWith(".xlsx")) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        parsedData = XLSX.utils.sheet_to_json(worksheet);
      } else {
        setError("Unsupported file type. Please upload a .csv or .xlsx file.");
        return;
      }

      try {
        const formattedQuiz = parsedData.map((row) => {
          const requiredHeaders = [
            "question",
            "correct_answer",
            "incorrect_answer_1",
            "incorrect_answer_2",
            "incorrect_answer_3",
            "rationale",
          ];

          const missingHeaders = requiredHeaders.filter(
            (header) => !row.hasOwnProperty(header)
          );

          if (missingHeaders.length > 0) {
            throw new Error(
              `Missing required columns in the file: ${missingHeaders.join(", ")}.`
            );
          }

          const answerOptions = [
            { text: row.correct_answer, isCorrect: true },
            { text: row.incorrect_answer_1, isCorrect: false },
            { text: row.incorrect_answer_2, isCorrect: false },
            { text: row.incorrect_answer_3, isCorrect: false },
          ].sort(() => Math.random() - 0.5);

          return {
            question: row.question,
            answerOptions,
            rationale: row.rationale,
          };
        });

        setQuizData(formattedQuiz);
      } catch (err) {
        setError(err.message);
        setQuizData([]);
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleRetry = () => {
    setQuizData([]);
    setFileName("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const QuizQuestion = ({ question, answerOptions, rationale }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showRationale, setShowRationale] = useState(false);

    const handleAnswerClick = (index) => {
      setSelectedAnswer(index);
      setShowRationale(true);
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{question}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {answerOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`
                w-full text-left p-4 rounded-lg transition-colors duration-200
                ${
                  selectedAnswer === null
                    ? "bg-gray-100 hover:bg-gray-200"
                    : ""
                }
                ${
                  selectedAnswer !== null && option.isCorrect
                    ? "bg-green-500 text-white"
                    : ""
                }
                ${
                  selectedAnswer === index && !option.isCorrect
                    ? "bg-red-500 text-white"
                    : ""
                }
                ${
                  selectedAnswer !== null &&
                  !option.isCorrect &&
                  selectedAnswer !== index
                    ? "bg-gray-100 opacity-60"
                    : ""
                }
              `}
              disabled={selectedAnswer !== null}
            >
              {option.text}
            </button>
          ))}
        </div>
        {showRationale && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              selectedAnswer !== null &&
              answerOptions[selectedAnswer].isCorrect
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <p className="font-semibold">Rationale:</p>
            <p>{rationale}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Quiz Generator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload your CSV or Excel file to create a quiz!
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a2 2 0 00-2 2v20m30-14v12a2 2 0 01-2 2H12a2 2 0 00-2 2v20a2 2 0 002 2h28a2 2 0 002-2V12a2 2 0 00-2-2z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      ref={fileInputRef}
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".csv, .xlsx"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">CSV or XLSX up to 10MB</p>
              </div>
            </div>
            {fileName && (
              <p className="mt-2 text-sm text-center text-gray-500">
                File: {fileName}
              </p>
            )}
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-100 text-red-700 mb-6">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
              <button
                onClick={handleRetry}
                className="mt-2 text-sm text-red-500 hover:text-red-700 underline"
              >
                Try Again
              </button>
            </div>
          )}

          {quizData.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                Your Quiz
              </h2>
              <div className="space-y-8">
                {quizData.map((q, index) => (
                  <QuizQuestion
                    key={index}
                    question={q.question}
                    answerOptions={q.answerOptions}
                    rationale={q.rationale}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
