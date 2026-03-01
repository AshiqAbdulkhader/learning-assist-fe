export default function ProblemStatement({ problem, loading }) {
  return (
    <section className="panel">
      <h2 className="panelTitle">Problem</h2>
      {loading ? (
        <p className="muted">Loading statement...</p>
      ) : problem ? (
        <>
          <h3 className="problemTitle">{problem.title}</h3>
          <p className="muted">
            Difficulty: <span className={`tag ${problem.difficulty}`}>{problem.difficulty}</span>
          </p>
          <p className="description">{problem.description}</p>
        </>
      ) : (
        <p className="muted">Select a problem to begin.</p>
      )}
    </section>
  );
}
