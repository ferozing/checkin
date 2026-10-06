// The product name may change. Keep it here and nowhere else.
export const APP_NAME = "Checkin";

export const COMPANY = {
  name: "Fimo Labs",
  email: "pm.ferozmd@gmail.com",
  phoneDisplay: "+91 96293 81945",
  phoneE164: "+919629381945",
  whatsapp: "919629381945",
  address: "7G, Velachery, Chennai 600042",
};

export const PRICE_PER_MONTH = "₹399";
export const TRIAL_DAYS = 3;
export const LEGAL_LAST_UPDATED = "4 October 2026";

export const FOUNDER_NAME = "Feroz";

// Temporary list until invite codes move to the invite_codes table in Phase 2.
// Not case sensitive. Visible in the browser bundle, so treat it as a gentle gate.
export const INVITE_CODES = ["FAMILY2026", "AMURA", "FIRST50"];

export const signupWhatsAppUrl = (code: string) =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Hi ${FOUNDER_NAME}, my invite code is ${code}. I'd like to set up ${APP_NAME} for my parent.`,
  )}`;

export const founderWhatsAppUrl = () =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Hi ${FOUNDER_NAME}, I'd love to try ${APP_NAME} for my parent. I don't have an invite code yet.`,
  )}`;
