import { ROLE_LABELS } from "../constants";
import type { AccessRequest } from "../types";

/**
 * Pending platform access requests with Accept and Reject actions.
 *
 * One of three sections behind the screen's switch, so it carries no heading of
 * its own — the switch names it — and matches the directory panel's frame.
 *
 * @param requests - Requests still awaiting a decision
 * @param onDecide - Receives the request id and the decision
 */
export function AccessRequestList({
  requests,
  onDecide,
}: {
  requests: readonly AccessRequest[];
  onDecide: (requestId: string, decision: "accepted" | "rejected") => void;
}) {
  return (
    <>
      <p className="sr-only" role="status">
        {requests.length === 0
          ? "No access requests are waiting"
          : `${requests.length} access requests waiting`}
      </p>

      <div className="flex flex-col rounded-xl ring-1 ring-black/8">
        <div
          role="list"
          aria-label="Access requests"
          className="divide-y divide-black/6"
        >
          {requests.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              Every request has been decided.
            </p>
          ) : (
            requests.map((request) => (
              <RequestRow key={request.id} request={request} onDecide={onDecide} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

function RequestRow({
  request,
  onDecide,
}: {
  request: AccessRequest;
  onDecide: (requestId: string, decision: "accepted" | "rejected") => void;
}) {
  return (
    <div role="listitem" className="flex flex-wrap items-center gap-3 px-4 py-3">
      <span
        aria-hidden="true"
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-black/6 text-xs font-semibold text-foreground"
      >
        {request.initials}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{request.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {request.department} · asking for {ROLE_LABELS[request.requestedRole]} access
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onDecide(request.id, "rejected")}
          className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-black/8 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
        >
          Reject {srName(request.name)}
        </button>
        <button
          type="button"
          onClick={() => onDecide(request.id, "accepted")}
          className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:brightness-95 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
        >
          Accept {srName(request.name)}
        </button>
      </div>
    </div>
  );
}

/**
 * Repeated Accept and Reject labels are ambiguous out of context, so each
 * button carries the name for screen readers without showing it twice.
 */
function srName(name: string) {
  return <span className="sr-only">{name}</span>;
}
