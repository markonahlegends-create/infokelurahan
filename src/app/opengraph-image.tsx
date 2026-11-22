import { ImageResponse } from "next/og";

/** Ikon merek di-embed agar tidak perlu permintaan jaringan saat render OG. */
const BRAND_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAADAFBMVEVMaXEJECEJECEIESIJESIJESEKESEJECEAAAAKECEJECEJECEKECEJECEODhwJECEKECEKECEKESEPDx4JECEAACgNDSgKESILFSb//Pr/+vf/+fX/+PT3aiT/+/nqVhP5dC/3aCLpVRP1YBn5ci3/9/L1Xxj/+/j//fz/+fb2Yhz2ZB3nUxLhTg/2ZR/wWhX/9/H2ZiD3ayX3ZyH4cCvkUBHfTA74bSf4cSzjTxD5dTDiTxD0XhfzXRf1YRr2Yx3sVxTxXBbaSAzwWxbtWBT5djLuWRX4bCb//fv/+PPoVBPgTQ/4byroVBL4bin/+vb6dzP/9vD//PvmUhL3aSPlUhH6eTXrVxTlURHdSw76eDT6ejbcSg3XRQv1YRvZRwz2YhvbSQ3yXRf5cy75cy//9e///v3/9/PrVhT/+vhFKiQUtqUev6z2ZR7yXBf4ci0UtKMbvav//PkUuadAIB0TsqFJKSPeSw4hwa75djFFIh6DhIsSpJUTr54Tq5sTqJkXuqhKKyYTrZwSoZITsJ8Yu6nYRgxCIB0xHSD/9fBCIx7VRAsTppc9HxwSnY/8waP/8epFJyInGiAQEyH9z7f4kV/4ej01IyQSmoz6oXb4iFGIipD7so3lcTMfKTcRHC36uJfydzkSlomMPh68Th38x635mmvSQwv93czqXhxdwq9Lx7Xh3t1ZXWg3Pkx0OCOeNhHxXhphLB3NUhu3k2njYCDH5d48qJrMgU49JSR7LxZPJh2rSB3+6+D92MXHZTP5gkbxZSHZbTT18/AuwrDwbS+54tlkrJmXrpCioH7Z6+Rzvq0Rk4een6StrbHy7OqSk5mpqa1PVWCPSy59y8DFQAyzPA6l2tHuZiX9+PTr8evfZyzyYR0PYGD+5NdMq5w4wbH3qYKwWTAOQkpqbngeuafTWyH79vEjtqZCtKhgNyqArZOFt5yC1ciYzsYhnY+vr7OyWzEPaGc3hoIPcG4Pa2geqJjWVBjbVhht0MIymo5/oorzain2bitHKiQOUFQagL30AAAAF3RSTlMANLM672b70QKsSo3icxKd+JbfEFkGE2XuYc4AAAAJcEhZcwAALiMAAC4jAXilP3YAAArCSURBVHjazdx5XBTXHQBwIJxKJIKJClublC6G2KKYtE2tiFQlkqaxS6xppdhUWWiiTTVaQgNoNGo2iXZX3F2y3LdAQAREBUFBVFDxiDFe9UzSnM3R+/qns7szszPz3u+9Nwvs+vtT9/Ph+5l5vzfv+L3n4wNFsG/AWL+gUP+JIxr+oUF+YwN8g31UxrgAvxGWKFx+AeNUcMaE3DNx1OOekDFsmuAxQRM9FEETGF7dXR7jOEh3UTj3hU30cIQR25JvuPL3OwsKOzcyRTZDdBoKdir/QijhId0dKPtpZ8t7RxYsWbJkqT1+wsUCLn4/i4v77ZGRsWLFN7n47aNcPGKPJ7h4kovv2eMxLmba42tcLLbHA1w83Pdhd0uh7M8E3g215vHSnxW+U5qWlrZkpD32iI/vqJaZxmPb9r0hkp8895e0tNHzxMfHxdUclPy5kHsxz0fiKTycNtqeuLjf1EieUgj6jMa62vE7aZ7wTJt2rdrVwscj7Vn8L8NhD3mmTUtsN4h/VtGyfcX82ljpOU9iYkO2mGuy7L8vVPj3Tz3qSUy81ib85XBpDyn2z5+medbz0EPLRFGY5Pvlnfdl9zzzTOtB5KUFC9/TQi94li1rEFp2kJD7E4R8P+wNz5w57UL2T+BBwgNyr/+xWmwlFcbaWmNFic1idcMzJ7paeET8+FB4Yao9sywVh/QP2mOhPVJTUyfrD5VYnlDpiW4V+mznGFL4Zqj8XmTUmWMf5EP0OEJbW/ekGk90dI3wBXGM5/nx80ZVnl6jPjNT6kkVPZMnvzDFZLSq8MTE7ODH2REcKED2gNg8RebJmSQPF7G1veyeGOERBXAgP2kLYvJYjQszaZ4pU6ZG1i5g9cTMNojvLNhfkmIsnowSnZSj9LwgeLgw3V7M6JnNJ5p/sI8v/7BYx4e99ZmsnqlTn623snlm/5tn+ApNqJPRY9NjPYrXJXiejTTVMXkSEgxCI+IHZi1MnhXGzExl8yF6uCh5mMWT0OJ0jBXa9HssngVm9Z7IyNqZDJ7l3U6Hn/DdOMLgWXoI9aTCnkg+Fpln0j3L24Wvh3NotrOS7pnlpmfRIvNiquf5ZOcXNtTHmfUFdM/9ZiaP/HU5PLGxtfE0T1JSgTPvfZyD6UJ6fhnVpLvcExtbQfUkOdMs0IfPenq+D8cTG2WheeZtd0p40HM0T5FOVfcj90RFRZmsFM+811EQ6Xtxg5Tu/Wc+OH/+g6/6YU9UVH0c2YMBkb6nJSTPmbJJjij7SuYRX5czbGTPdARE8vRmEdKreJIYxfJ0l3qiTBlEDwIijn/MBM/bkyTxNujRaGqJHiWIPB5bCHv6y6SgsrOgR6O1kjwYEDxeNRPS/fQkWZwGPRqNkeRJRkCwp2ghoftploOacR6NM3RWggcBEeYXRlL3s1sO2g17NCklBI8SRJrvmEijDQxI2v1IPSk9ibBnPgqC5oN1xNHPeTnoPL75ODwpKRbYg4LA+amZ+HU/JwedI3lSjLAHAYGeR03E0U9TudRT3kTwZGX1RIOeuQoQvJ5QRBn9FEtBxURPltYKepQgeH2jhDIai5UkfvMVrCdF8GhtoAcDAtZbzLTRz5Vc/q2V517Bp7vo0RpBz9MICFr/uUEf/TTl7i4r253btIjm0R4CPQgI8jySpX40Bnq0JtDzawUIXK/rZZt8Ebsf0aPVHoM8X8eAsOuHReTJjkrPDCvkwYDw65kW1skXMd0Fz4wiyIOCgPXVOubJF4tHVwR5vqEEQeu9Nvc9KahHZ4E8ShC4/mxjmXw1FTc3FzeRm4/Do7NAHgQErYfXMaT7OUfPWH6O7rGD8J7HFSBwfd5C94ij2NMkj84RRZAHAUH7BUXUdD9b5hri0zy6SsjzYwUI3L9YSu1+zrg+rmeg7kfw6Pogz7dQELCfoqd1P9KJIpjufPSAHhQE7e/U09I91wXKpXh0ZtCDgMD9JiOt+1GCUmCPrgT0PKUAwftfNtrajwJE8ugsoEcJgvfjrFMo3bMcRPTojoGep9YhIGh/8AZl9CMDQenujHrY81MEBO5XVlBGG1IQ2fPabdiDgOD90yLK6EcJwnU/To++Evb8TAEi7OfO7CGPfuQgsPlwnvpk2IMDQfvLJeTRhgxE8uhtBM93UBC4352mIY5+pCDQ8xrnMV0meFAQYf/dSPBoNHIQ7NFXkDwIiFQPYM0ieOQgwMNx9KZjJM/3FSByfYKRNPmSgoB0t3v0FUQPBkSol7BqCZNBDAjnsT8gggcFEes3jITBPAKagfPYHxDJ8wMliFxPkmGCJxdKEN7Tc5nsUYJo9S02ePKlAOE9egvFgwGR623M4ORLDgI8Zprn2wiIUv9jNUGTQekQFtf9OFs0zYOAqPVIt68Caz+SzY6/XTjej3k8en0d1aME0eujHhg4dRK7tnFWXPYsz8vP//jzq6jHSPf8SA7awVCvVfrfoVP9qGffJ/8QQH/Pz9+8+XcfX/pI4alvoHswIGr92IGqoS+/uCL3XL2wbdu2607PXx2e1atX3zou85gqGTwoiKGe7cTQUNX+Sx+5PFcv/DOPA22ouv7++9ffdHjsoJUr39rn8ugtLJ7vKkFM9XX/G6qqqvqy8Yvj+06e3Hfpwid5eQ7Phg3r12/aJPGsXfvy0f9ccvzq+OeDTB4liK3eL36gqupNLv7AxStcSD2bZJ6Xt6xZs2rVqpycnFNsHgyIpd6v7ybi2ebybMZ4GhvYPC8iILb6w9L9ThDRs9buWePwvPVHRg8CYq2H5ESiJ0/iyR+m50V5ZcMO9vrM0v10zxbBc4TZ83MMiLE+s3T/K5IGvV5MMIdnpbseDIi5XtQhGmkPClJRv1p6E/WICbZFSDAV7Yfz/EIJUlVPe/km2CGKnkZ1HiVIZX3v5QFah9jYoc6DAamq7+0bIHeIqj2/QkCqPDEx1wZIHeKpBrUeBKTSExMT/RncIbJ+vyQeJUi1h9vv/gzy/NkNzw8xIJWehIRBfAfklgcDUu1JWH4C5xl0y4OC3PAsf/7E6tXyDign54R7HgTklicpae9KRYforueXCpCbnqR5e/8k8+x114MBueWZx4lcHeJR9z0KUKfbnunTD6wSEn44nq18yTlfnGtw38OJjvKeA8PwbC3gi3P58uVheJKTD9yye24Ny7NVKF/mC7z7huFJnt8x2Ng42DEszy6hwJsvgf9wOJ758+fOnfv0sDzpF4USeP6QQLeXPel7hEMCwjEKL3vS24RjFPxBk0Ive9LFgybCUZwO73reFY/iCIeVqr3qSe8SDyuJx7m86kl3HecSD7zVeNOzR3LgTTgSmO1FzxvbJUcCxUOTNd7z7JEemhSPlRquecuzyyA7VioevK32kueNLvnBW9fR5HbveC7ulD8g1+FtQ4M3PO8WKA9vu463Z7d63rPrVcydBOIFAG3LPO45iLtHYpx4RUJbq7c84RGySyTEC4eyGzzaftbhL5GQXbPR7sH8KoCu2ZBdRFLd6qH+sItwEYnsqhZDjUe+FwXEq1rkl9m83j3q3/eXKJfZyN6a/Sl1/WsUx4ddBvp1P+iFSIaW7vbkkfbsurinzcB2IRJwZZRh+0vM8Sou1rnCUKDuyiiuhwwL9OydWoFhEXfWtWO+LPfE3VkXs915V9c5IiIgZHQv9wsJiFB74aDz+sNw/xFt5YH+4ZTrD/8PLLRiwuuAVNIAAAAASUVORK5CYII=";


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
              width: 72,
              height: 72,
              borderRadius: 21,
              background: "#0a1122",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BRAND_ICON}
              alt=""
              width={62}
              height={62}
              style={{ borderRadius: 16 }}
            />
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
