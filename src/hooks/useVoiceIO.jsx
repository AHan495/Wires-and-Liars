import { useState } from 'react';

export function useVoiceIO(onListenStart, onListenResult) {
  // Because transcript is in a useState variable, it won't actually update after the onResult for a bit until a rerender
  // happens. If the results are needed immediately, use onListenResult instead.
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser. Try Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => onListenStart?.();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      onListenResult(text);
    };

    recognition.start();
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return { transcript, startListening, speak };
}
