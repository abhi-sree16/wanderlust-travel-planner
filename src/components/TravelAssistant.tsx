import { useState, useRef, useEffect } from 'react';
import { Compass, X, Send, Loader2, Sparkles } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const LOCAL_KNOWLEDGE: Record<string, string[]> = {
  beach: ['For a beach getaway, consider the Maldives for overwater villas, Bali for surf and wellness, or the Amalfi Coast for dramatic cliffside beaches.'],
  iceland: ['For Iceland, pack layers — a waterproof jacket, thermal base layers, sturdy hiking boots, and a swimsuit for hot springs. If visiting in winter, add gloves and a warm hat for aurora hunting.'],
  bali: ['Bali is perfect for budget travelers! Stay in Ubud for rice terraces and temples, or Canggu for surfing. Expect $30-50/day for meals, accommodation, and activities.'],
  kyoto: ['The best time to visit Kyoto is spring (March-May) for cherry blossoms or fall (October-November) for autumn foliage. Summers are hot and humid, winters are cold but less crowded.'],
  budget: ['For budget travel, consider Southeast Asia (Bali, Vietnam), Morocco, or Portugal. These destinations offer incredible experiences at $30-60/day including accommodation and food.'],
  pack: ['Essential packing items: comfortable walking shoes, universal power adapter, reusable water bottle, first-aid basics, and weather-appropriate clothing. Always pack light!'],
  default: ["I'd love to help with that! Could you tell me more about what kind of destination or experience you're looking for? I can recommend places based on your budget, interests, and travel style."],
};

function generateLocalReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, replies] of Object.entries(LOCAL_KNOWLEDGE)) {
    if (key !== 'default' && lower.includes(key)) {
      return replies[0];
    }
  }
  return LOCAL_KNOWLEDGE.default[0];
}

const SUGGESTIONS = [
  'What is the best beach destination?',
  'How should I pack for Iceland?',
  'Budget-friendly destinations?',
  'When to visit Kyoto?',
];

export default function TravelAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your travel assistant. Ask me about destinations, packing tips, budget advice, or anything travel-related!" },
  ]);
  const [input, setInput] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    const content = text.trim();
    if (!content || state === 'loading') return;

    const newMessages: Message[] = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setInput('');
    setState('loading');

    try {
      const reply = generateLocalReply(content);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setState('idle');
    } catch {
      setState('error');
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-float transition-all hover:bg-primary-500 hover:scale-105 active:scale-95"
        aria-label="Travel assistant"
        data-testid="travel-assistant-toggle"
      >
        {open ? <X className="h-6 w-6" /> : <Compass className="h-6 w-6" />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-float animate-fade-up"
          data-testid="travel-assistant-panel"
        >
          <div className="flex items-center gap-3 border-b border-stone-100 bg-primary-50 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Travel Assistant</h3>
              <p className="text-xs text-stone-500">Ask me anything about travel</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4" data-testid="travel-assistant-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {state === 'loading' && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-stone-100 px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-stone-500" />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2" data-testid="travel-assistant-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600 transition-all hover:border-primary-300 hover:text-primary-700"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-stone-100 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about destinations..."
              data-testid="travel-assistant-input"
              className="flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-all hover:bg-primary-500 active:scale-95"
              data-testid="travel-assistant-send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
