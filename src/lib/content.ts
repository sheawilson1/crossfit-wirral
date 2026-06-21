/* ------------------------------------------------------------------ *
   CrossFit Wirral — single source of truth for site content.
   Everything Chris might want to change lives here.
 * ------------------------------------------------------------------ */

export const gym = {
  name: "CrossFit Wirral",
  tagline: "The best hour of your day.",
  established: 2012,
  blurb: "Wirral's original CrossFit box.",
  phoneDisplay: "07751 549 483",
  phoneIntl: "+447751549483",
  whatsapp: "447751549483",
  email: "chris@crossfitwirral.co.uk",
  address: {
    line1: "Unit 86 Argyle Industrial Estate",
    line2: "Appin Road, Birkenhead",
    region: "Wirral",
    postcode: "CH41 9HH",
  },
  mapsQuery: "CrossFit Wirral, Unit 86 Argyle Industrial Estate, Appin Road, Birkenhead, CH41 9HH",
  social: {
    instagram: "https://www.instagram.com/crossfitwirral/",
    facebook: "https://www.facebook.com/profile.php?id=100049192466125",
  },
};

export const nav = [
  { label: "Why CrossFit", href: "#why" },
  { label: "Classes", href: "#classes" },
  { label: "Timetable", href: "#timetable" },
  { label: "Coach", href: "#coach" },
  { label: "Visit", href: "#visit" },
];

export const stats = [
  { value: 2012, prefix: "EST. ", suffix: "", label: "Wirral's original CrossFit box" },
  { value: 40, prefix: "", suffix: "+", label: "Coached classes every week" },
  { value: 8, prefix: "", suffix: "", label: "Class times a day, 6am–7pm" },
  { value: 0, prefix: "£", suffix: "", label: "To try your first session" },
];

export const programs = [
  {
    no: "01",
    title: "Foundations",
    tag: "New to CrossFit",
    desc: "A proper on-ramp. We teach you the movements, the lingo and how to scale before you join the main classes. Nobody gets thrown in the deep end.",
    points: ["Total beginners welcome", "Learn the core lifts safely", "Coach-led, no guesswork"],
    image: "/gym/p02.jpg",
    alt: "A coach guiding two members through box work in the gym",
  },
  {
    no: "02",
    title: "Group WOD",
    tag: "The daily class",
    desc: "The heart of the box. One hour, one workout of the day, coached start to finish. Every movement and weight scales to exactly where you are today.",
    points: ["Warm-up → strength → workout", "Scaled for every level", "Different every single day"],
    image: "/gym/p13.jpg",
    alt: "Athlete in the bottom of a front squat during a class",
  },
  {
    no: "03",
    title: "Strength & Skill",
    tag: "Get stronger",
    desc: "Structured barbell and gymnastics work built into our programming, so you actually progress — your first pull-up, a heavier deadlift, cleaner technique.",
    points: ["Barbell cycles & PRs", "Gymnastics progressions", "Measured, trackable gains"],
    image: "/gym/p08.jpg",
    alt: "Athlete setting up for a heavy deadlift",
  },
  {
    no: "04",
    title: "1-to-1 Coaching",
    tag: "Private sessions",
    desc: "Want focused time with a CrossFit Level 2 coach? Private and small-group sessions for technique, returning from injury, or just fast-tracking your start.",
    points: ["Level 2 certified coaching", "Built around your goals", "Great for getting started"],
    image: "/gym/p07.jpg",
    alt: "Close-up of an athlete loading bumper plates onto a barbell",
  },
];

export const classFlow = [
  { time: "0–10 min", title: "Warm-up", desc: "Raise a sweat, prep the joints and rehearse the day's movements together." },
  { time: "10–30 min", title: "Strength / Skill", desc: "Build a lift or drill a skill — squats, presses, pull-ups, Olympic lifts." },
  { time: "30–50 min", title: "The WOD", desc: "The workout of the day. Scaled to you, pushed by the people next to you." },
  { time: "50–60 min", title: "Cool down", desc: "Stretch, mobilise and catch your breath. Best hour of your day, done." },
];

