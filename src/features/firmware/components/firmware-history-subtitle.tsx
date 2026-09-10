import { UPLOADED_BY_LABEL } from "../lib/format-firmware-history";

/**
 * Secondary line used on firmware history and device install history.
 * The uploader name is bold so it reads as a person, not as more notes.
 *
 * @param notes - Release notes
 * @param uploadedBy - Display name of the staff member who published
 */
export function FirmwareHistorySubtitle({
  notes,
  uploadedBy,
}: {
  notes: string;
  uploadedBy: string;
}) {
  return (
    <>
      {notes} · {UPLOADED_BY_LABEL}:{" "}
      <span className="font-semibold text-foreground">{uploadedBy}</span>
    </>
  );
}
