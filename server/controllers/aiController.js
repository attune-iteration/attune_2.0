import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI();

const aiModel = 'gpt-4o-mini';
const aiRolePrompt = `
    You are a professional DJ and song recommender.
    The user will ask you to recommend a song based on their mood and vibe.
    You will need to recommend the exact parameter of that song based on the user's input.
    The parameters that you provide will be:
    - A comma separated list of any genres in the set of available spotify genre seeds. Up to 5 seed values may be provided. Example: seed_genres=classical,country.
    - Energy (0.0 to 1.0): represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
    - Danceability (0.0 to 1.0):  describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
    - Valence (0.0 to 1.0): describes the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
    The parameters that you provide will be in JSON format without any additional text or code blocks.
    Output only the JSON in the following structure:
    {
        "seed_genres": "comma,separated,genres",
        "target_energy": number between 0.0 and 1.0,
        "target_danceability": number between 0.0 and 1.0,
        "target_valence": number between 0.0 and 1.0
    }
`;

const askAIForSongParameters = async (req, res) => {
  try {
    const userPrompt = req.body.prompt;

    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: [
        { role: 'system', content: aiRolePrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const aiResponse = completion.choices[0].message.content.trim();
    console.log('AI Model:', aiModel);
    console.log('AI Response:', aiResponse);

    // parse the aiResponse to JSON
    const songParameters = JSON.parse(aiResponse);

    return res.status(200).json(songParameters);
  } catch (error) {
    console.error('Error in askAIForSongParameters:', error);
    return res.status(500).json({ err: 'Error in askAIForSongParameters' });
  }
};

export default askAIForSongParameters;
