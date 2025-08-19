import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "RockBand";
    const description =
      searchParams.get("description") ||
      "Experience Raw Energy & Powerful Sound";
    const type = searchParams.get("type") || "default";

    // You can customize the OG image based on the type
    const getBackgroundGradient = (type: string) => {
      switch (type) {
        case "band":
          return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        case "festival":
          return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
        case "music":
          return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
        default:
          return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      }
    };

    return new ImageResponse(
      (
        <div
          style={{
            background: getBackgroundGradient(type),
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui",
            color: "white",
            position: "relative",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.3,
            }}
          />

          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "20px",
                backdropFilter: "blur(10px)",
              }}
            >
              🎸
            </div>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              RockBand
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
              maxWidth: "900px",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "32px",
              textAlign: "center",
              opacity: 0.9,
              maxWidth: "800px",
              lineHeight: 1.3,
            }}
          >
            {description}
          </div>

          {/* Bottom accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "8px",
              background:
                "linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("Failed to generate OG image:", e.message);
    return new Response("Failed to generate image", { status: 500 });
  }
}
