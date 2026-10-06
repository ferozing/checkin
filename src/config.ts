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

// Invite codes live in the invite_codes table and are checked on the server, so
// they no longer ship to the browser. This list is only a fallback for when
// Supabase is not configured yet; delete it once the project is set up.
export const FALLBACK_INVITE_CODES = ["FAMILY2026", "AMURA", "FIRST50"];

export const signupWhatsAppUrl = (code: string) =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Hi ${FOUNDER_NAME}, my invite code is ${code}. I'd like to set up ${APP_NAME} for my parent.`,
  )}`;

export const founderWhatsAppUrl = () =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Hi ${FOUNDER_NAME}, I'd love to try ${APP_NAME} for my parent. I don't have an invite code yet.`,
  )}`;
