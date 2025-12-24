import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function Table({ linkData, removeLink }) {
  return (
    <div className="tableWrap">
      <table className="table">
        <TableHeader />
        <TableBody linkData={linkData} removeLink={removeLink} />
      </table>
    </div>
  );
}
