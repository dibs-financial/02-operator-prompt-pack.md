import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Floor from "./views/Floor";
import Inbox from "./views/Inbox";
import Loads from "./views/Loads";
import LoadDetail from "./views/LoadDetail";
import Carriers from "./views/Carriers";
import Rates from "./views/Rates";
import Track from "./views/Track";
import Exceptions from "./views/Exceptions";
import Docs from "./views/Docs";
import { useDesk } from "./store";
import { bookedMargin, exceptions, uncovered, workingLoads } from "./engine";
import type { ViewId } from "./types";

export default function App() {
  const desk = useDesk();
  const { state } = desk;
  const [view, setView] = useState<string>("floor");
  const [loadId, setLoadId] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      inbox: state.conversations.filter((c) => !c.resolved).length,
      loads: workingLoads(state).length,
      track: state.loads.filter((l) =>
        ["dispatched", "in_transit", "pod_pending"].includes(l.status)
      ).length,
      exceptions: exceptions(state).length,
    }),
    [state]
  );

  const hour = new Date().getHours();
  const afterHours = hour < 7 || hour >= 18;

  const openLoad = (id: string) => {
    setLoadId(id);
    setView("load");
  };

  return (
    <div className="app">
      <Sidebar
        view={view === "load" ? "loads" : view}
        onView={(id) => {
          setLoadId(null);
          setView(id);
        }}
        counts={counts}
      />
      <Topbar
        openLoads={workingLoads(state).length}
        uncovered={uncovered(state).length}
        marginDay={bookedMargin(state)}
        afterHours={afterHours}
      />
      <main className="main">
        {view === "floor" && <Floor onOpen={(v: ViewId) => setView(v)} />}
        {view === "inbox" && <Inbox />}
        {view === "loads" && (
          <Loads
            state={state}
            selectedId={loadId}
            onSelect={openLoad}
            onCover={desk.cover}
            onBook={desk.book}
            onDispatch={(id) => desk.advance(id)}
          />
        )}
        {view === "load" && loadId && (
          <LoadDetail
            state={state}
            loadId={loadId}
            onBack={() => setView("loads")}
            onQualify={desk.quote}
            onCover={desk.cover}
            onDispatch={(id) => desk.advance(id)}
            onCheckCall={(id) => desk.check(id, "Driver rolling. ETA holds.")}
            onDeliver={desk.advance}
            onPod={desk.pod}
            onEscalate={(id) =>
              desk.escalateLoad(id, "Parked by the desk. Human judgment required.")
            }
          />
        )}
        {view === "carriers" && <Carriers />}
        {view === "rates" && <Rates />}
        {view === "track" && <Track />}
        {view === "exceptions" && <Exceptions />}
        {view === "docs" && <Docs />}
        <p className="disclaimer">
          BrokerVox is a voice layer for a working desk. It is not a broker-dealer, RIA, lender,
          carrier, or insurer. Joe only quotes numbers in the book and only tenders to carriers
          already vetted. Licensed humans stay on the hook. A DIBS desk product. Dallas.
        </p>
      </main>
    </div>
  );
}
