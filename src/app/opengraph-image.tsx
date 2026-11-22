import { ImageResponse } from "next/og";

export const alt = "Info Kelurahan — Portal Berita Kota Cilegon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg,#0a1122 0%,#1d2947 55%,#2c3b5f 100%)",
          padding: 72,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "radial-gradient(circle,rgba(248,94,22,.55),transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle,rgba(20,184,166,.45),transparent 68%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: "linear-gradient(135deg,#fb7f3c,#d9480f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            IK
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#fff", fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
              Info Kelurahan
            </span>
            <span style={{ color: "#9fafd0", fontSize: 19, letterSpacing: 3 }}>
              KOTA CILEGON · BANTEN
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ color: "#fb7f3c", fontSize: 26, fontWeight: 700, letterSpacing: 3 }}>
            PORTAL BERITA &amp; INFORMASI
          </span>
          <span
            style={{
              color: "#fff",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -2.4,
              maxWidth: 940,
            }}
          >
            Kabar warga dari 43 kelurahan di Kota Cilegon
          </span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["8 Kecamatan", "43 Kelurahan", "Berita Harian"].map((chip) => (
            <div
              key={chip}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.22)",
                color: "#e5e9f3",
                fontSize: 22,
                fontWeight: 600,
                background: "rgba(255,255,255,.06)",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
