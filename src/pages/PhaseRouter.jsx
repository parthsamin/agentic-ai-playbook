import { useParams } from 'react-router-dom';
import { getPhase } from '../data/phases';
import PhaseLayout from '../components/PhaseLayout';
import Phase0 from './phases/Phase0';
import Phase1 from './phases/Phase1';
import Phase2 from './phases/Phase2';
import Phase3 from './phases/Phase3';
import Phase4 from './phases/Phase4';
import Phase5 from './phases/Phase5';
import Phase6 from './phases/Phase6';
import Phase7 from './phases/Phase7';
import Phase8 from './phases/Phase8';
import PhaseStub from './phases/PhaseStub';

const MAP = {
  orient: Phase0,
  frame: Phase1,
  map: Phase2,
  architect: Phase3,
  'de-risk': Phase4,
  strategize: Phase5,
  sequence: Phase6,
  prove: Phase7,
  scale: Phase8,
};

export default function PhaseRouter() {
  const { slug } = useParams();
  const phase = getPhase(slug);
  if (!phase) return <div className="page"><h2>Phase not found</h2></div>;

  const Content = MAP[slug];
  return (
    <PhaseLayout phase={phase} toc={Content ? Content.toc : null}>
      {Content ? <Content /> : <PhaseStub phase={phase} />}
    </PhaseLayout>
  );
}
