import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGameRoom } from "@/hooks/useGameRoom";
import { stringToColor } from "@/utils";

interface GameProps {
  username: string;
  roomId: string;
}

const Game = ({ username, roomId }: GameProps) => {
  const { gameState, dispatch } = useGameRoom(username, roomId);


  // Chat state
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);


  // Indicate that the game is loading
  if (gameState === null) {
    return (
      <p>
        <span className="transition-all w-fit inline-block mr-4 animate-bounce">
          🎲
        </span>
        Waiting for server...
      </p>
    );
  }


  // Chat send handler (sends to backend)
  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      dispatch({ type: "chat", message: chatInput });
      setChatInput("");
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };


  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-[70vh]">
      {/* 3D Scene */}
      <div className="flex-1 h-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
        <Canvas camera={{ position: [0, 10, 20], fov: 50 }} style={{ width: "100%", height: "100%" }}>
          <color attach="background" args={["#18181b"]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 20, 10]} intensity={0.7} />
          {/* Grey plane as city grid placeholder */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[13, 13]} />
            <meshStandardMaterial color="#888" />
          </mesh>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>

      {/* UI Panel */}
      <div className="w-full md:w-80 flex flex-col h-full">
        {/* Chat Panel */}
        <div className="flex-1 flex flex-col bg-stone-900 rounded-lg p-2 mb-2 overflow-hidden">
          <div className="flex-1 overflow-y-auto text-xs text-stone-100 px-1" style={{ maxHeight: 220 }}>
            {gameState.log
              .filter((entry) => entry.message.startsWith("💬 "))
              .map((entry, i) => (
                <div key={entry.dt} className="mb-1">{entry.message.replace(/^💬 /, "")}</div>
              ))}
            <div ref={chatEndRef} />
          </div>
          <form className="flex gap-1 mt-2" onSubmit={handleChatSend} autoComplete="off">
            <input
              className="flex-1 rounded bg-stone-800 text-stone-100 px-2 py-1 text-xs outline-none"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Type a message..."
              maxLength={200}
            />
            <button className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold" type="submit">
              Send
            </button>
          </form>
        </div>

        {/* Players List */}
        <div className="bg-stone-800 rounded-lg p-2 mt-auto">
          <h2 className="text-xs text-stone-300 mb-1">Players in room <span className="font-bold">{roomId}</span></h2>
          <div className="flex flex-wrap gap-1">
            {gameState.users.map((user) => (
              <span
                className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold border-transparent text-white"
                style={{ backgroundColor: stringToColor(user.id + roomId) }}
                key={user.id}
              >
                {user.id}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
