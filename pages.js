import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [specialNeeds, setSpecialNeeds] = useState("");
  const [result, setResult] = useState("");

  const determinePlacement = () => {
    if (!score || !gender || !age || !specialNeeds) {
      setResult("Please fill out all fields before submitting.");
      return;
    }
    
    const numScore = parseInt(score);
    const numAge = parseInt(age);

    if (numAge < 12 || numAge > 18) {
      setResult("Invalid age! Candidates must be between 12 and 18 years old.");
      return;
    }

    let placement = "";
    if (numScore >= 400 && numScore <= 500) {
      placement = `National School (${gender}'s School)`;
    } else if (numScore >= 350 && numScore <= 399) {
      placement = `Extra County School (${gender}'s School)`;
    } else if (numScore >= 250 && numScore <= 349) {
      if (specialNeeds === "Yes") {
        placement = `Special School (${gender}'s Special School)`;
      } else {
        placement = `County School (${gender}'s School)`;
      }
    } else {
      placement = specialNeeds === "Yes" && numScore >= 250 ? `Special School (${gender}'s Special School)` : "Alternative Options: Vocational Training or Retake the Exam";
    }

    setResult(`Candidate Placement: ${placement}`);
  };

  return (
    <div className="container">
      <h2>Candidate School Placement</h2>
      <div className="form-group">
        <label>Examination Score (0-500):</label>
        <input type="number" value={score} onChange={(e) => setScore(e.target.value)} min="0" max="500" required />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="Male">Boy</option>
          <option value="Female">Girl</option>
        </select>
      </div>
      <div className="form-group">
        <label>Age (12-18):</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="12" max="18" required />
      </div>
      <div className="form-group">
        <label>Special Needs:</label>
        <select value={specialNeeds} onChange={(e) => setSpecialNeeds(e.target.value)} required>
          <option value="">Select Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <button onClick={determinePlacement}>Submit</button>
      {result && <div className={`result ${result.includes('Invalid') ? 'error' : 'success'}`}>{result}</div>}
      <style jsx>{`
        .container {
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          font-weight: bold;
          display: block;
        }
        input, select {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          width: 100%;
          padding: 10px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        button:hover {
          background: #218838;
        }
        .result {
          margin-top: 20px;
          padding: 10px;
          border-left: 5px solid;
        }
        .success {
          background: #d4edda;
          border-color: #155724;
        }
        .error {
          background: #f8d7da;
          border-color: #721c24;
        }
      `}</style>
    </div>
  );
}