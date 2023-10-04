export default function Box({ string }) {
  return (
    <div
      style={{
        width: "250px",
        display: "flex",
        padding: "12px",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid black",
      }}
    >
      {string}
    </div>
  );
}
