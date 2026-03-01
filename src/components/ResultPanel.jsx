export default function ResultPanel({ result, error }) {
  return (
    <section className="panel">
      <h2 className="panelTitle">Run Result</h2>
      {error ? <p className="errorText">{error}</p> : null}
      {!result ? (
        <p className="muted">Run your code to see verdict and test details.</p>
      ) : (
        <div className="resultCard">
          <p>
            <strong>Verdict:</strong> {result.verdict}
          </p>
          <p>
            <strong>Passed:</strong> {result.passed_count} / {result.total_count}
          </p>
          <p>
            <strong>Runtime:</strong> {result.runtime_ms} ms
          </p>
          {result.error ? (
            <p>
              <strong>Error:</strong> {result.error}
            </p>
          ) : null}
          {result.failed_case_summary ? (
            <div className="failedCase">
              <p>
                <strong>Input:</strong>
              </p>
              <pre>{result.failed_case_summary.input}</pre>
              <p>
                <strong>Expected:</strong> {result.failed_case_summary.expected_output}
              </p>
              <p>
                <strong>Actual:</strong> {result.failed_case_summary.actual_output}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
