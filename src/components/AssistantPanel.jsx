import { useState } from "react";

export default function AssistantPanel({
  onAskHint,
  latestVerdict,
  loading,
  hintResponse,
}) {
  const [question, setQuestion] = useState("");

  const submit = () => {
    if (!question.trim()) {
      return;
    }
    onAskHint(question.trim());
  };

  return (
    <section className="panel assistantPanel">
      <h2 className="panelTitle">Agent Coach</h2>
      <p className="muted">Latest verdict: {latestVerdict ?? "Not run yet"}</p>
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

      {hintResponse ? (
        <div className="hintCard">
          <h3>Guided hint</h3>
          <p>{hintResponse.guided_hint}</p>
          <h3>Strategy</h3>
          <p>{hintResponse.strategy}</p>
          <h3>Complexity</h3>
          <p>{hintResponse.complexity_suggestion}</p>
        </div>
      ) : null}
    </section>
  );
}
