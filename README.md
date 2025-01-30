# attune_2.0

Attune is a habit-tracking app that gives you all the right vibes to practice your daily habits.
Create a new habit or select from a menu of existing habits, then generate a recommendation from the Spotify API. You can also customize the energy levels, danceability, and valence of the type of songs that are associated with each habit.

#

To start this app:

1. Clone this repo to your local computer by typing the following into your terminal:

git clone git@github.com:attune-iteration/attune_2.0.git

2. Install the necessary dependencies and packages by typing:

cd attune_2.0
npm install

3. You'll need to create your own .env file in the attune_2.0 folder with a Spotify Client_ID, Spotify Client_Secret, Supabase URL, and OpenAI API Key:
   SPOTIFY_CLIENT_ID=
   SPOTIFY_CLIENT_SECRET=
   SUPABASE_URL=
   SUPABASE_API_ANON_KEY=
   SUPABASE_URI=
   OPENAI_API_KEY=

For Spotify API access, visit: https://developer.spotify.com/documentation/web-api
For OpenAI API access, visit: https://openai.com/index/openai-api/
To create your own Supabase account, visit: https://supabase.com and create a project.

4. Run the app & the server in your dev environment! Type in:
   npm run start
   npm run server

5. This app runs on Vite! To interact with the front-end, visit localhost:5173. The server runs on localhost:5001.
