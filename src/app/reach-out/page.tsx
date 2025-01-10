import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-[#eee] p-[24px] text-[#111] dark:bg-[#111] dark:text-[#eee]">
      <Navbar />
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#eee",
          padding: "50px",
          borderRadius: "8px",
          color: "#111",
        }}
      >
        {/* Header container */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            right: "16px",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 16px",
            alignItems: "center", // Added to vertically align folder icon with text
          }}
        >
          {/* Left header */}
          <div style={{ display: "flex" }}>
            <h1
              style={{
                fontFamily: "Duplet",
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              akshith.io
            </h1>
          </div>

          {/* Right header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "Duplet",
                marginLeft: "6px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#999",
              }}
            >
              ckjadsjkdsa
            </h1>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "48px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1
              style={{
                fontFamily: "PassengerSerif",
                marginLeft: "16px",
                fontSize: "36px",
              }}
            >
              dsksadkllkjsad
            </h1>
          </div>
          <h1
            style={{
              fontFamily: "ErikaHand",
              fontSize: "16px",
              fontWeight: 600,
              color: "#999",
            }}
          >
            Written on
          </h1>
        </div>
      </div>
    </div>
  );
}
