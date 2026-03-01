export default function ProblemList({
  problems,
  activeProblemId,
  onSelectProblem,
  loading,
}) {
  return (
    <aside className="panel">
      <h2 className="panelTitle">Problems</h2>
      {loading ? (
        <p className="muted">Loading problems...</p>
      ) : (
        <ul className="problemList">
          {problems.map((problem) => (
            <li key={problem.id}>
              <button
                className={`problemItem ${
                  problem.id === activeProblemId ? "active" : ""
                }`}
                onClick={() => onSelectProblem(problem.id)}
              >
                <span>{problem.title}</span>
                <small className={`tag ${problem.difficulty}`}>
                  {problem.difficulty}
                </small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
