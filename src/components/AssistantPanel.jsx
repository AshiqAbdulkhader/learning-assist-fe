import { useState } from "react";

export default function AssistantPanel({
  onAskHint,
  latestVerdict,
  loading,
  history,
}) {
  const [question, setQuestion] = useState("");

  const submit = () => {
    if (!question.trim()) {
      return;
    }
    onAskHint(question.trim());
    setQuestion("");
  };

  return (
    <section className="panel assistantPanel">
      <h2 className="panelTitle">Agent Coach</h2>
      <p className="muted">Latest verdict: {latestVerdict ?? "Not run yet"}</p>
      <div className="filterRow">
        <button className="chipButton" onClick={() => onAskHint("Give me the next smallest hint only.")}>
          Next smallest hint
        </button>
        <button className="chipButton" onClick={() => onAskHint("Where might my logic fail for edge cases?")}>
          Debug failure
        </button>
        <button className="chipButton" onClick={() => onAskHint("How can I optimize runtime and memory?")}>
          Optimize complexity
        </button>
      </div>
      <textarea
        className="inputArea"
        rows={4}
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Ask for guidance, optimization ideas, or debugging help..."
      />
      <button className="primaryButton" onClick={submit} disabled={loading}>
        {loading ? "Thinking..." : "Get Hint"}
      </button>

      <div className="assistantHistory">
        {history.length ? (
          history.map((entry, index) => (
            <div key={`${entry.question}-${index}`} className="hintCard">
              <p className="muted">
                Q: {entry.question}
                <span className="sourceBadge">{entry.response.source}</span>
              </p>
              <p className="muted">Level: {entry.response.hint_level}</p>
              <h3>Guided hint</h3>
              <p>{entry.response.guided_hint}</p>
              <h3>Strategy</h3>
              <p>{entry.response.strategy}</p>
              <h3>Complexity</h3>
              <p>{entry.response.complexity_suggestion}</p>
            </div>
          ))
        ) : (
          <p className="muted">Ask a question to start guided hints.</p>
        )}
      </div>
    </section>
  );
}
