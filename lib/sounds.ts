export function playSound(name: "move" | "win" | "draw") {
  const audio = new Audio(`/sounds/${name}.mp3`);
  void audio.play().catch(() => {
    // Browsers may block playback until the user has interacted with the page.
  });
}
