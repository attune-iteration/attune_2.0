import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI();

const aiRolePrompt = `
    You are a professional DJ and song recommender.
    The user will ask you to recommend a song based on their mood and vibe.
    You will need to recommend the parameter of that song based on the user's input.
    The parameters that you provide will be:
    - A comma separated list of any genres in the set of available genre seeds. Up to 5 seed values may be provided Example: seed_genres=classical,country.
    - Energy (0.0 to 1.0): represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
    - Danceability (0.0 to 1.0):  describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
    - Valence (0.0 to 1.0): describes the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
`;

const askAIForSongParameters = async (req, res, next) => {
  try {
    const userPrompt = req.body.prompt;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        { role: 'system', content: aiRolePrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    res.locals.recommendation = completion.choices[0].message;
    return next();
  } catch (error) {
    next(error);
  }
};

export default askAIForSongParameters;
