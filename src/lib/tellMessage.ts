/**
 * The message the child sends their parent before the first call.
 *
 * It is written in the language they picked for the calls, because this is the
 * one piece of our copy a parent actually reads. Short bullets, and it leads
 * with why the calls exist: so their child knows they are well and can stop
 * worrying.
 *
 * The trust rules live here too. Sona is named as a voice assistant, and
 * stopping the calls is offered in the message itself.
 */

export type Lang = "Telugu" | "Hindi" | "Tamil" | "Kannada" | "Bengali" | "English";

export const LANGS: Lang[] = ["Telugu", "Hindi", "Tamil", "Kannada", "Bengali", "English"];

type Vars = { callName: string; time: string; caller: string };

type Template = {
  /** The time phrase, said the way that language says it. */
  time: (clock: string, morning: boolean) => string;
  lines: (v: Vars) => string[];
};

const T: Record<Lang, Template> = {
  Telugu: {
    time: (clock, morning) => `${morning ? "ఉదయం" : "సాయంత్రం"} ${clock} కి`,
    lines: ({ callName, time, caller }) => [
      `${callName}, రేపటి నుంచి సోన మీకు రోజూ ${time} ఫోన్ చేస్తుంది.`,
      "",
      "• ఆమె ఒక వాయిస్ అసిస్టెంట్, మీ కోసం నేను ఏర్పాటు చేశాను",
      "• మీరు ఎలా ఉన్నారో, మాత్రలు వేసుకున్నారో అడుగుతుంది",
      "• తర్వాత నాకు చెబుతుంది, మీరు బాగున్నారని తెలిసి నాకు దిగులు ఉండదు",
      "• మీరు ఆమెతో తెలుగులో మాట్లాడవచ్చు, నాతో మాట్లాడినట్టే",
      "• కాల్స్ వద్దా? ఆమెకు చెప్పండి, ఆగిపోతాయి",
      "",
      `ఆమె నంబర్: ${caller}`,
    ],
  },
  Hindi: {
    time: (clock, morning) => `${morning ? "सुबह" : "शाम"} ${clock} बजे`,
    lines: ({ callName, time, caller }) => [
      `${callName}, कल से सोना आपको रोज़ ${time} फ़ोन करेगी।`,
      "",
      "• वह एक आवाज़ सहायक है, मैंने आपके लिए लगाई है",
      "• वह पूछेगी आप कैसे हैं और दवा ली या नहीं",
      "• फिर मुझे बता देगी, तो मुझे पता रहेगा आप ठीक हैं और चिंता नहीं रहेगी",
      "• आप उससे हिंदी में बात कर सकते हैं, जैसे मुझसे करते हैं",
      "• कॉल नहीं चाहिए? उसे बता दीजिए, बंद हो जाएँगी",
      "",
      `उसका नंबर: ${caller}`,
    ],
  },
  Tamil: {
    time: (clock, morning) => `${morning ? "காலை" : "மாலை"} ${clock} மணிக்கு`,
    lines: ({ callName, time, caller }) => [
      `${callName}, நாளை முதல் சோனா உங்களுக்கு தினமும் ${time} அழைப்பாள்.`,
      "",
      "• அவள் ஒரு குரல் உதவியாளர், உங்களுக்காக நான் ஏற்பாடு செய்தேன்",
      "• நீங்கள் எப்படி இருக்கிறீர்கள், மாத்திரை சாப்பிட்டீர்களா என்று கேட்பாள்",
      "• பிறகு எனக்குச் சொல்வாள், நீங்கள் நலமாக இருக்கிறீர்கள் என்று தெரிந்து எனக்குக் கவலை இருக்காது",
      "• நீங்கள் அவளுடன் தமிழில் பேசலாம், என்னிடம் பேசுவது போலவே",
      "• அழைப்பு வேண்டாமா? அவளிடம் சொல்லுங்கள், நின்றுவிடும்",
      "",
      `அவள் எண்: ${caller}`,
    ],
  },
  Kannada: {
    time: (clock, morning) => `${morning ? "ಬೆಳಿಗ್ಗೆ" : "ಸಂಜೆ"} ${clock} ಕ್ಕೆ`,
    lines: ({ callName, time, caller }) => [
      `${callName}, ನಾಳೆಯಿಂದ ಸೋನಾ ನಿಮಗೆ ಪ್ರತಿದಿನ ${time} ಕರೆ ಮಾಡುತ್ತಾಳೆ.`,
      "",
      "• ಅವಳು ಒಬ್ಬ ಧ್ವನಿ ಸಹಾಯಕಿ, ನಿಮಗಾಗಿ ನಾನು ಏರ್ಪಾಡು ಮಾಡಿದ್ದೇನೆ",
      "• ನೀವು ಹೇಗಿದ್ದೀರಿ, ಮಾತ್ರೆ ತೆಗೆದುಕೊಂಡಿರಾ ಎಂದು ಕೇಳುತ್ತಾಳೆ",
      "• ನಂತರ ನನಗೆ ಹೇಳುತ್ತಾಳೆ, ನೀವು ಚೆನ್ನಾಗಿದ್ದೀರಿ ಎಂದು ತಿಳಿದು ನನಗೆ ಚಿಂತೆ ಇರುವುದಿಲ್ಲ",
      "• ನೀವು ಅವಳೊಂದಿಗೆ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಬಹುದು, ನನ್ನ ಜೊತೆ ಮಾತನಾಡುವಂತೆಯೇ",
      "• ಕರೆ ಬೇಡವೇ? ಅವಳಿಗೆ ಹೇಳಿ, ನಿಲ್ಲುತ್ತವೆ",
      "",
      `ಅವಳ ನಂಬರ್: ${caller}`,
    ],
  },
  Bengali: {
    time: (clock, morning) => `${morning ? "সকাল" : "সন্ধ্যা"} ${clock} টায়`,
    lines: ({ callName, time, caller }) => [
      `${callName}, কাল থেকে সোনা তোমাকে রোজ ${time} ফোন করবে।`,
      "",
      "• সে একজন ভয়েস অ্যাসিস্ট্যান্ট, তোমার জন্য আমি ঠিক করে দিয়েছি",
      "• জিজ্ঞেস করবে তুমি কেমন আছো, ওষুধ খেয়েছো কিনা",
      "• তারপর আমাকে জানাবে, তুমি ভালো আছো জেনে আমার আর চিন্তা থাকবে না",
      "• তুমি ওর সঙ্গে বাংলায় কথা বলতে পারো, আমার সঙ্গে যেভাবে বলো",
      "• ফোন চাও না? ওকে বলে দিও, বন্ধ হয়ে যাবে",
      "",
      `ওর নম্বর: ${caller}`,
    ],
  },
  English: {
    time: (clock, morning) => `${clock} ${morning ? "am" : "pm"}`,
    lines: ({ callName, time, caller }) => [
      `${callName}, from tomorrow Sona will call you every day at ${time}.`,
      "",
      "• She is a voice assistant I set up for you",
      "• She asks how you are and whether you took your tablets",
      "• Then she tells me, so I know you are well and I can stop worrying",
      "• Talk to her in English, just like you talk to me",
      "• Don’t want the calls? Tell her and they stop",
      "",
      `Her number: ${caller}`,
    ],
  },
};

/** "09:00" or "09:00:00" into a clock face plus whether it is morning. */
function clockOf(callTime: string) {
  const [h, m] = (callTime || "09:00").slice(0, 5).split(":").map(Number);
  const hour = Number.isFinite(h) ? h : 9;
  const min = Number.isFinite(m) ? m : 0;
  return {
    clock: `${hour % 12 === 0 ? 12 : hour % 12}:${String(min).padStart(2, "0")}`,
    morning: hour < 12,
  };
}

export function isLang(v: string): v is Lang {
  return (LANGS as string[]).includes(v);
}

/** The time phrase on its own, in that language. */
export function timePhrase(callTime: string, language: string) {
  const lang: Lang = isLang(language) ? language : "English";
  const { clock, morning } = clockOf(callTime);
  return T[lang].time(clock, morning);
}

export function tellMessage({
  callName,
  callTime,
  language,
  caller,
}: {
  callName: string;
  callTime: string;
  language: string;
  caller: string;
}) {
  const lang: Lang = isLang(language) ? language : "English";
  const { clock, morning } = clockOf(callTime);
  const t = T[lang];
  return t.lines({ callName, time: t.time(clock, morning), caller }).join("\n");
}
