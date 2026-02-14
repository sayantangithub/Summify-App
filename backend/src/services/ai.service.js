export const generateSummary = async (text) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3n-e4b-it:free",
          messages: [
            {
              role: "user",
              content: `Providing a text from a secret notebook. Just summarize it one sentence: ${text}`,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    // Debug (optional)
    // console.log(data);

    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error("OpenRouter Error:", error);
    return null;
  }
};
