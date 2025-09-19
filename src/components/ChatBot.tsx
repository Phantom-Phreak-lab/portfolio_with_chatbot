import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

type Cell = 'X' | 'O' | null;
type RPSChoice = 'rock' | 'paper' | 'scissors';

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function getWinner(board: Cell[]): 'X' | 'O' | null {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function isDraw(board: Cell[]): boolean {
  return board.every(cell => cell !== null) && !getWinner(board);
}

function getAvailableMoves(board: Cell[]): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) moves.push(i);
  }
  return moves;
}

function chooseBestMove(board: Cell[], ai: 'X' | 'O', human: 'X' | 'O'): number {
  const available = getAvailableMoves(board);
  // Try to win
  for (const idx of available) {
    const temp = board.slice();
    temp[idx] = ai;
    if (getWinner(temp) === ai) return idx;
  }
  // Block human win
  for (const idx of available) {
    const temp = board.slice();
    temp[idx] = human;
    if (getWinner(temp) === human) return idx;
  }
  // Center
  if (available.includes(4)) return 4;
  // Corners
  const corners = [0, 2, 6, 8].filter(i => available.includes(i));
  if (corners.length) return corners[0];
  // Sides
  const sides = [1, 3, 5, 7].filter(i => available.includes(i));
  if (sides.length) return sides[0];
  return -1;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Aditya's AI Agent. I know all about his skills, projects, and experience. I can also play games with you — Tic-Tac-Toe and Rock-Paper-Scissors. Type 'play tic tac toe' or 'play rps' to start!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tic-Tac-Toe state
  const [isTicTacToe, setIsTicTacToe] = useState(false);
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [userSymbol, setUserSymbol] = useState<'X' | 'O'>('X');
  const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'X' | 'O' | 'Draw' | null>(null);

  // Rock-Paper-Scissors state
  const [isRPS, setIsRPS] = useState(false);
  const [rpsUserChoice, setRpsUserChoice] = useState<RPSChoice | null>(null);
  const [rpsBotChoice, setRpsBotChoice] = useState<RPSChoice | null>(null);
  const [rpsResult, setRpsResult] = useState<'Win' | 'Lose' | 'Draw' | null>(null);
  const [rpsScore, setRpsScore] = useState<{ wins: number; losses: number; draws: number }>({ wins: 0, losses: 0, draws: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gemini integration
  const GEMINI_MODEL = 'gemini-1.5-flash';
  const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;

  const fetchGeminiResponse = async (userText: string): Promise<string> => {
    if (!GEMINI_API_KEY) throw new Error('Missing Gemini API key');
    const systemInstruction = "You are Aditya Yadav's AI agent on his portfolio website. You know about his background as a B.Tech CSE (AI) student, his experience with AI/ML, Python, OpenCV, his internship atOASIS INFOBYTE Vault of Code, his role as Student Coordinator for RAASHEE-2025, his projects including face recognition system and EDA work, and his passion for artificial intelligence and data science.";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const body = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: systemInstruction },
            { text: `User: ${userText}` }
          ]
        }
      ]
    } as any;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!resp.ok) throw new Error('Gemini request failed');
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('\n').trim();
    return text || "I'm here to help! Ask me anything about Aditya's work and experience.";
  };

  const addBotMessage = (text: string) => {
    const botMessage: Message = {
      id: (Date.now() + Math.random()).toString(),
      text,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentTurn('X');
    setGameOver(false);
    setWinner(null);
  };

  const startTicTacToe = (userStarts: boolean = true) => {
    setIsTicTacToe(true);
    setUserSymbol(userStarts ? 'X' : 'O');
    resetGame();
    addBotMessage("Let's play Tic-Tac-Toe! You're X. Click a cell (1-9) or type a number. Type 'exit' to stop.");
  };

  const endTicTacToe = () => {
    setIsTicTacToe(false);
    resetGame();
    addBotMessage("Game ended. Ask me anything about Aditya, or type 'play tic tac toe' to play again.");
  };

  const startRPS = () => {
    setIsRPS(true);
    setRpsUserChoice(null);
    setRpsBotChoice(null);
    setRpsResult(null);
    addBotMessage("Let's play Rock-Paper-Scissors! Type rock/paper/scissors or use the buttons. Type 'exit' to stop.");
  };

  const endRPS = () => {
    setIsRPS(false);
    setRpsUserChoice(null);
    setRpsBotChoice(null);
    setRpsResult(null);
    addBotMessage("RPS ended. Ask me anything about Aditya, or type 'play rps' to play again.");
  };

  const getRandomRPSChoice = (): RPSChoice => {
    const choices: RPSChoice[] = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const decideRPSWinner = (user: RPSChoice, bot: RPSChoice): 'Win' | 'Lose' | 'Draw' => {
    if (user === bot) return 'Draw';
    if (
      (user === 'rock' && bot === 'scissors') ||
      (user === 'paper' && bot === 'rock') ||
      (user === 'scissors' && bot === 'paper')
    ) return 'Win';
    return 'Lose';
  };

  const playRPSRound = (user: RPSChoice) => {
    if (!isRPS) return;
    const bot = getRandomRPSChoice();
    const outcome = decideRPSWinner(user, bot);
    setRpsUserChoice(user);
    setRpsBotChoice(bot);
    setRpsResult(outcome);
    setRpsScore(prev => ({
      wins: prev.wins + (outcome === 'Win' ? 1 : 0),
      losses: prev.losses + (outcome === 'Lose' ? 1 : 0),
      draws: prev.draws + (outcome === 'Draw' ? 1 : 0)
    }));
    addBotMessage(`You chose ${user}. I chose ${bot}. Result: ${outcome}.`);
  };

  const performAIMove = (boardAfterUser: Cell[]) => {
    const ai = userSymbol === 'X' ? 'O' : 'X';
    const chosen = chooseBestMove(boardAfterUser, ai, userSymbol);
    if (chosen === -1) return; // no move
    const next = boardAfterUser.slice();
    next[chosen] = ai;
    setBoard(next);
    setCurrentTurn(userSymbol);
    addBotMessage(`I played at position ${chosen + 1}.`);
    const w = getWinner(next);
    if (w) {
      setGameOver(true);
      setWinner(w);
      addBotMessage(w === userSymbol ? 'You win! 🎉' : 'I win! 🤖');
      return;
    }
    if (isDraw(next)) {
      setGameOver(true);
      setWinner('Draw');
      addBotMessage("It's a draw! 😅");
    }
  };

  const performUserMove = (index: number) => {
    if (!isTicTacToe || gameOver) return;
    if (currentTurn !== userSymbol) return;
    if (index < 0 || index > 8) return;
    if (board[index] !== null) return;
    const next = board.slice();
    next[index] = userSymbol;
    setBoard(next);
    setCurrentTurn(userSymbol === 'X' ? 'O' : 'X');
    const w = getWinner(next);
    if (w) {
      setGameOver(true);
      setWinner(w);
      addBotMessage('You win! 🎉');
      return;
    }
    if (isDraw(next)) {
      setGameOver(true);
      setWinner('Draw');
      addBotMessage("It's a draw! 😅");
      return;
    }
    // AI move after a short delay
    setTimeout(() => performAIMove(next), 500);
  };

  const handleCellClick = (index: number) => {
    performUserMove(index);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const text = inputMessage;
    const lower = text.trim().toLowerCase();

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Game commands and inputs
    if (!isTicTacToe && !isRPS && (lower.includes('tic') && lower.includes('toe') || lower.includes('tictactoe') || lower.includes('tic-tac-toe') || lower.includes('play game'))) {
      startTicTacToe(true);
      return;
    }

    if (isTicTacToe) {
      if (/\b(exit|quit|stop|end)\b/.test(lower)) {
        endTicTacToe();
        return;
      }
      const moveMatch = lower.match(/\b([1-9])\b/);
      if (moveMatch) {
        const idx = parseInt(moveMatch[1], 10) - 1;
        performUserMove(idx);
        return;
      }
      addBotMessage("We're in Tic-Tac-Toe mode. Click a cell or type 1-9. Type 'exit' to stop.");
      return;
    }

    // RPS commands
    if (!isRPS && (lower.includes('rps') || lower.includes('rock paper scissors') || lower.includes('play rps') || lower.includes('play rock')) ) {
      startRPS();
      return;
    }
    if (isRPS) {
      if (/\b(exit|quit|stop|end)\b/.test(lower)) {
        endRPS();
        return;
      }
      const normalized = lower.replace(/[^a-z]/g, ' ');
      if (/\brock\b/.test(normalized)) { playRPSRound('rock'); return; }
      if (/\bpaper\b/.test(normalized)) { playRPSRound('paper'); return; }
      if (/\bscissors\b/.test(normalized)) { playRPSRound('scissors'); return; }
      addBotMessage("We're in RPS mode. Type rock/paper/scissors or use the buttons. Type 'exit' to stop.");
      return;
    }

    setIsLoading(true);

    try {
      // Only Gemini
      if (!GEMINI_API_KEY) {
        throw new Error('Missing Gemini API key');
      }
      const replyText = await fetchGeminiResponse(text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble generating a response. Make sure Gemini is configured (VITE_GEMINI_API_KEY).",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        title="Chat with Aditya's Agent — Ask about him or play games"
        aria-label="Open chatbot"
        className={`fixed bottom-6 right-6 z-50 bg-teal-500 text-slate-900 p-4 rounded-full shadow-lg hover:bg-teal-400 transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Aditya's Agent</h3>
                <p className="text-gray-400 text-sm">AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-teal-500 text-slate-900'
                      : 'bg-slate-800 text-white border border-slate-700'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && (
                      <Bot className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    )}
                    {message.isUser && (
                      <User className="w-4 h-4 text-slate-900 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className={`text-xs mt-2 ${
                    message.isUser ? 'text-slate-700' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTicTacToe && (
              <div className="bg-slate-800 text-white border border-slate-700 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-300">
                    Your symbol: {userSymbol}. {gameOver ? (winner === 'Draw' ? "It's a draw." : (winner === userSymbol ? 'You won!' : 'I won!')) : (currentTurn === userSymbol ? 'Your turn.' : 'My turn...')}
                  </p>
                  <button onClick={endTicTacToe} className="text-xs text-teal-400 hover:underline">Exit game</button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {board.map((cell, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCellClick(idx)}
                      disabled={!!cell || gameOver || currentTurn !== userSymbol}
                      className="w-16 h-16 bg-slate-900 border border-slate-600 rounded-md flex items-center justify-center text-xl font-bold text-white hover:bg-slate-700 disabled:opacity-50"
                      aria-label={`Cell ${idx + 1}`}
                    >
                      {cell ?? ''}
                    </button>
                  ))}
                </div>
                {!gameOver && (
                  <p className="text-[11px] text-gray-400 mt-2">Click a cell or type a number (1-9). Corners are 1,3,7,9. Center is 5.</p>
                )}
              </div>
            )}
            {isRPS && (
              <div className="bg-slate-800 text-white border border-slate-700 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-300">
                    Rock-Paper-Scissors • Score: {rpsScore.wins}-{rpsScore.losses}-{rpsScore.draws}
                  </p>
                  <button onClick={endRPS} className="text-xs text-teal-400 hover:underline">Exit game</button>
                </div>
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
                  <span>You: {rpsUserChoice ?? '-'}</span>
                  <span>•</span>
                  <span>Bot: {rpsBotChoice ?? '-'}</span>
                  <span>•</span>
                  <span>Result: {rpsResult ?? '-'}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => playRPSRound('rock')} className="px-3 py-2 bg-slate-900 border border-slate-600 rounded-md hover:bg-slate-700">Rock</button>
                  <button onClick={() => playRPSRound('paper')} className="px-3 py-2 bg-slate-900 border border-slate-600 rounded-md hover:bg-slate-700">Paper</button>
                  <button onClick={() => playRPSRound('scissors')} className="px-3 py-2 bg-slate-900 border border-slate-600 rounded-md hover:bg-slate-700">Scissors</button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">Type rock/paper/scissors or use the buttons. Type 'exit' to stop.</p>
              </div>
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-white border border-slate-700 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-teal-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Aditya's work..."
                className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-teal-500 text-slate-900 p-2 rounded-lg hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;