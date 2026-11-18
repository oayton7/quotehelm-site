#!/usr/bin/env bash
# Optional free voices with Piper (offline text to speech). Run on a machine that can reach huggingface.co:
#   pip install piper-tts
#   python3 -m piper.download_voices en_GB-alan-medium en_GB-southern_english_female-low
# Then: tools/say.sh en_GB-alan-medium "Which thing is that?" voices/s3.wav
# Any WAV or MP3 works in VIDEO.voices, including lines recorded on a phone.
set -euo pipefail
python3 -m piper -m "$1" -f "$3" -- "$2"