export const timetable: { day: string; short: string; sessions: { time: string; period: "AM" | "PM"; label: string }[] }[] = [
  {
    day: "Monday", short: "Mon",
    sessions: [
      { time: "06:00", period: "AM", label: "CrossFit" },
      { time: "07:15", period: "AM", label: "CrossFit" },
      { time: "08:30", period: "AM", label: "CrossFit" },
      { time: "09:45", period: "AM", label: "CrossFit" },
      { time: "11:00", period: "AM", label: "CrossFit" },
      { time: "16:30", period: "PM", label: "CrossFit" },
      { time: "17:45", period: "PM", label: "CrossFit" },
      { time: "19:00", period: "PM", label: "CrossFit" },
    ],
  },
  {
    day: "Tuesday", short: "Tue",
    sessions: [
      { time: "06:00", period: "AM", label: "CrossFit" },
      { time: "07:15", period: "AM", label: "CrossFit" },
      { time: "08:30", period: "AM", label: "CrossFit" },
      { time: "09:45", period: "AM", label: "CrossFit" },
      { time: "11:00", period: "AM", label: "CrossFit" },
      { time: "16:30", period: "PM", label: "CrossFit" },
      { time: "17:45", period: "PM", label: "CrossFit" },
      { time: "19:00", period: "PM", label: "CrossFit" },
    ],
  },
  {
    day: "Wednesday", short: "Wed",
    sessions: [
      { time: "06:00", period: "AM", label: "CrossFit" },
      { time: "07:15", period: "AM", label: "CrossFit" },
      { time: "08:30", period: "AM", label: "CrossFit" },
      { time: "09:45", period: "AM", label: "CrossFit" },
      { time: "11:00", period: "AM", label: "CrossFit" },
      { time: "16:30", period: "PM", label: "CrossFit" },
      { time: "17:45", period: "PM", label: "CrossFit" },
      { time: "19:00", period: "PM", label: "CrossFit" },
    ],
  },
  {
    day: "Thursday", short: "Thu",
    sessions: [
      { time: "06:00", period: "AM", label: "CrossFit" },
      { time: "07:15", period: "AM", label: "CrossFit" },
      { time: "08:30", period: "AM", label: "CrossFit" },
      { time: "09:45", period: "AM", label: "CrossFit" },
      { time: "11:00", period: "AM", label: "CrossFit" },
      { time: "16:30", period: "PM", label: "CrossFit" },
      { time: "17:45", period: "PM", label: "CrossFit" },
      { time: "19:00", period: "PM", label: "CrossFit" },
    ],
  },
  {
    day: "Friday", short: "Fri",
    sessions: [
      { time: "06:00", period: "AM", label: "CrossFit" },
      { time: "07:15", period: "AM", label: "CrossFit" },
      { time: "08:30", period: "AM", label: "CrossFit" },
      { time: "09:45", period: "AM", label: "CrossFit" },
      { time: "11:00", period: "AM", label: "CrossFit" },
      { time: "16:30", period: "PM", label: "CrossFit" },
      { time: "17:45", period: "PM", label: "CrossFit" },
      { time: "19:00", period: "PM", label: "CrossFit" },
    ],
  },
  {
    day: "Saturday", short: "Sat",
    sessions: [
      { time: "07:00", period: "AM", label: "CrossFit" },
      { time: "08:15", period: "AM", label: "CrossFit" },
      { time: "09:30", period: "AM", label: "CrossFit" },
      { time: "10:45", period: "AM", label: "CrossFit" },
    ],
  },
  {
    day: "Sunday", short: "Sun",
    sessions: [],
  },
];

