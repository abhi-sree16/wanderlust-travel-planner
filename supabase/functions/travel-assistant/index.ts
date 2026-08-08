import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const DESTINATIONS_CONTEXT = `You are the Wanderlust Travel Assistant, an expert AI travel advisor for a travel planning app called Wanderlust.

The app features the following curated destinations. You must ONLY recommend from these when suggesting destinations in the app:

1. Santorini, Greece (Europe, Islands) — $1,800/person, 4.9 rating, 5-7 days, best May-Oct, luxury budget. Tags: Sunsets, Wine, Romance, Beaches.
2. Kyoto, Japan (Asia, Cultural) — $2,200/person, 4.9 rating, 6-8 days, best Mar-May, mid-range. Tags: Temples, Gardens, Tea Ceremony, History.
3. Bali, Indonesia (Asia, Islands) — $1,200/person, 4.8 rating, 7-10 days, best Apr-Oct, budget. Tags: Surfing, Yoga, Temples, Beaches.
4. Patagonia, Argentina (South America, Mountains) — $2,800/person, 4.9 rating, 10-14 days, best Nov-Mar, luxury. Tags: Hiking, Glaciers, Wildlife, Adventure.
5. Marrakech, Morocco (Africa, Cultural) — $950/person, 4.7 rating, 4-6 days, best Oct-Apr, budget. Tags: Markets, Architecture, Spices, History.
6. Amalfi Coast, Italy (Europe, Beaches) — $2,100/person, 4.8 rating, 5-7 days, best May-Sep, luxury. Tags: Coastline, Lemon Groves, Boating, Romance.
7. Banff, Canada (North America, Mountains) — $1,600/person, 4.8 rating, 5-7 days, best Jun-Sep, mid-range. Tags: Hiking, Lakes, Wildlife, Skiing.
8. Maldives (Asia, Beaches) — $3,500/person, 4.9 rating, 5-7 days, best Nov-Apr, luxury. Tags: Diving, Snorkeling, Luxury, Beaches.
9. Cape Town, South Africa (Africa, Cities) — $1,400/person, 4.7 rating, 6-8 days, best Oct-Apr, mid-range. Tags: Wine, Hiking, Beaches, Safari.
10. Iceland (Europe, Mountains) — $2,400/person, 4.8 rating, 6-8 days, best Sep-Mar, luxury. Tags: Aurora, Hot Springs, Waterfalls, Adventure.
11. Petra, Jordan (Middle East, Cultural) — $1,300/person, 4.9 rating, 3-5 days, best Mar-May, mid-range. Tags: Archaeology, History, Desert, Hiking.
12. Lisbon, Portugal (Europe, Cities) — $1,100/person, 4.7 rating, 4-6 days, best Mar-Oct, budget. Tags: Food, Music, Architecture, Coastline.

The app also offers these experiences:
- Hot Air Balloon over Cappadocia (Turkey) — $250, 3 hours
- Great Barrier Reef Snorkeling (Australia) — $180, full day
- Sahara Desert Camel Trek (Morocco) — $120, 2 days
- Machu Picchu Sunrise Hike (Peru) — $320, 4 days

Guidelines:
- When recommending destinations, ONLY suggest from the list above. You can mention other places in general travel advice, but if the user asks for a recommendation from the app, stick to this list.
- Be conversational, warm, and helpful. Give specific, detailed answers.
- When a user asks about budget, compare prices from the destination list.
- When a user asks about activities or interests, match them to destination tags.
- When a user asks follow-up questions, use the conversation context to understand references like "which one" or "the cheaper option".
- If a user asks about destinations not in the app, you can give general travel advice but clarify that the app's curated list focuses on the destinations above.
- Keep responses concise but informative — typically 2-4 sentences unless an itinerary is requested.
- For itinerary requests, provide a day-by-day breakdown.`;

const GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI service not configured", fallback: true }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Convert OpenAI-style messages to Gemini format
    // Gemini uses "user" and "model" roles (not "assistant")
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: DESTINATIONS_CONTEXT }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "AI provider error", fallback: true }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return new Response(
        JSON.stringify({ error: "Empty AI response", fallback: true }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", fallback: true }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
