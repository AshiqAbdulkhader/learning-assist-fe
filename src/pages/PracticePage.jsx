import { useEffect, useState } from "react";

import AssistantPanel from "../components/AssistantPanel";
import CodeEditor from "../components/CodeEditor";
import ProblemList from "../components/ProblemList";
import ProblemStatement from "../components/ProblemStatement";
import ResultPanel from "../components/ResultPanel";
import { api } from "../lib/api";

export default function PracticePage() {
  const [problems, setProblems] = useState([]);
  const [activeProblemId, setActiveProblemId] = useState(null);
  const [activeProblem, setActiveProblem] = useState(null);

  const [code, setCode] = useState("");
  const [runResult, setRunResult] = useState(null);
  const [hintResponse, setHintResponse] = useState(null);
  const [runError, setRunError] = useState("");

  const [loadingProblems, setLoadingProblems] = useState(false);
  const [loadingProblemDetails, setLoadingProblemDetails] = useState(false);
  const [running, setRunning] = useState(false);
  const [gettingHint, setGettingHint] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoadingProblems(true);
      try {
        const list = await api.listProblems();
        setProblems(list);
        if (list.length > 0) {
          setActiveProblemId(list[0].id);
        }
      } catch (error) {
        setRunError(error.message);
      } finally {
        setLoadingProblems(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const loadProblem = async () => {
      if (!activeProblemId) {
        return;
      }
      setLoadingProblemDetails(true);
      setRunResult(null);
      setHintResponse(null);
      setRunError("");
      try {
        const details = await api.getProblem(activeProblemId);
        setActiveProblem(details);
        setCode(details.starter_code ?? "");
      } catch (error) {
        setRunError(error.message);
      } finally {
        setLoadingProblemDetails(false);
      }
    };
    loadProblem();
  }, [activeProblemId]);

  const onRunCode = async () => {
    if (!activeProblemId) {
      return;
    }
    setRunning(true);
    setRunError("");
    try {
      const result = await api.runSubmission({ problem_id: activeProblemId, code });
      setRunResult(result);
    } catch (error) {
      setRunError(error.message);
    } finally {
      setRunning(false);
    }
  };

  const onAskHint = async (question) => {
    if (!activeProblemId) {
      return;
    }
    setGettingHint(true);
    setRunError("");
    try {
      const result = await api.getHint({
        problem_id: activeProblemId,
        code,
        latest_verdict: runResult?.verdict ?? "not_run",
        user_question: question,
      });
      setHintResponse(result);
    } catch (error) {
      setRunError(error.message);
    } finally {
      setGettingHint(false);
    }
  };

  return (
    <div className="appShell">
      <header className="header">
        <h1>Agentic Coding IDE</h1>
        <button className="primaryButton" onClick={onRunCode} disabled={running}>
          {running ? "Running..." : "Run Code"}
        </button>
      </header>

      <main className="layout">
        <ProblemList
          problems={problems}
          activeProblemId={activeProblemId}
          onSelectProblem={setActiveProblemId}
          loading={loadingProblems}
        />

        <section className="centerColumn">
          <ProblemStatement problem={activeProblem} loading={loadingProblemDetails} />
          <CodeEditor code={code} onChange={setCode} />
          <ResultPanel result={runResult} error={runError} />
        </section>

        <AssistantPanel
          latestVerdict={runResult?.verdict}
          onAskHint={onAskHint}
          loading={gettingHint}
          hintResponse={hintResponse}
        />
      </main>
    </div>
  );
}
