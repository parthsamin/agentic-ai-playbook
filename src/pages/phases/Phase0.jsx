import { Callout, Table } from '../../components/UI';
import { AgentSpectrum } from '../../components/Visuals';
import Term from '../../components/Term';

export default function Phase0() {
  return (
    <>
      <Callout kind="key" title="Why this phase exists">
        Everything downstream goes wrong if you skip this. <strong>Most failed “agentic” initiatives are
        misclassified problems.</strong> Orient first, then frame.
      </Callout>

      <h2 id="spectrum">The agent spectrum</h2>
      <p>
        “Agentic” is not binary. Place every solution on this spectrum — the higher you go, the more capability
        <em> and</em> the more risk, cost, and governance burden. <strong>Click a level to explore it.</strong>
      </p>

      <AgentSpectrum />

      <Callout kind="key" title="The single most expert instinct you can develop">
        <strong>Workflows beat agents whenever the path is knowable.</strong> Agents earn their cost only when
        the steps genuinely can’t be predetermined. A client saying “we want agentic AI” usually has a Level-3
        workflow problem dressed up as a Level-4 ask. Reclassifying it down is often the highest-value thing you
        do all engagement — cheaper, faster, more reliable, easier to govern.
      </Callout>

      <Callout kind="tip" title="The definition that matters">
        An <Term k="agent"><strong>agent</strong></Term> is an <Term k="llm">LLM</Term> running in a loop,
        choosing which <Term k="tools">tools</Term> to call and when to stop, against a goal. A{' '}
        <Term k="workflow"><strong>workflow</strong></Term> is LLMs and tools orchestrated through code paths you
        defined. The difference is <strong>who controls the flow</strong> — the model or your code.
      </Callout>

      <h2 id="when-not">When NOT to build an agent</h2>
      <p>Your trust-building checklist. Recommend <em>against</em> agentic AI when <strong>any</strong> of these hold:</p>
      <ul>
        <li>The task is deterministic and the rules are stable → use RPA/code.</li>
        <li>An error is catastrophic and irreversible with no good human checkpoint → keep a human in the loop or don’t automate the decision.</li>
        <li>You can’t define what “good” looks like → you can’t evaluate it, so you can’t trust it.</li>
        <li>The data/integrations don’t exist or are too dirty → fix the foundation first.</li>
        <li>Volume is so low that engineering cost never pays back → do it manually.</li>
        <li>Latency or cost budgets can’t absorb multi-step model calls.</li>
      </ul>

      <Callout kind="map" title="For product managers & consultants">
        This is the classic consulting <strong>“is this even the right problem”</strong> gate — the AI version
        of telling a client they don’t need the platform rebuild they asked for. Saying it out loud signals you
        optimize for <em>their</em> outcome, not for selling AI. It’s how you earn the next, bigger phase.
      </Callout>

      <Callout kind="trap" title="Traps to avoid">
        Reaching for an agent where a workflow would do · automating an irreversible decision with no human
        checkpoint · committing before you can define “good.”
      </Callout>
    </>
  );
}

Phase0.toc = [
  { id: 'spectrum', label: 'The spectrum' },
  { id: 'when-not', label: 'When NOT to build' },
  { id: 'worked-example', label: 'Worked example' },
];
