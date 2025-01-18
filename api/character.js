import { CharacterAI } from 'node_characterai';

export default async function handler(req, res) {
  const { query } = req;
  const { karakter, pesan } = query;

  // Cek apakah ada karakter dan pesan yang diberikan
  if (!karakter || !pesan) {
    return res.status(400).json({ error: 'Karakter dan pesan wajib diberikan.' });
  }

  const characterAI = new CharacterAI();

  try {
    // Gunakan token untuk autentikasi
    const token = 'YOUR_AUTH_TOKEN'; // Ganti dengan token autentikasi Anda
    await characterAI.authenticateWithToken(token);

    // Gunakan ID karakter yang diteruskan dari query parameter
    const characterId = karakter;

    // Membuat atau melanjutkan obrolan
    const chat = await characterAI.createOrContinueChat(characterId);

    // Kirim pesan dan tunggu respons
    const response = await chat.sendAndAwaitResponse(pesan, true);

    // Kirimkan respons ke klien
    return res.status(200).json({ response: response.text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
  }
}
