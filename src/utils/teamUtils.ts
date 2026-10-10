export interface TeamMember {
  name: string;
  post: string;
  imageUrl: string;
  imagePosition?: string;
  instagram?: string;
  Instagram?: string;
  linkedin?: string;
  email?: string;
  github?: string;
  gtihub?: string;
  department?: string;
}

export interface SanitizedLinks {
  linkedinUrl?: string;
  instagramUrl?: string;
  githubUrl?: string;
  emailUrl?: string;
  displayEmail?: string;
}

export const sanitizeSocialLinks = (member: TeamMember): SanitizedLinks => {
  // LinkedIn
  let linkedinUrl: string | undefined = undefined;
  const rawLinkedin = member.linkedin?.trim();
  if (rawLinkedin) {
    if (rawLinkedin.startsWith("http://") || rawLinkedin.startsWith("https://")) {
      linkedinUrl = rawLinkedin;
    } else if (
      rawLinkedin.startsWith("www.linkedin.com") ||
      rawLinkedin.startsWith("linkedin.com") ||
      rawLinkedin.startsWith("in.linkedin.com")
    ) {
      linkedinUrl = `https://${rawLinkedin}`;
    } else if (rawLinkedin.includes(" ")) {
      // Plain name string like "Vaasudeva Gopal"
      linkedinUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(rawLinkedin)}`;
    } else {
      // Clean handle like "rushil-b-r"
      linkedinUrl = `https://www.linkedin.com/in/${encodeURIComponent(rawLinkedin)}`;
    }
  }

  // Instagram (checking both lowercase and uppercase keys)
  let instagramUrl: string | undefined = undefined;
  const rawInstagram = (member.instagram || member.Instagram)?.trim();
  if (rawInstagram) {
    if (!rawInstagram.includes("@") || !rawInstagram.includes(".com")) {
      const handle = rawInstagram.replace(/^@/, "");
      if (handle) {
        instagramUrl = `https://instagram.com/${handle}`;
      }
    }
  }

  // GitHub (checking both standard and typo property)
  let githubUrl: string | undefined = undefined;
  const rawGithub = (member.github || member.gtihub)?.trim();
  if (rawGithub) {
    if (rawGithub.startsWith("http://") || rawGithub.startsWith("https://")) {
      githubUrl = rawGithub;
    } else if (rawGithub.startsWith("github.com/")) {
      githubUrl = `https://${rawGithub}`;
    } else if (rawGithub.includes(" ")) {
      githubUrl = `https://github.com/search?q=${encodeURIComponent(rawGithub)}`;
    } else {
      githubUrl = `https://github.com/${rawGithub}`;
    }
  }

  // Email
  let emailUrl: string | undefined = undefined;
  let displayEmail: string | undefined = undefined;
  const rawEmail = member.email?.trim();
  if (rawEmail && rawEmail.includes("@")) {
    const cleanEmail =
      rawEmail.endsWith(".com") ||
      rawEmail.endsWith(".in") ||
      rawEmail.endsWith(".edu") ||
      rawEmail.endsWith(".ac.in")
        ? rawEmail
        : rawEmail.endsWith("@gmail")
        ? `${rawEmail}.com`
        : rawEmail;
    emailUrl = `mailto:${cleanEmail}`;
    displayEmail = cleanEmail;
  }

  return { linkedinUrl, instagramUrl, githubUrl, emailUrl, displayEmail };
};
