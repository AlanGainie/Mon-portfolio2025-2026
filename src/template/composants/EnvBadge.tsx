export default function EnvBadge() {
  const env =
    import.meta.env.VITE_APP_ENV ||
    import.meta.env.MODE ||
    "dev";

  const getColor = () => {
    if (env === "prod" || env === "production") return "green";
    if (env === "test") return "blue";
    return "orange"; // dev
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        padding: "6px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        background: getColor(),
        color: "white",
        zIndex: 9999,
        fontWeight: "bold",
        letterSpacing: "1px",
      }}
    >
      {String(env).toUpperCase()}
    </div>
  );
}