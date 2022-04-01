export async function playSoundEffect(effectName) {
  console.log('Playing effect', effectName);
  let audio = new Audio(process.env.BASE_URL + 'sounds/' + effectName + '.mp3'); // path to file
  await audio.play();
}