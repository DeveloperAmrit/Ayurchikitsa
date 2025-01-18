export function BouncingBallsLoader() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
          <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
        </div>
      </div>
    );
  }
  