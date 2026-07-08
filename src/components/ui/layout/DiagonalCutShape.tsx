"use client";

export default function DiagonalCutShape() {
  return (
    <>
      {/* Corte diagonal reto */}
      <div
        className="absolute left-0 right-0 bg-white"
        style={{
          top: "380px",
          height: "220px",
          clipPath: "polygon(0% 100%, 0% 25%, 82% 0%, 100% 0%, 100% 100%)",
        }}
      />

      {/* "Tampa" que arredonda a ponta da diagonal */}
      <div
        className="absolute bg-white"
        style={{
          top: "380px",
          left: "calc(82% - 30px)",
          width: "60px",
          height: "60px",
          borderTopLeftRadius: "24px",
          transform: "rotate(-32deg)",
          transformOrigin: "center",
        }}
      />
    </>
  );
}
