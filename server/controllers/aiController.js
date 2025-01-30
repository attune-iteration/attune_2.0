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
        "seed_genres": an array of up to 5 genres from the available spotify genre seeds,
        "target_energy": number between 0.0 and 1.0,
        "target_danceability": number between 0.0 and 1.0,
        "target_valence": number between 0.0 and 1.0
    }
`;

const spotifyGenres = [
  'acoustic',
  'afrobeat',
  'alt-rock',
  'alternative',
  'ambient',
  'anime',
  'black-metal',
  'bluegrass',
  'blues',
  'bossanova',
  'brazil',
  'breakbeat',
  'british',
  'cantopop',
  'chicago-house',
  'children',
  'chill',
  'classical',
  'club',
  'comedy',
  'country',
  'dance',
  'dancehall',
  'death-metal',
  'deep-house',
  'detroit-techno',
  'disco',
  'disney',
  'drum-and-bass',
  'dub',
  'dubstep',
  'edm',
  'electro',
  'electronic',
  'emo',
  'folk',
  'forro',
  'french',
  'funk',
  'garage',
  'german',
  'gospel',
  'goth',
  'grindcore',
  'groove',
  'grunge',
  'guitar',
  'happy',
  'hard-rock',
  'hardcore',
  'hardstyle',
  'heavy-metal',
  'hip-hop',
  'holidays',
  'honky-tonk',
  'house',
  'idm',
  'indian',
  'indie',
  'indie-pop',
  'industrial',
  'iranian',
  'j-dance',
  'j-idol',
  'j-pop',
  'j-rock',
  'jazz',
  'k-pop',
  'kids',
  'latin',
  'latino',
  'malay',
  'mandopop',
  'metal',
  'metal-misc',
  'metalcore',
  'minimal-techno',
  'movies',
  'mpb',
  'new-age',
  'new-release',
  'opera',
  'pagode',
  'party',
  'philippines-opm',
  'piano',
  'pop',
  'pop-film',
  'post-dubstep',
  'power-pop',
  'progressive-house',
  'psych-rock',
  'punk',
  'punk-rock',
  'r-n-b',
  'rainy-day',
  'reggae',
  'reggaeton',
  'road-trip',
  'rock',
  'rock-n-roll',
  'rockabilly',
  'romance',
  'sad',
  'salsa',
  'samba',
  'sertanejo',
  'show-tunes',
  'singer-songwriter',
  'ska',
  'sleep',
  'songwriter',
  'soul',
  'soundtracks',
  'spanish',
  'study',
  'summer',
  'swedish',
  'synth-pop',
  'tango',
  'techno',
  'trance',
  'trip-hop',
  'turkish',
  'work-out',
  'world-music',
];

const askAIForSongParameters = async (req, res, next) => {
  try {
    console.log(req.body);

    const userPrompt = req.body.prompt;

    // added error handleing
    if (!userPrompt) {
      return next({ err: 'user did not specify a prompt', status: 400, message: { err: 'please specify a prompt.' } });
    }

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

    let out = [];
    for (let i = 0; i < songParameters.seed_genres.length; i++) {
      if (spotifyGenres.includes(songParameters.seed_genres[i])) {
        out.push(songParameters.seed_genres[i]);
      }
    }
    songParameters.seed_genres = out.join(','); // add them togethier with comma separators

    return res.status(200).json(songParameters);
  } catch (error) {
    console.error('Error in askAIForSongParameters:', error);
    return res.status(500).json({ err: 'Error in askAIForSongParameters' });
  }
};

export default askAIForSongParameters;
