import { ImageResponse } from "next/og";
import { baseURL, person } from "@/resources";

export const runtime = "nodejs";

export async function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Portfolio";

  async function loadGoogleFont(font: string) {
    const gurl = `https://fonts.googleapis.com/css2?family=${font}`;
    const css = await (await fetch(gurl)).text();
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status == 200) {
        return await response.arrayBuffer();
      }
    }

    throw new Error("failed to load font data");
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "5rem",
        background: "#fcf0f0",
        position: "relative",
      }}
    >
      {/* Purple blob top-right */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
          background: "rgba(174, 157, 239, 0.35)",
          filter: "blur(60px)",
        }}
      />
      {/* Deep purple blob bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50% 50% 40% 60% / 40% 60% 50% 50%",
          background: "rgba(83, 26, 74, 0.25)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          fontStyle: "normal",
          color: "#1a1520",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: "5rem",
            lineHeight: "6rem",
            letterSpacing: "-0.03em",
            whiteSpace: "pre-wrap",
            textWrap: "balance",
            fontWeight: 700,
          }}
        >
          {title}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          <img
            src={baseURL + person.avatar}
            style={{
              width: "10rem",
              height: "10rem",
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "3.5rem",
                lineHeight: "3.5rem",
                fontWeight: 700,
              }}
            >
              {person.name}
            </span>
            <span
              style={{
                fontSize: "2rem",
                lineHeight: "2.5rem",
                color: "#b36d20",
              }}
            >
              Data scientist by trade, builder and creative by habit.
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist:wght@400"),
          style: "normal",
        },
      ],
    },
  );
}