export const faqs = [
  {
    q: "I'm really not fit — is CrossFit actually for me?",
    a: "Yes, and you're exactly who we're built for. Every workout is scaled to your level, so a complete beginner and a Games athlete can train side by side in the same class. You don't get fit and then start CrossFit — CrossFit is how you get fit.",
  },
  {
    q: "I've never lifted a barbell. Where do I start?",
    a: "With our Foundations on-ramp. Before you jump into the main classes a coach teaches you the key movements, how to breathe, and how to scale. By the end you'll know exactly what you're doing on the gym floor.",
  },
  {
    q: "What actually happens in a class?",
    a: "One coached hour: a warm-up, a strength or skill piece, the workout of the day, and a cool-down. A coach is with you the whole time, correcting technique and dialling the weights and movements to suit you.",
  },
  {
    q: "How much is membership?",
    a: "We keep it simple and there's an option to suit how often you train. The easiest thing is to book your free intro session — we'll show you around, talk through your goals and explain the membership that fits you. No hard sell.",
  },
  {
    q: "Do I need to book, and is the first one really free?",
    a: "Yes, your first session is on us — no card, no commitment. Just message us on WhatsApp or drop your details in the form and we'll get you booked into a class that suits your schedule.",
  },
  {
    q: "Where are you and is there parking?",
    a: "We're on Argyle Industrial Estate in Birkenhead, CH41 9HH — easy to reach from across the Wirral with free parking right outside the box. Just look for the CFW unit.",
  },
];

export const gallery = [
  { src: "/gym/p06.jpg", alt: "Member flipping a heavy tyre against a yellow wall", span: "wide" },
  { src: "/gym/p03.jpg", alt: "Athlete cleaning a barbell to the front rack", span: "tall" },
  { src: "/gym/p09.jpg", alt: "Athlete training muscle-ups on the rings", span: "" },
  { src: "/gym/p10.jpg", alt: "Athlete catching a barbell in the front rack", span: "" },
  { src: "/gym/p15.jpg", alt: "Athlete holding the top of a ring support", span: "wide" },
  { src: "/gym/p05.jpg", alt: "Athlete pressing a barbell from the front rack", span: "tall" },
];

export const community = [
  { stat: "All ages", label: "16 to 60+ training together" },
  { stat: "Every level", label: "First-timers to competitors" },
  { stat: "One room", label: "No mirrors, no machines, no ego" },
];

export const hours = [
  { day: "Monday – Friday", time: "06:00 – 20:00" },
  { day: "Saturday", time: "07:00 – 12:00" },
  { day: "Sunday", time: "Rest day" },
];

export const freeSteps = [
  { no: "01", title: "Get in touch", desc: "Message us on WhatsApp or send the form. Tell us a bit about you — that's it." },
  { no: "02", title: "Come in & meet us", desc: "We'll show you around the box, talk goals, and slot you into a class that suits your schedule." },
  { no: "03", title: "Train your first hour", desc: "Fully coached, scaled to you, no pressure. Most people are buzzing — and hooked — by the end." },
];

/* NOTE TO OWNER: these are placeholder testimonials for the demo.
   Swap in real quotes from your Google / Facebook reviews before going live. */
export const testimonials = [
  {
    quote:
      "I walked in convinced I was 'too unfit for CrossFit'. Two years later it's the best decision I've made — the coaching is unreal and they scale everything.",
    name: "Member",
    meta: "Training since 2023",
  },
  {
    quote:
      "It's the only gym I've ever stuck at. You're not a number — the coaches know your name and the people make you want to come back.",
    name: "Member",
    meta: "Wallasey",
  },
  {
    quote:
      "Genuinely the best hour of my day. I'm fitter at 45 than I was at 30 and I actually look forward to training now.",
    name: "Member",
    meta: "Birkenhead",
  },
];

export const bookingTimes = [
  "Early morning (6–9am)",
  "Mid-morning (9–11am)",
  "Daytime (11am–4pm)",
  "After work (4:30–7pm)",
  "Saturday morning",
  "Not sure yet",
];

export const experienceLevels = [
  "Complete beginner",
  "Some gym experience",
  "Done CrossFit before",
  "Returning after a break",
];
